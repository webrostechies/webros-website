/**
 * Global site configuration — single source of truth for brand,
 * contact details, navigation and social profiles.
 */

const phoneE164 = '+919633727753'

export const siteConfig = {
  name: 'WEBROS Techies',
  shortName: 'WEBROS',
  tagline: 'We don’t just code, we create experiences.',
  description:
    'WEBROS Techies is a founder-led web agency serving clients across India & the UAE. We design and engineer fast, custom websites, web applications and UI/UX — built to perform and rank.',
  // Used for canonical + og:url. Falls back to the current origin at runtime.
  url: import.meta.env.VITE_SITE_URL || '',
  ogImage: '/og-image.jpg',
  locale: 'en_IN',

  contact: {
    email: 'webrostechies365@gmail.com',
    phoneDisplay: '+91 96337 27753',
    phoneHref: `tel:${phoneE164}`,
    whatsappHref: `https://wa.me/${phoneE164.replace('+', '')}`,
    city: 'India & UAE',
    responseTime: 'We reply within one business day.',
  },

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Work', to: '/portfolio' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],

  /**
   * Social profiles. Leave `url` empty to hide an icon — no dead "#" links
   * ever ship. Add your real profile URLs here when ready.
   */
  social: [
    { id: 'linkedin', label: 'LinkedIn', url: '' },
    { id: 'instagram', label: 'Instagram', url: '' },
    { id: 'github', label: 'GitHub', url: '' },
    { id: 'x', label: 'X (Twitter)', url: '' },
  ],
}

/** Social links that actually have a destination, plus always-real contact channels. */
export function getActiveSocials() {
  return [
    ...siteConfig.social.filter((s) => Boolean(s.url)),
    { id: 'whatsapp', label: 'WhatsApp', url: siteConfig.contact.whatsappHref },
    { id: 'email', label: 'Email', url: `mailto:${siteConfig.contact.email}` },
  ]
}
