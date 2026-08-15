import { motion } from "framer-motion"
import { MapPin, Gem, Wifi, Clock, Coffee, Sparkles, Bath, ShieldCheck } from "lucide-react"

const features = [
  { name: "Prime Location", icon: MapPin },
  { name: "Luxury Interiors", icon: Gem },
  { name: "High-Speed WiFi", icon: Wifi },
  { name: "24×7 Reception", icon: Clock },
  { name: "Complimentary Breakfast", icon: Coffee },
  { name: "Daily Housekeeping", icon: Sparkles },
  { name: "Modern Bathrooms", icon: Bath },
  { name: "Secure Parking", icon: ShieldCheck },
]

export default function WhyChoose() {
  return (
    <section className="py-24 bg-[#F3EEE7]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <div className="text-center mb-16">
          <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-4">Why Le Prestige</h4>
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Designed Around Your Comfort
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--lp-bg)] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-[var(--lp-border)]"
            >
              <div className="mb-4 text-[#C7A56B]">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[var(--lp-heading)] text-[15px] font-medium">{item.name}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
