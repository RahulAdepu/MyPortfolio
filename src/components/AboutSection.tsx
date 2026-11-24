import { MapPin, Phone, ShieldCheck, Terminal } from "lucide-react"
import { PROFILE } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-16 border-b-2 border-ink bg-transparent py-20 transition-colors dark:border-paper/20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6 dark:border-paper/20">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                01
              </span>
              <span>Profile &amp; Impact</span>
            </div>
            <h2 className="font-display text-4xl uppercase tracking-tight text-ink dark:text-paper sm:text-6xl">
              Reliability by Design
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/60">
            {"{ SRE // DevOps // Cloud Engineering }"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Editorial Bio + Identity Dossier */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-8">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge variant="default">Production SRE</Badge>
                <Badge variant="ink">Regulated Finance</Badge>
                <Badge variant="paper">AWS &amp; Kubernetes</Badge>
              </div>
              <p className="text-base font-semibold leading-relaxed text-ink dark:text-paper sm:text-lg">
                {PROFILE.summary}
              </p>
              <div className="mt-6 space-y-4 border-t-2 border-dashed border-ink/20 pt-6 text-sm leading-relaxed text-ink/80 dark:border-paper/20 dark:text-paper/75 sm:text-base">
                {PROFILE.aboutParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Identity Strip */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-4 dark:border-paper/25 dark:bg-zinc-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-accent dark:border-accent">
                  <MapPin className="h-5 w-5 text-ink" />
                </span>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 dark:text-paper/55">
                    Location
                  </div>
                  <div className="text-sm font-extrabold text-ink dark:text-paper">Toronto, ON</div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-4 dark:border-paper/25 dark:bg-zinc-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-white dark:border-paper/30 dark:bg-zinc-800">
                  <Terminal className="h-5 w-5 text-ink dark:text-paper" />
                </span>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 dark:text-paper/55">
                    Handle
                  </div>
                  <div className="font-mono text-sm font-bold text-ink dark:text-paper">
                    {PROFILE.handle}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-4 dark:border-paper/25 dark:bg-zinc-900">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-ink text-paper dark:border-paper/30 dark:bg-paper dark:text-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/60 dark:text-paper/55">
                    Direct
                  </div>
                  <a
                    href={PROFILE.phoneHref}
                    className="font-mono text-sm font-bold text-ink hover:underline dark:text-paper"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Impact Metrics Grid */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {PROFILE.metrics.map((metric, idx) => (
                <div
                  key={metric.unit}
                  className={`group flex flex-col justify-between rounded-3xl border-2 border-ink p-6 shadow-brutal transition-transform duration-200 hover:-translate-y-1 dark:border-paper/25 dark:shadow-brutal-dark ${
                    idx === 1
                      ? "bg-accent text-ink"
                      : idx === 3
                        ? "bg-ink text-paper dark:bg-zinc-950"
                        : "bg-white text-ink dark:bg-zinc-900 dark:text-paper"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-widest ${
                        idx === 3
                          ? "text-accent"
                          : idx === 1
                            ? "text-ink/75"
                            : "text-ink/60 dark:text-paper/60"
                      }`}
                    >
                      0{idx + 1} / {metric.unit}
                    </span>
                    <span
                      className={`h-2.5 w-2.5 rounded-full border border-ink ${
                        idx === 1 ? "bg-white" : "bg-accent"
                      }`}
                    />
                  </div>
                  <div className="my-5 font-display text-5xl leading-none tracking-tight">
                    {metric.value}
                  </div>
                  <p
                    className={`text-xs font-semibold leading-snug ${
                      idx === 3
                        ? "text-paper/80"
                        : idx === 1
                          ? "text-ink/85"
                          : "text-ink/80 dark:text-paper/75"
                    }`}
                  >
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border-2 border-ink bg-ink p-6 text-paper shadow-brutal-accent dark:border-accent/60 dark:bg-zinc-900">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <div>
                  <div className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                    Zero Repeat Incidents · Blameless PIR &amp; SLOs
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/85">
                    Correlating ELK logs, Dynatrace APM, and SLO error budgets with blameless PIRs
                    and root-cause engineering so reliability becomes repeatable across teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
