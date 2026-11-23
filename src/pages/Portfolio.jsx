import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Plus } from 'lucide-react'
import Seo from '../components/ui/Seo'
import Modal from '../components/ui/Modal'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/ui/ProjectCard'
import ProjectMockup from '../components/graphics/ProjectMockup'
import CtaBand from '../components/ui/CtaBand'
import { projects, projectTypeLabels } from '../data/projects'
import { services, getService } from '../data/services'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Only offer filters that have at least one published project — no empty tabs
const filters = [
  { id: 'all', title: 'All work' },
  ...services
    .filter((s) => projects.some((p) => p.categories.includes(s.id)))
    .map(({ id, title }) => ({ id, title })),
]

function CaseStudy({ project }) {
  const isInternal = project.liveUrl?.startsWith('/')
  return (
    <article className="space-y-8">
      {project.liveUrl && project.embeddable && !isInternal ? (
        <div className="overflow-hidden rounded-2xl border hairline">
          <div className="flex items-center gap-2 border-b hairline bg-ink-950 px-4 py-2 text-xs text-fog-500">
            <span className="size-2 rounded-full bg-signal-400" /> Live preview — {project.liveUrl}
          </div>
          <iframe
            src={project.liveUrl}
            title={`Live preview of ${project.title}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className="aspect-16/10 w-full bg-white"
          />
        </div>
      ) : (
        <ProjectMockup project={project} />
      )}

      <div className="flex flex-wrap gap-2">
        {project.draft && <Badge tone="warn">Sample entry — visible in development only</Badge>}
        {projectTypeLabels[project.type] && <Badge>{projectTypeLabels[project.type]}</Badge>}
        {project.categories.map((c) => (
          <Badge key={c} tone="brand">
            {getService(c)?.title ?? c}
          </Badge>
        ))}
      </div>

      <dl className="grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-fog-500">Client</dt>
          <dd className="mt-1 text-fog-100">{project.client}</dd>
        </div>
        <div>
          <dt className="text-fog-500">Year</dt>
          <dd className="mt-1 text-fog-100">{project.year}</dd>
        </div>
        <div>
          <dt className="text-fog-500">Stack</dt>
          <dd className="mt-1 text-fog-100">{project.stack.join(', ')}</dd>
        </div>
      </dl>

      <div className="grid gap-6 md:grid-cols-2">
        <section>
          <h3 className="text-sm font-semibold tracking-wider text-brand-300 uppercase">The problem</h3>
          <p className="mt-3 text-fog-300">{project.problem}</p>
        </section>
        <section>
          <h3 className="text-sm font-semibold tracking-wider text-brand-300 uppercase">Our solution</h3>
          <p className="mt-3 text-fog-300">{project.solution}</p>
        </section>
      </div>

      {project.results?.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold tracking-wider text-brand-300 uppercase">Results</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {project.results.map((r, i) => (
              <li key={i} className="glass rounded-2xl p-5">
                <p className="font-display text-3xl font-bold text-fog-100">{r.value}</p>
                <p className="mt-1 text-sm text-fog-400">{r.label}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(project.liveUrl || project.repoUrl) && (
        <div className="flex flex-wrap gap-3 border-t hairline pt-6">
          {project.liveUrl &&
            (isInternal ? (
              <Button to={project.liveUrl} size="sm">
                You’re looking at it <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            ) : (
              <Button href={project.liveUrl} size="sm">
                Visit live site <ExternalLink size={16} aria-hidden="true" />
              </Button>
            ))}
          {project.repoUrl && (
            <Button href={project.repoUrl} variant="secondary" size="sm">
              View source <ExternalLink size={16} aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
    </article>
  )
}

export default function Portfolio() {
  const [params, setParams] = useSearchParams()
  const reduced = useReducedMotion()

  // Filter + open project live in the URL, so views are shareable and back-button friendly
  const active = filters.some((f) => f.id === params.get('filter')) ? params.get('filter') : 'all'
  const openProject = projects.find((p) => p.id === params.get('project')) ?? null

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.categories.includes(active))),
    [active],
  )

  const setFilter = (id) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (id === 'all') next.delete('filter')
        else next.set('filter', id)
        return next
      },
      { replace: true, preventScrollReset: true },
    )

  const open = (p) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('project', p.id)
        return next
      },
      { preventScrollReset: true },
    )

  const close = useCallback(
    () =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.delete('project')
          return next
        },
        { preventScrollReset: true },
      ),
    [setParams],
  )

  const countFor = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.categories.includes(id)).length)

  return (
    <>
      <Seo
        title="Work & case studies"
        description="Selected websites, web applications, UI/UX and SEO projects by WEBROS Techies — with the problem, the solution and the results."
      />
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Real builds. <span className="text-gradient">Honest labels.</span>
          </>
        }
        intro="We’re a young studio, so we let the work speak: every project shows the problem, our approach and the result — and is clearly marked as client, concept or in-house work. Open any card to explore."
      />

      <section className="container-page pb-24" aria-label="Projects">
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects by service" className="mb-10 flex flex-wrap gap-2">
            {filters.map((f) => {
              const selected = f.id === active
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="project-grid"
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selected ? 'text-white' : 'text-fog-400 hover:text-fog-100'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-linear-to-r from-brand-500/80 to-violet-600/80"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {f.title}
                  <span className="ml-1.5 text-xs opacity-60">{countFor(f.id)}</span>
                </button>
              )
            })}
          </div>

          <motion.ul id="project-grid" role="tabpanel" layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <motion.li
                  key={p.id}
                  layout={!reduced}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProjectCard project={p} onOpen={open} />
                </motion.li>
              ))}

              <motion.li key="your-project" layout={!reduced} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card className="flex h-full min-h-80 flex-col items-center justify-center border-dashed p-8 text-center">
                  <span className="grid size-14 place-items-center rounded-full border border-dashed border-brand-400/40 text-brand-300">
                    <Plus size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">Your project, next?</h3>
                  <p className="mt-2 max-w-xs text-sm text-fog-400">
                    We take on a handful of projects at a time so each gets founder-level attention.
                  </p>
                  <Button to="/contact" size="sm" className="mt-6">
                    Start a conversation
                  </Button>
                </Card>
              </motion.li>
            </AnimatePresence>
          </motion.ul>

          {visible.length === 0 && (
            <p className="mt-8 text-fog-400" role="status">
              No published case studies in this category yet — check back soon, or ask us about relevant work.
            </p>
          )}
        </LayoutGroup>
      </section>

      <Modal open={Boolean(openProject)} onClose={close} title={openProject?.title ?? ''} size="xl">
        {openProject && <CaseStudy project={openProject} />}
      </Modal>

      <CtaBand />
    </>
  )
}
