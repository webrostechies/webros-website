import { useEffect, useRef, useState } from 'react'

/**
 * Spam protection for a form:
 *  - a honeypot field (spread `honeypotProps` on a hidden input)
 *  - the time the form was first shown (bots submit instantly)
 * Pass `getMeta()` to the form service when submitting.
 */
export function useFormGuard() {
  const startedAt = useRef(0)
  const [honeypot, setHoneypot] = useState('')

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  return {
    honeypotProps: { value: honeypot, onChange: (e) => setHoneypot(e.target.value) },
    getMeta: () => ({ honeypot, startedAt: startedAt.current }),
    reset: () => {
      startedAt.current = Date.now()
      setHoneypot('')
    },
  }
}
