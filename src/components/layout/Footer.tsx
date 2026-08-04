// ── Le Prestige — Footer ────────────────────────────────────────

import { HOTEL, FOOTER_LINKS, LEGAL_LINKS } from "@/constants/hotel"
import FadeUp from "@/components/animations/FadeUp"

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--lp-footer-deep)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px var(--container-padding) 40px",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <FadeUp>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1.5fr",
              gap: 60,
              marginBottom: 60,
            }}
          >
            {/* Brand */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "0.22em",
                  color: "#fff",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                {HOTEL.logo}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 16,
                  letterSpacing: "0.04em",
                }}
              >
                {HOTEL.tagline}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.8,
                  maxWidth: 300,
                  marginBottom: 28,
                }}
              >
                {HOTEL.name} — A sanctuary of quiet luxury in the heart
                of {HOTEL.address.city}.
              </p>
              <div style={{ display: "flex", gap: 14 }}>
                {Object.keys(HOTEL.social).map((s) => (
                  <a
                    key={s}
                    href="#"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      textTransform: "capitalize",
                      transition: "color 0.25s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--lp-accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
                    }
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                Quick Links
              </p>
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    marginBottom: 12,
                    transition: "color 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#fff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                  }
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                Contact
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {HOTEL.email}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                {HOTEL.phone}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                Located in {HOTEL.address.building}
                <br />
                {HOTEL.address.street}
                <br />
                {HOTEL.address.area}, {HOTEL.address.locality}
                <br />
                {HOTEL.address.city} – {HOTEL.address.pincode}
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(255,255,255,0.25)",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} {HOTEL.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  color: "rgba(255,255,255,0.25)",
                  textDecoration: "none",
                  transition: "color 0.25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
                }
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
