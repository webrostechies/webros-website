import { CodeXml, PenTool, LayoutDashboard, Gauge } from 'lucide-react'

/**
 * The four core services. `id` doubles as the anchor on /services
 * (e.g. /services#web-apps) and as the Portfolio filter key.
 */
export const services = [
  {
    id: 'websites',
    icon: CodeXml,
    title: 'Custom Websites',
    short: 'Hand-built marketing sites and brand experiences — no page builders, no templates.',
    tagline: 'Your website is the first impression of your brand. We make it unforgettable.',
    description:
      'We design and engineer every site from a blank canvas around your goals, your audience and your content. The result is a fast, accessible, easy-to-update website that looks like nobody else’s and turns visitors into enquiries.',
    deliverables: [
      'Custom visual design & interaction system',
      'Responsive, mobile-first front-end build',
      'Content structure & conversion-focused copy layout',
      'CMS or data-file content editing where needed',
      'Analytics, forms & integrations wired up',
      'Launch, hosting setup & handover',
    ],
    outcomes: [
      'A brand presence that is 100% yours — no licence strings attached',
      'Fast pages that hold attention and convert',
      'A codebase your team can grow without a rebuild',
    ],
    stack: ['React', 'Vite', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    idealFor: 'Startups, studios, clinics, local businesses and personal brands.',
  },
  {
    id: 'ui-ux',
    icon: PenTool,
    title: 'UI/UX Design',
    short: 'Research-led interfaces that feel obvious to use and are a pleasure to come back to.',
    tagline: 'Design that removes friction — and adds delight.',
    description:
      'We map how your users think, then design flows and interfaces that get them to their goal with the fewest decisions possible. Every screen is prototyped and tested before a line of production code is written.',
    deliverables: [
      'User journeys & information architecture',
      'Wireframes and clickable prototypes',
      'High-fidelity UI in Figma',
      'Reusable design system & component library',
      'Accessibility review (WCAG 2.2 AA)',
      'Developer-ready specs & motion guidelines',
    ],
    outcomes: [
      'Fewer drop-offs in sign-up, checkout and booking flows',
      'A consistent product that is faster to extend',
      'Design decisions backed by user evidence, not opinion',
    ],
    stack: ['Figma', 'Prototyping', 'Design Systems', 'Usability Testing'],
    idealFor: 'New products, redesigns and teams scaling an existing interface.',
  },
  {
    id: 'web-apps',
    icon: LayoutDashboard,
    title: 'Web Applications',
    short: 'Secure, scalable portals, dashboards, booking systems and internal tools.',
    tagline: 'Software that fits the way your business actually works.',
    description:
      'From customer portals and booking engines to CRMs and admin dashboards, we build web applications that automate the busywork. Clean architecture, typed APIs and solid testing keep them reliable as you grow.',
    deliverables: [
      'Technical discovery & architecture plan',
      'Front-end application (React)',
      'Back-end APIs & database design (Node.js)',
      'Authentication, roles & permissions',
      'Third-party integrations (payments, email, CRM)',
      'Automated tests, CI/CD & monitoring',
    ],
    outcomes: [
      'Hours of manual work replaced by reliable automation',
      'One source of truth for your data',
      'A secure platform that scales with demand',
    ],
    stack: ['React', 'Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'],
    idealFor: 'Businesses outgrowing spreadsheets and off-the-shelf tools.',
  },
  {
    id: 'seo',
    icon: Gauge,
    title: 'SEO & Performance',
    short: 'Technical SEO and Core Web Vitals tuning that lift visibility and speed.',
    tagline: 'Be found first. Load instantly.',
    description:
      'We audit and fix the technical foundations search engines care about — speed, structure, metadata and crawlability — then measure the impact. Faster sites rank better and convert more.',
    deliverables: [
      'Technical SEO & Core Web Vitals audit',
      'Metadata, Open Graph & structured data (JSON-LD)',
      'Image, font & JavaScript performance optimisation',
      'Sitemap, robots and indexing setup',
      'Google Search Console & Analytics configuration',
      'Monthly reporting (optional retainer)',
    ],
    outcomes: [
      'Better rankings for the searches that matter to you',
      'Lower bounce rates from faster load times',
      'Clear reporting on what changed and why',
    ],
    stack: ['Lighthouse', 'Core Web Vitals', 'Schema.org', 'Search Console'],
    idealFor: 'Any existing site that is slow, invisible on Google, or both.',
  },
]

export const getService = (id) => services.find((s) => s.id === id)
