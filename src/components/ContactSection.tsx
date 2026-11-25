import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Smartphone,
  X,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { PROFILE } from "@/data/portfolio"

function getSiteUrl(): string {
  if (typeof window === "undefined") return ""
  return `${window.location.origin}${window.location.pathname}`
}

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null)
  const [qrOpen, setQrOpen] = useState(false)
  const siteUrl = getSiteUrl()

  useEffect(() => {
    if (!qrOpen) return
    const prevBodyOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQrOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = prevBodyOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [qrOpen])

  const copyValue = async (key: string, value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
      } else {
        const ta = document.createElement("textarea")
        ta.value = value
        ta.style.position = "fixed"
        ta.style.opacity = "0"
        document.body.appendChild(ta)
        ta.select()
        document.execCommand("copy")
        document.body.removeChild(ta)
      }
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      // Clipboard unavailable in restricted browser contexts
    }
  }

  return (
    <section className="relative z-10 py-12 sm:py-16">
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${copied} to clipboard` : ""}
      </span>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border-2 border-ink bg-white p-5 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:rounded-[2rem] sm:p-10 sm:shadow-brutal-lg lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-800 dark:text-paper">
                <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                  06
                </span>
                <span>Open Channels</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,8vw,3.75rem)] uppercase leading-[0.95] tracking-tight text-ink dark:text-paper">
                Let&apos;s Build Reliable Systems.
              </h2>
              <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-ink/75 dark:text-paper/70 sm:text-base">
                Looking for a Site Reliability, DevOps, or Cloud Engineer in Toronto or remote
                across Canada? Reach out directly by email, phone, or LinkedIn.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink shadow-brutal transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-accent dark:shadow-[4px_4px_0px_rgba(243,243,240,0.25)] dark:hover:bg-paper dark:hover:text-ink sm:px-6 sm:py-3 sm:text-sm"
                >
                  <Mail className="h-4 w-4" />
                  Email Rahul
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-950 dark:text-paper dark:hover:bg-paper dark:hover:text-ink sm:px-6 sm:py-3 sm:text-sm"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-paper dark:border-paper/30 dark:bg-zinc-950 dark:text-paper dark:hover:bg-paper dark:hover:text-ink sm:px-6 sm:py-3 sm:text-sm"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-accent dark:border-paper/30 dark:bg-zinc-800 dark:text-paper dark:hover:bg-accent dark:hover:text-ink sm:py-3 sm:text-sm"
                >
                  <QrCode className="h-4 w-4" />
                  Scan QR
                </button>
              </div>
            </div>

            <div className="min-w-0 space-y-3 lg:col-span-5">
              <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-paper p-3.5 dark:border-paper/25 dark:bg-zinc-950 sm:p-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-ink dark:text-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/55 dark:text-paper/55">
                      Email
                    </div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="block truncate text-sm font-bold text-ink hover:underline dark:text-paper"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue("email", PROFILE.email)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-white text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
                  aria-label="Copy email address"
                >
                  {copied === "email" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-paper p-3.5 dark:border-paper/25 dark:bg-zinc-950 sm:p-4">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-ink dark:text-accent" />
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/55 dark:text-paper/55">
                      Phone
                    </div>
                    <a
                      href={PROFILE.phoneHref}
                      className="block truncate font-mono text-sm font-bold text-ink hover:underline dark:text-paper"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copyValue("phone", PROFILE.phone)}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-white text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
                  aria-label="Copy phone number"
                >
                  {copied === "phone" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-paper p-3.5 dark:border-paper/25 dark:bg-zinc-950 sm:p-4">
                <MapPin className="h-4 w-4 shrink-0 text-ink dark:text-accent" />
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/55 dark:text-paper/55">
                    Location
                  </div>
                  <div className="text-sm font-bold text-ink dark:text-paper">
                    {PROFILE.location}
                  </div>
                </div>
              </div>

              {/* Scannable QR Card to open this exact site on mobile */}
              {siteUrl && (
                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  className="group flex w-full items-center justify-between gap-3 rounded-2xl border-2 border-ink bg-paper p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-accent dark:border-paper/25 dark:bg-zinc-950 dark:hover:border-accent sm:gap-4 sm:p-4"
                  aria-label="Expand QR code to open this website on your phone"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Smartphone className="h-4 w-4 shrink-0 text-ink dark:text-accent" />
                    <div className="min-w-0 flex-1">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink/55 dark:text-paper/55">
                        Open on Phone
                      </div>
                      <div className="text-sm font-bold text-ink dark:text-paper">
                        Scan QR Code
                      </div>
                      <div className="truncate font-mono text-[11px] text-ink/60 dark:text-paper/55">
                        {siteUrl}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 rounded-xl border-2 border-ink bg-white p-1.5 shadow-[2px_2px_0px_#111] transition-transform group-hover:scale-105 dark:border-accent sm:p-2">
                    <QRCodeSVG
                      value={siteUrl}
                      size={64}
                      level="M"
                      bgColor="#ffffff"
                      fgColor="#111111"
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enlarged QR Modal for easy scanning */}
      {qrOpen && siteUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Scan QR code to open website on phone"
          onClick={() => setQrOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl border-2 border-ink bg-white p-6 text-center shadow-brutal-lg dark:border-paper/30 dark:bg-zinc-900 dark:shadow-brutal-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-paper">
                <Smartphone className="h-4 w-4 text-accent" />
                Scan on Phone
              </span>
              <button
                type="button"
                onClick={() => setQrOpen(false)}
                aria-label="Close QR dialog"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink transition-colors hover:bg-accent dark:border-paper/30 dark:bg-zinc-800 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto inline-flex rounded-2xl border-2 border-ink bg-white p-4 shadow-brutal dark:border-accent">
              <QRCodeSVG
                value={siteUrl}
                size={210}
                level="M"
                bgColor="#ffffff"
                fgColor="#111111"
              />
            </div>

            <p className="mt-4 text-xs font-semibold text-ink/75 dark:text-paper/70">
              Point your phone camera at the QR code to open this site directly.
            </p>

            <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border-2 border-ink bg-paper px-3 py-2 dark:border-paper/25 dark:bg-zinc-950">
              <span className="truncate font-mono text-xs text-ink dark:text-paper">
                {siteUrl}
              </span>
              <button
                type="button"
                onClick={() => copyValue("url", siteUrl)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-ink bg-white px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-ink hover:bg-accent dark:border-paper/30 dark:bg-zinc-900 dark:text-paper dark:hover:bg-accent dark:hover:text-ink"
              >
                {copied === "url" ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
