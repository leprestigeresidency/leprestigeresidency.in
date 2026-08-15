import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const stats = [
  { label: "Premium Rooms", value: "22" },
  { label: "Reception", value: "24×7" },
  { label: "Experience", value: "Boutique" },
  { label: "Happy Guests", value: "10k+" },
]

export default function ExploreStory() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4EE] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Large Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-[24px] overflow-hidden aspect-[3/4] md:aspect-[4/5] shadow-2xl">
              <img 
                src="/images/about us.png"
                alt="Le Prestige Residency Interior"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <FadeUp>
              <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
                The Philosophy
              </span>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-[1.15]">
                Crafted For Comfort <br className="hidden md:block" />
                <em style={{ color: "#C89B67" }}>Designed For Luxury</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-base md:text-lg leading-relaxed mb-12 max-w-lg">
                At Le Prestige Residency, we have meticulously crafted an environment that blends timeless elegance with modern comfort. Every detail of our boutique hotel has been designed to offer a tranquil escape from the bustling city, ensuring that your stay is not just an accommodation, but a memorable hospitality experience.
              </p>
            </FadeUp>

            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {stats.map((stat, idx) => (
                <FadeUp key={idx} delay={0.3 + (idx * 0.1)}>
                  <div className="flex flex-col">
                    <span style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-4xl md:text-5xl font-medium mb-2">
                      {stat.value}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-muted)" }} className="text-xs uppercase tracking-widest font-semibold">
                      {stat.label}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
