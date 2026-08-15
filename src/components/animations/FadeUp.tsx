// ── Le Prestige — FadeUp Animation ──────────────────────────────

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 1.2,
  y = 40,
  className = "",
  once = true,
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
