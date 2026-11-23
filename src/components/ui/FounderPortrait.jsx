import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE = [0.16, 1, 0.3, 1]
const SPRING = { stiffness: 200, damping: 20, mass: 0.6 }

/**
 * Founder photo with:
 * - a curtain reveal on scroll (clip-path wipes up while the photo settles from a zoom)
 * - mouse-follow 3D tilt with a soft light glare (`tilt`)
 * - greyscale → full colour on hover
 * - an optional focus-area overlay that slides up on hover (`overlay`)
 * Touch devices skip the tilt; reduced-motion users get a static photo.
 */
export default function FounderPortrait({ founder, index = 0, tilt = true, overlay = false, alt, rounded = 'rounded-2xl sm:rounded-3xl' }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), SPRING)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), SPRING)
  const gx = useTransform(mx, (v) => `${v * 100}%`)
  const gy = useTransform(my, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.22), transparent 55%)`
  const canTilt = tilt && !reduced

  function onPointerMove(e) {
    if (!canTilt || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  function onPointerLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  const delay = 0.1 + index * 0.15

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={canTilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`group/portrait relative isolate overflow-hidden border hairline ${rounded}`}
    >
      <motion.div
        initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        <motion.img
          src={founder.photo}
          alt={alt ?? `${founder.name}, ${founder.role}`}
          width="720"
          height="900"
          loading="lazy"
          decoding="async"
          initial={reduced ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.6, delay, ease: EASE }}
          className="aspect-4/5 w-full object-cover grayscale-[35%] transition-[filter] duration-700 group-hover/portrait:grayscale-0"
        />
      </motion.div>

      {canTilt && (
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover/portrait:opacity-100"
        />
      )}

      {/* Brand-tinted edge light that fades in on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${rounded} opacity-0 ring-1 ring-brand-400/40 ring-inset transition-opacity duration-500 group-hover/portrait:opacity-100`}
      />

      {overlay && founder.focus?.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full bg-linear-to-t from-ink-950/95 via-ink-950/70 to-transparent px-3 pt-10 pb-3 transition-transform duration-500 ease-out-expo group-hover/portrait:translate-y-0 sm:block">
          <ul className="flex flex-wrap gap-1.5">
            {founder.focus.map((f) => (
              <li key={f} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-fog-100 backdrop-blur">
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
