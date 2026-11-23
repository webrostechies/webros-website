import { Sparkles } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import SectionHeading from '../components/ui/SectionHeading'
import SocialLinks from '../components/ui/SocialLinks'
import PageHero from '../components/ui/PageHero'
import CtaBand from '../components/ui/CtaBand'
import { founders } from '../data/founders'
import { processSteps, values } from '../data/process'

const profileLabels = { linkedin: 'LinkedIn', github: 'GitHub', instagram: 'Instagram', x: 'X (Twitter)' }

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
            Because we are a small, founder-led team, you work directly with the people writing your code. No
            account managers, no lost-in-translation briefs — just clear communication and work we’re proud to
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
            title={<span id="team-title">The people behind every pixel and every line of code.</span>}
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {founders.map((f, i) => {
              const profiles = Object.entries(f.links)
                .filter(([, url]) => url)
                .map(([id, url]) => ({ id, url, label: `${f.name} on ${profileLabels[id] ?? id}` }))
              return (
                <Reveal as="li" key={f.id} delay={i * 0.1}>
                  <Card as="article" className="h-full">
                    <div className="overflow-hidden">
                      <img
                        src={f.photo}
                        alt={`Portrait of ${f.name}`}
                        width="720"
                        height="900"
                        loading="lazy"
                        decoding="async"
                        className="aspect-4/5 w-full object-cover transition duration-700 ease-out-expo group-hover/card:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold">{f.name}</h3>
                      <p className="text-sm text-brand-300">{f.role}</p>
                      <p className="mt-4 text-fog-400">{f.bio}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {f.focus.map((x) => (
                          <Badge key={x}>{x}</Badge>
                        ))}
                      </div>
                      {profiles.length > 0 && <SocialLinks className="mt-5" links={profiles} />}
                    </div>
                  </Card>
                </Reveal>
              )
            })}
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
