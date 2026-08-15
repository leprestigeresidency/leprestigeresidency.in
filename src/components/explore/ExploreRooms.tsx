import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import FadeUp from "@/components/animations/FadeUp"

const rooms = [
  {
    name: "Deluxe Room",
    count: "20 Rooms",
    weekdays: "₹3000",
    weekends: "₹3500",
    image: "/images/Delux room.jpeg",
  },
  {
    name: "Twin Room",
    count: "2 Rooms",
    weekdays: "₹3500",
    weekends: "₹4000",
    image: "/images/Twin bed.jpeg",
  }
]

export default function ExploreRooms() {
  return (
    <section className="py-24 md:py-32 bg-[#1A1A1A] relative overflow-hidden">
      {/* Dark Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C89B67]/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
        
        <FadeUp>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span style={{ fontFamily: "var(--font-body)", color: "#C89B67" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
              The Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Luxury Rooms
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
              Experience the pinnacle of comfort in our meticulously designed rooms, offering a blend of modern amenities and timeless elegance.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, idx) => (
            <FadeUp key={idx} delay={idx * 0.2}>
              <motion.div 
                whileHover="hover"
                initial="rest"
                className="bg-white rounded-[24px] overflow-hidden border border-[var(--lp-border)] hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <motion.img 
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full">
                    {room.count}
                  </div>
                </div>

                <div className="p-8 md:p-10">
                  <h3 className="text-3xl text-[var(--lp-heading)] font-medium mb-8" style={{ fontFamily: "var(--font-heading)" }}>
                    {room.name}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    <div className="flex-1 bg-[#F8F4EE] border border-[var(--lp-border)] rounded-2xl p-6 text-center">
                      <p className="text-[var(--lp-muted)] text-xs uppercase tracking-widest font-semibold mb-2">Weekdays</p>
                      <p className="text-2xl text-[var(--lp-heading)] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{room.weekdays}</p>
                      <p className="text-[#a3988b] text-[10px] uppercase tracking-wider">per night</p>
                    </div>
                    <div className="flex-1 bg-[#F8F4EE] border border-[var(--lp-border)] rounded-2xl p-6 text-center">
                      <p className="text-[var(--lp-muted)] text-xs uppercase tracking-widest font-semibold mb-2">Weekends</p>
                      <p className="text-2xl text-[var(--lp-heading)] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{room.weekends}</p>
                      <p className="text-[#a3988b] text-[10px] uppercase tracking-wider">per night</p>
                    </div>
                  </div>

                  <Link 
                    to="/rooms"
                    style={{ fontFamily: "var(--font-body)", backgroundColor: "#8B4513" }}
                    className="w-full py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 text-white hover:bg-[#5C2E0C] hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    View Room
                  </Link>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
        
      </div>
    </section>
  )
}
