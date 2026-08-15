import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const spaces = [
  { label: "Exterior", src: "/images/extrior.jpeg", span: "col-span-1 md:col-span-2 row-span-2", ratio: "aspect-[16/9]" },
  { label: "Reception", src: "/images/receptions.jpeg", span: "col-span-1", ratio: "aspect-[4/5]" },
  { label: "Lobby", src: "/images/lobby.jpeg", span: "col-span-1", ratio: "aspect-[4/5]" },
  { label: "Luxury Corridor", src: "/images/corridor.jpeg", span: "col-span-1 md:col-span-2", ratio: "aspect-[21/9]" },
  { label: "Deluxe Room Showcase", src: "/images/Delux room.jpeg", span: "col-span-1 md:col-span-2", ratio: "aspect-[16/9]" },
  { label: "Twin Room Showcase", src: "/images/Twin bed.jpeg", span: "col-span-1", ratio: "aspect-square" },
  { label: "Premium Room", src: "/images/room.jpeg", span: "col-span-1 md:col-span-2", ratio: "aspect-[16/9]" },
  { label: "Bathroom", src: "/images/bathroom .jpeg", span: "col-span-1", ratio: "aspect-[4/5]" },
  { label: "Balcony", src: "/images/balcony.jpeg", span: "col-span-1", ratio: "aspect-[4/5]" },
  { label: "Restaurant", src: "/images/resturant.jpg", span: "col-span-1 md:col-span-2", ratio: "aspect-[16/9]" },
  { label: "Interior Details", src: "/images/details.jpeg", span: "col-span-1 md:col-span-3", ratio: "aspect-[21/9]" },
]

export default function ExploreSpaces() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1440px]">
        
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Explore Every Corner
            </h2>
            <p className="text-[var(--lp-body)] text-base md:text-lg leading-relaxed font-light">
              Take a visual journey through our thoughtfully designed spaces, where every detail is meticulously curated to provide a truly luxurious experience.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
          {spaces.map((space, idx) => (
            <FadeUp key={idx} delay={(idx % 3) * 0.15} className={`${space.span}`}>
              <motion.div 
                whileHover="hover"
                initial="rest"
                className={`relative overflow-hidden rounded-[24px] bg-[#F8F4EE] group w-full shadow-lg ${space.ratio}`}
              >
                <motion.img 
                  variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.05 }
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={space.src} 
                  alt={space.label}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <motion.div 
                  variants={{
                    rest: { opacity: 0 },
                    hover: { opacity: 1 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8"
                >
                  <span style={{ fontFamily: "var(--font-heading)" }} className="text-white text-2xl md:text-3xl font-medium tracking-wide">
                    {space.label}
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
