// ── Le Prestige — Full Viewport Hero Background Image ─────────────

import { motion } from "framer-motion"

export default function HeroImage() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <img
        src="/images/hero/hero image.png"
        alt="Le Prestige Boutique Hotel — Full background building photo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center bottom",
          display: "block",
        }}
      />
    </div>
  )
}
