import { motion } from "framer-motion"
import { useBooking } from "@/context/BookingContext"
import { ArrowLeft, Tag, Info } from "lucide-react"
import { useState, useMemo } from "react"

interface PaymentSummaryStepProps {
  onNext: () => void
  onBack: () => void
}

export default function PaymentSummaryStep({ onNext, onBack }: PaymentSummaryStepProps) {
  const { bookingData, updateBooking } = useBooking()
  const [couponCode, setCouponCode] = useState(bookingData.coupon || "")
  const [couponApplied, setCouponApplied] = useState(!!bookingData.coupon)

  const pricing: Record<string, number> = {
    Deluxe: 4500,
    Twin: 4000,
    Suite: 6500,
  }

  const calculations = useMemo(() => {
    if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.roomType) {
      return { nights: 0, baseRate: 0, subtotal: 0, discount: 0, gst: 0, total: 0 }
    }
    const diffTime = Math.abs(bookingData.checkOut.getTime() - bookingData.checkIn.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const nights = diffDays > 0 ? diffDays : 1
    
    const baseRate = bookingData.pricePerNight || pricing[bookingData.roomType as string] || 4500
    const subtotal = baseRate * nights
    const discount = couponApplied ? subtotal * 0.1 : 0 // 10% mock discount
    const discountedTotal = subtotal - discount
    const gst = discountedTotal * 0.05
    const total = discountedTotal + gst

    return { nights, baseRate, subtotal, discount, gst, total }
  }, [bookingData, couponApplied])

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setCouponApplied(true)
      updateBooking({ coupon: "WELCOME10" })
    } else {
      alert("Invalid coupon code. Try WELCOME10")
    }
  }

  const handleRemoveCoupon = () => {
    setCouponApplied(false)
    setCouponCode("")
    updateBooking({ coupon: "" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <button onClick={onBack} className="text-[var(--lp-muted)] hover:text-[var(--lp-accent)] transition-colors flex items-center gap-2 text-sm font-semibold mb-4 cursor-pointer">
          <ArrowLeft size={16} /> Back
        </button>
        <h4 className="text-[var(--lp-accent)] text-xs tracking-[0.2em] uppercase font-bold mb-2">Step 3 of 4</h4>
        <h2 className="text-3xl md:text-4xl font-medium text-[var(--lp-heading)]" style={{ fontFamily: "var(--font-heading)" }}>
          Payment Summary
        </h2>
        <p className="text-[var(--lp-body)] mt-2">Review your booking details before proceeding to payment.</p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Stay Overview */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)]">
            <h3 className="font-semibold text-[var(--lp-heading)] mb-4 text-lg">Booking Details</h3>
            
            <div className="flex justify-between items-center py-3 border-b border-[var(--lp-border-light)]">
              <span className="text-[var(--lp-muted)] text-sm">Branch</span>
              <span className="font-semibold text-[var(--lp-heading)]">{bookingData.branch}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[var(--lp-border-light)]">
              <span className="text-[var(--lp-muted)] text-sm">Room</span>
              <span className="font-semibold text-[var(--lp-heading)]">{bookingData.roomName || `${bookingData.roomType} Room`}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[var(--lp-border-light)]">
              <span className="text-[var(--lp-muted)] text-sm">Dates</span>
              <span className="font-semibold text-[var(--lp-heading)] text-sm">
                {bookingData.checkIn?.toLocaleDateString()} - {bookingData.checkOut?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[var(--lp-border-light)]">
              <span className="text-[var(--lp-muted)] text-sm">Duration</span>
              <span className="font-semibold text-[var(--lp-heading)]">{calculations.nights} {calculations.nights === 1 ? 'Night' : 'Nights'}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[var(--lp-muted)] text-sm">Guests</span>
              <span className="font-semibold text-[var(--lp-heading)]">{bookingData.adults} Adults, {bookingData.children} Children</span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] flex items-center gap-4">
            <Tag size={20} className="text-[var(--lp-accent)]" />
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Have a coupon? (Try WELCOME10)" 
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="w-full bg-transparent border-none focus:outline-none text-sm font-medium text-[var(--lp-heading)] uppercase"
              />
            </div>
            {couponApplied ? (
              <button onClick={handleRemoveCoupon} className="text-xs text-red-500 font-bold uppercase tracking-wider">Remove</button>
            ) : (
              <button onClick={handleApplyCoupon} className="text-xs text-[var(--lp-accent)] font-bold uppercase tracking-wider">Apply</button>
            )}
          </div>
        </div>

        {/* Right Side: Price Breakdown */}
        <div className="w-full lg:w-80 bg-white border border-[var(--lp-border)] text-[var(--lp-heading)] p-8 rounded-3xl flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <h3 className="font-semibold text-xl mb-6 font-serif">Price Breakdown</h3>
          
          <div className="flex flex-col gap-4 mb-6 flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[var(--lp-body)] text-sm">₹{calculations.baseRate} × {calculations.nights} nights</span>
              <span className="font-medium">₹{calculations.subtotal.toLocaleString()}</span>
            </div>
            
            {couponApplied && (
              <div className="flex justify-between items-center text-[var(--lp-accent)]">
                <span className="text-sm">Discount (10%)</span>
                <span className="font-medium">-₹{calculations.discount.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-[var(--lp-body)] text-sm">Taxes (GST 5%)</span>
              <span className="font-medium">₹{calculations.gst.toLocaleString()}</span>
            </div>
          </div>

          <div className="border-t border-[var(--lp-border)] pt-6 mb-8">
            <div className="flex justify-between items-end">
              <span className="text-[var(--lp-muted)] uppercase text-xs tracking-widest font-bold">Total Amount</span>
              <span className="text-4xl font-semibold font-serif leading-none">₹{calculations.total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={onNext}
            className="w-full py-4 rounded-xl text-[13px] tracking-[0.16em] uppercase font-bold transition-all duration-300 bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 hover:shadow-[0_10px_20px_rgba(22,163,74,0.15)] text-center"
          >
            Proceed to Pay
          </button>
          
          <p className="text-center text-[var(--lp-muted)] text-xs mt-4 flex items-center justify-center gap-1">
            <Info size={12} /> Secure Razorpay Checkout
          </p>
        </div>

      </div>
    </motion.div>
  )
}
