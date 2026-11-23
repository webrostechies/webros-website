/**
 * Per-founder accent colours (set with `accent` in data/founders.js).
 * Full class strings so Tailwind can find them when scanning the source.
 */
export const founderTones = {
  sky: {
    chip: 'bg-sky-400/10 text-sky-300 ring-sky-400/25',
    ring: 'ring-sky-400/50',
    hoverText: 'group-hover:text-sky-300',
    glow: 'from-sky-500/40',
    badge: 'bg-sky-950/70 text-sky-300 ring-sky-400/40',
  },
  emerald: {
    chip: 'bg-emerald-400/10 text-emerald-300 ring-emerald-400/25',
    ring: 'ring-emerald-400/50',
    hoverText: 'group-hover:text-emerald-300',
    glow: 'from-emerald-500/40',
    badge: 'bg-emerald-950/70 text-emerald-300 ring-emerald-400/40',
  },
  violet: {
    chip: 'bg-violet-400/10 text-violet-300 ring-violet-400/25',
    ring: 'ring-violet-400/50',
    hoverText: 'group-hover:text-violet-300',
    glow: 'from-violet-500/40',
    badge: 'bg-violet-950/70 text-violet-300 ring-violet-400/40',
  },
}

export const toneFor = (founder) => founderTones[founder.accent] ?? founderTones.violet
