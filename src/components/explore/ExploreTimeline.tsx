import { motion } from "framer-motion"
import FadeUp from "@/components/animations/FadeUp"

const timeline = [
  { step: "01", title: "Arrival", desc: "Step into our serene environment." },
  { step: "02", title: "Reception", desc: "Warm welcome and seamless check-in." },
  { step: "03", title: "Room Check-In", desc: "Discover your private luxury sanctuary." },
  { step: "04", title: "Premium Stay", desc: "Experience unparalleled comfort." },
  { step: "05", title: "Relax", desc: "Unwind and enjoy our hospitality." },
  { step: "06", title: "Checkout", desc: "A smooth and easy departure." },
  { step: "07", title: "Come Back", desc: "We look forward to hosting you again." },
]

export default function ExploreTimeline() {
  return (
    <section className="py-24 md:py-32 bg-[#F8F4EE]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        <FadeUp>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <span style={{ fontFamily: "var(--font-body)", color: "var(--lp-accent)" }} className="text-xs tracking-[0.2em] uppercase font-bold mb-4 block">
              The Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              The Le Prestige Experience
            </h2>
          </div>
        </FadeUp>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#C89B67]/30 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-[#C89B67]/30 md:hidden" />

          <div className="space-y-12 md:space-y-0">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <FadeUp key={idx} delay={idx * 0.1}>
                  <div className={`relative flex items-center md:justify-between ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    
                    {/* Empty Space for Desktop layout */}
                    <div className="hidden md:block w-5/12" />

                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#C89B67] -translate-x-1/2 flex items-center justify-center border-4 border-[#F8F4EE] z-10" />

                    {/* Content */}
                    <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pl-10 md:text-left' : 'md:pr-10 md:text-right'}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[var(--lp-border)]/50 hover:shadow-md transition-shadow">
                        <span className="text-[#C89B67] text-sm font-bold tracking-widest mb-2 block font-mono">{item.step}</span>
                        <h4 className="text-xl font-medium text-[var(--lp-heading)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {item.title}
                        </h4>
                        <p className="text-[var(--lp-muted)] text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
        
      </div>
    </section>
  )
}
