import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"
import { 
  Wifi, Wind, Clock, Sparkles, BedDouble, ArrowUpSquare, 
  Car, Zap, Droplets, Tv, ShieldCheck, Heart
} from "lucide-react"

const amenities = [
  { icon: Wifi, title: "Free WiFi" },
  { icon: Wind, title: "Air Conditioning" },
  { icon: Clock, title: "24×7 Reception" },
  { icon: Sparkles, title: "Daily Housekeeping" },
  { icon: BedDouble, title: "Premium Bedding" },
  { icon: ArrowUpSquare, title: "Lift Access" },
  { icon: Car, title: "Parking" },
  { icon: Zap, title: "Power Backup" },
  { icon: Droplets, title: "Hot Water" },
  { icon: Tv, title: "Smart TV" },
  { icon: ShieldCheck, title: "Security" },
  { icon: Heart, title: "Luxury Hospitality" },
]

export default function ExploreAmenities() {
  return (
    <section className="py-24 md:py-32 bg-[url('/images/extrior.jpeg')] bg-cover bg-center bg-fixed relative">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span style={{ fontFamily: "var(--font-body)", color: "#C89B67" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
              The Standard
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Premium Amenities
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {amenities.map((amenity, idx) => (
            <FadeUp key={idx} delay={idx * 0.05}>
              <motion.div 
                whileHover="hover"
                initial="rest"
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center group cursor-default h-full"
              >
                <motion.div
                  variants={{
                    rest: { scale: 1, y: 0, color: "rgba(255,255,255,0.7)" },
                    hover: { scale: 1.1, y: -5, color: "#C89B67" }
                  }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <amenity.icon size={32} strokeWidth={1.5} />
                </motion.div>
                <h4 className="text-white/90 font-medium tracking-wide text-sm">
                  {amenity.title}
                </h4>
              </motion.div>
            </FadeUp>
          ))}
        </div>
        
      </div>
    </section>
  )
}
