import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero"
import { InteractiveDotGrid } from "@/components/ui/interactive-dot-grid"
import { Navbar } from "@/components/Navbar"
import { AboutSection } from "@/components/AboutSection"
import { ExperienceSection } from "@/components/ExperienceSection"
import { SkillsSection } from "@/components/SkillsSection"
import { CredentialsAndGame } from "@/components/CredentialsAndGame"
import { ContactSection } from "@/components/ContactSection"
import { NotFoundPage } from "@/components/NotFoundPage"
import { HERO_CONFIG } from "@/data/portfolio"

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/+$/, "") || ""

const HOME_TITLE = "Rahul Adepu | Site Reliability Engineer · DevOps · Cloud · Toronto"
const NOT_FOUND_TITLE = "404 — Page Not Found | Rahul Adepu"

function getInitialDarkMode(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem("ra-theme") === "dark"
  } catch {
    return false
  }
}

function isHomeRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, "") || "/"
  const baseHome = BASE_PATH || "/"
  return clean === baseHome || clean === `${BASE_PATH}/index.html`
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode)
  const [pathname, setPathname] = useState<string>(() =>
    typeof window === "undefined" ? "/" : window.location.pathname,
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    try {
      window.localStorage.setItem("ra-theme", darkMode ? "dark" : "light")
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [darkMode])

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const isHome = isHomeRoute(pathname)

  useEffect(() => {
    document.title = isHome ? HOME_TITLE : NOT_FOUND_TITLE
  }, [isHome])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const navigateTo = (relativePath: string, sectionHash?: string) => {
    const targetPath = `${BASE_PATH}${relativePath}` || "/"
    window.history.pushState({}, "", sectionHash ? `${targetPath}${sectionHash}` : targetPath)
    setPathname(targetPath)
    if (sectionHash) {
      window.requestAnimationFrame(() => {
        document.querySelector(sectionHash)?.scrollIntoView({ behavior: "smooth" })
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
        onNavigateHome={(hash) => navigateTo("/", hash)}
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
      className="relative min-h-screen bg-paper text-ink transition-colors dark:bg-zinc-950 dark:text-paper"
    >
      <a
        href="#about"
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
          minHeight="540px"
          {...HERO_CONFIG}
          {...heroThemeProps}
        />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="absolute bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white/95 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-ink shadow-brutal backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-accent dark:border-paper/30 dark:bg-zinc-900/95 dark:text-paper dark:shadow-brutal-dark dark:hover:bg-accent dark:hover:text-ink"
        >
          {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span>{darkMode ? "Light" : "Dark"}</span>
        </button>
      </div>

      <Navbar darkMode={darkMode} onToggleTheme={toggleTheme} />

      <main className="relative z-10">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <CredentialsAndGame />
      </main>

      <ContactSection />
    </div>
  )
}
