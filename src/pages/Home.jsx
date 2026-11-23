import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import HeroBackdrop from '../components/graphics/HeroBackdrop'
import DeviceShowcase from '../components/graphics/DeviceShowcase'
import ProjectCard from '../components/ui/ProjectCard'
import CtaBand from '../components/ui/CtaBand'
import { services } from '../data/services'
import { metrics } from '../data/metrics'
import { processSteps } from '../data/process'
import { founders } from '../data/founders'
import { featuredProjects } from '../data/projects'
import { siteConfig } from '../data/siteConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'

const capabilities = [
  'React',
  'Node.js',
  'Vite',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Figma',
  'REST APIs',
  'PostgreSQL',
  'Core Web Vitals',
  'Technical SEO',
  'Accessibility',
]

function Hero() {
  const reduced = useReducedMotion()
  const words = ['We', 'don’t', 'just', 'code,']
  const item = (i) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        }

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 lg:min-h-[min(100dvh,56rem)] lg:pb-28" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p
            {...item(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border hairline bg-white/4 px-4 py-1.5 text-sm text-fog-300 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-signal-400" />
            </span>
            Taking on new projects · <MapPin size={14} aria-hidden="true" /> India &amp; UAE
          </motion.p>

          <h1 id="hero-title" className="text-display font-bold">
            {words.map((w, i) => (
              <motion.span key={w} {...item(i + 1)} className="mr-[0.25em] inline-block">
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span {...item(5)} className="text-gradient inline-block">
              we create experiences.
            </motion.span>
          </h1>

          <motion.p {...item(7)} className="mt-7 max-w-xl text-lg text-fog-400 sm:text-xl">
            Your website is the first impression of your brand. We design and engineer custom websites, web apps
            and interfaces that load fast, rank well and make it unforgettable.
          </motion.p>

          <motion.div {...item(8)} className="mt-10 flex flex-wrap gap-3">
            <Button to="/contact" size="lg">
              Start a project
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              See our work
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <DeviceShowcase />
        </motion.div>
      </div>
    </section>
  )
}

function Marquee() {
  const row = [...capabilities, ...capabilities]
  return (
    <section aria-label="Technologies we work with" className="border-y hairline bg-ink-900/40 py-6">
      <div className="flex overflow-hidden mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex shrink-0 animate-marquee items-center gap-12 pr-12 hover:paused">
          {row.map((c, i) => (
            <li key={i} aria-hidden={i >= capabilities.length} className="font-display text-lg whitespace-nowrap text-fog-500">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="section-pad" aria-labelledby="services-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="What we do"
            title={<span id="services-title">Four disciplines. One team that owns the outcome.</span>}
            intro="Strategy, design, engineering and growth under one roof — so nothing gets lost between hand-offs."
          />
          <Reveal>
            <Button to="/services" variant="secondary">
              All services <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <Card as={Link} to={`/services#${s.id}`} className="block h-full p-8">
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-brand-500/25 to-violet-600/25 text-brand-300 ring-1 ring-white/10">
                    <s.icon size={26} aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-fog-500 transition duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:text-brand-300"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-8 text-title font-semibold">{s.title}</h3>
                <p className="mt-3 text-fog-400">{s.short}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MetricsBand() {
  return (
    <section aria-label="WEBROS Techies in numbers" className="container-page">
      <Reveal className="glass grid grid-cols-2 gap-y-10 rounded-3xl px-6 py-12 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={m.id} className={`text-center ${i > 0 ? 'lg:border-l hairline' : ''}`}>
            <p className="font-display text-5xl font-bold text-fog-100 sm:text-6xl">
              <AnimatedCounter value={m.value} suffix={m.suffix} />
            </p>
            <p className="mt-2 text-sm text-fog-400">{m.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Process() {
  return (
    <section className="section-pad" aria-labelledby="process-title">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title={<span id="process-title">A clear process, from first call to launch day.</span>}
          align="center"
        />
        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute top-7 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-brand-500/40 to-transparent lg:block"
          />
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.id} delay={i * 0.1} className="relative">
              <span className="relative z-10 grid size-14 place-items-center rounded-2xl border hairline bg-ink-900 text-brand-300">
                <step.icon size={24} aria-hidden="true" />
              </span>
              <p className="mt-6 font-mono text-xs tracking-widest text-fog-500">0{i + 1}</p>
              <h3 className="mt-1 text-title font-semibold">{step.title}</h3>
              <p className="mt-2 text-fog-400">{step.summary}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function FeaturedWork() {
  if (!featuredProjects.length) return null
  return (
    <section className="section-pad pt-0" aria-labelledby="work-title">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Selected work" title={<span id="work-title">Built by us, end to end.</span>} />
          <Reveal>
            <Button to="/portfolio" variant="secondary">
              View all work <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} to={`/portfolio?project=${p.id}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FoundersStrip() {
  return (
    <section className="section-pad pt-0" aria-labelledby="team-title">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading
            eyebrow="Nice to meet you"
            title={<span id="team-title">Three founders. Zero middlemen.</span>}
            intro="When you work with WEBROS, you talk directly to the people designing and building your product."
          />
          <Reveal className="mt-8">
            <Button to="/about" variant="secondary">
              Meet the team <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <ul className="grid grid-cols-3 gap-3 sm:gap-5">
          {founders.map((f, i) => (
            <Reveal as="li" key={f.id} delay={i * 0.1} className={i === 1 ? 'mt-10' : ''}>
              <Link to="/about#team" className="group block">
                <div className="overflow-hidden rounded-2xl border hairline sm:rounded-3xl">
                  <img
                    src={f.photo}
                    alt={`${f.name}, ${f.role}`}
                    width="720"
                    height="900"
                    loading="lazy"
                    decoding="async"
                    className="aspect-4/5 w-full object-cover grayscale-[35%] transition duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-fog-100 sm:text-base">{f.name}</p>
                <p className="text-xs text-fog-500 sm:text-sm">{f.role}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo description={siteConfig.description} />
      <Hero />
      <Marquee />
      <ServicesPreview />
      <MetricsBand />
      <Process />
      <FeaturedWork />
      <FoundersStrip />
      <CtaBand />
    </>
  )
}
