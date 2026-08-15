import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X, CheckCircle2 } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"
import { db } from "@/firebase/config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function ContactFeedback() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleOpenModal = () => {
    if (rating === 0) {
      alert("Please select a rating first.")
      return
    }
    setIsModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    try {
      setStatus("loading")
      if (!db) throw new Error("Firebase not configured")

      await addDoc(collection(db, "feedback"), {
        name,
        email,
        rating,
        message: feedback,
        status: "pending",
        createdAt: serverTimestamp()
      })

      setStatus("success")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      if (status === "success") {
        setRating(0)
        setFeedback("")
        setName("")
        setEmail("")
        setStatus("idle")
      }
    }, 300)
  }

  return (
    <section className="py-24 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 max-w-[800px]">
        <FadeUp>
          <div className="bg-[#F8F4EF] rounded-2xl p-8 md:p-12 border border-[#E8DDD3] text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <span 
              style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }} 
              className="text-[10px] tracking-[0.2em] uppercase font-bold mb-4 block"
            >
              YOUR EXPERIENCE MATTERS
            </span>
            <h2
              className="text-3xl md:text-4xl font-medium text-[#1F1F1F] mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              How Was Your Stay?
            </h2>
            <p 
              className="text-[#6E6E6E] text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We’d love to hear about your experience at Le Prestige Residency. Your feedback helps us continue to improve our hospitality.
            </p>

            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={36}
                    strokeWidth={1}
                    className="transition-colors duration-200"
                    fill={(hoverRating || rating) >= star ? "#C89B67" : "transparent"}
                    color={(hoverRating || rating) >= star ? "#C89B67" : "#E8DDD3"}
                  />
                </button>
              ))}
            </div>

            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Share your experience (Optional)..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-white border border-[#E8DDD3] rounded-lg px-5 py-3 text-sm text-[#1F1F1F] placeholder:text-[#6E6E6E] focus:outline-none focus:border-[#C89B67] focus:ring-1 focus:ring-[#C89B67]/30 transition-all duration-300 mb-6 text-center"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                onClick={handleOpenModal}
                style={{ backgroundColor: "#1F1F1F", fontFamily: "var(--font-body)" }}
                className="w-full py-4 rounded-lg text-xs tracking-widest uppercase font-bold text-white transition-all duration-300 hover:bg-[#333333] hover:shadow-lg"
              >
                Share Feedback
              </button>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Premium Feedback Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-[#1F1F1F]/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E8DDD3] overflow-hidden z-10"
            >
              {status === "success" ? (
                <div className="p-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#F8F4EF] flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-[#2E7D32]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl text-[#1F1F1F] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    Thank You
                  </h3>
                  <p className="text-[#6E6E6E] text-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                    Thank you for sharing your experience with Le Prestige Residency.
                  </p>
                  <button
                    onClick={handleClose}
                    style={{ backgroundColor: "#1F1F1F", fontFamily: "var(--font-body)" }}
                    className="w-full py-4 rounded-lg text-xs tracking-widest uppercase font-bold text-white transition-all duration-300 hover:bg-[#333333]"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl text-[#1F1F1F]" style={{ fontFamily: "var(--font-heading)" }}>
                      Complete Submission
                    </h3>
                    <button onClick={handleClose} className="text-[#6E6E6E] hover:text-[#1F1F1F] transition-colors">
                      <X size={20} />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[#1F1F1F] text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-body)" }}>Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#F8F4EF] border border-[#E8DDD3] rounded-lg px-4 py-3 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C89B67] transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-[#1F1F1F] text-[10px] font-bold uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-body)" }}>Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#F8F4EF] border border-[#E8DDD3] rounded-lg px-4 py-3 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#C89B67] transition-all"
                        style={{ fontFamily: "var(--font-body)" }}
                      />
                    </div>
                    
                    {status === "error" && (
                      <p className="text-[#C62828] text-xs text-center font-medium">Something went wrong. Please try again.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      style={{ backgroundColor: "#1F1F1F", fontFamily: "var(--font-body)" }}
                      className="w-full py-4 mt-4 rounded-lg text-xs tracking-widest uppercase font-bold text-white transition-all duration-300 hover:bg-[#333333] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {status === "loading" ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Submit Feedback"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
