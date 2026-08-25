// ── Le Prestige — Hero Buttons ──────────────────────────────────

import { motion } from "framer-motion"
import MagneticButton from "@/components/animations/MagneticButton"
import { Link } from "react-router-dom"

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
      <Link
        to="/rooms"
        className="px-6 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-[12px]"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
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
      </Link>

      <Link
        to="/rooms"
        className="px-6 sm:px-10 py-3.5 sm:py-4 text-[11px] sm:text-[12px]"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-body)",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
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
      </Link>
    </motion.div>
  )
}
