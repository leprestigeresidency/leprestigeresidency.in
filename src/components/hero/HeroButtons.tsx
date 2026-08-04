// ── Le Prestige — Hero Buttons ──────────────────────────────────

import { motion } from "framer-motion"
import MagneticButton from "@/components/animations/MagneticButton"

export default function HeroButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        gap: 16,
        marginTop: 16,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <a
        href="#reservation"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "16px 40px",
          borderRadius: 9999,
          background: "var(--lp-accent)",
          color: "#FFFFFF",
          textDecoration: "none",
          transition: "all 0.3s ease",
          boxShadow: "0 10px 30px rgba(196, 90, 55, 0.35)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--lp-accent-hover)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--lp-accent)"
        }}
      >
        Reserve Now
      </a>

      <a
        href="#rooms"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          padding: "16px 40px",
          borderRadius: 9999,
          background: "rgba(255, 255, 255, 0.12)",
          border: "1.5px solid #FFFFFF",
          backdropFilter: "blur(8px)",
          color: "#FFFFFF",
          textDecoration: "none",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FFFFFF"
          e.currentTarget.style.color = "#1B1A18"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"
          e.currentTarget.style.color = "#FFFFFF"
        }}
      >
        Explore Rooms
      </a>
    </motion.div>
  )
}
