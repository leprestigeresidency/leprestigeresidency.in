import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { useBooking, RoomType } from "@/context/BookingContext"
import { X, CheckCircle, FileText } from "lucide-react"

// Import individual steps
import AuthStep from "./steps/AuthStep"
import StayDetailsStep from "./steps/StayDetailsStep"
import GuestDetailsStep from "./steps/GuestDetailsStep"
import PaymentSummaryStep from "./steps/PaymentSummaryStep"
import RazorpayMockStep from "./steps/RazorpayMockStep"
import SuccessStep from "./steps/SuccessStep"

interface BookingFlowManagerProps {
  isOpen: boolean
  onClose: () => void
  initialRoom: RoomType
}

type Step = "AUTH" | "STAY_DETAILS" | "GUEST_DETAILS" | "PAYMENT_SUMMARY" | "PAYMENT_MOCK" | "SUCCESS"

export default function BookingFlowManager({ isOpen, onClose, initialRoom }: BookingFlowManagerProps) {
  const { user, loading } = useAuth()
  const { bookingData, updateBooking, resetBooking } = useBooking()
  const [currentStep, setCurrentStep] = useState<Step>("STAY_DETAILS")

  useEffect(() => {
    if (isOpen) {
      if (initialRoom) {
        updateBooking({ roomType: initialRoom })
      }
      
      // If user is not logged in and opens the modal, maybe they should pick dates first,
      // then login. The prompt says "Login Continuity: Automatically return user to the exact room they selected."
      // Let's make STAY_DETAILS the first step. Then before GUEST_DETAILS or PAYMENT, check auth.
      setCurrentStep("STAY_DETAILS")
    }
  }, [isOpen, initialRoom])

  const handleNextStep = (next: Step) => {
    if (next === "GUEST_DETAILS" && !user && !loading) {
      // Intercept and enforce login
      setCurrentStep("AUTH")
      return
    }
    setCurrentStep(next)
  }

  // Effect to automatically proceed after successful login if they were intercepted
  useEffect(() => {
    if (user && currentStep === "AUTH") {
      setCurrentStep("GUEST_DETAILS")
    }
  }, [user, currentStep])

  const handleClose = () => {
    if (currentStep === "SUCCESS") {
      resetBooking()
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#F8F4EE] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col"
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-[var(--lp-heading)]" />
        </button>

        <div className="flex-1 p-6 md:p-10">
          <AnimatePresence mode="wait">
            {currentStep === "STAY_DETAILS" && (
              <StayDetailsStep key="stay" onNext={() => handleNextStep("GUEST_DETAILS")} />
            )}
            
            {currentStep === "AUTH" && (
              <AuthStep key="auth" onNext={() => setCurrentStep("GUEST_DETAILS")} />
            )}
            
            {currentStep === "GUEST_DETAILS" && (
              <GuestDetailsStep 
                key="guest" 
                onBack={() => setCurrentStep("STAY_DETAILS")}
                onNext={() => setCurrentStep("PAYMENT_SUMMARY")} 
              />
            )}
            
            {currentStep === "PAYMENT_SUMMARY" && (
              <PaymentSummaryStep 
                key="summary" 
                onBack={() => setCurrentStep("GUEST_DETAILS")}
                onNext={() => setCurrentStep("PAYMENT_MOCK")} 
              />
            )}
            
            {currentStep === "PAYMENT_MOCK" && (
              <RazorpayMockStep 
                key="mock" 
                onSuccess={() => setCurrentStep("SUCCESS")} 
                onCancel={() => setCurrentStep("PAYMENT_SUMMARY")} 
              />
            )}
            
            {currentStep === "SUCCESS" && (
              <SuccessStep key="success" onClose={handleClose} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
