import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap'

const variants = {
  primary:
    'bg-linear-to-r from-brand-500 to-violet-600 text-white shadow-[0_8px_30px_-8px_rgb(224_64_192/0.6)] hover:shadow-[0_12px_40px_-6px_rgb(224_64_192/0.75)] hover:-translate-y-0.5',
  secondary: 'glass text-fog-100 hover:bg-white/10 hover:-translate-y-0.5',
  ghost: 'text-fog-100 hover:text-brand-300',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-[0.95rem]',
  lg: 'h-13 px-7 text-base',
}

/**
 * One button for every destination:
 *   <Button to="/contact">     → internal route (React Router Link)
 *   <Button href="https://…">  → external link (new tab)
 *   <Button onClick={…}>       → <button>
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
