// ── Le Prestige — Floating Pill Navbar (Perfectly Centered) ─────────

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NAV_LINKS, HOTEL } from "@/constants/hotel"
import MagneticButton from "@/components/animations/MagneticButton"

interface NavbarProps {
  scrolled: boolean
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        padding: "0 16px",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%",
          maxWidth: 1240,
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            borderRadius: 9999,
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            background: scrolled
              ? "rgba(248, 244, 238, 0.94)"
              : "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: scrolled
              ? "1px solid var(--lp-border)"
              : "1px solid rgba(255, 255, 255, 0.35)",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0, 0, 0, 0.08)"
              : "0 10px 30px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Brand Logo */}
          <a
            href="#"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: scrolled ? "var(--lp-heading)" : "#FFFFFF",
              transition: "color 0.3s",
              textDecoration: "none",
              userSelect: "none",
            }}
          >
            {HOTEL.shortName.toUpperCase()}
          </a>

          {/* Center Links */}
          <ul
            className="hidden-mobile"
            style={{
              display: "flex",
              gap: 32,
              listStyle: "none",
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href={link === "Home" ? "#" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: scrolled
                      ? "var(--lp-body)"
                      : "rgba(255, 255, 255, 0.95)",
                    textDecoration: "none",
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = scrolled
                      ? "var(--lp-accent)"
                      : "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = scrolled
                      ? "var(--lp-body)"
                      : "rgba(255, 255, 255, 0.95)")
                  }
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          {/* Pill Reserve Button */}
          <div className="hidden-mobile">
            <a
              href="#reservation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "10px 28px",
                borderRadius: 9999,
                background: "var(--lp-accent)",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(196, 90, 55, 0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--lp-accent-hover)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(196, 90, 55, 0.45)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--lp-accent)"
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(196, 90, 55, 0.35)"
              }}
            >
              Reserve Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="show-mobile"
            aria-label="Toggle menu"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              display: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  background: scrolled ? "var(--lp-heading)" : "#FFFFFF",
                  borderRadius: 2,
                  marginBottom: i < 2 ? 5 : 0,
                  transition: "all 0.3s",
                  transform: open
                    ? i === 0
                      ? "rotate(45deg) translateY(7px)"
                      : i === 2
                        ? "rotate(-45deg) translateY(-7px)"
                        : "scaleX(0)"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                marginTop: 12,
                borderRadius: 24,
                background: "rgba(248, 244, 238, 0.98)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--lp-border)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                padding: "20px 24px 24px",
              }}
            >
              {[...NAV_LINKS, "Reservation"].map((link) => (
                <a
                  key={link}
                  href={link === "Home" ? "#" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{
                    display: "block",
                    padding: "12px 0",
                    borderBottom: "1px solid var(--lp-border-light)",
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--lp-heading)",
                    textDecoration: "none",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  )
}
