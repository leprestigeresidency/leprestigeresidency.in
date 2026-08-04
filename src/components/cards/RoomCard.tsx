// ── Le Prestige — Room Card ─────────────────────────────────────

import { motion } from "framer-motion"
import { staggerItem, cardHover } from "@/constants/animation"
import { formatPrice } from "@/utils/helpers"
import ImgPlaceholder from "@/components/common/ImgPlaceholder"
import Badge from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import type { Room } from "@/types/room"

interface RoomCardProps {
  room: Room
  pricing: "weekday" | "weekend"
}

export default function RoomCard({ room, pricing }: RoomCardProps) {
  const price = pricing === "weekday" ? room.weekdayPrice : room.weekendPrice

  return (
    <motion.div
      variants={staggerItem}
      initial="rest"
      whileHover="hover"
      animate="rest"
      style={{
        background: "var(--lp-white)",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <motion.div variants={cardHover}>
        <ImgPlaceholder ratio="4/3" label={room.name} src={room.image} />
        <div style={{ padding: "28px 32px 32px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 24,
                margin: 0,
                color: "var(--lp-primary)",
              }}
            >
              {room.name}
            </h3>
            <Badge variant="count">{room.count} rooms</Badge>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--lp-muted)",
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {room.description}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "7px 14px",
              marginBottom: 24,
            }}
          >
            {room.facilities.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "var(--lp-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--lp-accent)",
                    display: "inline-block",
                  }}
                />
                {f}
              </span>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid var(--lp-border)",
              paddingTop: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  color: "var(--lp-muted)",
                  margin: "0 0 4px",
                  letterSpacing: "0.06em",
                  textTransform: "capitalize",
                }}
              >
                {pricing} rate
              </p>
              <p
                style={{
                  fontFamily: "var(--font-numbers)",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "var(--lp-primary)",
                  margin: 0,
                }}
              >
                {formatPrice(price)}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "var(--lp-muted)",
                  }}
                >
                  /night
                </span>
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button href="#" variant="outline" size="sm">
                View
              </Button>
              <Button href="#" variant="primary" size="sm">
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
