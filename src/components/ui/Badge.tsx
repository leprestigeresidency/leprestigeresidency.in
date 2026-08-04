// ── Le Prestige — Badge Component ───────────────────────────────

import { cn } from "@/utils/helpers"

interface BadgeProps {
  children: React.ReactNode
  variant?: "active" | "upcoming" | "count" | "default"
  className?: string
}

const variantStyles = {
  active:
    "bg-[var(--lp-accent)] text-white",
  upcoming:
    "bg-[var(--lp-bg-alt)] text-[var(--lp-muted)]",
  count:
    "bg-[var(--lp-bg-alt)] text-[var(--lp-muted)]",
  default:
    "bg-[var(--lp-border)] text-[var(--lp-primary)]",
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-[var(--font-body)] text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
