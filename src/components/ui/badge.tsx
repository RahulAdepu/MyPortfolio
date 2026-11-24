import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-ink dark:border-paper/30 px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "bg-accent text-ink border-ink dark:border-accent",
        ink: "bg-ink text-paper dark:bg-paper dark:text-ink",
        paper: "bg-white text-ink dark:bg-zinc-900 dark:text-paper",
        muted: "bg-paper text-ink/75 border-ink/40 dark:bg-zinc-800 dark:text-paper/70 dark:border-paper/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
