import { MapPin, Phone } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"
import { GOOGLE_MAPS_EMBED, GOOGLE_MAPS_LINK } from "@/constants/hotel"

export default function ContactMap() {
  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 max-w-[1240px]">

        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span 
              style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }} 
              className="text-[11px] tracking-[0.2em] uppercase font-bold mb-4 block"
            >
              FIND US
            </span>
            <h2
              className="text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your Journey Starts Here
            </h2>
            <p 
              className="text-[#6E6E6E] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Find Le Prestige Residency and plan your arrival with ease.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-[#E8DDD3] bg-white flex flex-col lg:flex-row">
            
            {/* Map Info Overlay (Stacked on mobile, side panel on desktop) */}
            <div className="w-full lg:w-1/3 bg-[#F8F4EF] p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E8DDD3]">
              <div className="mb-8">
                <h4
                  className="text-2xl font-medium text-[#1F1F1F] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Le Prestige Residency
                </h4>
                <p 
                  className="text-[#B98A5C] text-xs tracking-widest uppercase font-bold mb-6" 
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Puducherry
                </p>
                <div className="flex items-start gap-4 mb-6">
                  <MapPin size={18} className="text-[#6E6E6E] shrink-0 mt-1" />
                  <p className="text-[#6E6E6E] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    Villianur Main Road<br />
                    Kamban Nagar<br />
                    Reddiarpalayam<br />
                    Puducherry – 605010
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-[#6E6E6E] shrink-0" />
                  <a href="tel:+919677751329" className="text-[#6E6E6E] text-sm hover:text-[#B98A5C] transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                    +91 96777 51329
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#1F1F1F", fontFamily: "var(--font-body)" }}
                  className="w-full py-4 rounded-lg text-xs tracking-widest uppercase font-bold text-white transition-all duration-300 hover:bg-[#333333] flex items-center justify-center text-center"
                >
                  Open Google Maps
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=Le+Prestige+Residency+Puducherry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-body)" }}
                  className="w-full py-4 rounded-lg text-xs tracking-widest uppercase font-bold text-[#1F1F1F] border border-[#E8DDD3] bg-white transition-all duration-300 hover:border-[#C89B67] flex items-center justify-center text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[500px]">
              <iframe
                src={GOOGLE_MAPS_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Le Prestige Residency Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
