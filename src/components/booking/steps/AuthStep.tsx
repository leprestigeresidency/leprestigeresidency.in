import { motion } from "framer-motion"
import { useAuth } from "@/context/AuthContext"
import { LogIn } from "lucide-react"
import { useState, useEffect } from "react"

interface AuthStepProps {
  onNext: () => void
}

export default function AuthStep({ onNext }: AuthStepProps) {
  const { signInWithGoogle, signInWithFacebook, signInWithEmail, user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showEmailInput, setShowEmailInput] = useState(false)
  const [emailInput, setEmailInput] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Automatically proceed to Guest Details when user logs in
  useEffect(() => {
    if (user) {
      onNext()
    }
  }, [user])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      await signInWithGoogle()
    } catch (error: any) {
      console.error("Google Sign-In Error:", error)
      if (error?.code === "auth/popup-closed-by-user") {
        setErrorMsg("Sign-in popup was closed. Please try again.")
      } else {
        setErrorMsg(error?.message || "Google Sign-In could not be completed. You can continue with Email or Guest.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      await signInWithFacebook()
    } catch (error: any) {
      console.error("Facebook Sign-In Error:", error)
      if (error?.code === "auth/popup-closed-by-user") {
        setErrorMsg("Facebook sign-in popup was closed. Please try again.")
      } else {
        setErrorMsg(error?.message || "Facebook Sign-In could not be completed. You can continue with Email or Guest.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput || !emailInput.includes("@")) return
    setLoading(true)
    setErrorMsg(null)
    try {
      await signInWithEmail(emailInput)
    } catch (error: any) {
      console.error(error)
      setErrorMsg(error?.message || "Could not sign in with email.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center h-full py-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--lp-accent)] text-white flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(196,90,55,0.3)]">
        <LogIn size={24} />
      </div>

      <h2 className="text-3xl md:text-4xl font-medium text-[var(--lp-heading)] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        Sign In to Continue
      </h2>
      <p className="text-[var(--lp-body)] max-w-md mx-auto mb-8 leading-relaxed">
        Please sign in or create an account to proceed with your booking. Your reservation details will be saved securely.
      </p>

      {errorMsg && (
        <div className="w-full max-w-xs mx-auto mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-3.5 w-full max-w-xs mx-auto">
        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-[var(--lp-border)] px-6 py-3.5 rounded-xl text-sm font-semibold text-[var(--lp-heading)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          {loading ? "Signing in..." : "Continue with Google"}
        </button>



        {!showEmailInput ? (
          <button 
            onClick={() => setShowEmailInput(true)}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[var(--lp-border)] px-6 py-3.5 rounded-xl text-sm font-semibold text-[var(--lp-heading)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
          >
            <svg className="w-5 h-5 text-[var(--lp-accent)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Continue with Email
          </button>
        ) : (
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-2">
            <input 
              type="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              className="w-full bg-white border border-[var(--lp-border)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[var(--lp-accent)]"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--lp-heading)] text-white py-3 rounded-xl text-sm font-semibold hover:bg-black transition-all"
            >
              Sign In with Email
            </button>
          </form>
        )}

        <div className="relative my-1 flex items-center">
          <div className="flex-grow border-t border-[var(--lp-border)]"></div>
          <span className="flex-shrink-0 mx-4 text-[var(--lp-muted)] text-[10px] uppercase tracking-widest font-semibold">or</span>
          <div className="flex-grow border-t border-[var(--lp-border)]"></div>
        </div>

        <button 
          onClick={onNext}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-[var(--lp-border)] text-black px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#F3EEE7] hover:text-black hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
        >
          Continue as Guest
        </button>
      </div>
    </motion.div>
  )
}
