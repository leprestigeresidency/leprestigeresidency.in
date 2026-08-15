import { motion } from "framer-motion"
import { useBooking } from "@/context/BookingContext"
import { Calendar, Users, MessageSquare, MapPin } from "lucide-react"
import { useState } from "react"

interface StayDetailsStepProps {
  onNext: () => void
}

export default function StayDetailsStep({ onNext }: StayDetailsStepProps) {
  const { bookingData, updateBooking } = useBooking()
  
  // Local state for form fields if they are null initially
  const [checkIn, setCheckIn] = useState(bookingData.checkIn ? bookingData.checkIn.toISOString().split('T')[0] : "")
  const [checkOut, setCheckOut] = useState(bookingData.checkOut ? bookingData.checkOut.toISOString().split('T')[0] : "")

  const today = new Date().toISOString().split('T')[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!checkIn || !checkOut) {
      alert("Please select dates")
      return
    }
    updateBooking({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut)
    })
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
        <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-2">Step 1 of 4</h4>
        <h2 className="text-3xl md:text-4xl font-medium text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
          Stay Details
        </h2>
        <p className="text-[var(--lp-body)] mt-2">Select your dates and preferences for the {bookingData.roomType} Room.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <MapPin size={16} /> Location
            </label>
            <div className="p-4 rounded-xl border border-[var(--lp-border)] bg-black/5 opacity-80 cursor-not-allowed font-medium text-[var(--lp-heading)] flex justify-between items-center">
              <span>{bookingData.branch || "Pondicherry"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <MapPin size={16} /> Room Selected
            </label>
            <div className="p-4 rounded-xl border border-[var(--lp-border)] bg-black/5 opacity-80 cursor-not-allowed font-medium text-[var(--lp-heading)] flex justify-between items-center">
              <span>{bookingData.roomName || `${bookingData.roomType} Room`}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Calendar size={16} /> Check In
            </label>
            <input 
              type="date" 
              required
              min={today}
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value)
                if (checkOut && e.target.value > checkOut) {
                  setCheckOut(e.target.value)
                }
              }}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Calendar size={16} /> Check Out
            </label>
            <input 
              type="date" 
              required
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Users size={16} /> Adults
            </label>
            <select 
              value={bookingData.adults}
              onChange={(e) => updateBooking({ adults: parseInt(e.target.value) })}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            >
              {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
              <Users size={16} /> Children
            </label>
            <select 
              value={bookingData.children}
              onChange={(e) => updateBooking({ children: parseInt(e.target.value) })}
              className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)]"
            >
              {[0, 1, 2].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Child' : 'Children'}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[var(--lp-heading)] flex items-center gap-2">
            <MessageSquare size={16} /> Special Request
          </label>
          <textarea 
            rows={3}
            value={bookingData.specialRequest}
            onChange={(e) => updateBooking({ specialRequest: e.target.value })}
            className="p-4 rounded-xl border border-[var(--lp-border)] bg-white focus:outline-none focus:border-[var(--lp-accent)] font-medium text-[var(--lp-heading)] resize-none"
          />
        </div>

        <div className="mt-auto pt-6 sticky bottom-0 bg-[#F8F4EE] pb-2 z-10 flex justify-end border-t border-[var(--lp-border)]/50 mt-8">
          <button 
            type="submit"
            className="px-10 py-4 rounded-xl text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 border-2 border-[var(--lp-accent)] text-[var(--lp-accent)] bg-transparent hover:bg-[var(--lp-accent)]/10 hover:shadow-[0_10px_20px_rgba(196,90,55,0.15)] w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Next Step
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </form>
    </motion.div>
  )
}
