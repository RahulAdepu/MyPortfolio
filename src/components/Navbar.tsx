import { useEffect, useRef } from "react"
import { ArrowUpRight, Moon, Sun } from "lucide-react"
import { PROFILE } from "@/data/portfolio"

export type SectionId =
  | "overview"
  | "experience"
  | "skills"
  | "credentials"
  | "game"
  | "contact"

export const NAV_SECTIONS: ReadonlyArray<{
  id: SectionId
  index: string
  label: string
}> = [
  { id: "overview", index: "01", label: "Overview" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "skills", index: "03", label: "Skills" },
  { id: "credentials", index: "04", label: "Credentials" },
  { id: "game", index: "05", label: "Game" },
  { id: "contact", index: "06", label: "Contact" },
]

const AUTO_CYCLE_MS = 7000
const CYCLE_PX_PER_SEC = 52

interface NavbarProps {
  activeSection: SectionId
  onSelectSection: (section: SectionId) => void
  onGoTop: () => void
  darkMode: boolean
  onToggleTheme: () => void
}

export function Navbar({
  activeSection,
  onSelectSection,
  onGoTop,
  darkMode,
  onToggleTheme,
}: NavbarProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const hoveredRef = useRef(false)
  const autoStoppedRef = useRef(false)
  const posRef = useRef(0)
  const programmaticRef = useRef(false)

  // Auto-cycle the mobile (< 640px) circular ring for 7 seconds, then hand off cleanly to manual circular scroll
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const mobileMq = window.matchMedia("(max-width: 639px)")
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)")

    // Start in the middle copy of the 3-copy ring so users can manually scroll infinitely left OR right
    const initMiddle = () => {
      const third = el.scrollWidth / 3
      if (third > 0 && el.scrollLeft === 0) {
        posRef.current = third
        programmaticRef.current = true
        el.scrollLeft = third
        programmaticRef.current = false
      }
    }
    initMiddle()

    if (!mobileMq.matches || reducedMq.matches) {
      autoStoppedRef.current = true
      return
    }

    autoStoppedRef.current = false
    let elapsedMs = 0
    let prev = performance.now()
    let raf = 0
    let inView = true

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      prev = performance.now()
    })
    io.observe(el)

    const step = (now: number) => {
      if (autoStoppedRef.current || !mobileMq.matches || reducedMq.matches) return
      const dtMs = Math.min(50, now - prev)
      prev = now

      if (inView && !hoveredRef.current && !document.hidden) {
        elapsedMs += dtMs
        if (elapsedMs >= AUTO_CYCLE_MS) {
          autoStoppedRef.current = true
          return
        }

        const third = el.scrollWidth / 3
        if (third > 0) {
          let next = posRef.current + (CYCLE_PX_PER_SEC * dtMs) / 1000
          if (next >= third * 2) next -= third
          posRef.current = next
          programmaticRef.current = true
          el.scrollLeft = next
          programmaticRef.current = false
        }
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  // Keep manual horizontal scrolling infinitely circular in BOTH directions (3-copy middle-band wrap)
  const handleRingScroll = () => {
    const el = scrollerRef.current
    if (!el || programmaticRef.current) return

    const third = el.scrollWidth / 3
    if (third <= 0) return

    if (el.scrollLeft >= third * 1.65) {
      programmaticRef.current = true
      el.scrollLeft -= third
      programmaticRef.current = false
    } else if (el.scrollLeft <= third * 0.35) {
      programmaticRef.current = true
      el.scrollLeft += third
      programmaticRef.current = false
    }
    posRef.current = el.scrollLeft
  }

  const pauseAutoCycle = () => {
    autoStoppedRef.current = true
  }

  return (
    <header className="sticky top-0 z-40 border-y-2 border-ink bg-paper/95 backdrop-blur-md transition-colors dark:border-paper/20 dark:bg-zinc-950/95">
      {/* Main Top Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onGoTop}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 dark:border-paper/30 dark:bg-zinc-900 dark:text-paper"
        >
          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[11px] font-bold text-ink">
            RA
          </span>
          <span>{PROFILE.name}</span>
        </button>

        {/* Desktop Section Tabs (>= 1024px) */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          role="tablist"
          aria-label="Portfolio sections"
        >
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSection(item.id)}
                className={`group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                    : "text-ink hover:bg-ink hover:text-paper dark:text-paper/85 dark:hover:bg-paper dark:hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-[10px] ${
                    isActive
                      ? "text-accent dark:text-ink/70"
                      : "text-ink/50 group-hover:text-accent dark:text-paper/50 dark:group-hover:text-ink/70"
                  }`}
                >
                  {item.index}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => onSelectSection("contact")}
            className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border-2 border-ink bg-accent px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_#111] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-accent dark:shadow-[2px_2px_0px_rgba(243,243,240,0.3)] dark:hover:bg-paper dark:hover:text-ink"
          >
            Hire Me
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Tablet Static Section Bar (640px–1023px) */}
      <div className="hidden border-t border-ink/15 bg-paper/90 px-4 py-1.5 dark:border-paper/15 dark:bg-zinc-950/90 sm:block lg:hidden">
        <nav
          role="tablist"
          aria-label="Portfolio sections"
          className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-1.5"
        >
          {NAV_SECTIONS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={`tablet-${item.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectSection(item.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink"
                    : "border-ink/25 bg-white text-ink hover:border-ink dark:border-paper/25 dark:bg-zinc-900 dark:text-paper"
                }`}
              >
                <span
                  className={`font-mono text-[9px] ${
                    isActive ? "text-accent dark:text-ink/70" : "opacity-60"
                  }`}
                >
                  {item.index}
                </span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile-Only Circular Section Ring (< 640px): auto-cycles 7s, pauses on hover/touch, manually scrollable in a circle */}
      <div className="relative border-t border-ink/15 bg-paper/90 py-1.5 dark:border-paper/15 dark:bg-zinc-950/90 sm:hidden">
        <div
          ref={scrollerRef}
          onScroll={handleRingScroll}
          onMouseEnter={() => {
            hoveredRef.current = true
          }}
          onMouseLeave={() => {
            hoveredRef.current = false
          }}
          onTouchStart={pauseAutoCycle}
          onPointerDown={pauseAutoCycle}
          onWheel={pauseAutoCycle}
          className="no-scrollbar flex overflow-x-auto touch-pan-x [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          aria-label="Portfolio sections"
        >
          {[0, 1, 2].map((loopIdx) => (
            <div
              key={loopIdx}
              role={loopIdx === 1 ? "tablist" : undefined}
              aria-hidden={loopIdx !== 1 ? "true" : undefined}
              className="flex shrink-0 items-center gap-2 px-1"
            >
              {NAV_SECTIONS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <button
                    key={`${loopIdx}-${item.id}`}
                    type="button"
                    role={loopIdx === 1 ? "tab" : undefined}
                    aria-selected={loopIdx === 1 ? isActive : undefined}
                    tabIndex={loopIdx !== 1 ? -1 : 0}
                    onClick={() => {
                      pauseAutoCycle()
                      onSelectSection(item.id)
                    }}
                    className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink"
                        : "border-ink/25 bg-white text-ink hover:border-ink dark:border-paper/25 dark:bg-zinc-900 dark:text-paper"
                    }`}
                  >
                    <span
                      className={`font-mono text-[9px] ${
                        isActive ? "text-accent dark:text-ink/70" : "opacity-60"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                  </button>
                )
              })}
              <span
                aria-hidden="true"
                className="mx-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}
