const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const isEmail = (value) => EMAIL_RE.test(String(value).trim())

/** Contact form rules. Returns { field: message } for every invalid field. */
export function validateContact(values) {
  const errors = {}
  const name = values.name?.trim() ?? ''
  const message = values.message?.trim() ?? ''

  if (name.length < 2) errors.name = 'Please tell us your name.'
  else if (name.length > 80) errors.name = 'That name is a little long — 80 characters max.'

  if (!values.email?.trim()) errors.email = 'We need an email to reply to.'
  else if (!isEmail(values.email)) errors.email = 'That email doesn’t look quite right.'

  if (values.phone && !/^[+\d][\d\s()-]{6,19}$/.test(values.phone.trim()))
    errors.phone = 'Use digits, spaces, + or - only.'

  if (!values.service) errors.service = 'Pick the closest match — we’ll refine it together.'

  if (message.length < 20) errors.message = 'A couple of sentences (20+ characters) helps us prepare.'
  else if (message.length > 3000) errors.message = 'Please keep it under 3000 characters.'

  const fileError = validateAttachment(values.attachment)
  if (fileError) errors.attachment = fileError

  return errors
}

// ── Contact form attachment ──────────────────────────────────────────────────
export const ATTACHMENT_MAX_MB = 5
export const ATTACHMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', '.png', '.jpg', '.jpeg']

/** Returns an error message, or undefined when the file is fine (or absent). */
export function validateAttachment(file) {
  if (!file) return undefined
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!ATTACHMENT_EXTENSIONS.includes(ext))
    return 'Please attach a PDF, Word, PowerPoint, Excel, text or image file.'
  if (file.size > ATTACHMENT_MAX_MB * 1024 * 1024)
    return `That file is over ${ATTACHMENT_MAX_MB} MB. Attach a smaller version, or email it to us after sending.`
  if (file.size === 0) return 'That file looks empty. Try attaching it again.'
  return undefined
}

export function validateNewsletter({ email }) {
  if (!email?.trim()) return { email: 'Enter your email address.' }
  if (!isEmail(email)) return { email: 'That email doesn’t look quite right.' }
  return {}
}
