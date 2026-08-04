// ── Le Prestige — Gallery Section ───────────────────────────────

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, staggerItem } from "@/constants/animation"
import SectionHeading from "@/components/common/SectionHeading"
import ImgPlaceholder from "@/components/common/ImgPlaceholder"
import { GALLERY_ITEMS } from "@/data/branches"

function GalleryFrame({
  ratio,
  label,
  src,
  onClick,
}: {
  ratio: string
  label: string
  src?: string
  onClick?: () => void
}) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      variants={staggerItem}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        breakInside: "avoid",
        marginBottom: 16,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transform: hover ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      <ImgPlaceholder ratio={ratio} label={label} src={src} className="w-full" />
      {hover && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(27,26,24,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
               fontSize: 12,
              letterSpacing: "0.16em",
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            View Full
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section
      id="gallery"
      style={{
        background: "var(--lp-bg)",
        padding: "var(--space-14) var(--container-padding)",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <SectionHeading
          eyebrow="The Gallery"
          title="Hotel Gallery"
          centered
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="gallery-grid"
          style={{ columns: 3, columnGap: 16, minWidth: 0 }}
        >
          {GALLERY_ITEMS.map((g, i) => (
            <GalleryFrame
              key={i}
              ratio={g.ratio}
              label={g.label}
              src={g.src}
              onClick={() => g.src && setActiveImage(g.src)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(10, 10, 9, 0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
              cursor: "pointer",
            }}
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: 20,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FFFFFF"
                e.currentTarget.style.color = "#000000"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
                e.currentTarget.style.color = "#FFFFFF"
              }}
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>

            {/* Full Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={{
                position: "relative",
                maxWidth: "90%",
                maxHeight: "85vh",
                overflow: "hidden",
                borderRadius: 16,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                pointerEvents: "auto",
              }}
              onClick={(e) => e.stopPropagation()} // Keep lightbox open when clicking the image itself
            >
              <img
                src={activeImage}
                alt="Enlarged gallery view — Le Prestige"
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 16,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
