import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"
import { BedDouble, MapPin, Sparkles, Wallet, Lock, Clock, Wifi, Star } from "lucide-react"

const reasons = [
  { icon: BedDouble, title: "Luxury Rooms" },
  { icon: MapPin, title: "Prime Location" },
  { icon: Sparkles, title: "Professional Hospitality" },
  { icon: Wallet, title: "Affordable Luxury" },
  { icon: Lock, title: "Secure Booking" },
  { icon: Clock, title: "24×7 Reception" },
  { icon: Wifi, title: "High Speed WiFi" },
  { icon: Star, title: "Premium Experience" },
]

export default function ExploreWhyChoose() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4EE]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Content & Grid */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
            <FadeUp>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
                The Advantage
              </span>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-4xl md:text-5xl font-medium mb-12 leading-[1.15]">
                Why Choose <br />
                <em style={{ color: "#C89B67" }}>Le Prestige?</em>
              </h2>
            </FadeUp>

            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {reasons.map((reason, idx) => (
                <FadeUp key={idx} delay={0.2 + (idx * 0.05)}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#C89B67]/30 flex items-center justify-center shrink-0 shadow-sm text-[#C89B67]">
                      <reason.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-[var(--lp-heading)] font-semibold text-sm md:text-base leading-snug pt-1" style={{ fontFamily: "var(--font-body)" }}>
                        {reason.title}
                      </h4>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Right: Decorative Images */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 order-1 lg:order-2 relative"
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl w-5/6 ml-auto z-10">
              <img 
                src="/images/room.jpeg"
                alt="Luxury Room"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            {/* Overlapping small image */}
            <div className="absolute bottom-10 left-0 w-1/2 aspect-square rounded-[24px] overflow-hidden shadow-2xl border-4 border-[#F8F4EE] z-20">
              <img 
                src="/images/lobby.jpeg"
                alt="Lobby"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
