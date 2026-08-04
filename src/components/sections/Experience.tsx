// ── Le Prestige — Experience Section ────────────────────────────

import FadeUp from "@/components/animations/FadeUp"
import Reveal from "@/components/animations/Reveal"
import SectionHeading from "@/components/common/SectionHeading"
import ImgPlaceholder from "@/components/common/ImgPlaceholder"
import Button from "@/components/ui/Button"

const HIGHLIGHTS = [
  "Luxury Stay",
  "Boutique Comfort",
  "Premium Hospitality",
  "Free WiFi",
  "Free Parking",
  "24/7 Reception",
  "Restaurant",
]

export default function Experience() {
  return (
    <section
      id="experience"
      style={{ background: "var(--lp-bg)", padding: "var(--space-14) var(--container-padding)" }}
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
        {/* Left: image */}
        <Reveal direction="right">
          <div style={{ position: "relative" }}>
            <ImgPlaceholder
              ratio="4/5"
              label="Hotel Experience"
              className="w-full"
              src="/images/Hotel Expreince.jpeg"
            />
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 100,
                height: 100,
                background: "var(--lp-bg-alt)",
                borderRadius: "50%",
                zIndex: -1,
              }}
            />
          </div>
        </Reveal>

        {/* Right: content */}
        <div>
          <SectionHeading
            eyebrow="The Experience"
            title="Experience"
            titleAccent="Boutique Luxury"
            showDivider
          />
          <FadeUp delay={0.1}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--lp-muted)",
                lineHeight: 1.8,
                marginBottom: 32,
                maxWidth: 440,
                marginTop: 20,
              }}
            >
              Nestled in the heart of Puducherry, Le Prestige offers an intimate
              sanctuary where timeless design meets warm Southern hospitality.
              Every corner is curated to make you feel at home while being
              unmistakably extraordinary.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 36px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 24px",
              }}
            >
              {HIGHLIGHTS.map((a) => (
                <li
                  key={a}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    color: "var(--lp-muted)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--lp-accent)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {a}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Button href="#about" variant="dark">
              Learn More
            </Button>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
