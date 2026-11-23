import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { CircleCheck, Gauge, Sparkles } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Layered, floating UI composition: a browser window being "built",
 * a code card and a performance-budget card. Tilts toward the pointer
 * with spring physics; each layer moves at its own depth (parallax).
 */
export default function DeviceShowcase() {
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  // Parallax layers — each moves further the "closer" it is to the viewer
  const back = { x: useTransform(sx, [-0.5, 0.5], [-10, 10]), y: useTransform(sy, [-0.5, 0.5], [-10, 10]) }
  const mid = { x: useTransform(sx, [-0.5, 0.5], [-22, 22]), y: useTransform(sy, [-0.5, 0.5], [-22, 22]) }
  const front = { x: useTransform(sx, [-0.5, 0.5], [-36, 36]), y: useTransform(sy, [-0.5, 0.5], [-36, 36]) }

  function onPointerMove(e) {
    if (reduced) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  function reset() {
    mx.set(0)
    my.set(0)
  }

  const float = (delay) =>
    reduced ? {} : { animate: { y: [0, -10, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay } }

  return (
    <div
      className="relative mx-auto aspect-5/4 w-full max-w-xl [perspective:1200px]"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      aria-hidden="true"
    >
      <motion.div className="relative size-full transform-3d" style={{ rotateX, rotateY }}>
        {/* Browser window */}
        <motion.div style={back} className="absolute inset-x-[4%] top-[8%] bottom-[10%]">
          <motion.div {...float(0)} className="glass size-full overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgb(124_58_237/0.55)]">
            <div className="flex items-center gap-1.5 border-b hairline px-4 py-3">
              <span className="size-2.5 rounded-full bg-rose-400/80" />
              <span className="size-2.5 rounded-full bg-amber-300/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 h-5 flex-1 rounded-full bg-white/5 px-3 text-[10px] leading-5 text-fog-500">
                yourbrand.com
              </span>
            </div>
            <div className="space-y-4 p-5">
              <div className="h-28 rounded-xl bg-linear-to-br from-brand-500/50 via-violet-600/40 to-transparent p-4">
                <div className="h-3 w-2/5 rounded-full bg-white/70" />
                <div className="mt-2 h-3 w-3/5 rounded-full bg-white/40" />
                <div className="mt-5 h-6 w-24 rounded-full bg-white/90" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-16 rounded-lg border hairline bg-white/4"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
                  />
                ))}
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-white/10" />
                <div className="h-2 w-4/5 rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Code card */}
        <motion.div style={mid} className="absolute -left-[2%] bottom-[2%] w-[52%] sm:-left-[6%]">
          <motion.div {...float(1.2)} className="rounded-2xl border hairline bg-ink-900/90 p-4 font-mono text-[11px] leading-relaxed shadow-2xl backdrop-blur sm:text-xs">
            <p>
              <span className="text-violet-400">export</span> <span className="text-brand-300">function</span>{' '}
              <span className="text-signal-400">Hero</span>() {'{'}
            </p>
            <p className="pl-3">
              <span className="text-brand-300">return</span> &lt;<span className="text-signal-400">Experience</span>
            </p>
            <p className="pl-6 text-fog-400">
              fast <span className="text-fog-500">=</span>
              {'{'}<span className="text-amber-300">true</span>
              {'}'}
            </p>
            <p className="pl-6 text-fog-400">
              memorable <span className="text-fog-500">/&gt;</span>
            </p>
            <p>{'}'}</p>
          </motion.div>
        </motion.div>

        {/* Performance card */}
        <motion.div style={front} className="absolute top-[0%] -right-[2%] w-[44%] sm:-right-[6%]">
          <motion.div {...float(0.6)} className="rounded-2xl border hairline bg-ink-900/90 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-2 text-xs font-medium text-fog-300">
              <Gauge size={14} className="text-signal-400" /> Performance budget
            </div>
            <div className="mt-3 flex items-end gap-3">
              <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="4" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#5eead4"
                  strokeWidth="4"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: reduced ? 2 : 100 }}
                  animate={{ strokeDashoffset: 2 }}
                  transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <ul className="space-y-1 text-[11px] text-fog-400">
                <li className="flex items-center gap-1.5">
                  <CircleCheck size={12} className="text-signal-400" /> LCP target
                </li>
                <li className="flex items-center gap-1.5">
                  <CircleCheck size={12} className="text-signal-400" /> A11y AA
                </li>
                <li className="flex items-center gap-1.5">
                  <CircleCheck size={12} className="text-signal-400" /> SEO ready
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Sparkle chip */}
        <motion.div style={front} className="absolute bottom-[18%] -right-[1%]">
          <motion.div
            {...float(2)}
            className="flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/15 px-3 py-1.5 text-xs font-medium text-brand-300 backdrop-blur"
          >
            <Sparkles size={14} /> Custom, not template
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
