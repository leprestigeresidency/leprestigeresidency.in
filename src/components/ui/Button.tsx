// ── Le Prestige — Button Component ──────────────────────────────

import { motion } from "framer-motion"
import { buttonTap } from "@/constants/animation"
import { cn } from "@/utils/helpers"
import { Link } from "react-router-dom"
import type { ReactNode, MouseEvent } from "react"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "outline" | "ghost" | "dark" | "outline-light"
  href?: string
  to?: string
  onClick?: (e: MouseEvent) => void
  className?: string
  size?: "sm" | "md" | "lg"
}

const baseStyles =
  "inline-flex items-center justify-center font-[var(--font-body)] font-semibold text-[12px] tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer rounded-none"

const variantStyles = {
  primary:
    "bg-[var(--lp-accent)] text-white border border-[var(--lp-accent)] hover:bg-[var(--lp-accent-hover)] hover:border-[var(--lp-accent-hover)] shadow-sm",
  outline:
    "bg-transparent text-[var(--lp-accent)] border border-[var(--lp-accent)] hover:bg-[var(--lp-accent)] hover:text-white",
  ghost:
    "bg-transparent text-[var(--lp-accent)] border border-transparent hover:text-[var(--lp-accent-hover)]",
  dark:
    "bg-[var(--lp-accent)] text-white border border-[var(--lp-accent)] hover:bg-[var(--lp-accent-hover)] hover:border-[var(--lp-accent-hover)] shadow-sm",
  "outline-light":
    "bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10",
}

const sizeStyles = {
  sm: "px-[20px] py-[10px]",
  md: "px-[32px] py-[13px]",
  lg: "px-[44px] py-[15px]",
}

export default function Button({
  children,
  variant = "primary",
  href,
  to,
  onClick,
  className = "",
  size = "md",
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

  const inlineStyle: any = {}
  if (variant === "outline-light" || variant === "primary" || variant === "dark") {
    inlineStyle.color = "#FFFFFF"
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        style={inlineStyle}
        whileTap={buttonTap}
      >
        {children}
      </motion.a>
    )
  }

  if (to) {
    const MotionLink = motion(Link)
    return (
      <MotionLink
        to={to}
        className={classes}
        style={inlineStyle}
        whileTap={buttonTap}
      >
        {children}
      </MotionLink>
    )
  }

  return (
    <motion.button
      className={classes}
      style={inlineStyle}
      onClick={onClick}
      whileTap={buttonTap}
    >
      {children}
    </motion.button>
  )
}
