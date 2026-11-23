/**
 * Surface with a pointer-tracking spotlight glow.
 * Polymorphic: pass `as={Link}` / `as="article"` etc.
 */
export default function Card({ as: Tag = 'div', className = '', children, ...rest }) {
  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <Tag
      onPointerMove={onPointerMove}
      className={`group/card relative overflow-hidden rounded-3xl border hairline bg-ink-900/70 transition-colors duration-500 hover:border-brand-400/30 ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(224 64 192 / 0.12), transparent 60%)',
        }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  )
}
