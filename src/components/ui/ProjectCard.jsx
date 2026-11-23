import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import ProjectMockup from '../graphics/ProjectMockup'
import { getService } from '../../data/services'
import { projectTypeLabels } from '../../data/projects'

/**
 * Portfolio card. Pass `to` to render as a link (home page), or `onOpen`
 * to render as a button that opens the case-study modal (portfolio page).
 */
export default function ProjectCard({ project, to, onOpen }) {
  const interactive = to
    ? { as: Link, to }
    : { as: 'button', type: 'button', onClick: () => onOpen?.(project), 'aria-haspopup': 'dialog' }

  return (
    <Card {...interactive} className="block h-full w-full text-left">
      <div className="p-3">
        <ProjectMockup project={project} />
      </div>
      <div className="px-6 pt-3 pb-7">
        <div className="flex flex-wrap gap-2">
          {project.draft && <Badge tone="warn">Sample · dev only</Badge>}
          {projectTypeLabels[project.type] && <Badge tone="brand">{projectTypeLabels[project.type]}</Badge>}
          {project.categories.map((c) => (
            <Badge key={c}>{getService(c)?.title ?? c}</Badge>
          ))}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0 text-fog-500 transition duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 group-hover/card:text-brand-300"
            aria-hidden="true"
          />
        </div>
        <p className="mt-2 text-sm text-fog-400">{project.summary}</p>
        <p className="mt-4 font-mono text-xs text-fog-500">
          {project.stack.slice(0, 4).join(' · ')} — {project.year}
        </p>
      </div>
    </Card>
  )
}
