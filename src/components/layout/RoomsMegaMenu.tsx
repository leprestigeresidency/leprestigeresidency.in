import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { MapPin } from "lucide-react"

interface RoomsMegaMenuProps {
  isOpen: boolean
  onClose: () => void
  onSelectLocation: (locationId: string) => void
}

export default function RoomsMegaMenu({ isOpen, onClose, onSelectLocation }: RoomsMegaMenuProps) {
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  // ESC key handler and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Check if the click target is the Rooms button in navbar
        const target = e.target as HTMLElement
        if (target.closest("[data-rooms-toggle='true']")) {
          return
        }
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleLocationClick = (locId: string) => {
    onSelectLocation(locId)
    onClose()
    navigate(`/rooms?location=${locId}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-3 rounded-2xl md:rounded-3xl border border-[var(--lp-border)] shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden"
          style={{
            background: "rgba(251, 249, 246, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6 py-6 md:py-8 flex flex-col items-center">
            {/* Header label */}
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-[var(--lp-accent)] mb-4 md:mb-6">
              ROOMS
            </span>

            {/* Location Options Container */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-0 border-t border-b border-[var(--lp-border)]/60 py-2 md:py-4">
              
              {/* PONDICHERRY Option */}
              <button
                onClick={() => handleLocationClick("pondicherry")}
                className="w-full md:w-1/2 min-h-[48px] py-4 md:py-6 px-6 flex items-center justify-center gap-3 group transition-colors hover:bg-[var(--lp-accent)]/5 rounded-xl md:rounded-2xl cursor-pointer border-none bg-transparent"
              >
                <MapPin size={18} className="text-[var(--lp-accent)] group-hover:scale-110 transition-transform" />
                <span 
                  className="text-sm md:text-lg tracking-[0.2em] font-medium text-[var(--lp-heading)] uppercase group-hover:text-[var(--lp-accent)] transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  PONDICHERRY
                </span>
              </button>

              {/* Divider (Horizontal on mobile, Vertical on Desktop) */}
              <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-[#D4CBC0]/70 my-1 md:my-0" />

              {/* TINDIVANAM Option */}
              <button
                onClick={() => handleLocationClick("tindivanam")}
                className="w-full md:w-1/2 min-h-[48px] py-4 md:py-6 px-6 flex items-center justify-center gap-3 group transition-colors hover:bg-[var(--lp-accent)]/5 rounded-xl md:rounded-2xl cursor-pointer border-none bg-transparent"
              >
                <MapPin size={18} className="text-[var(--lp-accent)] group-hover:scale-110 transition-transform" />
                <span 
                  className="text-sm md:text-lg tracking-[0.2em] font-medium text-[var(--lp-heading)] uppercase group-hover:text-[var(--lp-accent)] transition-colors"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  TINDIVANAM
                </span>
              </button>

            </div>

            <p className="text-[11px] md:text-xs text-[var(--lp-body)] mt-3 md:mt-4 text-center tracking-wider">
              Select a location to explore curated luxury rooms & suites
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
