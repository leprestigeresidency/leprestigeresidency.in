import { motion } from "framer-motion"
import { MapPin, ArrowRight } from "lucide-react"
import { LOCATIONS } from "@/data/roomsData"

interface RoomsLocationSectionProps {
  onSelectLocation: (locationId: string) => void
  currentLocationId: string
}

export default function RoomsLocationSection({
  onSelectLocation,
  currentLocationId,
}: RoomsLocationSectionProps) {
  return (
    <section className="py-20 bg-[#F5F1EA] border-t border-[var(--lp-border)]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--lp-accent)] block mb-3">
            EXPLORE RESIDENCES
          </span>
          <h2
            className="text-3xl md:text-5xl font-medium text-[var(--lp-heading)] tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            OUR LOCATIONS
          </h2>
          <div className="w-16 h-[2px] bg-[var(--lp-accent)] mx-auto mt-4" />
        </div>

        {/* 2-Column Grid (Desktop) / 1-Column Stacked (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {Object.values(LOCATIONS).map((loc) => {
            const isSelected = currentLocationId === loc.id

            return (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  isSelected
                    ? "border-[var(--lp-accent)] shadow-xl ring-2 ring-[var(--lp-accent)]/20"
                    : "border-[var(--lp-border)] shadow-sm hover:shadow-md"
                }`}
              >
                {/* Location Image */}
                <div className="h-64 sm:h-72 w-full relative overflow-hidden group">
                  <img
                    src={loc.heroImage}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-[var(--lp-accent)] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                      Currently Viewing
                    </div>
                  )}

                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-300 block">
                      Le Prestige Property
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-medium"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {loc.name}
                    </h3>
                  </div>
                </div>

                {/* Location Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-[var(--lp-body)] text-sm leading-relaxed mb-4">
                      {loc.description}
                    </p>
                    <div className="flex items-start gap-2 text-xs text-[var(--lp-heading)] font-medium">
                      <MapPin size={16} className="text-[var(--lp-accent)] flex-shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--lp-border)]/60 flex items-center justify-between">
                    <button
                      onClick={() => onSelectLocation(loc.id)}
                      className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-all cursor-pointer bg-transparent border-none ${
                        isSelected
                          ? "text-[var(--lp-accent)]"
                          : "text-[var(--lp-heading)] hover:text-[var(--lp-accent)]"
                      }`}
                    >
                      View Location Rooms
                      <ArrowRight size={16} />
                    </button>

                    <a
                      href={loc.mapUrl || `https://maps.google.com/?q=Le+Prestige+${loc.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--lp-muted)] hover:text-[var(--lp-heading)] underline font-medium"
                    >
                      Map & Directions
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
