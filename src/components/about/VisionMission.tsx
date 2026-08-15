import { motion } from "framer-motion"
import { Eye, Target } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"

export default function VisionMission() {
  return (
    <section className="py-24 bg-[#F3EEE7] relative">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Vision Card */}
          <FadeUp className="flex-1" delay={0.1}>
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[20px] p-10 lg:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7A56B]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-[#C7A56B]/20 transition-colors duration-500" />
              
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8F4EE] text-[#C7A56B] shadow-inner relative z-10">
                <Eye size={28} strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10">
                <h4 style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4">
                  OUR VISION
                </h4>
                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-3xl font-medium mb-6">
                  Inspiring Exceptional Hospitality
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-base leading-relaxed">
                  To become one of South India's most trusted boutique hospitality brands by delivering memorable guest experiences through elegant accommodations, personalized service, and unwavering commitment to excellence.
                </p>
              </div>
            </motion.div>
          </FadeUp>

          {/* Mission Card */}
          <FadeUp className="flex-1" delay={0.3}>
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-[20px] p-10 lg:p-14 shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C45A37]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 group-hover:bg-[#C45A37]/20 transition-colors duration-500" />
              
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F8F4EE] text-[#C45A37] shadow-inner relative z-10">
                <Target size={28} strokeWidth={1.5} />
              </div>
              
              <div className="relative z-10">
                <h4 style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4">
                  OUR MISSION
                </h4>
                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-3xl font-medium mb-6">
                  Delivering Comfort With Excellence
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-base leading-relaxed">
                  Our mission is to provide every guest with modern comforts, premium hospitality, thoughtful service, and a peaceful environment where every stay becomes an unforgettable experience.
                </p>
              </div>
            </motion.div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
