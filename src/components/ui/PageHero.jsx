import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Compact hero used at the top of inner pages. */
export default function PageHero({ eyebrow, title, intro, children }) {
  const reduced = useReducedMotion()
  const anim = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        }

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_0%,rgb(224_64_192/0.16),transparent_70%),radial-gradient(50%_60%_at_90%_10%,rgb(124_58_237/0.2),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:56px_56px] mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div className="container-page">
        {eyebrow && (
          <motion.p {...anim(0)} className="mb-5 text-sm font-medium tracking-[0.2em] text-brand-300 uppercase">
            {eyebrow}
          </motion.p>
        )}
        <motion.h1 {...anim(0.08)} className="text-display max-w-5xl font-bold">
          {title}
        </motion.h1>
        {intro && (
          <motion.p {...anim(0.16)} className="mt-7 max-w-2xl text-lg text-fog-400 sm:text-xl">
            {intro}
          </motion.p>
        )}
        {children && <motion.div {...anim(0.24)}>{children}</motion.div>}
      </div>
    </section>
  )
}
