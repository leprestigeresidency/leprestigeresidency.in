import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { NAV_LINKS, HOTEL } from "@/constants/hotel"
import { useAuth } from "@/context/AuthContext"
import RoomsMegaMenu from "./RoomsMegaMenu"

interface NavbarProps {
  scrolled: boolean
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const tapCountRef = useRef(0)
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Close mega menu on route change
  useEffect(() => {
    setMegaMenuOpen(false)
  }, [location.pathname])

  // ── Secret Keyboard Shortcut (Ctrl + Shift + A) for PC ───────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "a" || e.key === "A")) {
        e.preventDefault()
        navigate("/admin")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigate])

  // ── Secret Triple Tap on Logo for Mobile & Touch Screen ───────
  const handleLogoTap = () => {
    tapCountRef.current += 1
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current)

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0
      navigate("/admin")
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0
      }, 700)
    }
  }

  const handleSelectLocation = (locationId: string) => {
    setMegaMenuOpen(false)
    setOpen(false)
    navigate(`/rooms?location=${locationId}`)
  }

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
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={handleLogoTap}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#000000",
              transition: "color 0.3s",
              textDecoration: "none",
              userSelect: "none",
              cursor: "pointer",
            }}
          >
            {HOTEL.shortName.toUpperCase()}
          </Link>

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
            {NAV_LINKS.map((link) => {
              const isHome = link === "Home";
              const isRooms = link === "Rooms";
              const isAbout = link === "About";
              const isContact = link === "Contact";
              const isAdmin = (link as string) === "Admin";
              const isExplore = (link as string) === "Explore Le Prestige" || (link as string) === "Explore";
              const targetPath = isHome ? "/" : isRooms ? "/rooms" : isAbout ? "/about" : isContact ? "/contact" : isAdmin ? "/admin" : isExplore ? "/explore" : `/#${link.toLowerCase().replace(/\s+/g, "-")}`;
              const isActive = (isHome && location.pathname === "/") || (isRooms && location.pathname === "/rooms") || (isAbout && location.pathname === "/about") || (isContact && location.pathname === "/contact") || (isAdmin && location.pathname === "/admin") || (isExplore && location.pathname === "/explore");
              
              if (isRooms) {
                return (
                  <li key={link}>
                    <button
                      type="button"
                      data-rooms-toggle="true"
                      onClick={(e) => {
                        e.preventDefault()
                        setMegaMenuOpen((prev) => !prev)
                      }}
                      aria-expanded={megaMenuOpen}
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive || megaMenuOpen ? "var(--lp-accent)" : "#000000",
                        cursor: "pointer",
                        transition: "color 0.25s",
                        borderBottom: isActive || megaMenuOpen ? "2px solid var(--lp-accent)" : "none",
                        paddingBottom: isActive || megaMenuOpen ? "4px" : "0",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Rooms
                      <span style={{ fontSize: 9, transition: "transform 0.2s", transform: megaMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                    </button>
                  </li>
                )
              }

              return (
                <li key={link}>
                  <Link
                    to={targetPath}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isActive ? "var(--lp-accent)" : "#000000",
                      textDecoration: "none",
                      transition: "color 0.25s",
                      borderBottom: isActive ? "2px solid var(--lp-accent)" : "none",
                      paddingBottom: isActive ? "4px" : "0",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = "var(--lp-accent)"
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = "#000000"
                    }}
                  >
                    {link}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Pill Reserve Button & User Avatar */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--lp-accent)", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--lp-accent)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>
                    {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span style={{ fontSize: 12, fontWeight: 700, color: "#000000", letterSpacing: "0.05em" }}>
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  style={{ fontSize: 10, textTransform: "uppercase", background: "none", border: "1px solid #000000", padding: "4px 8px", borderRadius: 12, color: "#000000", fontWeight: 600, cursor: "pointer" }}
                >
                  Sign Out
                </button>
              </div>
            ) : null}

            <Link
              to="/rooms"
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
            </Link>
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

        {/* Rooms Mega Menu Pop-down */}
        <RoomsMegaMenu
          isOpen={megaMenuOpen}
          onClose={() => setMegaMenuOpen(false)}
          onSelectLocation={handleSelectLocation}
        />

        {/* Mobile Main Menu Dropdown */}
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
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--lp-border)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                padding: "20px 24px 24px",
              }}
            >
              <div className="flex flex-col gap-1">
                {[...NAV_LINKS, "Reservation"].map((link) => {
                  const isHome = link === "Home";
                  const isRooms = link === "Rooms";
                  const isReservation = link === "Reservation";
                  const isAbout = link === "About";
                  const isContact = link === "Contact";
                  const isAdmin = link === "Admin";
                  const isExplore = (link as string) === "Explore Le Prestige" || (link as string) === "Explore";
                  const targetPath = isHome ? "/" : isRooms || isReservation ? "/rooms" : isAbout ? "/about" : isContact ? "/contact" : isAdmin ? "/admin" : isExplore ? "/explore" : `/#${link.toLowerCase().replace(/\s+/g, "-")}`;
                  
                  if (isRooms) {
                    return (
                      <div key={link} className="border-b border-[var(--lp-border-light)] py-3">
                        <div className="text-[13px] font-bold tracking-[0.12em] text-[var(--lp-heading)] uppercase mb-2">
                          ROOMS
                        </div>
                        <div className="flex flex-col gap-2 pl-3">
                          <button
                            onClick={() => handleSelectLocation("pondicherry")}
                            className="text-left py-2 text-xs font-semibold text-[var(--lp-heading)] hover:text-[var(--lp-accent)] uppercase tracking-wider flex items-center gap-2 bg-transparent border-none"
                          >
                            <span>•</span> PONDICHERRY
                          </button>
                          <button
                            onClick={() => handleSelectLocation("tindivanam")}
                            className="text-left py-2 text-xs font-semibold text-[var(--lp-heading)] hover:text-[var(--lp-accent)] uppercase tracking-wider flex items-center gap-2 bg-transparent border-none"
                          >
                            <span>•</span> TINDIVANAM
                          </button>
                        </div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={link}
                      to={targetPath}
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
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  )
}

