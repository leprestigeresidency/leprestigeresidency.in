import { useState, useEffect, ReactNode } from "react"
import { motion } from "framer-motion"
import { ShieldAlert, Lock, Key, LogOut } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

interface AdminGuardProps {
  children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user } = useAuth()
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("lp_admin_session") === "authenticated"
  })
  const [passcode, setPasscode] = useState("")
  const [usernameInput, setUsernameInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Auto grant admin if logged in user is the official admin email
  useEffect(() => {
    if (user?.email === "leprestigeresidency@gmail.com") {
      setIsAdminAuthenticated(true)
      sessionStorage.setItem("lp_admin_session", "authenticated")
    }
  }, [user])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Strictly Verify Admin Username AND Passcode
    setTimeout(() => {
      const validUser = usernameInput.toLowerCase() === "admin" || usernameInput.toLowerCase() === "leprestige" || usernameInput.toLowerCase() === "leprestigeresidency@gmail.com";
      const validPass = passcode === "leprestigeresidency" || passcode === "Le@pondy123" || passcode === "Le@tindivanam123" || passcode === "Admin123!";
      if (validUser && validPass) {
        setIsAdminAuthenticated(true)
        sessionStorage.setItem("lp_admin_session", "authenticated")
      } else {
        setError("Invalid Admin Username or Secret Passcode. Access Denied.")
      }
      setLoading(false)
    }, 600)
  }

  const handleAdminLogout = () => {
    sessionStorage.removeItem("lp_admin_session")
    setIsAdminAuthenticated(false)
    setPasscode("")
  }

  if (isAdminAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-[#0b1220] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#131c2e] border border-slate-800 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden"
      >
        <div className="w-16 h-16 rounded-2xl bg-[var(--lp-accent)]/20 border border-[var(--lp-accent)] text-[var(--lp-accent)] flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Lock size={28} />
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
          Owner & Management Access
        </h2>
        <p className="text-slate-400 text-xs text-center mb-6 leading-relaxed">
          This panel is restricted strictly to hotel owners and authorized staff members. Please enter your secret admin passcode to continue.
        </p>

        {error && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <input
              type="text"
              required
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter admin username"
              className="w-full bg-[#0b1220] border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-[var(--lp-accent)]"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Admin Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter secret passcode"
                className="w-full bg-[#0b1220] border border-slate-700 rounded-xl p-3.5 pl-10 text-sm text-white focus:outline-none focus:border-[var(--lp-accent)]"
              />
              <Key size={16} className="absolute left-3.5 top-4 text-slate-500" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--lp-accent)] hover:bg-[var(--lp-accent-hover)] text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 mt-2 text-sm tracking-wide"
          >
            {loading ? "Authenticating Admin..." : "Unlock Admin Dashboard"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Return to Public Website
          </a>
        </div>
      </motion.div>
    </div>
  )
}
