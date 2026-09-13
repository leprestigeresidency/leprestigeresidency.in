// ── Le Prestige — Featured Rooms Section ────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/constants/animation"
import SectionHeading from "@/components/common/SectionHeading"
import RoomCard from "@/components/cards/RoomCard"
import FadeUp from "@/components/animations/FadeUp"
import { ROOMS } from "@/data/rooms"
import { useLivePrices } from "@/hooks/useLivePrices"

export default function FeaturedRooms() {
  const { livePrices } = useLivePrices();

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
          {ROOMS.map((room) => {
            const docId = `pondicherry_${room.type.toLowerCase()}`;
            const livePrice = livePrices[docId] || room.weekdayPrice;
            const updatedRoom = { ...room, weekdayPrice: livePrice };
            
            return <RoomCard key={room.id} room={updatedRoom} pricing="weekday" />
          })}
        </motion.div>
      </div>
    </section>
  )
}
