import { useId } from 'react'

const control =
  'w-full rounded-2xl border bg-ink-950/60 px-4 py-3 text-fog-100 placeholder:text-fog-500 transition outline-none focus:border-brand-400/60 focus:bg-ink-950 focus:ring-4 focus:ring-brand-500/15'

/**
 * Labelled form control with inline error messaging.
 * `as` = 'input' | 'textarea' | 'select'
 */
export default function Field({ label, error, hint, as = 'input', required, className = '', children, ...props }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined
  const Tag = as
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fog-100">
        {label}
        {required && <span className="text-brand-300"> *</span>}
      </label>
      <Tag
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        className={`${control} ${error ? 'border-rose-400/70' : 'hairline'} ${as === 'textarea' ? 'min-h-36 resize-y' : ''}`}
        {...props}
      >
        {children}
      </Tag>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-sm text-fog-500">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
