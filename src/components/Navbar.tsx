import { useEffect, useRef, useState } from "react"
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
  const [tickerPaused, setTickerPaused] = useState(false)
  const resumeTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

  const pauseBriefly = () => {
    setTickerPaused(true)
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setTickerPaused(false), 3000)
  }

  const handleMobileSelect = (id: SectionId) => {
    pauseBriefly()
    onSelectSection(id)
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

        {/* Desktop Section Tabs */}
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

      {/* Tablet Static Section Bar (640px–1023px: all 6 fit cleanly without scrolling) */}
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

      {/* Mobile-Only Circular News-Ticker Section Bar (< 640px) */}
      <div
        className="relative overflow-hidden border-t border-ink/15 bg-paper/90 py-1.5 dark:border-paper/15 dark:bg-zinc-950/90 sm:hidden"
        onTouchStart={pauseBriefly}
      >
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          aria-label="Portfolio sections"
        >
          <div className="nav-ticker-track" data-paused={tickerPaused ? "true" : "false"}>
            {[0, 1].map((loopIdx) => (
              <div
                key={loopIdx}
                role={loopIdx === 0 ? "tablist" : undefined}
                aria-hidden={loopIdx === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-2 pr-2"
              >
                {NAV_SECTIONS.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <button
                      key={`${loopIdx}-${item.id}`}
                      type="button"
                      role={loopIdx === 0 ? "tab" : undefined}
                      aria-selected={loopIdx === 0 ? isActive : undefined}
                      tabIndex={loopIdx === 1 ? -1 : 0}
                      onClick={() => handleMobileSelect(item.id)}
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
      </div>
    </header>
  )
}
