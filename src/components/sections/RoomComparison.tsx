import { motion } from "framer-motion"
import { Check } from "lucide-react"
const features = [
  { name: "Bed Type", deluxe: "King Size Bed", twin: "2 Single Beds" },
  { name: "Room Size", deluxe: "320 sq.ft", twin: "360 sq.ft" },
  { name: "Max Guests", deluxe: "2 Adults + 1 Child", twin: "2 Adults" },
  { name: "Starting Rate", deluxe: "₹4,500", twin: "₹4,000" },
  { name: "Free WiFi", deluxe: true, twin: true },
  { name: "Smart TV", deluxe: true, twin: true },
  { name: "Air Conditioning", deluxe: true, twin: true },
  { name: "Room Service", deluxe: true, twin: true },
  { name: "Daily Housekeeping", deluxe: true, twin: true },
]
export default function RoomComparison() {
  return (
    <section className="py-24 bg-[var(--lp-bg)]">
      <div className="container mx-auto px-6 max-w-[1000px]">
        
        <div className="text-center mb-16">
          <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-4">Compare</h4>
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Room Comparison
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--lp-bg-alt)] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-[var(--lp-border)]"
        >
          <div className="grid grid-cols-3 bg-[#262626] text-white">
            <div className="p-6 font-semibold text-xs uppercase tracking-widest text-[#a3988b]">Feature</div>
            <div className="p-6 font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>Deluxe Room</div>
            <div className="p-6 font-semibold text-lg" style={{ fontFamily: "var(--font-heading)" }}>Twin Room</div>
          </div>
          
          <div className="flex flex-col">
            {features.map((item, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-3 ${idx !== features.length - 1 ? 'border-b border-[var(--lp-border)]' : ''} ${idx % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}
              >
                <div className="p-6 text-[var(--lp-body)] text-sm">{item.name}</div>
                <div className="p-6 text-[var(--lp-heading)] text-sm font-medium flex items-center">
                  {typeof item.deluxe === "boolean" ? (
                    item.deluxe ? <Check size={18} className="text-[var(--lp-accent)]" /> : "-"
                  ) : (
                    item.deluxe
                  )}
                </div>
                <div className="p-6 text-[var(--lp-heading)] text-sm font-medium flex items-center">
                  {typeof item.twin === "boolean" ? (
                    item.twin ? <Check size={18} className="text-[var(--lp-accent)]" /> : "-"
                  ) : (
                    item.twin
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
