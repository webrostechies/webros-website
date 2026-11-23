import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', as: H = 'h2', className = '' }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`mb-4 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-300 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-linear-to-r from-brand-400 to-transparent" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <H className="text-headline font-semibold">{title}</H>
      {intro && <p className="mt-5 text-lg text-fog-400">{intro}</p>}
    </Reveal>
  )
}
