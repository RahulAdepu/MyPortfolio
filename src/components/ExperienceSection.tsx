import { Briefcase, CheckCircle2, MapPin } from "lucide-react"
import { EXPERIENCES } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 border-b-2 border-ink bg-transparent py-20 transition-colors dark:border-paper/20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6 dark:border-paper/20">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                02
              </span>
              <span>Work History</span>
            </div>
            <h2 className="font-display text-4xl uppercase tracking-tight text-ink dark:text-paper sm:text-6xl">
              Production Track Record
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/60">
            {"{ Roles // Impact // Timeline }"}
          </p>
        </div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={exp.id}
              className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal transition-transform duration-200 hover:-translate-y-0.5 dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-8 lg:p-10"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink/15 pb-6 dark:border-paper/15">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-accent font-mono text-xs font-bold text-ink">
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-display text-xl uppercase tracking-tight text-ink dark:text-paper sm:text-2xl">
                      <Briefcase className="h-5 w-5" />
                      {exp.company}
                    </span>
                    {exp.current && <Badge variant="default">Current Role</Badge>}
                  </div>
                  <h3 className="text-lg font-extrabold text-ink dark:text-paper sm:text-xl">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-col items-start gap-1.5 sm:items-end">
                  <span className="rounded-full border-2 border-ink bg-paper px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-800 dark:text-paper">
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink/65 dark:text-paper/65">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="mt-6 grid gap-3.5 md:grid-cols-2">
                {exp.highlights.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-ink/15 bg-paper/60 p-4 text-sm leading-relaxed text-ink/90 dark:border-paper/15 dark:bg-zinc-950/70 dark:text-paper/85"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 border-t-2 border-dashed border-ink/15 pt-5 dark:border-paper/15">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink bg-white px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-ink transition-colors hover:bg-accent dark:border-paper/25 dark:bg-zinc-950 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
