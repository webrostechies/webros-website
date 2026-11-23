import { Mail, MessageCircle } from 'lucide-react'
import { getActiveSocials } from '../../data/siteConfig'

// Brand glyphs (Lucide v1 no longer ships brand icons). 24×24, stroke-based.
const svgProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const brandIcons = {
  linkedin: () => (
    <svg {...svgProps}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: () => (
    <svg {...svgProps}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  ),
  github: () => (
    <svg {...svgProps}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  x: () => (
    <svg {...svgProps}>
      <path d="M4 4l11.7 16H20L8.3 4z" />
      <path d="M4 20l6.8-6.8M13.2 10.8L20 4" />
    </svg>
  ),
  whatsapp: () => <MessageCircle size={18} aria-hidden="true" />,
  email: () => <Mail size={18} aria-hidden="true" />,
}

/** Renders only links that have a real destination — never a dead "#". */
export default function SocialLinks({ className = '', links = getActiveSocials() }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {links.map(({ id, label, url }) => {
        const Icon = brandIcons[id]
        const external = /^https?:/.test(url)
        return (
          <li key={id}>
            <a
              href={url}
              aria-label={label}
              title={label}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="grid size-10 place-items-center rounded-full border hairline text-fog-300 transition duration-300 hover:-translate-y-0.5 hover:border-brand-400/40 hover:bg-brand-500/10 hover:text-brand-300"
            >
              {Icon ? <Icon /> : label[0]}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
