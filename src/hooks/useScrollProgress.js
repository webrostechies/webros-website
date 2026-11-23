import { useScroll, useSpring } from 'framer-motion'

/** Smoothed 0→1 page scroll progress, suitable for a motion `scaleX`. */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll()
  return useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
}
