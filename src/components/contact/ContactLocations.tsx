import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"
import { BRANCHES } from "@/data/branches"
import { MapPin, Phone } from "lucide-react"

export default function ContactLocations() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4EF]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <FadeUp>
          <div className="text-center mb-16 md:mb-24">
            <span 
              style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }} 
              className="text-[11px] tracking-[0.2em] uppercase font-bold mb-4 block"
            >
              OUR LOCATIONS
            </span>
            <h2 
              className="text-4xl md:text-5xl font-medium text-[#1F1F1F] mb-6" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Visit Le Prestige
            </h2>
            <p 
              className="text-[#6E6E6E] text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Experience Le Prestige Residency across our locations.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {BRANCHES.map((branch, idx) => (
            <FadeUp key={branch.city} delay={idx * 0.2}>
              <div className="bg-[#FFFFFF] rounded-2xl p-8 md:p-12 border border-[#E8DDD3] h-full flex flex-col shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-xl transition-shadow duration-500">
                
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 
                      className="text-3xl text-[#1F1F1F] font-medium mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {branch.city}
                    </h3>
                    <span 
                      style={{ fontFamily: "var(--font-body)" }}
                      className="inline-block px-3 py-1 bg-[#F8F4EF] text-[#B98A5C] text-[10px] uppercase tracking-widest font-bold rounded-full"
                    >
                      {branch.tag}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#F8F4EF] flex items-center justify-center text-[#B98A5C]">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex-1">
                  <p 
                    className="text-[#6E6E6E] text-sm leading-relaxed mb-8"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {branch.description}
                  </p>

                  {branch.address && (
                    <div className="mb-6">
                      <h4 className="text-[#1F1F1F] text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Address
                      </h4>
                      <p className="text-[#6E6E6E] text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-body)" }}>
                        {branch.address}
                      </p>
                    </div>
                  )}

                  {branch.phone && (
                    <div className="mb-8">
                      <h4 className="text-[#1F1F1F] text-xs font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-body)" }}>
                        Phone
                      </h4>
                      <a href={`tel:${branch.phone.replace(/[\s-]/g, "")}`} className="text-[#B98A5C] text-sm hover:underline" style={{ fontFamily: "var(--font-body)" }}>
                        {branch.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-[#E8DDD3]">
                  {branch.address && (
                    <a 
                      href="https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-4 rounded-xl text-xs uppercase tracking-widest font-bold border border-[#E8DDD3] text-[#1F1F1F] hover:bg-[#F8F4EF] hover:border-[#C89B67]/30 transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      View Location
                    </a>
                  )}
                  {branch.phone && (
                    <a 
                      href={`tel:${branch.phone.replace(/[\s-]/g, "")}`}
                      className="flex-1 text-center flex items-center justify-center gap-2 py-4 rounded-xl text-xs uppercase tracking-widest font-bold bg-[#1F1F1F] text-white hover:bg-[#333333] hover:shadow-lg transition-all duration-300"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <Phone size={14} />
                      Call Branch
                    </a>
                  )}
                  {!branch.address && !branch.phone && (
                    <button 
                      disabled
                      className="flex-1 text-center py-4 rounded-xl text-xs uppercase tracking-widest font-bold bg-[#F8F4EF] text-[#6E6E6E] cursor-not-allowed opacity-70"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Opening Soon
                    </button>
                  )}
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
