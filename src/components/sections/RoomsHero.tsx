import { motion } from "framer-motion"
import { RoomType } from "@/context/BookingContext"

import { RoomData, LocationData } from "@/data/roomsData"

interface RoomsHeroProps {
  onBook: (type: RoomType) => void
  location: LocationData
  rooms: RoomData[]
}

export default function RoomsHero({ onBook, location, rooms }: RoomsHeroProps) {
  const totalRooms = rooms.length * 10; // Mock statistic for design
  
  return (
    <section className="relative w-full min-h-[550px] h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div 
        className="absolute inset-0 z-0 bg-[#e5ded5]"
        style={{
          backgroundImage: `url('${location.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#262626]/70 via-[#262626]/30 to-[#262626]/80 mix-blend-multiply" />
      </div>

      {/* Background Typography */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.08, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(8rem, 20vw, 25rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {location.name.toUpperCase()}
        </motion.h1>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1240px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <h1 
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff", textShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            className="text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight"
          >
            Exceptional Comfort.
          </h1>
          
          <p 
            style={{ fontFamily: "var(--font-body)", color: "rgba(255, 255, 255, 0.9)" }}
            className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
          >
            Elegant accommodations thoughtfully designed for your stay in {location.name}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 flex-wrap">
            {rooms.slice(0, 2).map((room, idx) => (
              <button 
                key={idx}
                onClick={() => onBook(room.type)}
                style={{
                  fontFamily: "var(--font-body)",
                  backgroundColor: "#8B4513",
                  color: "#ffffff",
                  boxShadow: "0 10px 30px rgba(139, 69, 19, 0.3)",
                }}
                className="px-8 py-4 rounded-full text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 hover:bg-[#5C2E0C] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8B4513]/40 w-full sm:w-auto flex items-center justify-center gap-3"
              >
                Book {room.type} Room
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Statistics Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          background: "rgba(248, 244, 238, 0.95)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--lp-border)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          willChange: "transform, opacity",
        }}
        className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20 rounded-xl p-4 md:p-5 flex flex-row gap-4 md:gap-6 items-center justify-between w-[calc(100%-2rem)] md:w-auto overflow-x-auto"
      >
        <div className="text-center md:text-left">
          <p style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-2xl md:text-3xl font-bold mb-1">{totalRooms}</p>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-[10px] uppercase tracking-widest font-semibold">Rooms</p>
        </div>
        <div className="w-[1px] h-8 bg-[#e5ded5]" />
        
        {rooms.slice(0, 2).map((room, idx) => (
          <div key={idx} className="flex flex-row gap-4 md:gap-6 items-center">
            <div className="text-center md:text-left">
              <p style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-2xl md:text-3xl font-bold mb-1">{Math.floor(totalRooms / (idx + 1.2))}</p>
              <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-[10px] uppercase tracking-widest font-semibold">{room.type}</p>
            </div>
            {idx === 0 && <div className="w-[1px] h-8 bg-[#e5ded5]" />}
          </div>
        ))}

        <div className="w-[1px] h-8 bg-[#e5ded5] hidden md:block" />
        <div className="hidden md:block text-center md:text-left">
          <div className="flex gap-1 text-[#C7A56B] mb-1 text-sm">
            ★★★★★
          </div>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-[10px] uppercase tracking-widest font-semibold">Guest Rating</p>
        </div>
      </motion.div>
    </section>
  )
}
