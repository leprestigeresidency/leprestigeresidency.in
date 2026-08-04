// ── Le Prestige — Reviews Section ───────────────────────────────

import { useState, useEffect } from "react"
import SectionHeading from "@/components/common/SectionHeading"
import ReviewCard from "@/components/cards/ReviewCard"
import FadeUp from "@/components/animations/FadeUp"
import Reveal from "@/components/animations/Reveal"
import { REVIEWS, STATS } from "@/data/reviews"

export default function Reviews() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setActive((v) => (v + 1) % REVIEWS.length),
      4000
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="reviews"
      style={{
        background: "var(--lp-bg)",
        padding: "var(--space-14) var(--container-padding)",
      }}
    >
      <div
        className="two-col"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Left: carousel */}
        <div>
          <SectionHeading
            eyebrow="Guest Reviews"
            title="What Our Guests Say"
          />
          <FadeUp delay={0.1}>
            <div style={{ position: "relative", minHeight: 220, marginTop: 40 }}>
              {REVIEWS.map((r, i) => (
                <ReviewCard key={i} review={r} active={i === active} />
              ))}
            </div>
          </FadeUp>
          {/* Dots */}
          <FadeUp delay={0.2}>
            <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: i === active ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    background:
                      i === active ? "var(--lp-accent)" : "var(--lp-border)",
                    transition: "all 0.35s",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Right: stats */}
        <Reveal direction="left">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "40px 32px",
                  background: "var(--lp-bg-alt)",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-numbers)",
                    fontWeight: 600,
                    fontSize: 44,
                    color: "var(--lp-primary)",
                    margin: "0 0 8px",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                  <span style={{ color: "var(--lp-accent)", fontSize: 32 }}>
                    {s.suffix}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--lp-muted)",
                    margin: 0,
                    letterSpacing: "0.06em",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
