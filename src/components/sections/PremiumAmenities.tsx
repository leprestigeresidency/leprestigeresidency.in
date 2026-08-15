import { motion } from "framer-motion"
import { Wifi, Thermometer, Tv, Coffee, Clock, Zap, Car, ConciergeBell, Sparkles, ArrowUpSquare, Laptop, Droplets } from "lucide-react"

const amenities = [
  { name: "Free WiFi", icon: Wifi },
  { name: "Air Conditioning", icon: Thermometer },
  { name: "Smart TV", icon: Tv },
  { name: "Complimentary Breakfast", icon: Coffee },
  { name: "24×7 Reception", icon: Clock },
  { name: "Power Backup", icon: Zap },
  { name: "Free Parking", icon: Car },
  { name: "Room Service", icon: ConciergeBell },
  { name: "Housekeeping", icon: Sparkles },
  { name: "Elevator", icon: ArrowUpSquare },
  { name: "Work Desk", icon: Laptop },
  { name: "Hot Water", icon: Droplets },
]

export default function PremiumAmenities() {
  return (
    <section className="py-24 bg-[var(--lp-bg)]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <div className="text-center mb-16">
          <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-4">Premium Amenities</h4>
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Everything You Need
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {amenities.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center text-center border border-[var(--lp-border)] hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-[#F3EEE7] flex items-center justify-center mb-4 text-[var(--lp-accent)] group-hover:bg-[var(--lp-accent)] group-hover:text-white transition-colors duration-300">
                <item.icon size={20} />
              </div>
              <p className="text-[var(--lp-heading)] text-sm font-medium">{item.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
