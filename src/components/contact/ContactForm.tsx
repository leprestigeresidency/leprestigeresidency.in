import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"
import FadeUp from "@/components/animations/FadeUp"
import { db } from "@/firebase/config"
import { ContactService } from "@/services/contact.service"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContactMethod: "Email",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (status !== "idle" && status !== "loading") setStatus("idle")
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill out all required fields.")
      setStatus("error")
      return
    }

    if (formData.message.length < 10) {
      setErrorMessage("Message must be at least 10 characters.")
      setStatus("error")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email address.")
      setStatus("error")
      return
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number.")
      setStatus("error")
      return
    }

    try {
      setStatus("loading")
      
      if (!db) {
        throw new Error("Firebase is not properly configured.")
      }

      await ContactService.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: `${formData.message} (Preferred contact: ${formData.preferredContactMethod})`,
      })

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "", preferredContactMethod: "Email" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Something went wrong. Please try again.")
      setStatus("error")
    }
  }

  const inputClass = "w-full bg-[#F8F4EF] border border-[#E8DDD3] rounded-lg px-5 py-4 text-sm text-[#1F1F1F] placeholder:text-[#6E6E6E] focus:outline-none focus:border-[#C89B67] focus:ring-1 focus:ring-[#C89B67]/30 transition-all duration-300"
  const labelClass = "block text-[#1F1F1F] text-xs font-semibold uppercase tracking-widest mb-2"

  return (
    <section className="py-24 md:py-32 bg-[#FFFFFF]">
      <div className="container mx-auto px-6 max-w-[1240px]">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left: Editorial Text */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
            <FadeUp>
              <span
                style={{ fontFamily: "var(--font-body)", color: "#B98A5C" }}
                className="text-[11px] tracking-[0.2em] uppercase font-bold mb-6 block"
              >
                SEND AN ENQUIRY
              </span>
              <h2
                style={{ fontFamily: "var(--font-heading)", color: "#1F1F1F" }}
                className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8 leading-[1.1]"
              >
                How Can We <br />
                Assist You?
              </h2>
              <p
                style={{ fontFamily: "var(--font-body)", color: "#6E6E6E" }}
                className="text-base md:text-lg mb-8 leading-relaxed max-w-md"
              >
                Tell us what you need and our team will get back to you as soon as possible.
              </p>
              
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#F8F4EF] border border-[#E8DDD3]">
                <div className="w-2 h-2 rounded-full bg-[#B98A5C]" />
                <span style={{ fontFamily: "var(--font-body)", color: "#1F1F1F" }} className="text-sm font-medium">
                  We value every enquiry and every guest.
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right: Premium Form */}
          <div className="w-full lg:w-7/12">
            <FadeUp delay={0.2}>
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DDD3] p-8 md:p-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#F8F4EF] flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} className="text-[#2E7D32]" strokeWidth={1.5} />
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)" }} className="text-3xl text-[#1F1F1F] mb-4">
                        Message Sent Successfully
                      </h3>
                      <p style={{ fontFamily: "var(--font-body)" }} className="text-[#6E6E6E] text-base leading-relaxed max-w-md mx-auto mb-8">
                        Thank you for reaching out to Le Prestige Residency. Our team will get back to you shortly.
                      </p>
                      <button
                        onClick={() => setStatus("idle")}
                        style={{ fontFamily: "var(--font-body)" }}
                        className="text-[#1F1F1F] text-xs uppercase tracking-widest font-semibold border-b border-[#E8DDD3] pb-1 hover:border-[#B98A5C] hover:text-[#B98A5C] transition-colors duration-300"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            style={{ fontFamily: "var(--font-body)" }}
                          />
                        </div>
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            style={{ fontFamily: "var(--font-body)" }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className={inputClass}
                            style={{ fontFamily: "var(--font-body)" }}
                          />
                        </div>
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Preferred Contact Method</label>
                          <select
                            name="preferredContactMethod"
                            value={formData.preferredContactMethod}
                            onChange={handleChange}
                            className={inputClass}
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            <option value="Phone">Phone</option>
                            <option value="Email">Email</option>
                            <option value="WhatsApp">WhatsApp</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Subject *</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className={inputClass}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>

                      <div>
                        <label className={labelClass} style={{ fontFamily: "var(--font-body)" }}>Message *</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className={`${inputClass} resize-none`}
                          style={{ fontFamily: "var(--font-body)" }}
                        />
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2 text-[#C62828] bg-[#C62828]/5 p-4 rounded-lg">
                          <AlertCircle size={18} />
                          <span style={{ fontFamily: "var(--font-body)" }} className="text-sm font-medium">{errorMessage}</span>
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={status !== "loading" ? { scale: 1.02, y: -2 } : {}}
                        whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                        style={{ backgroundColor: "#1F1F1F", fontFamily: "var(--font-body)" }}
                        className="w-full px-12 py-5 rounded-lg text-[13px] tracking-[0.16em] uppercase font-bold text-white transition-all duration-300 hover:bg-[#333333] hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}
