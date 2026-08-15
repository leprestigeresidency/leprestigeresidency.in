import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const moments = [
  { src: "/images/Hotel Expreince.jpeg", caption: "Guest Experience", className: "col-span-1 row-span-2 aspect-[3/4]" },
  { src: "/images/lobby.jpeg", caption: "Welcoming Lobby", className: "col-span-1 row-span-1 aspect-square" },
  { src: "/images/resturant.jpg", caption: "Fine Dining", className: "col-span-1 row-span-1 aspect-square" },
  { src: "/images/extrior.jpeg", caption: "Iconic Exterior", className: "col-span-2 md:col-span-1 row-span-2 aspect-[3/4]" },
  { src: "/images/balcony.jpeg", caption: "City Views", className: "col-span-1 row-span-1 aspect-square" },
  { src: "/images/room.jpeg", caption: "Premium Comfort", className: "col-span-1 row-span-1 aspect-square" },
]

export default function ExploreMoments() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1440px]">
        
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Guest Moments
            </h2>
            <p className="text-[var(--lp-body)] text-base md:text-lg leading-relaxed font-light">
              Glimpses of life at Le Prestige Residency, where every moment is a memory waiting to be made.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 auto-rows-min">
          {moments.map((moment, idx) => (
            <FadeUp key={idx} delay={idx * 0.1} className={moment.className}>
              <motion.div 
                whileHover="hover"
                initial="rest"
                className="w-full h-full relative group overflow-hidden bg-[#F8F4EE]"
              >
                <motion.img 
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={moment.src} 
                  alt={moment.caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Elegant Caption Overlay */}
                <motion.div 
                  variants={{
                    rest: { opacity: 0, y: 10 },
                    hover: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-black/40 flex items-end justify-center p-6"
                >
                  <span style={{ fontFamily: "var(--font-heading)" }} className="text-white text-xl md:text-2xl font-medium tracking-wide">
                    {moment.caption}
                  </span>
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
        
      </div>
    </section>
  )
}
