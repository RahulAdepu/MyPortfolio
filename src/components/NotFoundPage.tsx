import { useEffect, useRef, useState } from "react"
import {
  Activity,
  ArrowLeft,
  Moon,
  Radio,
  RefreshCw,
  Sun,
  Terminal,
} from "lucide-react"
import { InteractiveDotGrid } from "@/components/ui/interactive-dot-grid"
import { PROFILE } from "@/data/portfolio"

interface NotFoundPageProps {
  pathname: string
  darkMode: boolean
  onToggleTheme: () => void
  onNavigateHome: (sectionHash?: string) => void
}

function buildLogSteps(host: string, pathname: string) {
  return [
    { tag: "OK", color: "text-accent", text: `dns.resolve(${host}) -> 200 healthy` },
    { tag: "OK", color: "text-accent", text: "ingress.healthz -> ready" },
    { tag: "WARN", color: "text-amber-400", text: `router.match("${pathname}") -> 0 routes` },
    { tag: "ERR", color: "text-red-400", text: "status=404 · page not found" },
  ]
}

export function NotFoundPage({
  pathname,
  darkMode,
  onToggleTheme,
  onNavigateHome,
}: NotFoundPageProps) {
  const eyeRef = useRef<HTMLButtonElement>(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [glitch, setGlitch] = useState(false)
  const [visibleLogs, setVisibleLogs] = useState(1)
  const [pings, setPings] = useState(0)

  const host = typeof window !== "undefined" ? window.location.host || "portfolio" : "portfolio"
  const logSteps = buildLogSteps(host, pathname)

  useEffect(() => {
    setVisibleLogs(1)
    const timers = [1, 2, 3].map((idx) =>
      window.setTimeout(() => setVisibleLogs(idx + 1), idx * 380),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [pathname, pings])

  // Cursor-tracking radar eye inside the middle "0" of 404
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = eyeRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const angle = Math.atan2(dy, dx)
      const dist = Math.min(20, Math.hypot(dx, dy) / 14)
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  const triggerGlitch = () => {
    setGlitch(true)
    setPings((p) => p + 1)
    window.setTimeout(() => setGlitch(false), 550)
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper text-ink transition-colors dark:bg-zinc-950 dark:text-paper">
      {/* Live Cursor-Following Animated Dot Grid */}
      <InteractiveDotGrid
        gap={28}
        baseRadius={1.6}
        influenceRadius={175}
        darkMode={darkMode}
        className="fixed inset-0 z-0"
      />

      {/* Top Bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <button
          type="button"
          onClick={() => onNavigateHome()}
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-white/95 py-1 pl-1 pr-3.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-brutal transition-transform hover:-translate-y-0.5 dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:shadow-brutal-dark"
        >
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink">
            RA
          </span>
          <span>{PROFILE.name}</span>
        </button>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-2 rounded-full border-2 border-ink bg-white/90 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900/90 dark:text-paper sm:inline-flex">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
            Incident #404 · SEV-4
          </span>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white/95 text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Center Interactive 404 Stage */}
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 py-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/95 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[2px_2px_0px_#111] dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:shadow-[2px_2px_0px_#5fb57a]">
          <Radio className="h-3.5 w-3.5 animate-pulse text-accent" />
          <span>404 · Page Not Found</span>
        </div>

        {/* Giant 4 [Interactive Cursor-Tracking Radar 0] 4 */}
        <div className="my-4 flex select-none items-center justify-center gap-3 sm:gap-6">
          <span
            className={`font-display text-[6.5rem] leading-none tracking-tighter text-ink transition-transform duration-150 dark:text-paper sm:text-[10rem] md:text-[12rem] ${
              glitch ? "-translate-x-1 -skew-x-6 text-accent" : ""
            }`}
          >
            4
          </span>

          <button
            type="button"
            ref={eyeRef}
            onClick={triggerGlitch}
            aria-label="Ping radar node"
            title="Click to re-run SRE route probe"
            className={`group relative flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-ink bg-white shadow-brutal-lg transition-transform duration-300 hover:scale-105 dark:border-paper dark:bg-zinc-900 dark:shadow-brutal-dark sm:h-40 sm:w-40 md:h-48 md:w-48 ${
              glitch ? "scale-95 border-accent" : ""
            }`}
          >
            {/* Rotating dashed radar ring */}
            <span className="pointer-events-none absolute inset-2.5 animate-[spin_10s_linear_infinite] rounded-full border-2 border-dashed border-accent/80" />
            <span className="pointer-events-none absolute inset-6 rounded-full border border-ink/15 dark:border-paper/15" />

            {/* Crosshair hairlines */}
            <span className="pointer-events-none absolute h-full w-px bg-ink/10 dark:bg-paper/10" />
            <span className="pointer-events-none absolute h-px w-full bg-ink/10 dark:bg-paper/10" />

            {/* Cursor-tracking pupil core */}
            <span
              className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-accent shadow-inner transition-transform duration-75 sm:h-16 sm:w-16"
              style={{
                transform: `translate(${pupil.x.toFixed(1)}px, ${pupil.y.toFixed(1)}px)`,
              }}
            >
              <span className="h-4 w-4 rounded-full bg-ink sm:h-5 sm:w-5" />
              <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-white" />
            </span>
          </button>

          <span
            className={`font-display text-[6.5rem] leading-none tracking-tighter text-ink transition-transform duration-150 dark:text-paper sm:text-[10rem] md:text-[12rem] ${
              glitch ? "translate-x-1 skew-x-6 text-accent" : ""
            }`}
          >
            4
          </span>
        </div>

        <h1 className="font-display text-2xl uppercase tracking-tight text-ink dark:text-paper sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-xl text-sm font-medium text-ink/75 dark:text-paper/70 sm:text-base">
          The route{" "}
          <code className="rounded-md border border-ink/25 bg-white px-2 py-0.5 font-mono text-xs font-bold text-ink dark:border-paper/25 dark:bg-zinc-900 dark:text-accent">
            {pathname}
          </code>{" "}
          doesn&apos;t exist. Jump back to the portfolio below.
        </p>

        <div className="mt-7 w-full max-w-xl rounded-3xl border-2 border-ink bg-ink p-5 text-left text-paper shadow-brutal-accent dark:border-accent/50 dark:bg-zinc-900/95">
          <div className="mb-3 flex items-center justify-between border-b border-paper/15 pb-2.5 font-mono text-[11px] uppercase tracking-wider text-paper/60">
            <span className="inline-flex items-center gap-2 text-accent">
              <Terminal className="h-3.5 w-3.5" />
              route-probe // #{pings + 1}
            </span>
            <button
              type="button"
              onClick={triggerGlitch}
              className="inline-flex items-center gap-1 rounded-full border border-paper/25 px-2.5 py-0.5 text-[10px] font-bold text-paper/80 transition-colors hover:border-accent hover:text-accent"
            >
              <RefreshCw className="h-3 w-3" />
              Re-probe
            </button>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {logSteps.slice(0, visibleLogs).map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className={`shrink-0 font-bold ${step.color}`}>[{step.tag}]</span>
                <span className="text-paper/85">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-accent dark:shadow-[4px_4px_0px_rgba(243,243,240,0.25)] dark:hover:bg-paper dark:hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Rollback to Home
          </button>

          <button
            type="button"
            onClick={() => onNavigateHome("#experience")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/95 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
          >
            Experience
          </button>

          <button
            type="button"
            onClick={() => onNavigateHome("#skills")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/95 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
          >
            Skills
          </button>

          <button
            type="button"
            onClick={() => onNavigateHome("#contact")}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/95 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
          >
            <Activity className="h-3.5 w-3.5 text-accent" />
            Contact
          </button>
        </div>
      </main>

      <footer className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-5 font-mono text-[11px] uppercase tracking-wider text-ink/65 dark:text-paper/55">
        <span>
          © {new Date().getFullYear()} {PROFILE.name} · Toronto, ON
        </span>
        <span>SRE · DevOps · Cloud</span>
      </footer>
    </div>
  )
}
