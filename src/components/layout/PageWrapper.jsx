import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Route-level enter/exit transition. Wraps every page's content. */
export default function PageWrapper({ children }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
