import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import FadeUp from "@/components/animations/FadeUp"

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[600px] h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-[#1F1F1F]"
        style={{
          backgroundImage: "url('/images/about us.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#181818]/80 via-[#181818]/65 to-[#181818]/90" />
      </div>

      {/* Background Typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.04, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(6rem, 18vw, 22rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          ABOUT US
        </motion.h1>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1240px] text-center flex flex-col items-center pt-24 pb-12">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B67]" />
            <span style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white/90 uppercase tracking-[0.25em] font-semibold">
              OUR HERITAGE & VISION
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <h1
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.15] font-light max-w-4xl"
          >
            Crafting Timeless Comfort & <br />
            <em style={{ color: "#C89B67" }} className="not-italic font-normal italic">Unrivaled Hospitality</em>
          </h1>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            Welcome to Le Prestige Boutique Hotel. Discover our dedication to refined interiors, personal warmth, and memorable stays in Puducherry.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
            <a
              href="#story"
              style={{ fontFamily: "var(--font-body)" }}
              className="px-8 py-3.5 rounded-full bg-[#C89B67] hover:bg-[#b08453] text-white text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl hover:-translate-y-0.5 w-full sm:w-auto text-center"
            >
              Our Story
            </a>
            <Link
              to="/rooms"
              style={{ fontFamily: "var(--font-body)" }}
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 w-full sm:w-auto text-center"
            >
              Explore Rooms
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 hidden sm:flex"
      >
        <span style={{ fontFamily: "var(--font-body)" }} className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-medium">Scroll</span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-[#C89B67]"
          />
        </div>
      </motion.div>
    </section>
  )
}

