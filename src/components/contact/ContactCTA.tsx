import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

export default function ContactCTA() {
  return (
    <section className="relative w-full h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/extrior.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#1F1F1F]/70 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B98A5C]" />
            <span style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white uppercase tracking-[0.2em] font-bold">
              NEXT STEPS
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <h2
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            className="text-4xl md:text-5xl lg:text-6xl mb-6 font-medium leading-[1.1]"
          >
            Ready For A <br />
            <em style={{ color: "#B98A5C" }} className="not-italic italic">Perfect Stay?</em>
          </h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p
            className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Book directly with us for the best rates and exclusive offers.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              to="/rooms?book=true"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "#B98A5C",
                color: "#ffffff",
              }}
              className="px-10 py-4 rounded-lg text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:bg-[#a3784f] w-full sm:w-auto flex items-center justify-center shadow-lg"
            >
              Book Now
            </Link>
            <Link
              to="/rooms"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
              className="px-10 py-4 rounded-lg text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/60 w-full sm:w-auto flex items-center justify-center backdrop-blur-md"
            >
              View Rooms
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
