import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Target } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import PageHero from '../components/ui/PageHero'
import CtaBand from '../components/ui/CtaBand'
import { services } from '../data/services'
import { faqs } from '../data/process'

function ServiceSection({ service, index }) {
  const Icon = service.icon
  return (
    <section id={service.id} className="scroll-mt-28 border-t hairline py-20 sm:py-24" aria-labelledby={`${service.id}-title`}>
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-brand-500/25 to-violet-600/25 text-brand-300 ring-1 ring-white/10">
              <Icon size={26} aria-hidden="true" />
            </span>
            <span className="font-mono text-sm text-fog-500">0{index + 1} / 0{services.length}</span>
          </div>
          <h2 id={`${service.id}-title`} className="mt-8 text-headline font-semibold">
            {service.title}
          </h2>
          <p className="mt-4 text-xl text-gradient font-medium">{service.tagline}</p>
          <p className="mt-6 text-lg text-fog-400">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.stack.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <Button to={`/contact?service=${service.id}`} className="mt-8">
            Discuss {service.title.toLowerCase()}
          </Button>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.08}>
            <Card className="p-7 sm:p-8">
              <h3 className="text-lg font-semibold">What you get</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-fog-300">
                    <Check size={18} className="mt-1 shrink-0 text-signal-400" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.14}>
            <Card className="p-7 sm:p-8">
              <h3 className="text-lg font-semibold">The outcome</h3>
              <ul className="mt-5 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-fog-300">
                    <Target size={18} className="mt-1 shrink-0 text-brand-300" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t hairline pt-5 text-sm text-fog-500">
                <span className="font-medium text-fog-300">Ideal for: </span>
                {service.idealFor}
              </p>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section-pad border-t hairline" aria-labelledby="faq-title">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading eyebrow="FAQ" title={<span id="faq-title">Questions we hear a lot.</span>} />
        <ul className="divide-y divide-white/[0.08] border-y hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-medium text-fog-100 transition hover:text-brand-300"
                  >
                    {f.q}
                    <ChevronDown
                      size={20}
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-300' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-fog-400">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Custom websites, UI/UX design, web application development and SEO & performance optimisation from WEBROS Techies, serving India & the UAE."
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything you need to <span className="text-gradient">win online.</span>
          </>
        }
        intro="Four focused disciplines, delivered by one team. Pick what you need — or let us shape the right mix for your goals."
      >
        <nav aria-label="Jump to service" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-2 rounded-full border hairline bg-white/3 px-4 py-2 text-sm text-fog-300 transition hover:border-brand-400/40 hover:text-brand-300"
            >
              <s.icon size={16} aria-hidden="true" />
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} index={i} />
      ))}

      <Faq />
      <CtaBand title="Not sure which service you need?" text="Tell us about your goals and we’ll recommend the right approach — no obligation." />
    </>
  )
}
