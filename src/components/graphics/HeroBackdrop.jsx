import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Interactive dot-grid "signal field".
 * - Dots swell and glow toward the brand gradient near the pointer.
 * - A slow sine wave ripples through the grid (echoing the logo's waveform).
 * - Pauses when off-screen or the tab is hidden; renders one static frame
 *   for users who prefer reduced motion. DPR capped at 2 for performance.
 */
export default function HeroBackdrop({ className = '' }) {
  const canvasRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dots = []
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const GAP = 28
    const RADIUS = 180

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) dots.push({ x, y })
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height)
      pointer.x += (pointer.tx - pointer.x) * 0.12
      pointer.y += (pointer.ty - pointer.y) * 0.12

      for (const d of dots) {
        const wave = reduced ? 0 : Math.sin(d.x * 0.012 + t * 0.0012) * Math.cos(d.y * 0.01 + t * 0.0008)
        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const dist = Math.hypot(dx, dy)
        const near = Math.max(0, 1 - dist / RADIUS)
        const ease = near * near

        // Pull dots slightly toward the pointer for a lensing effect
        const px = d.x - dx * ease * 0.18
        const py = d.y - dy * ease * 0.18 + wave * 3

        const r = 0.9 + ease * 2.4 + (wave + 1) * 0.25
        const alpha = 0.12 + ease * 0.75 + (wave + 1) * 0.05
        // Blend from violet → magenta as dots get closer to the pointer
        const red = Math.round(139 + (224 - 139) * ease)
        const green = Math.round(92 + (64 - 92) * ease)
        const blue = Math.round(246 + (192 - 246) * ease)
        ctx.fillStyle = `rgba(${red},${green},${blue},${alpha})`
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop(t) {
      if (visible && !document.hidden) draw(t)
      raf = requestAnimationFrame(loop)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      if (reduced) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
        draw(0)
      }
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    // The backdrop is pointer-events:none so it never blocks UI; track the
    // pointer at window level instead (far-away pointers simply have no effect).
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    if (reduced) draw(0)
    else raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [reduced])

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Drifting gradient light */}
      <div className="absolute -top-1/3 -left-1/4 size-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgb(224_64_192/0.22),transparent_60%)] blur-3xl" />
      <div className="absolute -right-1/4 -bottom-1/2 size-[70vmax] animate-drift rounded-full bg-[radial-gradient(circle,rgb(124_58_237/0.28),transparent_60%)] blur-3xl [animation-delay:-9s]" />
      <canvas ref={canvasRef} className="absolute inset-0 size-full mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}
