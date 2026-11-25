import { useCallback, useEffect, useState } from "react"
import { Cpu, RotateCcw } from "lucide-react"

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

export function GameSection() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(""))
  const [scores, setScores] = useState({ user: 0, ai: 0 })
  const [status, setStatus] = useState("Your move (X)")
  const [winLine, setWinLine] = useState<number[] | null>(null)
  const [locked, setLocked] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [resetCountdown, setResetCountdown] = useState<number | null>(null)

  const resetBoard = useCallback(() => {
    setBoard(Array(9).fill(""))
    setWinLine(null)
    setLocked(false)
    setGameOver(false)
    setResetCountdown(null)
    setStatus("Your move (X)")
  }, [])

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
    <section className="relative z-10 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-ink bg-ink p-5 text-paper shadow-brutal-accent dark:border-accent/60 dark:bg-zinc-900 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
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

          <h2 className="mt-4 font-display text-2xl uppercase tracking-tight text-paper sm:text-3xl">
            Tic-Tac-Toe vs AI
          </h2>
          <p className="mt-1 font-mono text-xs text-paper/70">
            Play a quick round against the AI. Resets automatically 5s after each game.
          </p>

          <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-paper/20 bg-white/5 px-4 py-2.5 font-mono text-xs">
            <span className="shrink-0">
              YOU: <strong className="text-accent">{scores.user}</strong>
            </span>
            <span className="truncate rounded-full bg-accent px-2.5 py-0.5 font-bold text-ink">
              {resetCountdown !== null ? `${status} · Reset in ${resetCountdown}s` : status}
            </span>
            <span className="shrink-0">
              AI: <strong className="text-paper">{scores.ai}</strong>
            </span>
          </div>

          <div className="mx-auto mt-6 grid w-full max-w-[270px] grid-cols-3 gap-2.5">
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
    </section>
  )
}
