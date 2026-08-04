// ── Le Prestige — Section Heading ───────────────────────────────

import FadeUp from "@/components/animations/FadeUp"

interface SectionHeadingProps {
  eyebrow: string
  title: string
  titleAccent?: string
  centered?: boolean
  className?: string
  showDivider?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  titleAccent,
  centered = false,
  className = "",
  showDivider = false,
}: SectionHeadingProps) {
  return (
    <FadeUp className={className}>
      <div style={{ textAlign: centered ? "center" : "left", marginBottom: centered ? 56 : 0 }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.22em",
            color: "var(--lp-accent)",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(2rem, 3.5vw, 3rem)",
            lineHeight: 1.2,
            margin: 0,
            color: "var(--lp-primary)",
          }}
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <em style={{ fontWeight: 500 }}>{titleAccent}</em>
            </>
          )}
        </h2>
        {showDivider && (
          <div
            style={{
              width: 40,
              height: 1,
              background: "var(--lp-accent)",
              opacity: 0.6,
              margin: centered ? "20px auto" : "20px 0",
            }}
          />
        )}
      </div>
    </FadeUp>
  )
}
