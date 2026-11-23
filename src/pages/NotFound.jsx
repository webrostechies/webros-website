import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Button from '../components/ui/Button'
import HeroBackdrop from '../components/graphics/HeroBackdrop'
import { siteConfig } from '../data/siteConfig'

export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <section className="relative isolate flex min-h-dvh items-center overflow-hidden pt-24 pb-16">
      <Seo title="Page not found" description="The page you were looking for doesn’t exist." noindex />
      <HeroBackdrop />
      <div className="container-page relative text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-gradient text-[clamp(6rem,20vw,14rem)] leading-none font-bold"
          aria-hidden="true"
        >
          404
        </motion.p>
        <h1 className="mt-4 text-headline font-semibold">This page took a wrong turn.</h1>
        <p className="mx-auto mt-4 max-w-md text-fog-400">
          We couldn’t find <code className="rounded bg-white/5 px-1.5 py-0.5 text-sm text-fog-100">{pathname}</code>. It may
          have moved when we rebuilt the site.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/">
            <ArrowLeft size={16} aria-hidden="true" /> Back home
          </Button>
          {siteConfig.nav.slice(1).map((n) => (
            <Button key={n.to} to={n.to} variant="secondary">
              {n.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
