import { Compass, PenTool, Hammer, Rocket } from 'lucide-react'

/** How a WEBROS engagement runs, start to finish. */
export const processSteps = [
  {
    id: 'discover',
    icon: Compass,
    title: 'Discover',
    summary: 'We learn your business, your users and what success looks like.',
    detail:
      'A focused discovery call and workshop. You leave with a written scope, a fixed quote and a realistic timeline — before you commit to anything.',
  },
  {
    id: 'design',
    icon: PenTool,
    title: 'Design',
    summary: 'Wireframes, then a high-fidelity prototype you can click through.',
    detail:
      'We design the key journeys first, review them with you, and iterate until it feels right. No surprises at build time.',
  },
  {
    id: 'build',
    icon: Hammer,
    title: 'Build',
    summary: 'Clean, tested code with a live preview link from week one.',
    detail:
      'You watch the product come together on a private staging URL and give feedback as we go — not just at the end.',
  },
  {
    id: 'launch',
    icon: Rocket,
    title: 'Launch & grow',
    summary: 'We ship, measure, and keep improving.',
    detail:
      'Launch checklist, performance and SEO verification, analytics, and a handover session. Ongoing support is available whenever you need it.',
  },
]

export const values = [
  {
    title: 'Craft over templates',
    text: 'Every project starts from a blank canvas. Your brand deserves more than a theme with the logo swapped.',
  },
  {
    title: 'Performance is a feature',
    text: 'Speed, accessibility and SEO are built in from the first commit — not bolted on before launch.',
  },
  {
    title: 'Talk to the builders',
    text: 'No account managers in between. You work directly with the founders who design and write your code.',
  },
  {
    title: 'Built to grow',
    text: 'Clean architecture and documented code, so your site or app can evolve without starting over.',
  },
]

export const faqs = [
  {
    q: 'How long does a project take?',
    a: 'It depends on scope. After discovery we give you a written timeline with milestones, and you can follow progress on a live staging link throughout.',
  },
  {
    q: 'How is pricing structured?',
    a: 'Most projects are quoted as a fixed price against an agreed scope, so you know the cost upfront. Ongoing SEO and support can run as a monthly retainer.',
  },
  {
    q: 'Will I be able to update the website myself?',
    a: 'Yes. Where you need to edit content regularly we set up a simple editing workflow or CMS and walk you through it at handover.',
  },
  {
    q: 'Where are your clients based?',
    a: 'We work with businesses across India and the UAE, and collaborate remotely with clients anywhere else — calls, reviews and progress updates all happen online.',
  },
  {
    q: 'Who owns the code and design?',
    a: 'You do. On final payment, full ownership of the design files and source code transfers to you — no template licences, no lock-in.',
  },
]
