import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import FadeUp from "@/components/animations/FadeUp"

export default function ContactHero() {
  return (
    <section className="relative w-full h-[75vh] min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: "url('/images/receptions.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F1F1F]/70 via-[#1F1F1F]/40 to-[#1F1F1F]/85" />
      </motion.div>

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
          CONTACT
        </motion.h1>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1240px] text-center flex flex-col items-center">
        <FadeUp delay={0.2}>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B67]" />
            <span style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white/90 uppercase tracking-[0.25em] font-semibold">
              CONTACT LE PRESTIGE
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <h1
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff", textShadow: "0 4px 25px rgba(0,0,0,0.5)" }}
            className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] max-w-5xl font-light"
          >
            We’re Here <br />
            <em style={{ color: "#C89B67" }} className="not-italic italic">To Welcome You</em>
          </h1>
        </FadeUp>

        <FadeUp delay={0.6}>
          <p
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.85)" }}
            className="text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Whether you are planning your stay, looking for assistance, or simply want to know more about Le Prestige Residency, our team is always ready to help.
          </p>
        </FadeUp>

        <FadeUp delay={0.8}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              to="/rooms?book=true"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "#C89B67",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(200,155,103,0.3)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-[#a3794e] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto flex items-center justify-center"
            >
              Book Your Stay
            </Link>
            <a
              href="tel:+919677751329"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(10px)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto flex items-center justify-center"
            >
              Call Reception
            </a>
          </div>
        </FadeUp>
      </div>

      {/* Scroll Indicator */}
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
