import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { siteConfig } from '../../data/siteConfig'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

export default function MobileDrawer({ open, onClose }) {
  const closeRef = useRef(null)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-2xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-page flex h-18 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full border hairline text-fog-100"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-center">
            <ul className="space-y-2">
              {siteConfig.nav.map(({ label, to }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `font-display block py-2 text-4xl font-semibold tracking-tight transition-colors ${
                        isActive ? 'text-gradient' : 'text-fog-100 hover:text-brand-300'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-page space-y-6 pb-10">
            <Button to="/contact" onClick={onClose} className="w-full" size="lg">
              Start a project <ArrowUpRight size={18} aria-hidden="true" />
            </Button>
            <SocialLinks />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
