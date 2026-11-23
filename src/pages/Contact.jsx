import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Clock, LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Card from '../components/ui/Card'
import Field from '../components/ui/Field'
import FileField from '../components/ui/FileField'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import PageHero from '../components/ui/PageHero'
import { services } from '../data/services'
import { siteConfig } from '../data/siteConfig'
import { sendContactMessage, supportsAttachments } from '../services/formService'
import { ATTACHMENT_EXTENSIONS, ATTACHMENT_MAX_MB, validateContact } from '../services/validation'
import { useFormGuard } from '../hooks/useFormGuard'

// Currency-neutral sizes — works for clients in both India and the UAE
const budgets = [
  'Not sure yet',
  'Starter — landing page / small site',
  'Standard — multi-page website',
  'Advanced — site + integrations / e-commerce',
  'Custom — web app or platform',
]

const channels = [
  { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  ...siteConfig.contact.phones.map((p) => ({ icon: Phone, label: `Call · ${p.region}`, value: p.display, href: p.href })),
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message us directly', href: siteConfig.contact.whatsappHref },
  { icon: MapPin, label: 'Serving', value: siteConfig.contact.city },
]

const nextSteps = [
  'We read your message and reply within 2 business days.',
  'A short call to understand your goals and answer your questions.',
  'You receive a written scope, timeline and quote.',
]

function ContactForm() {
  const [params] = useSearchParams()
  const preselected = services.some((s) => s.id === params.get('service')) ? params.get('service') : ''
  const empty = {
    name: '',
    email: '',
    phone: '',
    company: '',
    service: preselected,
    budget: budgets[0],
    message: '',
    attachment: null,
  }

  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')
  const guard = useFormGuard()

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors(validateContact(next))
  }
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validateContact(values))
  }
  // Files are checked as soon as they're picked, so a wrong type or size shows straight away
  const setAttachment = (file) => {
    const next = { ...values, attachment: file }
    setValues(next)
    setTouched((t) => ({ ...t, attachment: true }))
    setErrors(validateContact(next))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    setTouched({ name: true, email: true, phone: true, service: true, message: true, attachment: true })
    if (Object.keys(found).length) {
      // Move focus to the first invalid field
      const first = e.currentTarget.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }

    setStatus('loading')
    setServerError('')
    try {
      const serviceTitle = services.find((s) => s.id === values.service)?.title ?? values.service
      await sendContactMessage(
        {
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          company: values.company.trim(),
          service: serviceTitle,
          budget: values.budget,
          message: values.message.trim(),
          page: window.location.href,
        },
        guard.getMeta(),
        values.attachment,
      )
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setServerError(err.message || 'Something went wrong while sending your message.')
    }
  }

  function reset() {
    setValues(empty)
    setErrors({})
    setTouched({})
    setStatus('idle')
    guard.reset()
  }

  const err = (f) => (touched[f] ? errors[f] : undefined)

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-[32rem] flex-col items-center justify-center p-8 text-center"
          role="status"
        >
          <motion.span
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="grid size-20 place-items-center rounded-full bg-signal-400/15 text-signal-400 ring-1 ring-signal-400/30"
          >
            <CircleCheck size={40} aria-hidden="true" />
          </motion.span>
          <h2 className="mt-8 text-headline font-semibold">Message received!</h2>
          <p className="mt-4 max-w-md text-lg text-fog-400">
            Thanks, {values.name.split(' ')[0]}. We’ll get back to you at <span className="text-fog-100">{values.email}</span>{' '}
            within 2 business days.
          </p>
          <Button variant="secondary" className="mt-8" onClick={reset}>
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
          <div className="sm:col-span-2">
            <h2 className="text-title font-semibold">Tell us about your project</h2>
            <p className="mt-2 text-sm text-fog-500">Fields marked * are required.</p>
          </div>

          <Field label="Your name" required autoComplete="name" value={values.name} onChange={update('name')} onBlur={blur('name')} error={err('name')} />
          <Field
            label="Email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            onBlur={blur('email')}
            error={err('email')}
          />
          <Field label="Phone" type="tel" autoComplete="tel" value={values.phone} onChange={update('phone')} onBlur={blur('phone')} error={err('phone')} hint="Optional — if you prefer a call." />
          <Field label="Company / brand" autoComplete="organization" value={values.company} onChange={update('company')} hint="Optional" />

          <Field as="select" label="What do you need?" required value={values.service} onChange={update('service')} onBlur={blur('service')} error={err('service')}>
            <option value="" disabled>
              Select a service…
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
            <option value="other">Something else / a mix</option>
          </Field>
          <Field as="select" label="Project size" value={values.budget} onChange={update('budget')}>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </Field>

          <Field
            as="textarea"
            label="Project details"
            required
            className="sm:col-span-2"
            placeholder="What are you building, who is it for, and when would you like to launch?"
            value={values.message}
            onChange={update('message')}
            onBlur={blur('message')}
            error={err('message')}
            hint={`${values.message.trim().length}/3000`}
          />

          {supportsAttachments ? (
            <FileField
              className="sm:col-span-2"
              label="Attach a brief or document (optional)"
              hint={`PDF, Word, PowerPoint, Excel, text or image · up to ${ATTACHMENT_MAX_MB} MB`}
              accept={ATTACHMENT_EXTENSIONS.join(',')}
              file={values.attachment}
              onChange={setAttachment}
              error={err('attachment')}
            />
          ) : (
            <p className="-mt-1 text-sm text-fog-500 sm:col-span-2">
              Have a brief, RFP or design file? Email it to{' '}
              <a className="text-fog-300 underline underline-offset-2 hover:text-brand-300" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{' '}
              after sending this form.
            </p>
          )}

          {/* Honeypot */}
          <div className="hp-field" aria-hidden="true">
            <label>
              Leave this field empty
              <input {...guard.honeypotProps} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="flex gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-200 sm:col-span-2"
              >
                <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  {serverError} You can also email us directly at{' '}
                  <a className="font-medium underline underline-offset-2" href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-fog-500">We only use your details to reply to this enquiry.</p>
            <Button type="submit" size="lg" disabled={status === 'loading'} className="w-full sm:w-auto">
              {status === 'loading' ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send message <Send size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Start a project with WEBROS Techies. Tell us about your website, web app, UI/UX or SEO needs — we reply within 2 business days."
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s build something <span className="text-gradient">great together.</span>
          </>
        }
        intro="Share a few details and we’ll come back with ideas, a clear plan and an honest quote."
      />

      <section className="container-page grid gap-8 pb-24 lg:grid-cols-[1fr_1.6fr]" aria-label="Contact options">
        <div className="space-y-4">
          {channels.map(({ icon: Icon, label, value, href }, i) => {
            const inner = (
              <>
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm text-fog-500">{label}</span>
                  <span className="block break-all font-medium text-fog-100">{value}</span>
                </span>
              </>
            )
            const external = href?.startsWith('http')
            return (
              <Reveal key={label} delay={i * 0.06}>
                {href ? (
                  <Card
                    as="a"
                    href={href}
                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="block"
                  >
                    <span className="flex items-center gap-4 p-5">{inner}</span>
                  </Card>
                ) : (
                  <Card>
                    <span className="flex items-center gap-4 p-5">{inner}</span>
                  </Card>
                )}
              </Reveal>
            )
          })}

          <Reveal delay={0.3}>
            <div className="glass rounded-3xl p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Clock size={18} className="text-signal-400" aria-hidden="true" /> What happens next
              </h2>
              <ol className="mt-4 space-y-3">
                {nextSteps.map((s, i) => (
                  <li key={s} className="flex gap-3 text-sm text-fog-400">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/6 font-mono text-xs text-fog-100">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Card className="h-full">
            <ContactForm />
          </Card>
        </Reveal>
      </section>
    </>
  )
}
