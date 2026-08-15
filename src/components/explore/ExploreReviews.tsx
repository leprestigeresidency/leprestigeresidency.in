import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"
import { Star, Quote } from "lucide-react"

const featuredReview = {
  text: "Absolutely phenomenal experience! The rooms are incredibly luxurious, the staff is very welcoming, and the location is perfect. Every detail was thoughtfully curated to make our stay comfortable. We will definitely be coming back.",
  author: "Sarah Mitchell",
  type: "Couple Stay",
}

const smallReviews = [
  {
    text: "The best boutique hotel in Puducherry. Exceptional service and beautiful interiors.",
    author: "Rahul Verma",
    rating: 5,
  },
  {
    text: "Loved the luxurious ambiance and the 24x7 reception. Highly recommended!",
    author: "Anita Desai",
    rating: 5,
  },
  {
    text: "A perfect weekend getaway. The deluxe room was spacious and spotlessly clean.",
    author: "James Wilson",
    rating: 5,
  }
]

export default function ExploreReviews() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F8F4EE] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Featured Review & Google Rating */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <FadeUp>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
                Guest Experiences
              </span>
              <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-4xl md:text-5xl font-medium mb-12">
                What Our Guests Say
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative mb-12">
                <Quote size={64} className="absolute -top-6 -left-4 text-[#F8F4EE] -z-10" />
                <div className="flex gap-1 mb-6 text-[#C89B67]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-heading)" }} className="text-2xl md:text-3xl leading-snug text-[var(--lp-heading)] mb-8">
                  "{featuredReview.text}"
                </p>
                <div>
                  <p className="font-bold text-[var(--lp-heading)] tracking-wide">{featuredReview.author}</p>
                  <p className="text-sm text-[var(--lp-muted)] mt-1">{featuredReview.type}</p>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex items-center gap-6 p-6 rounded-2xl border border-[var(--lp-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center bg-[#F8F4EE] w-20 h-20 rounded-xl">
                  <span className="text-3xl font-bold text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-heading)" }}>4.8</span>
                  <div className="flex text-[#C89B67]">
                    <Star size={10} fill="currentColor" strokeWidth={0} />
                    <Star size={10} fill="currentColor" strokeWidth={0} />
                    <Star size={10} fill="currentColor" strokeWidth={0} />
                    <Star size={10} fill="currentColor" strokeWidth={0} />
                    <Star size={10} fill="currentColor" strokeWidth={0} />
                  </div>
                </div>
                <div>
                  <p className="text-[var(--lp-heading)] font-semibold mb-1">Google Reviews</p>
                  <p className="text-sm text-[var(--lp-muted)] mb-3">Based on 300+ reviews</p>
                  <a 
                    href="https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider text-[var(--lp-accent)] hover:text-[#a84d2f] underline underline-offset-4"
                  >
                    View All Reviews
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: Smaller Reviews */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6 justify-center">
            {smallReviews.map((review, idx) => (
              <FadeUp key={idx} delay={0.3 + (idx * 0.1)}>
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="bg-white border border-[var(--lp-border)] p-8 rounded-[24px] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1 text-[#C89B67]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <Quote size={24} className="text-[#F8F4EE]" />
                  </div>
                  <p style={{ fontFamily: "var(--font-body)" }} className="text-[var(--lp-body)] text-lg leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                  <p className="font-bold text-[var(--lp-heading)] tracking-wide text-sm">{review.author}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
