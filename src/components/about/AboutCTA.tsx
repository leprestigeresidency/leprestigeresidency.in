import { motion } from "framer-motion"
import { HOTEL } from "@/constants/hotel"
import Button from "@/components/ui/Button"
import FadeUp from "@/components/animations/FadeUp"

export default function AboutCTA() {
  return (
    <section
      id="about-cta"
      className="relative py-32 flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-[#262626]"
        style={{
          backgroundImage: "url('/images/Bed room.jpeg')", // Or another luxury image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#262626]/80 via-[#262626]/70 to-[#262626]/90 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-3xl text-center">
        <FadeUp>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            {HOTEL.name}
          </p>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Experience <br />
            <em style={{ color: "rgba(199,165,107,0.9)" }}>Le Prestige Residency</em>
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 48,
              lineHeight: 1.7,
              maxWidth: "40rem",
              marginInline: "auto",
            }}
          >
            Whether you're visiting Puducherry for business or leisure, discover elegant accommodations, thoughtful hospitality, and memorable comfort designed around you.
          </p>
        </FadeUp>
        
        <FadeUp delay={0.3}>
          <motion.div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button to="/rooms?book=true" variant="primary" size="lg">
              Reserve Your Stay
            </Button>
            <Button to="/rooms" variant="outline-light" size="lg">
              Explore Rooms
            </Button>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  )
}
