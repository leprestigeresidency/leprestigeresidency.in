// ── Le Prestige — Featured Rooms Section ────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/constants/animation"
import SectionHeading from "@/components/common/SectionHeading"
import RoomCard from "@/components/cards/RoomCard"
import FadeUp from "@/components/animations/FadeUp"
import { ROOMS } from "@/data/rooms"

export default function FeaturedRooms() {
  const [pricing, setPricing] = useState<"weekday" | "weekend">("weekday")

  return (
    <section
      id="rooms"
      style={{
        background: "var(--lp-bg-alt)",
        padding: "var(--space-14) var(--container-padding)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <FadeUp>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 56,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <SectionHeading eyebrow="Accommodations" title="Luxury Rooms" />

            {/* Filter toggle */}
            <div
              style={{
                display: "flex",
                border: "1px solid var(--lp-border)",
                overflow: "hidden",
              }}
            >
              {(["weekday", "weekend"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setPricing(f)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textTransform: "capitalize",
                    padding: "10px 24px",
                    border: "none",
                    cursor: "pointer",
                    background:
                      pricing === f ? "var(--lp-accent)" : "transparent",
                    color:
                      pricing === f ? "#fff" : "var(--lp-muted)",
                    transition: "all 0.25s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </FadeUp>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 32,
          }}
        >
          {ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} pricing={pricing} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
