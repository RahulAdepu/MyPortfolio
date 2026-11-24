import { useCallback, useEffect, useState } from "react"
import { Award, Cpu, GraduationCap, RotateCcw } from "lucide-react"
import { CREDENTIALS } from "@/data/portfolio"
import { Badge } from "@/components/ui/badge"

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const RESET_DELAY_SECONDS = 5

type Cell = "" | "X" | "O"

function findWinner(board: Cell[], player: "X" | "O") {
  return WIN_LINES.find((line) => line.every((i) => board[i] === player)) ?? null
}

function findStrategicMove(board: Cell[], player: "X" | "O") {
  for (const line of WIN_LINES) {
    const vals = line.map((i) => board[i])
    if (vals.filter((v) => v === player).length === 2 && vals.includes("")) {
      return line[vals.indexOf("")]
    }
  }
  return null
}

export function CredentialsAndGame() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""))
  const [scores, setScores] = useState({ user: 0, ai: 0 })
  const [status, setStatus] = useState("Your move (X)")
  const [winLine, setWinLine] = useState<number[] | null>(null)
  const [locked, setLocked] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [resetCountdown, setResetCountdown] = useState<number | null>(null)

  const education = CREDENTIALS.filter((c) => c.kind === "education")
  const certs = CREDENTIALS.filter((c) => c.kind === "certification")

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(""))
    setWinLine(null)
    setLocked(false)
    setGameOver(false)
    setResetCountdown(null)
    setStatus("Your move (X)")
  }, [])

  // Auto-reset 5-second countdown after every completed game (win, loss, or draw)
  useEffect(() => {
    if (!gameOver) return
    setResetCountdown(RESET_DELAY_SECONDS)

    const interval = window.setInterval(() => {
      setResetCountdown((prev) => {
        if (prev === null || prev <= 1) {
          window.clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const timeout = window.setTimeout(() => {
      resetBoard()
    }, RESET_DELAY_SECONDS * 1000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [gameOver, resetBoard])

  // Tactical AI move effect
  useEffect(() => {
    if (!locked || gameOver || winLine || !board.includes("")) return
    const timer = window.setTimeout(() => {
      const next = [...board]
      let move = findStrategicMove(next, "O") ?? findStrategicMove(next, "X")
      if (move === null) {
        const open = next.map((v, i) => (v === "" ? i : -1)).filter((i) => i !== -1)
        if (open.length === 0) return
        move = open[Math.floor(Math.random() * open.length)]
      }
      next[move] = "O"
      const aiWin = findWinner(next, "O")
      setBoard(next)
      if (aiWin) {
        setWinLine(aiWin)
        setGameOver(true)
        setScores((s) => ({ ...s, ai: s.ai + 1 }))
        setStatus("AI wins")
      } else if (!next.includes("")) {
        setGameOver(true)
        setStatus("Draw")
      } else {
        setLocked(false)
        setStatus("Your move (X)")
      }
    }, 520)
    return () => window.clearTimeout(timer)
  }, [locked, gameOver, board, winLine])

  const playCell = (index: number) => {
    if (board[index] !== "" || locked || gameOver || winLine) return
    const next = [...board]
    next[index] = "X"
    const userWin = findWinner(next, "X")
    setBoard(next)
    if (userWin) {
      setWinLine(userWin)
      setLocked(true)
      setGameOver(true)
      setScores((s) => ({ ...s, user: s.user + 1 }))
      setStatus("You win!")
      return
    }
    if (!next.includes("")) {
      setLocked(true)
      setGameOver(true)
      setStatus("Draw")
      return
    }
    setLocked(true)
    setStatus("AI thinking...")
  }

  return (
    <section
      id="credentials"
      className="relative z-10 border-b-2 border-ink bg-transparent py-20 transition-colors dark:border-paper/20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6 dark:border-paper/20">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white py-1 pl-1 pr-3 text-xs font-extrabold uppercase tracking-wider text-ink dark:border-paper/30 dark:bg-zinc-900 dark:text-paper">
              <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] text-ink">
                04
              </span>
              <span>Credentials</span>
            </div>
            <h2 className="font-display text-4xl uppercase tracking-tight text-ink dark:text-paper sm:text-6xl">
              Education &amp; Certs
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/70 dark:text-paper/60">
            {"{ Education // Certifications }"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Education + Certs */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-accent dark:border-accent">
                  <GraduationCap className="h-5 w-5 text-ink" />
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                  Education
                </h3>
              </div>
              <div className="space-y-4">
                {education.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border-2 border-ink/15 bg-paper/60 p-4 dark:border-paper/15 dark:bg-zinc-950/70"
                  >
                    <div>
                      <div className="text-sm font-extrabold text-ink dark:text-paper sm:text-base">
                        {item.name}
                      </div>
                      <div className="mt-0.5 text-xs font-semibold text-ink/70 dark:text-paper/65">
                        {item.org}
                      </div>
                    </div>
                    <Badge variant="paper" className="font-mono text-[10px]">
                      {item.statusLabel}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal dark:border-paper/25 dark:bg-zinc-900 dark:shadow-brutal-dark sm:p-7">
              <div className="mb-5 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-ink bg-ink text-paper dark:border-paper/30 dark:bg-paper dark:text-ink">
                  <Award className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl uppercase tracking-tight text-ink dark:text-paper">
                  Certifications
                </h3>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-3">
                {certs.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex flex-col justify-between rounded-2xl border-2 border-ink bg-paper/50 p-4 dark:border-paper/20 dark:bg-zinc-950/70"
                  >
                    <div>
                      <div className="text-sm font-extrabold leading-snug text-ink dark:text-paper">
                        {cert.name}
                      </div>
                      <div className="mt-1 text-xs font-medium text-ink/65 dark:text-paper/60">
                        {cert.org}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge
                        variant={
                          cert.status === "completed"
                            ? "default"
                            : cert.status === "in-progress"
                              ? "ink"
                              : "muted"
                        }
                        className="text-[10px]"
                      >
                        {cert.statusLabel}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="simulation" className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-3xl border-2 border-ink bg-ink p-6 text-paper shadow-brutal-accent dark:border-accent/60 dark:bg-zinc-900 sm:p-7">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-paper/30 bg-white/10 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                    <Cpu className="h-3.5 w-3.5" />
                    05 / Mini Game
                  </div>
                  <button
                    type="button"
                    onClick={resetBoard}
                    className="inline-flex items-center gap-1 rounded-full border border-paper/30 px-3 py-1 font-mono text-[11px] font-bold uppercase text-paper/80 transition-colors hover:border-accent hover:text-accent"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                </div>

                <h3 className="mt-4 font-display text-2xl uppercase tracking-tight text-paper">
                  Tic-Tac-Toe vs AI
                </h3>
                <p className="mt-1 font-mono text-xs text-paper/70">
                  Play a quick round against the AI. Resets automatically after 5s.
                </p>

                <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-paper/20 bg-white/5 px-4 py-2.5 font-mono text-xs">
                  <span className="shrink-0">
                    YOU: <strong className="text-accent">{scores.user}</strong>
                  </span>
                  <span className="truncate rounded-full bg-accent px-2.5 py-0.5 font-bold text-ink">
                    {resetCountdown !== null
                      ? `${status} · Reset in ${resetCountdown}s`
                      : status}
                  </span>
                  <span className="shrink-0">
                    AI: <strong className="text-paper">{scores.ai}</strong>
                  </span>
                </div>
              </div>

              <div className="mx-auto my-6 grid w-full max-w-[270px] grid-cols-3 gap-2.5">
                {board.map((cell, i) => {
                  const isWin = winLine?.includes(i)
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => playCell(i)}
                      aria-label={`Grid cell ${i + 1}${cell ? `, occupied by ${cell}` : ""}`}
                      className={`flex aspect-square items-center justify-center rounded-2xl border-2 font-display text-3xl transition-all ${
                        isWin
                          ? "scale-[1.02] border-accent bg-accent text-ink"
                          : "border-paper/25 bg-white/5 text-paper hover:border-accent hover:bg-white/10"
                      }`}
                    >
                      {cell}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
