/**
 * Form delivery — replaces the legacy PHP `send_email.php` (mail()).
 *
 * Provider is chosen with VITE_FORM_PROVIDER (see .env.example):
 *   formspree | web3forms | emailjs | webhook
 *
 * In development with no provider configured, submissions are simulated
 * (logged to the console) so the UI can be exercised end-to-end.
 * In production with no provider, a FormServiceError('not-configured')
 * is thrown and the UI offers an email fallback.
 */

const env = import.meta.env
const provider = (env.VITE_FORM_PROVIDER || '').trim().toLowerCase()

export class FormServiceError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'FormServiceError'
    this.code = code // 'not-configured' | 'network' | 'rejected' | 'spam'
  }
}

export const isFormServiceConfigured = () => Boolean(provider)

/**
 * File attachments on the contact form.
 * - formspree / web3forms: sent as multipart uploads (both need a paid plan for files).
 * - webhook: sent as base64 inside the JSON body (free, e.g. Apps Script → MailApp).
 * - emailjs: not supported (free tier caps attachments at 50 KB).
 * Off unless VITE_FORM_ATTACHMENTS=true, so the field never appears for a provider
 * plan that would silently drop the file. Always on for dev simulation.
 */
const ATTACHMENT_PROVIDERS = ['formspree', 'web3forms', 'webhook']
export const supportsAttachments = provider
  ? ATTACHMENT_PROVIDERS.includes(provider) && env.VITE_FORM_ATTACHMENTS === 'true'
  : Boolean(env.DEV)

// ── Spam protection ─────────────────────────────────────────────────────────
const MIN_FILL_MS = 2500
const THROTTLE_MS = 30_000

/**
 * Throws if the submission looks automated.
 * @param {object} meta  { honeypot: string, startedAt: number }
 */
function assertHuman(kind, { honeypot, startedAt } = {}) {
  if (honeypot) throw new FormServiceError('spam', 'Submission blocked.')
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS)
    throw new FormServiceError('spam', 'That was quick! Please take a second and try again.')

  try {
    const last = Number(localStorage.getItem(`webros:last-${kind}`) || 0)
    if (Date.now() - last < THROTTLE_MS)
      throw new FormServiceError('rejected', 'You just sent one — please wait a few seconds before trying again.')
  } catch (err) {
    if (err instanceof FormServiceError) throw err
    // storage unavailable (private mode) — skip throttle
  }
}

function markSent(kind) {
  try {
    localStorage.setItem(`webros:last-${kind}`, String(Date.now()))
  } catch {
    /* ignore */
  }
}

// ── Providers ──────────────────────────────────────────────────────────────
function postJson(url, body) {
  return request(url, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
}

/** Multipart POST with the file under `attachment` (browser sets the boundary header). */
function postMultipart(url, fields, file) {
  const form = new FormData()
  Object.entries(fields).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') form.append(k, String(v))
  })
  form.append('attachment', file, file.name)
  return request(url, { headers: { Accept: 'application/json' }, body: form })
}

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
    reader.onerror = () => reject(new FormServiceError('rejected', 'We couldn’t read that file. Try attaching it again.'))
    reader.readAsDataURL(file)
  })
}

async function request(url, init) {
  let res
  try {
    res = await fetch(url, { method: 'POST', ...init })
  } catch {
    throw new FormServiceError('network', 'We couldn’t reach the server. Check your connection and try again.')
  }
  if (!res.ok) {
    let detail = ''
    try {
      const data = await res.json()
      detail = data?.message || data?.error || data?.errors?.[0]?.message || ''
    } catch {
      /* non-JSON body */
    }
    throw new FormServiceError('rejected', detail || `The form service responded with ${res.status}.`)
  }
  return res
}

const subjects = {
  contact: (d) => `New project enquiry — ${d.name}${d.service ? ` (${d.service})` : ''}`,
  newsletter: (d) => `New newsletter subscriber — ${d.email}`,
}

const senders = {
  async formspree(kind, data, file) {
    const id = kind === 'contact' ? env.VITE_FORMSPREE_CONTACT_ID : env.VITE_FORMSPREE_NEWSLETTER_ID
    if (!id) throw new FormServiceError('not-configured', `Missing Formspree form ID for "${kind}".`)
    const url = `https://formspree.io/f/${id}`
    const fields = { ...data, _subject: subjects[kind](data) }
    await (file ? postMultipart(url, fields, file) : postJson(url, fields))
  },

  async web3forms(kind, data, file) {
    const key = env.VITE_WEB3FORMS_ACCESS_KEY
    if (!key) throw new FormServiceError('not-configured', 'Missing Web3Forms access key.')
    const url = 'https://api.web3forms.com/submit'
    const fields = {
      access_key: key,
      subject: subjects[kind](data),
      from_name: 'WEBROS Techies website',
      form: kind,
      ...data,
    }
    const res = await (file ? postMultipart(url, fields, file) : postJson(url, fields))
    const json = await res.json().catch(() => ({}))
    if (json && json.success === false) throw new FormServiceError('rejected', json.message || 'Submission rejected.')
  },

  async emailjs(kind, data) {
    const templateId =
      kind === 'contact' ? env.VITE_EMAILJS_CONTACT_TEMPLATE_ID : env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID
    if (!env.VITE_EMAILJS_SERVICE_ID || !templateId || !env.VITE_EMAILJS_PUBLIC_KEY)
      throw new FormServiceError('not-configured', 'Missing EmailJS service, template or public key.')
    await postJson('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: env.VITE_EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: { ...data, subject: subjects[kind](data) },
    })
  },

  /**
   * Generic webhook — e.g. a Google Apps Script web app.
   * Sent as text/plain to avoid a CORS preflight (Apps Script can't answer OPTIONS).
   */
  async webhook(kind, data, file) {
    const url = env.VITE_WEBHOOK_URL
    if (!url) throw new FormServiceError('not-configured', 'Missing webhook URL.')
    // Apps Script: Utilities.newBlob(Utilities.base64Decode(a.base64), a.type, a.name)
    const attachment = file
      ? { name: file.name, type: file.type || 'application/octet-stream', size: file.size, base64: await readAsBase64(file) }
      : undefined
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          form: kind,
          subject: subjects[kind](data),
          submittedAt: new Date().toISOString(),
          ...data,
          attachment,
        }),
      })
    } catch {
      throw new FormServiceError('network', 'We couldn’t reach the server. Check your connection and try again.')
    }
  },
}

// ── Public API ─────────────────────────────────────────────────────────────
async function submit(kind, data, meta, file = null) {
  assertHuman(kind, meta)
  if (file && !supportsAttachments)
    throw new FormServiceError('rejected', 'File uploads aren’t available right now. Please remove the file and email it to us instead.')

  const send = senders[provider]
  if (!send) {
    if (env.DEV) {
      console.info(
        `[formService] No VITE_FORM_PROVIDER set — simulating "${kind}" submission:`,
        data,
        file ? { attachment: file.name, bytes: file.size } : '',
      )
      await new Promise((r) => setTimeout(r, 900))
      markSent(kind)
      return { simulated: true }
    }
    throw new FormServiceError('not-configured', 'Online forms are not configured yet.')
  }

  await send(kind, data, file)
  markSent(kind)
  return { simulated: false }
}

export const sendContactMessage = (data, meta, file) => submit('contact', data, meta, file)
export const subscribeToNewsletter = (data, meta) => submit('newsletter', data, meta)
