// ── Le Prestige — Branches Section ──────────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/constants/animation"
import SectionHeading from "@/components/common/SectionHeading"
import Badge from "@/components/ui/Badge"
import { BRANCHES } from "@/data/branches"

function BranchCard({
  city,
  tag,
  description,
  status,
}: {
  city: string
  tag: string
  description: string
  status: string
}) {
  const [hover, setHover] = useState(false)
  const isUpcoming = status === "coming-soon"

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "48px 40px",
        border: `1px solid ${hover ? "var(--lp-accent)" : "var(--lp-border)"}`,
        borderRadius: 20,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.35s",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <Badge variant={isUpcoming ? "upcoming" : "active"}>{tag}</Badge>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: 28,
          margin: "0 0 16px",
          color: "var(--lp-primary)",
        }}
      >
        {city}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "var(--lp-muted)",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {description}
      </p>
    </motion.div>
  )
}

export default function Branches() {
  return (
    <section
      id="branches"
      style={{
        background: "var(--lp-bg)",
        padding: "var(--space-14) var(--container-padding)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading
          eyebrow="Our Locations"
          title="Our Branches"
          centered
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {BRANCHES.map((b) => (
            <BranchCard key={b.city} {...b} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
