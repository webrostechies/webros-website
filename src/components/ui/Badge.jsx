const tones = {
  neutral: 'border-white/10 bg-white/4 text-fog-300',
  brand: 'border-brand-400/30 bg-brand-500/10 text-brand-300',
  warn: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
}

export default function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
