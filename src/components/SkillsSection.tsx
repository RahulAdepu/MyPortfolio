import { useState } from "react"
import { Activity, Cloud, Container, GitBranch } from "lucide-react"
import { SKILL_CATEGORIES } from "@/data/portfolio"

const ICONS: Record<string, typeof Cloud> = {
  cloud: Cloud,
  containers: Container,
  cicd: GitBranch,
  observability: Activity,
}

export function SkillsSection() {
  const [selected, setSelected] = useState<string>("all")

  const visibleCategories =
    selected === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selected)

  return (
    <section
      id="skills"
      className="relative z-10 border-b-2 border-ink bg-transparent py-20 transition-colors dark:border-paper/20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6 dark:border-paper/20">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                03
              </span>
              <span>Technical Stack</span>
            </div>
            <h2 className="font-display text-4xl uppercase tracking-tight text-ink dark:text-paper sm:text-6xl">
              Tools &amp; Capabilities
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-ink/80 dark:text-paper/75">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-ink bg-accent dark:border-paper/40" />
              Strong — production systems
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-ink bg-ink dark:border-paper/40 dark:bg-paper" />
              Comfortable — independent
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelected("all")}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all dark:border-paper/30 ${
              selected === "all"
                ? "bg-ink text-paper shadow-[2px_2px_0px_#5fb57a] dark:bg-paper dark:text-ink"
                : "bg-white text-ink hover:bg-accent dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
            }`}
          >
            All Domains (16)
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelected(cat.id)}
              className={`rounded-full border-2 border-ink px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-all dark:border-paper/30 ${
                selected === cat.id
                  ? "bg-ink text-paper shadow-[2px_2px_0px_#5fb57a] dark:bg-paper dark:text-ink"
                  : "bg-white text-ink hover:bg-accent dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {visibleCategories.map((category) => {
            const Icon = ICONS[category.id] ?? Cloud
            return (
              <div
                key={category.id}
                className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7"
              >
                <div className="mb-6 flex items-start justify-between gap-4 border-b-2 border-ink/15 pb-4 dark:border-paper/15">
                  <div>
                    <h3 className="font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-ink/70 dark:text-paper/65">
                      {category.description}
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-accent dark:border-accent">
                    <Icon className="h-5 w-5 text-ink" />
                  </span>
                </div>

                <div className="space-y-4">
                  {category.items.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-paper font-mono text-[10px] font-bold text-ink dark:border-paper/30 dark:bg-zinc-800 dark:text-paper">
                            {skill.code}
                          </span>
                          <span className="text-sm font-bold text-ink dark:text-paper">
                            {skill.name}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/65 dark:text-paper/60">
                          {skill.level} · {skill.percent}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full border border-ink bg-paper dark:border-paper/30 dark:bg-zinc-800">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            skill.level === "strong" ? "bg-accent" : "bg-ink dark:bg-paper"
                          }`}
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
