import { motion } from "framer-motion"
import { RoomType } from "@/context/BookingContext"

interface RoomHorizontalCardProps {
  id: string
  type: RoomType
  title: string
  description: string
  image: string
  availability: string
  badge?: string
  features: string[]
  pricing: {
    weekdays: number
    weekends: number
  }
  reverse?: boolean
  onBook: (type: RoomType) => void
  onViewDetails?: (type: RoomType) => void
}

export default function RoomHorizontalCard({
  id,
  type,
  title,
  description,
  image,
  availability,
  badge,
  features,
  pricing,
  reverse = false,
  onBook,
  onViewDetails,
}: RoomHorizontalCardProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${reverse ? 'bg-[var(--lp-bg)]' : 'bg-[var(--lp-bg-alt)]'}`}>
      <div className="container mx-auto px-6 max-w-[1240px]">
        
        {/* Intro for Deluxe Room (First Room) */}
        {!reverse && (
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-4">Accommodations</h4>
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Choose Your Perfect Stay
            </h2>
            <p className="text-[var(--lp-body)] text-lg leading-relaxed">
              Every room is designed with premium interiors, comfortable bedding, modern amenities, and personalised hospitality.
            </p>
          </div>
        )}

        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer"
            onClick={() => onViewDetails && onViewDetails(type)}
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-[#e5ded5] rounded-2xl relative">
              {/* Placeholder image */}
              <div className="absolute inset-0 flex items-center justify-center flex-col text-[var(--lp-heading)]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                <span className="text-sm tracking-widest uppercase font-semibold">{title}</span>
              </div>
              <img 
                src={image} 
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              {badge && (
                <span className="bg-[var(--lp-accent)] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                  {badge}
                </span>
              )}
              <span className="bg-[#e5ded5] text-[var(--lp-body)] text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full">
                {availability}
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-medium text-[var(--lp-heading)] mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              {title}
            </h3>

            <div className="w-12 h-[2px] bg-[#C7A56B] mb-6" />

            <p className="text-[var(--lp-body)] text-base md:text-lg leading-relaxed mb-8">
              {description}
            </p>

            <ul className="grid grid-cols-2 gap-y-3 gap-x-6 mb-10">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-[var(--lp-body)] text-sm font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C7A56B]" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 bg-white border border-[var(--lp-border)] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <p className="text-[var(--lp-body)] text-xs uppercase tracking-widest font-semibold mb-2">Weekdays</p>
                <p className="text-3xl text-[var(--lp-heading)] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>₹{pricing.weekdays.toLocaleString()}</p>
                <p className="text-[#a3988b] text-[10px] uppercase tracking-wider">per night</p>
              </div>
              <div className="flex-1 bg-white border border-[var(--lp-border)] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <p className="text-[var(--lp-body)] text-xs uppercase tracking-widest font-semibold mb-2">Weekends</p>
                <p className="text-3xl text-[var(--lp-heading)] font-semibold mb-1" style={{ fontFamily: "var(--font-heading)" }}>₹{pricing.weekends.toLocaleString()}</p>
                <p className="text-[#a3988b] text-[10px] uppercase tracking-wider">per night</p>
              </div>
            </div>

            <p className="text-[#a3988b] text-xs italic mb-6">* 5% GST applicable at checkout</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onViewDetails && onViewDetails(type)}
                className="px-8 py-4 rounded-md text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 border border-[var(--lp-border)] text-[var(--lp-heading)] hover:bg-[var(--lp-border)] flex items-center justify-center flex-1 cursor-pointer"
              >
                View Details
              </button>
              <button 
                onClick={() => onBook(type)}
                style={{ backgroundColor: "#8B4513" }}
                className="px-8 py-4 rounded-md text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 text-white hover:bg-[#5C2E0C] hover:shadow-[0_10px_20px_rgba(139,69,19,0.3)] flex-1 flex justify-center items-center gap-2 cursor-pointer"
              >
                Book {type} Room
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
