// ── Le Prestige — Review Card ───────────────────────────────────

import type { Review } from "@/data/reviews"

interface ReviewCardProps {
  review: Review
  active: boolean
}

export default function ReviewCard({ review, active }: ReviewCardProps) {
  return (
    <div
      style={{
        position: active ? "relative" : "absolute",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s, transform 0.5s",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
        {Array.from({ length: review.rating }).map((_, j) => (
          <span
            key={j}
            style={{ color: "var(--lp-accent)", fontSize: 16 }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontStyle: "italic",
          fontSize: 20,
          lineHeight: 1.7,
          color: "var(--lp-primary)",
          marginBottom: 24,
        }}
      >
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Attribution */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: 14,
            margin: "0 0 2px",
            color: "var(--lp-primary)",
          }}
        >
          {review.name}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            color: "var(--lp-muted)",
            margin: 0,
          }}
        >
          {review.location}
        </p>
      </div>
    </div>
  )
}
