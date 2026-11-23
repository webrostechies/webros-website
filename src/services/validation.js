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

  return errors
}

export function validateNewsletter({ email }) {
  if (!email?.trim()) return { email: 'Enter your email address.' }
  if (!isEmail(email)) return { email: 'That email doesn’t look quite right.' }
  return {}
}
