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
async function postJson(url, body, headers = {}) {
  let res
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
      body: JSON.stringify(body),
    })
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
  async formspree(kind, data) {
    const id = kind === 'contact' ? env.VITE_FORMSPREE_CONTACT_ID : env.VITE_FORMSPREE_NEWSLETTER_ID
    if (!id) throw new FormServiceError('not-configured', `Missing Formspree form ID for "${kind}".`)
    await postJson(`https://formspree.io/f/${id}`, { ...data, _subject: subjects[kind](data) })
  },

  async web3forms(kind, data) {
    const key = env.VITE_WEB3FORMS_ACCESS_KEY
    if (!key) throw new FormServiceError('not-configured', 'Missing Web3Forms access key.')
    const res = await postJson('https://api.web3forms.com/submit', {
      access_key: key,
      subject: subjects[kind](data),
      from_name: 'WEBROS Techies website',
      form: kind,
      ...data,
    })
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
  async webhook(kind, data) {
    const url = env.VITE_WEBHOOK_URL
    if (!url) throw new FormServiceError('not-configured', 'Missing webhook URL.')
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ form: kind, subject: subjects[kind](data), submittedAt: new Date().toISOString(), ...data }),
      })
    } catch {
      throw new FormServiceError('network', 'We couldn’t reach the server. Check your connection and try again.')
    }
  },
}

// ── Public API ─────────────────────────────────────────────────────────────
async function submit(kind, data, meta) {
  assertHuman(kind, meta)

  const send = senders[provider]
  if (!send) {
    if (env.DEV) {
      console.info(`[formService] No VITE_FORM_PROVIDER set — simulating "${kind}" submission:`, data)
      await new Promise((r) => setTimeout(r, 900))
      markSent(kind)
      return { simulated: true }
    }
    throw new FormServiceError('not-configured', 'Online forms are not configured yet.')
  }

  await send(kind, data)
  markSent(kind)
  return { simulated: false }
}

export const sendContactMessage = (data, meta) => submit('contact', data, meta)
export const subscribeToNewsletter = (data, meta) => submit('newsletter', data, meta)
