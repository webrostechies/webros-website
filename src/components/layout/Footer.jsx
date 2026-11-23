import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import SocialLinks from '../ui/SocialLinks'
import NewsletterForm from '../ui/NewsletterForm'
import { siteConfig } from '../../data/siteConfig'
import { services } from '../../data/services'

export default function Footer() {
  const year = new Date().getFullYear()
  const { contact } = siteConfig

  return (
    <footer className="relative mt-auto border-t hairline bg-ink-900/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-500/60 to-transparent"
      />
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-fog-400">
            A founder-led studio crafting fast, custom websites, web apps and interfaces — built to perform and
            built to last.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer — pages" className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-fog-100 uppercase">Explore</h2>
          <ul className="space-y-2.5">
            {siteConfig.nav.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-fog-400 transition hover:text-brand-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — services" className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-fog-100 uppercase">Services</h2>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="text-fog-400 transition hover:text-brand-300">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-2 lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold tracking-wider text-fog-100 uppercase">Newsletter</h2>
          <p className="mb-4 text-sm text-fog-400">
            Practical notes on web performance, design and SEO — straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t hairline">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-fog-500 md:flex-row md:items-center md:justify-between">
          <address className="flex flex-wrap gap-x-6 gap-y-2 not-italic">
            <span className="inline-flex items-center gap-2">
              <MapPin size={14} aria-hidden="true" /> {contact.city}
            </span>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 hover:text-brand-300">
              <Mail size={14} aria-hidden="true" /> {contact.email}
            </a>
            {contact.phones.map((p) => (
              <a key={p.id} href={p.href} className="inline-flex items-center gap-2 hover:text-brand-300">
                <Phone size={14} aria-hidden="true" />
                <span>
                  <span className="sr-only">{p.region}: </span>
                  {p.display}
                </span>
              </a>
            ))}
          </address>
          <div className="flex items-center gap-4">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0 })}
              className="grid size-9 place-items-center rounded-full border hairline text-fog-300 transition hover:-translate-y-0.5 hover:text-brand-300"
              aria-label="Back to top"
            >
              <ArrowUp size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
