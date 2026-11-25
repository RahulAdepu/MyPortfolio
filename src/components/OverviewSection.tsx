import { ArrowRight, Briefcase, MapPin, Phone, ShieldCheck } from "lucide-react"
import { EXPERIENCES, PROFILE, SKILL_CATEGORIES } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"
import type { SectionId } from "@/components/Navbar"

interface OverviewSectionProps {
  onSelectSection: (section: SectionId) => void
}

const CORE_STACK = [
  "AWS",
  "Kubernetes (EKS)",
  "OpenShift",
  "Terraform",
  "GitHub Actions",
  "Dynatrace",
  "ELK / OpenSearch",
  "SLO / SLI",
]

export function OverviewSection({ onSelectSection }: OverviewSectionProps) {
  const currentRole = EXPERIENCES[0]
  const totalSkills = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <section className="relative z-10 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top 4 Impact Metrics — instant recruiter scan */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PROFILE.metrics.map((metric, idx) => (
            <div
              key={metric.unit}
              className={`flex min-w-0 flex-col justify-between rounded-2xl border-2 border-ink p-4 shadow-brutal transition-transform duration-200 hover:-translate-y-0.5 dark:border-paper/25 dark:shadow-brutal-dark sm:rounded-3xl sm:p-5 ${
                idx === 1
                  ? "bg-accent text-ink"
                  : idx === 3
                    ? "bg-ink text-paper dark:bg-zinc-900"
                    : "bg-white text-ink dark:bg-zinc-900 dark:text-paper"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
                    idx === 3
                      ? "text-accent"
                      : idx === 1
                        ? "text-ink/75"
                        : "text-ink/60 dark:text-paper/60"
                  }`}
                >
                  {metric.unit}
                </span>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full border border-ink ${
                    idx === 1 ? "bg-white" : "bg-accent"
                  }`}
                />
              </div>
              <div className="my-2.5 font-display text-3xl leading-none tracking-tight sm:my-3 sm:text-4xl">
                {metric.value}
              </div>
              <p
                className={`text-[11px] font-semibold leading-snug sm:text-xs ${
                  idx === 3
                    ? "text-paper/80"
                    : idx === 1
                      ? "text-ink/85"
                      : "text-ink/75 dark:text-paper/75"
                }`}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Focused 2-Column Executive Overview */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Concise Bio + Key Details */}
          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-3xl border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7 lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="default">Production SRE</Badge>
                <Badge variant="ink">Regulated Finance</Badge>
                <Badge variant="paper">Toronto, ON</Badge>
              </div>
              <h2 className="font-display text-[clamp(1.6rem,5vw,2.75rem)] uppercase leading-[0.98] tracking-tight text-ink dark:text-paper">
                Reliability by Design
              </h2>
              <p className="mt-4 text-sm font-semibold leading-relaxed text-ink dark:text-paper sm:text-base">
                {PROFILE.summary}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/75 dark:text-paper/70">
                {PROFILE.aboutParagraphs[0]}
              </p>
            </div>

            <div className="space-y-4 border-t-2 border-dashed border-ink/15 pt-5 dark:border-paper/15">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs font-semibold text-ink/80 dark:text-paper/75">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  {PROFILE.location}
                </span>
                <a
                  href={PROFILE.phoneHref}
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="h-3.5 w-3.5 text-accent" />
                  {PROFILE.phone}
                </a>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                  Zero Repeat Incidents · Blameless PIRs
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectSection("experience")}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-accent px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ink shadow-[2px_2px_0px_#111] transition-transform hover:-translate-y-0.5 dark:border-accent"
                >
                  Full Experience
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectSection("contact")}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-950 dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
                >
                  Contact &amp; QR
                </button>
              </div>
            </div>
          </div>

          {/* Right: Current Role Snapshot + Core Stack */}
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            {currentRole && (
              <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-ink/65 dark:text-paper/60">
                    <Briefcase className="h-3.5 w-3.5 text-accent" />
                    Current Role
                  </span>
                  <span className="rounded-full border border-ink/25 bg-paper px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-ink dark:border-paper/25 dark:bg-zinc-800 dark:text-paper">
                    {currentRole.period}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                  {currentRole.company}
                </h3>
                <p className="text-xs font-bold text-ink/75 dark:text-paper/70">
                  {currentRole.role} · {currentRole.location}
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-ink/80 dark:text-paper/75">
                  {currentRole.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => onSelectSection("experience")}
                  className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-ink hover:text-accent dark:text-paper dark:hover:text-accent"
                >
                  See all roles &amp; impact
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            <div className="rounded-3xl border-2 border-ink bg-ink p-5 text-paper shadow-brutal-accent dark:border-accent/50 dark:bg-zinc-900 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
                  Core Stack
                </span>
                <button
                  type="button"
                  onClick={() => onSelectSection("skills")}
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-bold uppercase text-paper/80 hover:text-accent"
                >
                  All {totalSkills} Tools
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {CORE_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-paper/25 bg-white/10 px-3 py-1 font-mono text-[11px] font-bold text-paper"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
