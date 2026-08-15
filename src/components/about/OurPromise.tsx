import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"
import { Star } from "lucide-react"

const promises = [
  "Premium Comfort",
  "Personalized Hospitality",
  "Exceptional Cleanliness",
  "Peaceful Environment",
  "Professional Service",
  "Memorable Experiences"
]

export default function OurPromise() {
  return (
    <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
      {/* Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C7A56B]/10 via-transparent to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 w-full text-white">
            <FadeUp>
              <h2 
                style={{ fontFamily: "var(--font-heading)" }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-tight"
              >
                Every Stay.<br />
                Every Guest.<br />
                <em style={{ color: "#C7A56B" }}>Every Time.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p 
                style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.7)" }}
                className="text-base md:text-lg max-w-xl leading-relaxed"
              >
                At Le Prestige Residency, hospitality is more than a service—it's our promise. From your arrival to your departure, we are committed to delivering exceptional comfort, thoughtful attention, genuine care, and memorable experiences that make every guest feel at home.
              </p>
            </FadeUp>
          </div>

          {/* Right Cards */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {promises.map((promise, idx) => (
                <FadeUp key={idx} delay={0.3 + (idx * 0.1)}>
                  <motion.div 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(199, 165, 107, 0.1)" }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-colors duration-300 flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#C7A56B]/20 flex items-center justify-center shrink-0">
                      <Star size={18} className="text-[#C7A56B]" fill="currentColor" />
                    </div>
                    <span style={{ fontFamily: "var(--font-body)" }} className="text-white/90 font-medium text-sm md:text-base">
                      {promise}
                    </span>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
