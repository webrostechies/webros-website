import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import Card from '../components/ui/Card'
import { toneFor } from '../components/ui/founderTones'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionHeading from '../components/ui/SectionHeading'
import SocialLinks from '../components/ui/SocialLinks'
import PageHero from '../components/ui/PageHero'
import FounderPortrait from '../components/ui/FounderPortrait'
import CtaBand from '../components/ui/CtaBand'
import { founders } from '../data/founders'
import { processSteps, values } from '../data/process'

const profileLabels = { linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram', x: 'X (Twitter)' }
const EASE = [0.16, 1, 0.3, 1]

/**
 * Founder card. Motion runs in sequence once the card scrolls into view:
 * card fades up → photo curtain-reveals → role chip pops in → each
 * responsibility slides in with its tick springing up.
 */
function FounderCard({ founder: f, index }) {
  const reduced = useReducedMotion()
  const tone = toneFor(f)
  const start = 0.45 + index * 0.15
  const inView = { once: true, margin: '0px 0px -8% 0px' }
  const profiles = Object.entries(f.links)
    .filter(([, url]) => url)
    .map(([id, url]) => ({ id, url, label: `${f.name} on ${profileLabels[id] ?? id}` }))

  return (
    <Reveal as="li" delay={index * 0.1}>
      <Card as="article" className="h-full">
        <div className="p-3 pb-0">
          <FounderPortrait founder={f} index={index} alt={`Portrait of ${f.name}`} rounded="rounded-2xl" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold">{f.name}</h3>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 8, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={inView}
            transition={{ delay: start, duration: 0.6, ease: EASE }}
            className={`mt-3 inline-block rounded-xl px-3 py-1.5 text-xs leading-snug font-medium ring-1 ${tone.chip}`}
          >
            {f.role}
          </motion.p>
          <p className="mt-4 text-fog-400">{f.bio}</p>

          <h4 className="mt-6 text-xs font-semibold tracking-wider text-fog-500 uppercase">Responsible for</h4>
          <ul className="mt-3 space-y-2.5">
            {f.responsibilities.map((r, j) => (
              <motion.li
                key={r}
                initial={reduced ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={inView}
                transition={{ delay: start + 0.15 + j * 0.07, duration: 0.5, ease: EASE }}
                className="group/item flex items-center gap-3 text-fog-300"
              >
                <motion.span
                  initial={reduced ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={inView}
                  transition={{ type: 'spring', stiffness: 420, damping: 16, delay: start + 0.25 + j * 0.07 }}
                  className={`grid size-5 shrink-0 place-items-center rounded-full ring-1 ${tone.chip}`}
                >
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </motion.span>
                <span className="transition-transform duration-300 ease-out-expo group-hover/item:translate-x-1">{r}</span>
              </motion.li>
            ))}
          </ul>

          {profiles.length > 0 && <SocialLinks className="mt-6" links={profiles} />}
        </div>
      </Card>
    </Reveal>
  )
}

export default function About() {
  return (
    <>
      <Seo
        title="About us"
        description="Meet WEBROS Techies — three founders serving India & the UAE, building custom websites, web apps and UI/UX with craft, speed and honest communication."
      />

      <PageHero
        eyebrow="About WEBROS Techies"
        title={
          <>
            Small team. <span className="text-gradient">Serious craft.</span>
          </>
        }
        intro="WEBROS Techies is a founder-led web studio working with businesses across India and the UAE. We started it for a simple reason: too many businesses were stuck with slow, generic, template-built websites that didn’t reflect how good they actually are."
      />

      {/* Story */}
      <section className="container-page grid gap-12 pb-24 lg:grid-cols-2" aria-labelledby="story-title">
        <Reveal>
          <h2 id="story-title" className="text-headline font-semibold">
            Why we exist
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-lg text-fog-400">
          <p>
            We believe a website should be the hardest-working member of your team — fast, findable, and built
            around the people you want to reach. That means no recycled themes and no one-size-fits-all builders.
          </p>
          <p>
            Every project starts from a blank canvas. We combine thoughtful UI/UX design, modern engineering and
            technical SEO so the finished product doesn’t just look good on launch day — it keeps performing long
            after.
          </p>
          <p>
            Because we are a small, founder-led team, the people you talk to are the people running your project.
            No account managers, no lost-in-translation briefs — just clear communication and work we’re proud to
            sign.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="section-pad border-y hairline bg-ink-900/40" aria-labelledby="values-title">
        <div className="container-page">
          <SectionHeading eyebrow="What we stand for" title={<span id="values-title">Principles we don’t compromise on.</span>} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <Card className="h-full p-8">
                  <Sparkles size={22} className="text-brand-300" aria-hidden="true" />
                  <h3 className="mt-5 text-title font-semibold">{v.title}</h3>
                  <p className="mt-3 text-fog-400">{v.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="section-pad scroll-mt-24" aria-labelledby="team-title">
        <div className="container-page">
          <SectionHeading
            eyebrow="The founders"
            title={<span id="team-title">Three founders, three clear roles.</span>}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {founders.map((f, i) => (
              <FounderCard key={f.id} founder={f} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-pad border-t hairline" aria-labelledby="workflow-title">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading
            eyebrow="Our workflow"
            title={<span id="workflow-title">How a project with us actually runs.</span>}
            intro="Transparent at every step. You’ll always know what we’re working on, what’s next, and what it costs."
          />
          <ol className="space-y-4">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.08}>
                <Card className="flex gap-5 p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-300 ring-1 ring-brand-400/20">
                    <s.icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">
                      <span className="mr-2 font-mono text-sm text-fog-500">0{i + 1}</span>
                      {s.title}
                    </h3>
                    <p className="mt-1 text-fog-400">{s.detail}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Let’s build something you’re proud of." />
    </>
  )
}
