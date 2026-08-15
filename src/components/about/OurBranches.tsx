import { motion } from "framer-motion"
import { Check, MapPin, Phone } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"
import Button from "@/components/ui/Button"

const puducherryFeatures = [
  "22 Premium Rooms",
  "Deluxe & Twin Rooms",
  "High-Speed WiFi",
  "Daily Housekeeping",
  "24×7 Reception",
  "Secure Parking",
  "Prime Location",
]

const tindivanamFeatures = [
  "Premium Accommodation",
  "Modern Interiors",
  "Business Friendly",
  "Family Friendly",
  "Complimentary WiFi",
  "Dedicated Guest Support",
  "Secure Environment",
]

export default function OurBranches() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <FadeUp>
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Visit Our Locations
            </h2>
            <p className="text-[var(--lp-body)] text-base md:text-lg leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Le Prestige Residency proudly welcomes guests through two premium destinations, offering the same signature hospitality and exceptional comfort.
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Puducherry Branch */}
          <FadeUp className="flex-1" delay={0.2}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#F8F4EE] rounded-[24px] p-8 md:p-12 h-full flex flex-col border border-[var(--lp-border)] hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-[#C89B67]/10 border border-[#C89B67]/30 text-[#C89B67] text-[10px] uppercase font-bold tracking-widest">
                Open 24×7
              </div>
              <div className="mb-8">
                <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-2 block">
                  PUDUCHERRY
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-3xl font-bold mb-4">
                  Le Prestige Residency
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-sm leading-relaxed mb-6">
                  Our flagship property located in Reddiarpalayam offers elegant accommodations, modern amenities, and personalized hospitality for business and leisure travellers.
                </p>
                <div className="h-[1px] w-full bg-[var(--lp-border)] my-6" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                  {puducherryFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-[#C7A56B] mt-0.5 shrink-0" size={16} />
                      <span className="text-sm font-medium text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-body)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-sm text-[var(--lp-body)]" style={{ fontFamily: "var(--font-body)" }}>
                    <MapPin className="text-[#C45A37] shrink-0 mt-0.5" size={18} />
                    <p>
                      Located in TRENDS<br />
                      Villianur Main Road<br />
                      Kamban Nagar, Reddiarpalayam<br />
                      Puducherry – 605010
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--lp-body)]" style={{ fontFamily: "var(--font-body)" }}>
                    <Phone className="text-[#C45A37] shrink-0" size={18} />
                    <p>+91 96777 51329</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <a
                  href="https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "#8B4513", fontFamily: "var(--font-body)" }}
                  className="w-full py-4 rounded-full text-[12px] tracking-[0.16em] uppercase font-bold text-white transition-all duration-300 hover:bg-[#5C2E0C] flex items-center justify-center gap-2 shadow-md"
                >
                  View Location
                </a>
              </div>
            </motion.div>
          </FadeUp>

          {/* Tindivanam Branch */}
          <FadeUp className="flex-1" delay={0.4}>
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#F8F4EE] rounded-[24px] p-8 md:p-12 h-full flex flex-col border border-[var(--lp-border)] hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-8 right-8 px-3 py-1 rounded-full bg-[#C89B67]/10 border border-[#C89B67]/30 text-[#C89B67] text-[10px] uppercase font-bold tracking-widest">
                Open 24×7
              </div>
              <div className="mb-8">
                <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-2 block">
                  TINDIVANAM
                </span>
                <h3 style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-3xl font-bold mb-4">
                  Le Prestige Residency
                </h3>
                <p style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-sm leading-relaxed mb-6">
                  Designed with the same commitment to quality and comfort, our Tindivanam branch delivers a premium stay experience with elegant accommodations and personalized hospitality.
                </p>
                <div className="h-[1px] w-full bg-[var(--lp-border)] my-6" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-8">
                  {tindivanamFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-[#C7A56B] mt-0.5 shrink-0" size={16} />
                      <span className="text-sm font-medium text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-body)" }}>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-sm text-[var(--lp-body)]" style={{ fontFamily: "var(--font-body)" }}>
                    <MapPin className="text-[#C45A37] shrink-0 mt-0.5" size={18} />
                    <p>
                      Tindivanam Branch<br />
                      Address Information Placeholder
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[var(--lp-body)]" style={{ fontFamily: "var(--font-body)" }}>
                    <Phone className="text-[#C45A37] shrink-0" size={18} />
                    <p>+91 96777 51329</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <a
                  href="#"
                  style={{ backgroundColor: "#8B4513", fontFamily: "var(--font-body)" }}
                  className="w-full py-4 rounded-full text-[12px] tracking-[0.16em] uppercase font-bold text-white transition-all duration-300 hover:bg-[#5C2E0C] flex items-center justify-center gap-2 shadow-md"
                >
                  View Location
                </a>
              </div>
            </motion.div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
