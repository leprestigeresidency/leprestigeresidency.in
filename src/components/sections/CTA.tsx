// ── Le Prestige — CTA Section ───────────────────────────────────

import { motion } from "framer-motion"
import { HOTEL } from "@/constants/hotel"
import MagneticButton from "@/components/animations/MagneticButton"
import Button from "@/components/ui/Button"
import FadeUp from "@/components/animations/FadeUp"

export default function CTA() {
  return (
    <section
      id="reservation"
      style={{
        background: "var(--lp-footer)",
        padding: "var(--space-14) var(--container-padding)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <FadeUp>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {HOTEL.name}
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Book Your
            <br />
            <em style={{ color: "rgba(166,106,69,0.9)" }}>Luxury Stay</em>
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 44,
              lineHeight: 1.7,
            }}
          >
            Reserve today and experience the Le Prestige difference — where
            luxury is quiet and service is personal.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <motion.div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button to="/rooms" variant="primary" size="lg">
              Reserve Now
            </Button>
            <Button to="/rooms" variant="outline-light" size="lg">
              Explore Rooms
            </Button>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  )
}
