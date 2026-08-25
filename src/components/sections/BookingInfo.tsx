import { motion } from "framer-motion"

const infoItems = [
  {
    category: "Check-in",
    title: "12:00 PM",
    description: "Early check-in subject to availability",
  },
  {
    category: "Check-out",
    title: "11:00 AM",
    description: "Late check-out on request",
  },
  {
    category: "Reservation",
    title: "Direct Booking",
    description: "Instant confirmation & seat hold",
  },
  {
    category: "Special Requests",
    title: "On Demand",
    description: "Specify requests during reservation",
  },
  {
    category: "Cancellation",
    title: "Flexible",
    description: "As per hotel policy",
  },
]

export default function BookingInfo() {
  return (
    <section className="py-24 bg-[var(--lp-bg-alt)]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <div className="text-center mb-16">
          <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-4">Booking Info</h4>
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Everything You Need Before Booking
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {infoItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[var(--lp-bg)] rounded-xl p-8 flex flex-col border border-[var(--lp-border)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <h4 className="text-[var(--lp-accent)] text-[10px] tracking-widest uppercase font-bold mb-6">{item.category}</h4>
              <p className="text-[var(--lp-heading)] text-xl font-medium mb-4" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</p>
              <p className="text-[var(--lp-body)] text-[13px] leading-relaxed mt-auto">{item.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
