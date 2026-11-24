import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react"
import { PROFILE } from "@/data/portfolio"

const NAV_LINKS = [
  { id: "about", index: "01", label: "About" },
  { id: "experience", index: "02", label: "Experience" },
  { id: "skills", index: "03", label: "Skills" },
  { id: "credentials", index: "04", label: "Credentials" },
  { id: "simulation", index: "05", label: "Game" },
  { id: "contact", index: "06", label: "Contact" },
]

interface NavbarProps {
  darkMode: boolean
  onToggleTheme: () => void
}

export function Navbar({ darkMode, onToggleTheme }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>("about")

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-y-2 border-ink bg-paper/95 backdrop-blur-sm transition-colors dark:border-paper/20 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5 dark:border-paper/30 dark:bg-zinc-900 dark:text-paper"
        >
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-ink">
            RA
          </span>
          <span>{PROFILE.name}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`group inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
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
                  {link.index}
                </span>
                <span>{link.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden shrink-0 items-center gap-1 whitespace-nowrap rounded-full border-2 border-ink bg-accent px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_#111] transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-accent dark:shadow-[2px_2px_0px_rgba(243,243,240,0.3)] dark:hover:bg-paper dark:hover:text-ink md:inline-flex"
          >
            Hire Me
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper px-4 py-4 dark:border-paper/20 dark:bg-zinc-950 lg:hidden">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl border-2 border-ink px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider dark:border-paper/25 ${
                  activeId === link.id
                    ? "bg-ink text-paper dark:bg-paper dark:text-ink"
                    : "bg-white text-ink dark:bg-zinc-900 dark:text-paper"
                }`}
              >
                <span>{link.label}</span>
                <span className="font-mono text-[11px] opacity-70">{link.index}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
