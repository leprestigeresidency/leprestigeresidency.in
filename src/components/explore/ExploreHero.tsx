import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import FadeUp from "@/components/animations/FadeUp"

export default function ExploreHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[#F8F4EE]"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/images/explore.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Luxury dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/70 via-[#1F1F1F]/40 to-[#1F1F1F]/90 mix-blend-multiply" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1240px] text-center flex flex-col items-center pt-20">
        <FadeUp delay={0.2}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B67]" />
            <span style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white/90 uppercase tracking-[0.25em] font-semibold">
              Discover Le Prestige
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <h1 
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            className="text-5xl md:text-6xl lg:text-8xl mb-8 leading-[1.1] max-w-5xl"
          >
            Experience Luxury <br className="hidden md:block" />
            <em style={{ color: "rgba(200, 155, 103, 0.9)" }}>Beyond Expectations</em>
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.6}>
          <p 
            style={{ fontFamily: "var(--font-body)", color: "rgba(255, 255, 255, 0.85)" }}
            className="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Discover thoughtfully designed spaces, premium rooms, exceptional hospitality, and memorable stays at Le Prestige Residency.
          </p>
        </FadeUp>

        <FadeUp delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
            <Link 
              to="/rooms"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--lp-accent)",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(185, 138, 92, 0.3)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-[#a3794e] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto flex items-center justify-center"
            >
              Explore Rooms
            </Link>
            
            <Link 
              to="/rooms?book=true"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto flex items-center justify-center"
            >
              Book Your Stay
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
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
