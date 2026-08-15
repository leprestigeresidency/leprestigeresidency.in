import { motion } from "framer-motion"
import { useBooking } from "@/context/BookingContext"
import { useAuth } from "@/context/AuthContext"
import { User, Mail, Phone, MapPin, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

interface GuestDetailsStepProps {
  onNext: () => void
  onBack: () => void
}

export default function GuestDetailsStep({ onNext, onBack }: GuestDetailsStepProps) {
  const { guestDetails, updateGuest } = useBooking()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    fullName: guestDetails.fullName || user?.displayName || "",
    email: guestDetails.email || user?.email || "",
    phone: guestDetails.phone || user?.phoneNumber || "",
    address: guestDetails.address || "",
  })

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        email: prev.email || user.email || "",
      }))
    }
  }, [user])

  // Update context when proceeding
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateGuest(formData)
    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <button onClick={onBack} className="text-[var(--lp-muted)] hover:text-[var(--lp-accent)] transition-colors flex items-center gap-2 text-sm font-semibold mb-4">
          <ArrowLeft size={16} /> Back
        </button>
        <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-2">Step 2 of 4</h4>
        <h2 className="text-3xl md:text-4xl font-medium text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
          Guest Details
        </h2>
        <p className="text-[var(--lp-body)] mt-2">Please provide your contact information for the reservation.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <input 
              type="text" 
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Phone size={16} /> Phone Number
            </label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <MapPin size={16} /> City/Address
            </label>
            <input 
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
        </div>

        <div className="mt-auto pt-6 sticky bottom-0 bg-[#F8F4EE] pb-2 z-10 flex justify-between items-center border-t border-[var(--lp-border)]/50 mt-8">
          <p className="text-xs text-[var(--lp-muted)] hidden sm:block">* Your details are secure</p>
          <button 
            type="submit"
            className="px-10 py-4 rounded-xl text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 border-2 border-[var(--lp-accent)] text-[var(--lp-accent)] bg-transparent hover:bg-[var(--lp-accent)]/10 hover:shadow-[0_10px_20px_rgba(196,90,55,0.15)] w-full sm:w-auto flex items-center justify-center gap-2 ml-auto"
          >
            Next Step
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </form>
    </motion.div>
  )
}
