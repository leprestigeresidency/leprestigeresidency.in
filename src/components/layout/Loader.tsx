// ── Le Prestige — Loader ────────────────────────────────────────

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HOTEL } from "@/constants/hotel"

interface LoaderProps {
  onComplete?: () => void
  duration?: number
}

export default function Loader({ onComplete, duration = 2400 }: LoaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "var(--lp-bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Logo */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              fontSize: 32,
              color: "var(--lp-primary)",
              textTransform: "uppercase",
            }}
          >
            {HOTEL.logo}
          </motion.span>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 60,
              height: 1,
              background: "var(--lp-accent)",
              transformOrigin: "center",
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "var(--lp-muted)",
              textTransform: "uppercase",
            }}
          >
            {HOTEL.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
