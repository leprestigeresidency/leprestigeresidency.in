import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"

const faqs = [
  {
    question: "How can I make a reservation?",
    answer: "Reservations can be made directly through our website by clicking 'Book Your Stay', by calling our reception, or by sending us an email. We recommend booking in advance to ensure availability."
  },
  {
    question: "What are the check-in and check-out timings?",
    answer: "Our standard check-in time is 2:00 PM, and check-out is at 11:00 AM. Early check-in or late check-out can be requested, subject to availability."
  },
  {
    question: "Can I contact the hotel before my arrival?",
    answer: "Yes, you can contact us at any time before your arrival via phone or email for special requests, airport transfers, or any other assistance you may need."
  },
  {
    question: "How can I modify my booking?",
    answer: "To modify or cancel a booking, please contact our reservations team via phone or email. Note that modifications are subject to our cancellation policy and availability."
  },
  {
    question: "How can I contact reception?",
    answer: "Reception is available 24/7. You can call us directly at +91 96777 51329 from your personal phone or use the intercom in your room during your stay."
  },
  {
    question: "How can I find the hotel?",
    answer: "Le Prestige Residency is located in TRENDS, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry. You can find detailed directions and our Google Maps link in the 'Find Us' section above."
  }
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 md:py-32 bg-[#F8F4EF]">
      <div className="container mx-auto px-6 max-w-[800px]">
        
        <FadeUp>
          <div className="text-center mb-16">
            <span 
              style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }} 
              className="text-[11px] tracking-[0.2em] uppercase font-bold mb-4 block"
            >
              NEED TO KNOW
            </span>
            <h2 
              className="text-4xl md:text-5xl font-medium text-[#1F1F1F]" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>
        </FadeUp>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="bg-[#FFFFFF] rounded-xl border border-[#E8DDD3] overflow-hidden transition-colors duration-300 hover:border-[#B98A5C]/50">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 md:px-8 md:py-6 flex items-center justify-between focus:outline-none"
                  >
                    <h3 
                      className="text-left text-base md:text-lg font-medium text-[#1F1F1F] pr-4"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {faq.question}
                    </h3>
                    <div className="shrink-0 text-[#B98A5C]">
                      {isOpen ? <Minus size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0">
                          <p 
                            className="text-[#6E6E6E] text-sm md:text-base leading-relaxed"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
