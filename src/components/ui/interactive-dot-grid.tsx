"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface InteractiveDotGridProps {
  /** Spacing between dot centers in pixels */
  gap?: number
  /** Base dot radius in pixels */
  baseRadius?: number
  /** Cursor influence radius in pixels */
  influenceRadius?: number
  /** Dark mode flag for adaptive palette */
  darkMode?: boolean
  /** Optional custom accent color (hex or rgb) */
  accentRgb?: [number, number, number]
  /** Optional className for positioning */
  className?: string
}

interface Dot {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

/**
 * 60fps canvas dot grid that dynamically follows and ripples around cursor movement,
 * with spring physics, emerald proximity bloom, subtle constellation links near pointer,
 * and expanding shockwaves on pointer click.
 */
export function InteractiveDotGrid({
  gap = 28,
  baseRadius = 1.6,
  influenceRadius = 165,
  darkMode = false,
  accentRgb = [95, 181, 122],
  className,
}: InteractiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const darkRef = useRef(darkMode)
  darkRef.current = darkMode

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = mq.matches
    const onMq = () => {
      reducedMotion = mq.matches
    }
    mq.addEventListener("change", onMq)

    let width = 0
    let height = 0
    let dots: Dot[] = []
    const shockwaves: Shockwave[] = []

    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      active: false,
      lastMove: 0,
    }

    const rebuildGrid = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(width / gap) + 1
      const rows = Math.ceil(height / gap) + 1
      const offsetX = (width - (cols - 1) * gap) / 2
      const offsetY = (height - (rows - 1) * gap) / 2

      dots = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * gap
          const oy = offsetY + r * gap
          dots.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0 })
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.tx = e.clientX - rect.left
      pointer.ty = e.clientY - rect.top
      pointer.active = true
      pointer.lastMove = performance.now()
    }

    const onPointerDown = (e: PointerEvent) => {
      if (reducedMotion) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        shockwaves.push({
          x,
          y,
          radius: 8,
          maxRadius: Math.max(240, influenceRadius * 1.9),
          alpha: 0.9,
        })
      }
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const ro = new ResizeObserver(rebuildGrid)
    ro.observe(canvas)
    rebuildGrid()

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)

    let raf = 0
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    const [ar, ag, ab] = accentRgb

    const render = (now: number) => {
      raf = requestAnimationFrame(render)
      if (!visible) return

      ctx.clearRect(0, 0, width, height)

      // Smooth pointer interpolation; gentle autonomous drift when idle
      const idle = !pointer.active || now - pointer.lastMove > 4500
      if (idle && !reducedMotion) {
        const t = now * 0.00055
        pointer.tx = width * (0.5 + Math.sin(t) * 0.28)
        pointer.ty = height * (0.5 + Math.cos(t * 0.78) * 0.24)
      }

      if (pointer.x < -5000) {
        pointer.x = pointer.tx
        pointer.y = pointer.ty
      } else {
        pointer.x += (pointer.tx - pointer.x) * 0.16
        pointer.y += (pointer.ty - pointer.y) * 0.16
      }

      // Advance click shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += 7.5
        sw.alpha = Math.max(0, 1 - sw.radius / sw.maxRadius)
        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1)
        }
      }

      const isDark = darkRef.current
      const baseRgb = isDark ? [243, 243, 240] : [17, 17, 17]
      const baseAlpha = isDark ? 0.14 : 0.16

      // Subtle ambient radial spotlight following the cursor
      if (!reducedMotion && pointer.x > -1000) {
        const grad = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          influenceRadius * 1.45,
        )
        grad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, ${isDark ? 0.14 : 0.12})`)
        grad.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(pointer.x, pointer.y, influenceRadius * 1.45, 0, Math.PI * 2)
        ctx.fill()
      }

      const nearDots: { x: number; y: number; prox: number }[] = []

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        let fx = 0
        let fy = 0
        let prox = 0

        if (!reducedMotion) {
          const dx = pointer.x - d.ox
          const dy = pointer.y - d.oy
          const dist = Math.hypot(dx, dy)

          if (dist < influenceRadius && dist > 0.01) {
            prox = 1 - dist / influenceRadius
            // Elastic magnetic follow (outer ring pulls gently toward cursor, inner core lifts slightly away)
            const pull = prox * (1 - prox * 0.55) * 18
            fx += (dx / dist) * pull
            fy += (dy / dist) * pull
          }

          // Click shockwave impulse
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s]
            const sdx = d.ox - sw.x
            const sdy = d.oy - sw.y
            const sdist = Math.hypot(sdx, sdy)
            const band = Math.abs(sdist - sw.radius)
            if (band < 38 && sdist > 0.01) {
              const wave = (1 - band / 38) * sw.alpha * 16
              fx += (sdx / sdist) * wave
              fy += (sdy / sdist) * wave
              prox = Math.max(prox, (1 - band / 38) * sw.alpha)
            }
          }

          // Spring integration back toward rest + displacement target
          const targetX = d.ox + fx
          const targetY = d.oy + fy
          d.vx = (d.vx + (targetX - d.x) * 0.22) * 0.72
          d.vy = (d.vy + (targetY - d.y) * 0.22) * 0.72
          d.x += d.vx
          d.y += d.vy
        } else {
          d.x = d.ox
          d.y = d.oy
        }

        const r = Math.round(baseRgb[0] + (ar - baseRgb[0]) * prox)
        const g = Math.round(baseRgb[1] + (ag - baseRgb[1]) * prox)
        const b = Math.round(baseRgb[2] + (ab - baseRgb[2]) * prox)
        const alpha = baseAlpha + prox * (isDark ? 0.78 : 0.72)
        const radius = baseRadius + prox * 2.4

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
        ctx.fill()

        if (prox > 0.52 && nearDots.length < 28) {
          nearDots.push({ x: d.x, y: d.y, prox })
        }
      }

      // Delicate magnetic filament lines connecting the closest dots around the cursor
      if (!reducedMotion && nearDots.length > 1) {
        ctx.lineWidth = 0.85
        for (let i = 0; i < nearDots.length; i++) {
          for (let j = i + 1; j < nearDots.length; j++) {
            const a = nearDots[i]
            const b = nearDots[j]
            const dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist < gap * 1.55) {
              const lineAlpha = Math.min(a.prox, b.prox) * (1 - dist / (gap * 1.55)) * 0.45
              ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${lineAlpha.toFixed(3)})`
              ctx.beginPath()
              ctx.moveTo(a.x, a.y)
              ctx.lineTo(b.x, b.y)
              ctx.stroke()
            }
          }
        }
      }
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      mq.removeEventListener("change", onMq)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      document.documentElement.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [gap, baseRadius, influenceRadius, accentRgb])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  )
}
