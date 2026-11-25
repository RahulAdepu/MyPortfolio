import { useEffect, useRef, useState } from "react"
import { Github, Linkedin, Mail, QrCode } from "lucide-react"
import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero"
import { InteractiveDotGrid } from "@/components/ui/interactive-dot-grid"
import { Navbar, NAV_SECTIONS, type SectionId } from "@/components/Navbar"
import { OverviewSection } from "@/components/OverviewSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { CredentialsSection } from "@/components/CredentialsSection"
import { GameSection } from "@/components/GameSection"
import { ContactSection } from "@/components/ContactSection"
import { NotFoundPage } from "@/components/NotFoundPage"
import { HERO_CONFIG, PROFILE } from "@/data/portfolio"

const RAW_BASE = import.meta.env.BASE_URL
const HOME_TITLE = "Rahul Adepu | Site Reliability Engineer · DevOps · Cloud · Toronto"
const NOT_FOUND_TITLE = "404 — Page Not Found | Rahul Adepu"

const VALID_SECTIONS = new Set<SectionId>(NAV_SECTIONS.map((s) => s.id))

function parseHashSection(hash: string): SectionId | null {
  const clean = hash.replace(/^#/, "").toLowerCase()
  if (clean === "about") return "overview"
  if (clean === "simulation") return "game"
  return VALID_SECTIONS.has(clean as SectionId) ? (clean as SectionId) : null
}

function getHomeBasePath(): string {
  if (RAW_BASE.startsWith("/")) {
    return RAW_BASE.replace(/\/+$/, "")
  }
  if (typeof window !== "undefined" && window.location.hostname.endsWith(".github.io")) {
    const segments = window.location.pathname.split("/").filter(Boolean)
    if (
      segments.length >= 1 &&
      segments[0] !== "index.html" &&
      segments[0] !== "404" &&
      segments[0] !== "404.html"
    ) {
      return `/${segments[0]}`
    }
  }
  return ""
}

const BASE_PATH = getHomeBasePath()

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem("ra-theme") === "dark"
  } catch {
    return false
  }
}

function isHomeRoute(pathname: string, forcedNotFound: boolean): boolean {
  if (forcedNotFound) return false
  const clean = pathname.replace(/\/+$/, "") || "/"
  const baseHome = BASE_PATH || "/"
  return clean === baseHome || clean === `${BASE_PATH}/index.html`
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode)
  const [forcedNotFound, setForcedNotFound] = useState<boolean>(() =>
    typeof window !== "undefined" ? Boolean(window.__IS_404_PAGE__) : false,
  )
  const [pathname, setPathname] = useState<string>(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  )
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    if (typeof window === "undefined") return "overview"
    return parseHashSection(window.location.hash) ?? "overview"
  })
  const workspaceRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    try {
      window.localStorage.setItem("ra-theme", darkMode ? "dark" : "light")
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [darkMode])

  useEffect(() => {
    const onPopState = () => {
      setForcedNotFound(false)
      setPathname(window.location.pathname)
      const fromHash = parseHashSection(window.location.hash)
      if (fromHash) setActiveSection(fromHash)
    }
    const onHashChange = () => {
      const fromHash = parseHashSection(window.location.hash)
      if (fromHash) {
        setActiveSection(fromHash)
        workspaceRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    }
    window.addEventListener("popstate", onPopState)
    window.addEventListener("hashchange", onHashChange)
    return () => {
      window.removeEventListener("popstate", onPopState)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  const isHome = isHomeRoute(pathname, forcedNotFound)

  useEffect(() => {
    document.title = isHome ? HOME_TITLE : NOT_FOUND_TITLE
  }, [isHome])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const selectSection = (section: SectionId, scroll = true) => {
    setActiveSection(section)
    const targetUrl = `${BASE_PATH || ""}/#${section}`.replace("//#", "/#")
    window.history.replaceState({}, "", targetUrl)
    if (scroll) {
      window.requestAnimationFrame(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    }
  }

  const goTop = () => {
    setActiveSection("overview")
    window.history.replaceState({}, "", `${BASE_PATH || ""}/`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const navigateHomeFrom404 = (sectionHash?: string) => {
    const section = sectionHash ? parseHashSection(sectionHash) : "overview"
    const nextSection = section ?? "overview"
    const targetPath = `${BASE_PATH}/`
    setForcedNotFound(false)
    setActiveSection(nextSection)
    window.history.pushState({}, "", sectionHash ? `${targetPath}#${nextSection}` : targetPath)
    setPathname(targetPath)
    if (sectionHash) {
      window.requestAnimationFrame(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth" })
      })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!isHome) {
    return (
      <NotFoundPage
        pathname={pathname}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onNavigateHome={navigateHomeFrom404}
      />
    )
  }

  const heroThemeProps = darkMode
    ? {
        paper: "#0b0b0e",
        ink: "#f3f3f0",
        surface: "#18181d",
        beanie: "#24242b",
        shirt: "#202027",
      }
    : {
        paper: "#ebebea",
        ink: "#111111",
        surface: "#ffffff",
      }

  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col overflow-x-clip bg-paper text-ink transition-colors dark:bg-zinc-950 dark:text-paper"
    >
      <a
        href="#workspace"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border-2 focus:border-ink focus:bg-accent focus:px-4 focus:py-2 focus:text-xs focus:font-extrabold focus:uppercase focus:tracking-wider focus:text-ink"
      >
        Skip to content
      </a>

      {/* Single seamless cursor-reactive dotted grid across all sections */}
      <InteractiveDotGrid
        darkMode={darkMode}
        gap={28}
        baseRadius={1.6}
        influenceRadius={175}
        className="fixed inset-0 z-0"
      />

      <div className="relative z-10">
        <MascotPortfolioHero
          height="100svh"
          minHeight="480px"
          className="hero-fit"
          {...HERO_CONFIG}
          {...heroThemeProps}
        />
      </div>

      <div ref={workspaceRef} id="workspace" className="scroll-mt-0" />

      {/* Sticky Navigation Header — sits below hero and pins to top on scroll */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={(sec) => selectSection(sec)}
        onGoTop={goTop}
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="relative z-10 flex-1" role="tabpanel" aria-label={activeSection}>
        {activeSection === "overview" && (
          <OverviewSection onSelectSection={(sec) => selectSection(sec)} />
        )}
        {activeSection === "experience" && <ExperienceSection />}
        {activeSection === "skills" && <SkillsSection />}
        {activeSection === "credentials" && <CredentialsSection />}
        {activeSection === "game" && <GameSection />}
        {activeSection === "contact" && <ContactSection />}
      </main>

      <footer className="relative z-10 border-t-2 border-ink/15 bg-paper/90 backdrop-blur-sm dark:border-paper/15 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/65 sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} {PROFILE.name} · Toronto, ON
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1 hover:text-ink dark:hover:text-paper"
            >
              <Mail className="h-3.5 w-3.5 text-accent" />
              Email
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink dark:hover:text-paper"
            >
              <Linkedin className="h-3.5 w-3.5 text-accent" />
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink dark:hover:text-paper"
            >
              <Github className="h-3.5 w-3.5 text-accent" />
              GitHub
            </a>
            <button
              type="button"
              onClick={() => selectSection("contact")}
              className="inline-flex items-center gap-1 rounded-full border border-ink/30 bg-white px-2.5 py-0.5 text-[11px] font-bold text-ink hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
            >
              <QrCode className="h-3 w-3" />
              QR
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
