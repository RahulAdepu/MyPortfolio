import { Award, GraduationCap } from "lucide-react"
import { CREDENTIALS } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export function CredentialsSection() {
  const education = CREDENTIALS.filter((c) => c.kind === "education")
  const certs = CREDENTIALS.filter((c) => c.kind === "certification")

  return (
    <section className="relative z-10 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-5 dark:border-paper/20">
          <div>
            <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                04
              </span>
              <span>Credentials</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,7vw,3.25rem)] uppercase leading-[0.98] tracking-tight text-ink dark:text-paper">
              Education &amp; Certs
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/60">
            {"{ Degrees // Cloud Certifications }"}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 rounded-3xl border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7 lg:col-span-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-accent dark:border-accent">
                <GraduationCap className="h-5 w-5 text-ink" />
              </span>
              <h3 className="font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                Education
              </h3>
            </div>
            <div className="space-y-3.5">
              {education.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border-2 border-ink/15 bg-paper/60 p-4 dark:border-paper/15 dark:bg-zinc-950/70"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-ink dark:text-paper sm:text-base">
                      {item.name}
                    </div>
                    <div className="mt-0.5 text-xs font-semibold text-ink/70 dark:text-paper/65">
                      {item.org}
                    </div>
                  </div>
                  <Badge variant="paper" className="shrink-0 font-mono text-[10px]">
                    {item.statusLabel}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7 lg:col-span-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-ink text-paper dark:border-paper/30 dark:bg-paper dark:text-ink">
                <Award className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                Certifications
              </h3>
            </div>
            <div className="space-y-3.5">
              {certs.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink/15 bg-paper/60 p-4 dark:border-paper/15 dark:bg-zinc-950/70"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-extrabold text-ink dark:text-paper">
                      {cert.name}
                    </div>
                    <div className="mt-0.5 text-xs font-medium text-ink/65 dark:text-paper/60">
                      {cert.org}
                    </div>
                  </div>
                  <Badge
                    variant={
                      cert.status === "completed"
                        ? "default"
                        : cert.status === "in-progress"
                          ? "ink"
                          : "muted"
                    }
                    className="shrink-0 text-[10px]"
                  >
                    {cert.statusLabel}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
