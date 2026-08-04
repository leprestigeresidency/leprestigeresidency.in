// ── Le Prestige — Hero Content ──────────────────────────────────

import { motion } from "framer-motion"
import { HOTEL } from "@/constants/hotel"
import HeroButtons from "./HeroButtons"

export default function HeroContent() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 4,
        textAlign: "center",
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          fontSize: "clamp(2.8rem, 7vw, 6rem)",
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          margin: 0,
        }}
      >
        Le Prestige
      </motion.h1>

      {/* CTA Buttons */}
      <HeroButtons />
    </div>
  )
}
