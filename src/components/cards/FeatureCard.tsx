// ── Le Prestige — Feature Card ──────────────────────────────────

import { useState } from "react"
import { motion } from "framer-motion"
import { staggerItem } from "@/constants/animation"
import {
  Star, MapPin, Hotel, Car, Clock, Heart,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Star, MapPin, Hotel, Car, Clock, Heart,
}

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const [hover, setHover] = useState(false)
  const IconComponent = iconMap[icon] || Star

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: "48px 40px",
        background: hover ? "var(--lp-bg-alt)" : "var(--lp-white)",
        border: "1px solid var(--lp-border)",
        transition: "background 0.3s",
        cursor: "default",
      }}
    >
      <IconComponent
        size={24}
        color="var(--lp-accent)"
        strokeWidth={1.5}
        style={{ marginBottom: 20 }}
      />
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: 20,
          margin: "0 0 12px",
          color: "var(--lp-primary)",
        }}
      >
        {title}
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
