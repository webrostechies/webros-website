/**
 * Project visual: shows the real screenshot when `project.image` is set,
 * otherwise a generated browser mockup tinted with the project's accent.
 */
export default function ProjectMockup({ project, className = '' }) {
  const [from, to] = project.accent ?? ['#e040c0', '#7c3aed']

  return (
    <div className={`relative aspect-16/10 overflow-hidden rounded-2xl border hairline bg-ink-950 ${className}`}>
      {project.image ? (
        <img
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top transition duration-700 ease-out-expo group-hover/card:scale-[1.04]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 transition duration-700 ease-out-expo group-hover/card:scale-[1.04]">
          <div
            className="absolute inset-0 opacity-60"
            style={{ background: `radial-gradient(120% 90% at 85% 0%, ${from}55, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${to}55, transparent 60%)` }}
          />
          <div className="absolute inset-x-[8%] top-[14%] bottom-0 rounded-t-xl border border-b-0 border-white/10 bg-ink-900/80 backdrop-blur">
            <div className="flex gap-1 border-b border-white/10 px-3 py-2">
              <span className="size-1.5 rounded-full bg-white/25" />
              <span className="size-1.5 rounded-full bg-white/25" />
              <span className="size-1.5 rounded-full bg-white/25" />
            </div>
            <div className="space-y-3 p-4">
              <div className="h-14 rounded-lg" style={{ background: `linear-gradient(110deg, ${from}, ${to})` }} />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 rounded-md bg-white/6" />
                <div className="h-8 rounded-md bg-white/6" />
                <div className="h-8 rounded-md bg-white/6" />
              </div>
              <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
