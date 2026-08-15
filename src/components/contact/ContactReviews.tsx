import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"

const featured = {
  text: "Excellent hospitality, beautifully maintained rooms, professional staff, and a seamless booking experience. One of the best boutique stays in Puducherry.",
  author: "Verified Guest",
  type: "Business Traveller • Stayed in Deluxe Room",
}

const reviews = [
  { text: "Spotless rooms and friendly staff.", author: "Verified Guest" },
  { text: "Great location and peaceful stay.", author: "Verified Guest" },
  { text: "Affordable luxury with premium service.", author: "Verified Guest" },
]

export default function ContactReviews() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F8F4EE] rounded-full blur-3xl opacity-50 -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">

        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              What Our Guests Say
            </h2>
            <p className="text-[#6E6E6E] text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Trusted by hundreds of guests who experienced exceptional comfort and hospitality.
            </p>
          </div>
        </FadeUp>

        {/* Featured Review */}
        <FadeUp delay={0.2}>
          <div className="bg-[#F8F4EE] rounded-[24px] p-10 md:p-14 mb-10 border border-[#E7DDD3] relative">
            <Quote size={64} className="absolute top-6 right-8 text-[#E7DDD3] opacity-50" />
            <div className="flex gap-1 mb-6 text-[#C89B67]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={22} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p style={{ fontFamily: "var(--font-heading)" }} className="text-2xl md:text-3xl leading-snug text-[#1F1F1F] mb-8 max-w-3xl">
              "{featured.text}"
            </p>
            <p className="font-bold text-[#1F1F1F] tracking-wide">{featured.author}</p>
            <p className="text-sm text-[#6E6E6E] mt-1">{featured.type}</p>
          </div>
        </FadeUp>

        {/* Smaller Reviews + Google Rating */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <FadeUp key={idx} delay={0.3 + idx * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white border border-[#E7DDD3] rounded-[20px] p-7 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
              >
                <div className="flex gap-1 mb-4 text-[#C89B67]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-[#1F1F1F] text-sm leading-relaxed mb-6 flex-1" style={{ fontFamily: "var(--font-body)" }}>
                  "{review.text}"
                </p>
                <p className="font-bold text-[#1F1F1F] text-sm tracking-wide">{review.author}</p>
              </motion.div>
            </FadeUp>
          ))}

          {/* Google Rating */}
          <FadeUp delay={0.6}>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#1F1F1F] rounded-[20px] p-7 flex flex-col items-center justify-center text-center h-full"
            >
              <div className="flex gap-1 mb-3 text-[#C89B67]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                4.8 / 5
              </p>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-6">300+ Verified Reviews</p>
              <a
                href="https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-wider text-[#C89B67] hover:text-white underline underline-offset-4 transition-colors"
              >
                View Google Reviews
              </a>
            </motion.div>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}
