import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const statistics = [
  { value: "22", label: "Premium Rooms" },
  { value: "24×7", label: "Reception" },
  { value: "Prime", label: "Location" },
  { value: "Exceptional", label: "Hospitality" },
]

export default function OurStory() {
  return (
    <section id="story" className="py-24 bg-[#F8F4EE] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <FadeUp>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-10 h-[1px] bg-[#C45A37]" />
                <h4 style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold">
                  OUR STORY
                </h4>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 
                style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }}
                className="text-4xl md:text-5xl font-medium mb-8 leading-tight"
              >
                Designed Around Comfort.<br />
                <em style={{ color: "#C7A56B" }}>Built On Hospitality.</em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-6 text-base md:text-lg" style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }}>
                <p>
                  Le Prestige Residency was established with a vision of redefining hospitality by combining modern comfort, elegant interiors, and personalized service.
                </p>
                <p>
                  Located in Reddiarpalayam, Puducherry, our hotel offers a peaceful and welcoming environment for business travellers, families, and leisure guests. Every space is thoughtfully designed to create memorable experiences through comfort, quality, and genuine hospitality.
                </p>
                <p>
                  Whether you stay for one night or an extended visit, our commitment remains the same—making every guest feel valued and completely at home.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 pt-12 border-t border-[var(--lp-border)]">
                {statistics.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span style={{ fontFamily: "var(--font-heading)", color: "var(--lp-heading)" }} className="text-3xl font-bold">
                      {stat.value}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-body)" }} className="text-[10px] uppercase tracking-widest font-semibold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <FadeUp delay={0.4} className="relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[20px] overflow-hidden aspect-[4/5] shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
              >
                <img 
                  src="/images/lobby.jpeg" // Using lobby image for reception as requested
                  alt="Le Prestige Residency Reception"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#262626]/40 to-transparent" />
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 border border-[#C7A56B]/30 rounded-full -z-10" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-[#C7A56B]/20 rounded-full -z-10" />
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}
