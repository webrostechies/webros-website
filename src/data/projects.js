/**
 * Portfolio case studies.
 *
 * Schema
 * ──────
 *  id          unique slug
 *  title       project / client name
 *  client      who it was for
 *  type        'client'   — paid work for a real client
 *              'concept'  — self-initiated demo build (shown with a "Concept" badge)
 *              'in-house' — our own products / this website
 *  year        delivery year
 *  categories  array of service ids: 'websites' | 'ui-ux' | 'web-apps' | 'seo'
 *  summary     one-line description for the card
 *  problem     the challenge the client faced
 *  solution    what we built and how
 *  results     [{ value, label }] — only measured, verifiable numbers
 *  stack       tech tags
 *  liveUrl     public URL (optional)
 *  repoUrl     public repo (optional)
 *  embeddable  true if liveUrl may be shown in an <iframe> live preview
 *  image       imported screenshot (optional) — otherwise a generated mockup is shown
 *  accent      [from, to] hex colours for the generated mockup
 *  featured    show on the home page
 *  draft       true = SAMPLE entry. Rendered ONLY in development (npm run dev)
 *              with a "Sample" badge, and never in a production build.
 *
 * To add real work: copy an entry, set `draft: false`, fill in real data,
 * and drop a screenshot into src/assets/projects/.
 */
export const allProjects = [
  {
    id: 'webros-website',
    title: 'WEBROS Techies — Agency Platform',
    client: 'WEBROS Techies',
    type: 'in-house',
    year: 2026,
    categories: ['websites', 'ui-ux', 'seo'],
    summary:
      'Our own site, rebuilt from a licensed multi-page template into a custom React application.',
    problem:
      'The previous site ran on a third-party HTML template: seven pages with duplicated headers and footers, eight jQuery plugins, leftover placeholder content, broken forms, and licence terms that required a template credit in the footer.',
    solution:
      'A ground-up React + Vite rebuild with an original design system, data-driven content, reusable layout components, Framer Motion interactions, per-route SEO metadata, and a provider-agnostic form pipeline with validation and spam protection.',
    results: [
      { value: '7 → 1', label: 'Duplicated layouts consolidated' },
      { value: '8 → 0', label: 'jQuery plugins removed' },
      { value: '0', label: 'Template licence constraints' },
    ],
    stack: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: '/',
    repoUrl: '',
    embeddable: false,
    accent: ['#e040c0', '#7c3aed'],
    featured: true,
    draft: false,
  },

  // ── SAMPLE ENTRIES (dev only) ─────────────────────────────────────────────
  // Until you have client work to show, turn these into REAL concept builds:
  // build a working demo, deploy it, set liveUrl + draft: false. Keep
  // type: 'concept' so it is honestly labelled on the site.
  {
    id: 'sample-clinic-booking',
    title: 'Sample — Clinic Booking Portal',
    client: 'Replace with client name — or "Concept project"',
    type: 'concept',
    year: 2025,
    categories: ['web-apps', 'ui-ux'],
    summary: 'Online appointment booking with patient reminders and an admin dashboard.',
    problem: 'Describe the client’s problem: e.g. phone-only bookings, double-booked slots, no-shows.',
    solution: 'Describe what you built: booking flow, reminders, staff dashboard, integrations.',
    results: [
      { value: '—', label: 'Add a measured result' },
      { value: '—', label: 'Add a measured result' },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL'],
    liveUrl: '',
    embeddable: false,
    accent: ['#5eead4', '#7c3aed'],
    featured: true,
    draft: true,
  },
  {
    id: 'sample-retail-site',
    title: 'Sample — Retail Brand Website',
    client: 'Replace with client name — or "Concept project"',
    type: 'concept',
    year: 2025,
    categories: ['websites', 'seo'],
    summary: 'A fast, SEO-ready storefront website for a local retail brand.',
    problem: 'Describe the client’s problem.',
    solution: 'Describe what you built.',
    results: [{ value: '—', label: 'Add a measured result' }],
    stack: ['React', 'Tailwind CSS'],
    liveUrl: '',
    embeddable: false,
    accent: ['#f472d0', '#f59e0b'],
    featured: true,
    draft: true,
  },
  {
    id: 'sample-saas-dashboard',
    title: 'Sample — SaaS Analytics Dashboard',
    client: 'Replace with client name — or "Concept project"',
    type: 'concept',
    year: 2024,
    categories: ['ui-ux', 'web-apps'],
    summary: 'Design system and dashboard UI for a data-heavy SaaS product.',
    problem: 'Describe the client’s problem.',
    solution: 'Describe what you built.',
    results: [{ value: '—', label: 'Add a measured result' }],
    stack: ['Figma', 'React'],
    liveUrl: '',
    embeddable: false,
    accent: ['#8b5cf6', '#38bdf8'],
    featured: false,
    draft: true,
  },
  {
    id: 'sample-seo-audit',
    title: 'Sample — Technical SEO Overhaul',
    client: 'Replace with client name — or "Concept project"',
    type: 'concept',
    year: 2024,
    categories: ['seo'],
    summary: 'Core Web Vitals and structured-data fixes for an existing business site.',
    problem: 'Describe the client’s problem.',
    solution: 'Describe what you did.',
    results: [{ value: '—', label: 'Add a measured result' }],
    stack: ['Lighthouse', 'Schema.org', 'Search Console'],
    liveUrl: '',
    embeddable: false,
    accent: ['#22c55e', '#0ea5e9'],
    featured: false,
    draft: true,
  },
]

/** Sample entries never reach production builds. */
export const projects = import.meta.env.DEV
  ? allProjects
  : allProjects.filter((p) => !p.draft)

export const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

/** Badge shown for non-client work, so visitors always know what they're looking at. */
export const projectTypeLabels = {
  concept: 'Concept project',
  'in-house': 'In-house project',
}
