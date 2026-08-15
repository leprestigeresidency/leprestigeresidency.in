import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const cards = [
  {
    title: "CALL US",
    detail: "+91 96777 51329",
    sub: "Reservation & Guest Assistance",
    action: "Call Reception",
    href: "tel:+919677751329",
  },
  {
    title: "EMAIL US",
    detail: "reservations@leprestigeresidency.in",
    sub: "Reservations & Enquiries",
    action: "Send Email",
    href: "mailto:reservations@leprestigeresidency.in",
  },
  {
    title: "VISIT US",
    detail: "Le Prestige Residency\nLocated in: TRENDS",
    sub: "Villianur Main Road\nKamban Nagar\nReddiarpalayam\nPuducherry – 605010",
    action: "Get Directions",
    href: "https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8",
  },
]

export default function ContactQuickCards() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4EF]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <span 
              style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }} 
              className="text-[11px] tracking-[0.2em] uppercase font-bold mb-4 block"
            >
              GET IN TOUCH
            </span>
            <h2 
              className="text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-6" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let's Connect
            </h2>
            <p 
              className="text-[#6E6E6E] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Have a question about your stay?
              Our team is here to make your experience simple and comfortable.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <FadeUp key={idx} delay={idx * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#FFFFFF] rounded-xl p-8 md:p-10 border border-[#E8DDD3] shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center text-center h-full transition-shadow duration-300 hover:shadow-xl"
              >
                <h3
                  className="text-xs tracking-[0.15em] font-semibold text-[#B98A5C] mb-6 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.title}
                </h3>
                
                <div className="flex-1 flex flex-col items-center justify-center mb-8">
                  <p
                    className="text-xl md:text-2xl text-[#1F1F1F] mb-4 whitespace-pre-line"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {card.detail}
                  </p>
                  <p 
                    className="text-[#6E6E6E] text-sm whitespace-pre-line leading-relaxed" 
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {card.sub}
                  </p>
                </div>

                <a 
                  href={card.href} 
                  target={card.title === "VISIT US" ? "_blank" : undefined} 
                  rel={card.title === "VISIT US" ? "noopener noreferrer" : undefined}
                  style={{ fontFamily: "var(--font-body)" }}
                  className="mt-auto text-[#1F1F1F] text-xs uppercase tracking-widest font-semibold border-b border-[#E8DDD3] pb-1 hover:border-[#B98A5C] hover:text-[#B98A5C] transition-colors duration-300"
                >
                  {card.action}
                </a>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
