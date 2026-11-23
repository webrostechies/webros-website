import { useId } from 'react'

/** WEBROS globe mark + wordmark, drawn in SVG so it stays crisp at any size. */
export default function Logo({ className = '', showText = true }) {
  const gid = useId()
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" className="size-9 shrink-0" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f472d0" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <g fill="none" stroke={`url(#${gid})`} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="20" />
          <ellipse cx="32" cy="32" rx="9" ry="20" />
          <ellipse cx="32" cy="34" rx="29" ry="9" transform="rotate(-14 32 34)" />
          <path d="M19 33l4.5-8 4.5 13 4-15 4.5 13 4-7 4.5 4" />
        </g>
      </svg>
      {showText && (
        <span className="font-display text-lg leading-none font-bold tracking-tight text-fog-100">
          WEBROS<span className="text-gradient"> Techies</span>
        </span>
      )}
    </span>
  )
}
