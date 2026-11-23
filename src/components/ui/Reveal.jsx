import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Fades + lifts children into view once, when scrolled into the viewport. */
export default function Reveal({ as = 'div', delay = 0, y = 24, className = '', children, ...rest }) {
  const reduced = useReducedMotion()
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
