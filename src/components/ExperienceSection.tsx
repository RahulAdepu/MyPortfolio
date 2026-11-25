import { Briefcase, CheckCircle2, MapPin } from "lucide-react"
import { EXPERIENCES } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export function ExperienceSection() {
  return (
    <section className="relative z-10 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5 dark:border-paper/20">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                02
              </span>
              <span>Work History</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,7vw,3.25rem)] uppercase leading-[0.98] tracking-tight text-ink dark:text-paper">
              Production Track Record
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/60">
            {"{ Roles // Impact // Timeline }"}
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, index) => (
            <article
              key={exp.id}
              className="min-w-0 rounded-3xl border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink/15 pb-5 dark:border-paper/15">
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-accent font-mono text-[11px] font-bold text-ink">
                      0{index + 1}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-display text-lg uppercase tracking-tight text-ink dark:text-paper sm:text-2xl">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                      {exp.company}
                    </span>
                    {exp.current && <Badge variant="default">Current</Badge>}
                  </div>
                  <h3 className="text-base font-extrabold text-ink dark:text-paper sm:text-lg">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <span className="rounded-full border-2 border-ink bg-paper px-3 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-800 dark:text-paper">
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-ink/65 dark:text-paper/65">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="mt-5 grid gap-x-6 gap-y-3 md:grid-cols-2">
                {exp.highlights.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/85 dark:text-paper/80"
                  >
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-dashed border-ink/15 pt-4 dark:border-paper/15">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/40 bg-paper/70 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-ink dark:border-paper/25 dark:bg-zinc-950 dark:text-paper"
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
