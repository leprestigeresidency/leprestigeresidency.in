import { motion } from "framer-motion"
import { MapPin, Home, Users, Sparkles, Diamond, ShieldCheck } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"

const features = [
  { 
    name: "Prime Location", 
    description: "Located in one of Puducherry's most convenient locations with easy access to business districts and attractions.",
    icon: MapPin 
  },
  { 
    name: "Elegant Accommodation", 
    description: "Premium Deluxe and Twin Rooms designed with modern interiors and luxury comfort.",
    icon: Home 
  },
  { 
    name: "Personalized Hospitality", 
    description: "Dedicated professionals committed to making every stay memorable.",
    icon: Users 
  },
  { 
    name: "Modern Amenities", 
    description: "High-Speed WiFi, Smart Television, Air Conditioning, Daily Housekeeping, 24×7 Reception, and Secure Parking.",
    icon: Sparkles 
  },
  { 
    name: "Exceptional Value", 
    description: "Luxury experiences with transparent pricing and premium service.",
    icon: Diamond 
  },
  { 
    name: "Safe & Comfortable Stay", 
    description: "Maintaining exceptional standards of cleanliness, hygiene, and guest safety.",
    icon: ShieldCheck 
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#F8F4EE]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Experience Hospitality Beyond Expectations
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <FadeUp key={idx} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 flex flex-col items-start h-full hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-[var(--lp-border)] group"
              >
                <div className="mb-6 p-4 rounded-full bg-[#F3EEE7] text-[#C7A56B] group-hover:bg-[#C45A37] group-hover:text-white transition-colors duration-500">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-[var(--lp-heading)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.name}
                </h3>
                <p className="text-[var(--lp-body)] text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {item.description}
                </p>
              </motion.div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
