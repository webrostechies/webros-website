import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CircleCheck, LoaderCircle } from 'lucide-react'
import { subscribeToNewsletter } from '../../services/formService'
import { validateNewsletter } from '../../services/validation'
import { useFormGuard } from '../../hooks/useFormGuard'

/** Validated newsletter signup with idle → loading → success / error states. */
export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')
  const guard = useFormGuard()

  async function onSubmit(e) {
    e.preventDefault()
    const errors = validateNewsletter({ email })
    if (errors.email) {
      setStatus('error')
      setMessage(errors.email)
      return
    }
    setStatus('loading')
    setMessage('')
    try {
      await subscribeToNewsletter({ email: email.trim() }, guard.getMeta())
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  const isError = status === 'error'

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'success' ? (
        <motion.p
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex items-start gap-2 rounded-2xl border border-signal-400/30 bg-signal-400/10 px-4 py-3 text-sm text-signal-400"
          role="status"
        >
          <CircleCheck size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          You’re on the list. Thanks for subscribing!
        </motion.p>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="relative">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (isError) setStatus('idle')
              }}
              aria-invalid={isError}
              aria-describedby="newsletter-msg"
              className={`h-12 w-full rounded-full border bg-ink-950/60 pr-14 pl-5 text-fog-100 placeholder:text-fog-500 outline-none transition focus:border-brand-400/60 focus:ring-4 focus:ring-brand-500/15 ${isError ? 'border-rose-400/70' : 'hairline'}`}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label={status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              className="absolute top-1 right-1 grid size-10 place-items-center rounded-full bg-linear-to-r from-brand-500 to-violet-600 text-white transition hover:brightness-110 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                <ArrowRight size={18} aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Honeypot — invisible to people, tempting to bots */}
          <div className="hp-field" aria-hidden="true">
            <label>
              Leave this field empty
              <input {...guard.honeypotProps} type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <p
            id="newsletter-msg"
            className={`mt-2 min-h-5 text-sm ${isError ? 'text-rose-300' : 'text-fog-500'}`}
            role={isError ? 'alert' : undefined}
          >
            {isError ? message : 'One useful email a month. No spam, unsubscribe anytime.'}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
