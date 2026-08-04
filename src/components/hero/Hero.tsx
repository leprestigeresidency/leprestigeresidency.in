// ── Le Prestige — Hero Section ──────────────────────────────────

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { HOTEL } from "@/constants/hotel"
import HeroImage from "./HeroImage"
import HeroContent from "./HeroContent"

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let gsapInstance: typeof import("gsap") | null = null

    const initGSAP = async () => {
      try {
        const gsapModule = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsapInstance = gsapModule
        gsapModule.gsap.registerPlugin(ScrollTrigger)

        if (!sectionRef.current) return

        // Parallax effect on hero image on scroll
        gsapModule.gsap.to(sectionRef.current.querySelector(".hero-image-wrap"), {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })

        // Fade out hero content on scroll
        gsapModule.gsap.to(sectionRef.current.querySelector(".hero-content-wrap"), {
          opacity: 0,
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        })
      } catch {
        // GSAP optional - graceful fallback
      }
    }

    initGSAP()

    return () => {
      if (gsapInstance) {
        try {
          const { ScrollTrigger } = gsapInstance as unknown as { ScrollTrigger: { getAll: () => Array<{ kill: () => void }> } }
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill())
          }
        } catch {
          // cleanup
        }
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        background: "#231F1D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Watermark text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: "clamp(40px, 12.5vw, 175px)",
            letterSpacing: "0.04em",
            color: "#fff",
            opacity: 0.08,
            whiteSpace: "nowrap",
            userSelect: "none",
            lineHeight: 1,
            textAlign: "center",
            maxWidth: "96vw",
          }}
        >
          {HOTEL.shortName}
        </span>
      </motion.div>

      {/* Hero image */}
      <div
        className="hero-image-wrap"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <HeroImage />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.55) 100%)",
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div className="hero-content-wrap" style={{ position: "relative", zIndex: 10 }}>
        <HeroContent />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 10,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            background: "rgba(255,255,255,0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="scroll-indicator-line"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "rgba(255,255,255,0.7)",
            }}
          />
        </div>
      </motion.div>
    </section>
  )
}
