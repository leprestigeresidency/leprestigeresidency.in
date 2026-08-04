// ── Le Prestige — Amenities Section ─────────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/constants/animation"
import {
  Wifi, Car, Clock, Snowflake,
  UtensilsCrossed, Sparkles, Zap, ArrowUpDown,
} from "lucide-react"
import SectionHeading from "@/components/common/SectionHeading"
import FadeUp from "@/components/animations/FadeUp"
import { AMENITIES } from "@/data/amenities"
import { WHY_FEATURES } from "@/data/amenities"
import FeatureCard from "@/components/cards/FeatureCard"

const iconComponents: Record<string, React.ElementType> = {
  Wifi, Car, Clock, Snowflake,
  UtensilsCrossed, Sparkles, Zap, ArrowUpDown,
}

function AmenityCard({ label, icon }: { label: string; icon: string }) {
  const [hover, setHover] = useState(false)
  const IconComponent = iconComponents[icon] || Sparkles

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "36px 24px",
        background: hover ? "var(--lp-white)" : "rgba(255,255,255,0.5)",
        border: `1px solid ${hover ? "var(--lp-border)" : "transparent"}`,
        borderRadius: 16,
        textAlign: "center",
        transition: "all 0.3s",
        boxShadow: hover ? "0 8px 30px rgba(0,0,0,0.07)" : "none",
      }}
    >
      <IconComponent
        size={24}
        color="var(--lp-accent)"
        strokeWidth={1.5}
        style={{ marginBottom: 14 }}
      />
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--lp-primary)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export default function Amenities() {
  return (
    <>
      {/* Why Choose Us */}
      <section
        style={{
          background: "var(--lp-bg)",
          padding: "var(--space-14) var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading
            eyebrow="Why Le Prestige"
            title="The Le Prestige Difference"
            centered
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-[2px]"
          >
            {WHY_FEATURES.map((w) => (
              <FeatureCard key={w.title} {...w} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Facilities grid */}
      <section
        id="amenities"
        style={{
          background: "var(--lp-bg-alt)",
          padding: "var(--space-14) var(--container-padding)",
        }}
      >
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
          <SectionHeading
            eyebrow="Amenities"
            title="Hotel Facilities"
            centered
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {AMENITIES.map((a) => (
              <AmenityCard key={a.label} {...a} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
