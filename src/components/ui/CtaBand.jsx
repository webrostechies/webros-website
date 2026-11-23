import { ArrowUpRight, Mail } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { siteConfig } from '../../data/siteConfig'

export default function CtaBand({
  title = 'Have a project in mind?',
  text = 'Tell us where you want to be. We’ll show you how to get there — with a clear scope, timeline and quote.',
}) {
  return (
    <section className="container-page pb-24" aria-labelledby="cta-title">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] border hairline px-6 py-16 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(80%_120%_at_50%_0%,rgb(224_64_192/0.35),transparent_60%),radial-gradient(60%_100%_at_100%_100%,rgb(124_58_237/0.35),transparent_60%)]"
        />
        <div aria-hidden="true" className="noise absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay" />
        <h2 id="cta-title" className="text-headline mx-auto max-w-3xl font-bold">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-fog-300">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/contact" size="lg">
            Start a project <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
          <Button href={`mailto:${siteConfig.contact.email}`} variant="secondary" size="lg">
            <Mail size={18} aria-hidden="true" /> {siteConfig.contact.email}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
