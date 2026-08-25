import { motion } from "framer-motion"
import { CheckCircle2, Home } from "lucide-react"
import { useBooking } from "@/context/BookingContext"
import { useEffect, useState } from "react"

interface SuccessStepProps {
  onClose: () => void
}

export default function SuccessStep({ onClose }: SuccessStepProps) {
  const { bookingData, guestDetails, bookingResult } = useBooking()
  const [bookingId, setBookingId] = useState("")

  useEffect(() => {
    if (bookingResult?.referenceNumber) {
      setBookingId(bookingResult.referenceNumber)
    } else {
      const mockId = "LPR-" + Math.floor(100000 + Math.random() * 900000)
      setBookingId(mockId)
    }
  }, [bookingResult])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full text-center py-12"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <h2 className="text-3xl md:text-4xl font-medium text-[var(--lp-heading)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        Your reservation request has been submitted successfully.
      </h2>
      <p className="text-[var(--lp-body)] max-w-md mx-auto mb-8 text-base">
        Thank you, {guestDetails.fullName ? guestDetails.fullName.split(' ')[0] : "Guest"}. Your reservation for {bookingData.roomType || "Deluxe"} Room has been recorded.
      </p>

      <div className="bg-white border border-[var(--lp-border)] p-6 rounded-2xl w-full max-w-sm mx-auto mb-10 shadow-sm text-left">
        <p className="text-xs text-[var(--lp-muted)] uppercase tracking-widest font-semibold mb-1">Reservation ID</p>
        <p className="text-xl font-medium text-[var(--lp-heading)] mb-4">{bookingId}</p>
        
        <div className="w-full h-[1px] bg-[var(--lp-border-light)] mb-4" />
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--lp-muted)] text-sm">Branch</span>
          <span className="font-semibold text-[var(--lp-heading)] text-sm">{bookingData.branch}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--lp-muted)] text-sm">Check In</span>
          <span className="font-semibold text-[var(--lp-heading)] text-sm">{bookingData.checkIn ? bookingData.checkIn.toLocaleDateString() : "-"}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[var(--lp-muted)] text-sm">Check Out</span>
          <span className="font-semibold text-[var(--lp-heading)] text-sm">{bookingData.checkOut ? bookingData.checkOut.toLocaleDateString() : "-"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--lp-muted)] text-sm">Guests</span>
          <span className="font-semibold text-[var(--lp-heading)] text-sm">{bookingData.adults} Adults, {bookingData.children} Children</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onClose}
          className="px-8 py-4 rounded-xl text-[12px] tracking-[0.16em] uppercase font-bold transition-all duration-300 text-white hover:bg-[#5C2E0C] hover:shadow-[0_10px_20px_rgba(139,69,19,0.3)] flex items-center justify-center gap-2"
          style={{ backgroundColor: "#8B4513" }}
        >
          <Home size={16} /> Return Home
        </button>
      </div>

    </motion.div>
  )
}
