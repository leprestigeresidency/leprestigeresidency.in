import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import FadeUp from "@/components/animations/FadeUp"

export default function ExploreCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#1F1F1F]">
      
      <div className="absolute inset-0 opacity-40 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C89B67]/20 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C89B67]" />
            <span style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white/90 uppercase tracking-[0.25em] font-semibold">
              Your Journey Awaits
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <h2 
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
            className="text-4xl md:text-5xl lg:text-7xl mb-12 leading-[1.1]"
          >
            Ready To Experience <br />
            <em style={{ color: "#C89B67" }}>Le Prestige Residency?</em>
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full">
            <Link 
              to="/rooms?book=true"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "var(--lp-accent)",
                color: "#ffffff",
                boxShadow: "0 10px 30px rgba(185, 138, 92, 0.3)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-[#a3794e] hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto flex items-center justify-center"
            >
              Reserve Your Stay
            </Link>
            
            <Link 
              to="/rooms"
              style={{
                fontFamily: "var(--font-body)",
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
              }}
              className="px-10 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-white/10 hover:border-white/50 w-full sm:w-auto flex items-center justify-center"
            >
              Explore Rooms
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
