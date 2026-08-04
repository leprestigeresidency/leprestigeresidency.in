// ── Le Prestige — Image Placeholder ─────────────────────────────

interface ImgPlaceholderProps {
  className?: string
  ratio?: string
  label?: string
  src?: string
}

export default function ImgPlaceholder({
  className = "",
  ratio = "4/3",
  label = "",
  src,
}: ImgPlaceholderProps) {
  if (src) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "block",
          aspectRatio: ratio,
          borderRadius: 16,
        }}
      >
        <img
          src={src}
          alt={label}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: ratio,
        background: "#EDE8E0",
        borderRadius: 16,
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        style={{ opacity: 0.3 }}
      >
        <rect
          x="4"
          y="8"
          width="32"
          height="24"
          rx="3"
          stroke="#7A746C"
          strokeWidth="1.5"
        />
        <circle cx="14" cy="17" r="3" stroke="#7A746C" strokeWidth="1.5" />
        <path
          d="M4 28l8-7 6 5 5-4 9 7"
          stroke="#7A746C"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            color: "#7A746C",
            marginTop: 8,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
