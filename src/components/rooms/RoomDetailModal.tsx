import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Users, Bed, Maximize2, MapPin, Calendar } from "lucide-react"
import { RoomData, LocationData } from "@/data/roomsData"

interface RoomDetailModalProps {
  room: RoomData | null
  location: LocationData
  isOpen: boolean
  onClose: () => void
  onBookNow: (room: RoomData) => void
}

export default function RoomDetailModal({
  room,
  location,
  isOpen,
  onClose,
  onBookNow,
}: RoomDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [room])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !room) return null

  const handleBookClick = () => {
    onClose()
    onBookNow(room)
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#FBF9F6] w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col my-auto border border-[var(--lp-border)]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-3 bg-white/90 hover:bg-white text-[var(--lp-heading)] rounded-full shadow-md transition-all cursor-pointer border border-black/10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Gallery Section */}
        <div className="w-full bg-stone-900 relative">
          <div className="h-[280px] sm:h-[380px] md:h-[440px] w-full relative overflow-hidden">
            <img
              src={room.images[activeImageIndex] || room.images[0]}
              alt={`${room.name} image ${activeImageIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white z-10">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--lp-accent-light, #E87A5D)] flex items-center gap-1">
                  <MapPin size={14} /> {location.name} Property
                </span>
                <h3 
                  className="text-2xl sm:text-3xl font-medium mt-1 drop-shadow"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {room.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-300 uppercase tracking-widest block">From</span>
                <span className="text-2xl sm:text-3xl font-bold font-serif">
                  ₹{room.pricePerNight.toLocaleString()}
                </span>
                <span className="text-xs text-stone-300"> / night</span>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {room.images.length > 1 && (
            <div className="p-3 bg-stone-950 flex items-center justify-center gap-3 overflow-x-auto">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? "border-[var(--lp-accent)] scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10 flex flex-col gap-8">
          
          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-white border border-[var(--lp-border)] text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <Users size={20} className="text-[var(--lp-accent)] mb-1" />
              <span className="text-xs text-[var(--lp-muted)] uppercase tracking-wider font-semibold">Capacity</span>
              <span className="text-sm font-bold text-[var(--lp-heading)] mt-0.5">{room.capacity} Guests</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-x border-[var(--lp-border)]">
              <Bed size={20} className="text-[var(--lp-accent)] mb-1" />
              <span className="text-xs text-[var(--lp-muted)] uppercase tracking-wider font-semibold">Bedding</span>
              <span className="text-sm font-bold text-[var(--lp-heading)] mt-0.5">{room.bedType}</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <Maximize2 size={20} className="text-[var(--lp-accent)] mb-1" />
              <span className="text-xs text-[var(--lp-muted)] uppercase tracking-wider font-semibold">Room Size</span>
              <span className="text-sm font-bold text-[var(--lp-heading)] mt-0.5">{room.roomSize}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 
              className="text-lg font-semibold text-[var(--lp-heading)] mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Room Overview
            </h4>
            <p className="text-[var(--lp-body)] text-sm md:text-base leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h4 
              className="text-lg font-semibold text-[var(--lp-heading)] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Features & Amenities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {room.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[var(--lp-border)]/70">
                  <div className="w-5 h-5 rounded-full bg-[var(--lp-accent)]/10 text-[var(--lp-accent)] flex items-center justify-center flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-xs md:text-sm font-medium text-[var(--lp-heading)]">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-[var(--lp-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[var(--lp-muted)] uppercase tracking-widest block font-medium">Rate per night</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-serif text-[var(--lp-heading)]">
                  ₹{room.pricePerNight.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--lp-muted)]">+ taxes & charges</span>
              </div>
            </div>

            <button
              onClick={handleBookClick}
              className="w-full sm:w-auto px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase bg-[var(--lp-accent)] hover:bg-[var(--lp-accent-hover)] text-white shadow-lg shadow-[var(--lp-accent)]/30 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={16} />
              Book Now
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
