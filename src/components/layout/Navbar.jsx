import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Menu } from 'lucide-react'
import Logo from '../ui/Logo'
import Button from '../ui/Button'
import MobileDrawer from './MobileDrawer'
import { siteConfig } from '../../data/siteConfig'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerPath, setDrawerPath] = useState(null)
  const { pathname } = useLocation()
  const progress = useScrollProgress()

  // Close the drawer whenever the route changes (derived, no effect needed)
  const isDrawerOpen = drawerOpen && drawerPath === pathname

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out-expo ${
          scrolled ? 'border-b hairline bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-18 items-center justify-between gap-6">
          <Link to="/" aria-label={`${siteConfig.name} — home`} className="shrink-0">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'text-white' : 'text-fog-400 hover:text-fog-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-white/7 ring-1 ring-white/10"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button to="/contact" size="sm">
                Start a project
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Button>
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border hairline text-fog-100 md:hidden"
              aria-label="Open menu"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => {
                setDrawerPath(pathname)
                setDrawerOpen(true)
              }}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        className="h-0.5 origin-left bg-linear-to-r from-brand-400 via-brand-500 to-violet-500"
        style={{ scaleX: progress }}
      />

      <MobileDrawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  )
}
