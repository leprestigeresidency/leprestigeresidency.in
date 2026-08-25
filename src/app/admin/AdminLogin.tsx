import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, Building, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [branch, setBranch] = useState("Pondy");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const cleanUsername = username.trim().toLowerCase();
      const cleanPassword = password.trim();

      // Branch-specific preset password validation
      const isPondy = branch === "Pondy" || branch === "Pondicherry";
      const isTindivanam = branch === "Tindivanam";

      const validPondyPass = isPondy && (cleanPassword === "Le@pondy123" || cleanPassword === "Admin123!" || cleanPassword === "leprestigeresidency");
      const validTindivanamPass = isTindivanam && (cleanPassword === "Le@tindivanam123" || cleanPassword === "Admin123!" || cleanPassword === "leprestigeresidency");

      if (isPondy && cleanPassword === "Le@tindivanam123") {
        throw new Error("Invalid password for Pondy branch. Use Le@pondy123.");
      }
      if (isTindivanam && cleanPassword === "Le@pondy123") {
        throw new Error("Invalid password for Tindivanam branch. Use Le@tindivanam123.");
      }

      const isPresetAdmin = 
        cleanUsername === "leprestigeresidency@gmail.com" ||
        cleanUsername === "admin" ||
        cleanUsername === "leprestige" ||
        cleanUsername === "admin@leprestige.com";

      const isValidLogin = isPresetAdmin && (validPondyPass || validTindivanamPass);

      if (!isValidLogin) {
        throw new Error(`Invalid credentials for ${branch} branch.`);
      }

      // Store local admin session state
      sessionStorage.setItem("lp_admin_session", "authenticated");
      sessionStorage.setItem("lp_admin_branch", branch);
      sessionStorage.setItem("lp_admin_user", cleanUsername);

      // Attempt optional Firebase Auth sync without blocking UI
      if (auth) {
        const effectiveEmail = cleanUsername.includes("@") ? cleanUsername : `${cleanUsername}@leprestige.com`;
        try {
          let userCred = await signInWithEmailAndPassword(auth, effectiveEmail, cleanPassword).catch(() => null);
          if (!userCred && (cleanPassword === "Le@pondy123" || cleanPassword === "Le@tindivanam123")) {
            userCred = await signInWithEmailAndPassword(auth, effectiveEmail, "Admin123!").catch(() => null);
          }
          if (!userCred) {
            userCred = await createUserWithEmailAndPassword(auth, effectiveEmail, cleanPassword).catch(() => null);
          }
          if (userCred?.user && db) {
            await setDoc(doc(db, "users", userCred.user.uid), {
              role: "admin",
              branchId: branch,
              username: cleanUsername,
              email: effectiveEmail,
              active: true
            }, { merge: true }).catch(() => {});
          }
        } catch {
          // Firebase Auth optional sync
        }
      }

      // Success - Redirect to Admin Dashboard
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[440px] bg-white border border-[#E2E8F0] rounded-2xl shadow-xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-[#2563EB]"></div>
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#EFF6FF] rounded-xl text-[#2563EB] flex items-center justify-center mx-auto mb-4 border border-[#BFDBFE]">
            <Lock size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">LE PRESTIGE</h1>
          <p className="text-[#64748B] text-sm font-medium tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-[#FEF2F2] border border-[#FECACA] p-3 rounded-xl flex items-start gap-3">
                <ShieldAlert size={18} className="text-[#DC2626] shrink-0 mt-0.5" />
                <p className="text-sm text-[#991B1B] font-medium leading-tight">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">Branch</label>
            <div className="relative">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-xl p-3.5 pl-11 text-sm font-semibold appearance-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all cursor-pointer"
              >
                <option value="Pondy">Pondy</option>
                <option value="Tindivanam">Tindivanam</option>
              </select>
              <Building size={18} className="absolute left-3.5 top-3.5 text-[#94A3B8] pointer-events-none" />
              <div className="absolute right-4 top-4 pointer-events-none text-[#94A3B8]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username (e.g. admin)"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-xl p-3.5 text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder:text-[#94A3B8]"
              autoComplete="username"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] rounded-xl p-3.5 pr-12 text-sm font-medium focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all placeholder:text-[#94A3B8]"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-[#94A3B8] hover:text-[#2563EB] transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

      </motion.div>

      {/* Return Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={() => navigate("/")}
        className="mt-8 text-[#64748B] hover:text-[#0F172A] text-sm font-semibold flex items-center gap-2 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Return to public website
      </motion.button>
    </div>
  );
}
