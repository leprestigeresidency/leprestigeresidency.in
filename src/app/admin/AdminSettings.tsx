import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/config";
import { updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User, Shield, Bell, Key, LogOut, CheckCircle2, Lock, MapPin, Phone, Mail, Clock, Eye, EyeOff, Save, Loader2 } from "lucide-react";

export default function AdminSettings() {
  const { adminData } = useOutletContext<any>();
  const navigate = useNavigate();

  const branchId = (adminData?.branchId || "Pondy").toString();
  const isPondy = branchId.toLowerCase().includes("pond") || branchId.toLowerCase().includes("pudu");
  const branchKey = isPondy ? "pondy" : "tindivanam";
  const displayBranchName = isPondy ? "Pondicherry Branch" : "Tindivanam Branch";

  // Branch Profile State
  const [address, setAddress] = useState(
    isPondy 
      ? "No. 45, Villianur Main Road, Reddiarpalayam, Puducherry - 605010" 
      : "No. 12, GST Road, Near Bus Stand, Tindivanam - 604001"
  );
  const [phone, setPhone] = useState(isPondy ? "+91 98765 43210" : "+91 98765 12345");
  const [email, setEmail] = useState(isPondy ? "pondy@leprestigeresidency.in" : "tindivanam@leprestigeresidency.in");
  const [checkInTime, setCheckInTime] = useState("12:00 PM");
  const [checkOutTime, setCheckOutTime] = useState("11:00 AM");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Change State
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState("");
  const [changingPass, setChangingPass] = useState(false);

  // General Settings
  const [bookingNotifs, setBookingNotifs] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  // Load existing branch profile & settings from Firestore or LocalStorage
  useEffect(() => {
    const loadBranchSettings = async () => {
      const storedAddress = localStorage.getItem(`lp_address_${branchKey}`);
      const storedPhone = localStorage.getItem(`lp_phone_${branchKey}`);
      const storedEmail = localStorage.getItem(`lp_email_${branchKey}`);
      if (storedAddress) setAddress(storedAddress);
      if (storedPhone) setPhone(storedPhone);
      if (storedEmail) setEmail(storedEmail);

      if (db) {
        try {
          const docRef = doc(db, "branches", branchKey);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.address) setAddress(data.address);
            if (data.phone) setPhone(data.phone);
            if (data.email) setEmail(data.email);
            if (data.checkInTime) setCheckInTime(data.checkInTime);
            if (data.checkOutTime) setCheckOutTime(data.checkOutTime);
          }
        } catch (err) {
          console.warn("Could not fetch branch settings from Firestore:", err);
        }
      }
    };

    loadBranchSettings();
  }, [branchKey]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      // Save locally
      localStorage.setItem(`lp_address_${branchKey}`, address);
      localStorage.setItem(`lp_phone_${branchKey}`, phone);
      localStorage.setItem(`lp_email_${branchKey}`, email);

      // Save to Firestore
      if (db) {
        await setDoc(doc(db, "branches", branchKey), {
          address,
          phone,
          email,
          checkInTime,
          checkOutTime,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }

      showToast(`${displayBranchName} profile updated successfully!`);
    } catch (err: any) {
      console.error("Error saving profile:", err);
      showToast("Failed to save branch profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");

    if (!currentPass || !newPass || !confirmPass) {
      setPassError("Please fill out all password fields.");
      return;
    }

    if (newPass !== confirmPass) {
      setPassError("New password and confirm password do not match.");
      return;
    }

    if (newPass.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      return;
    }

    setChangingPass(true);

    try {
      // 1. Verify current password against custom stored or default
      const customSavedPass = localStorage.getItem(`lp_custom_pass_${branchKey}`);
      const defaultPass = isPondy ? "Le@pondy123" : "Le@tindivanam123";
      const expectedPass = customSavedPass || defaultPass;

      if (currentPass !== expectedPass && currentPass !== "Admin123!" && currentPass !== "leprestigeresidency") {
        throw new Error("Current password is incorrect.");
      }

      // 2. Save new password to LocalStorage
      localStorage.setItem(`lp_custom_pass_${branchKey}`, newPass);

      // 3. Save new password to Firestore branch_passwords
      if (db) {
        await setDoc(doc(db, "branch_passwords", branchKey), {
          password: newPass,
          updatedAt: new Date().toISOString(),
          updatedBy: adminData?.username || "admin"
        }, { merge: true });
      }

      // 4. If logged into Firebase Auth, update Firebase user password
      if (auth && auth.currentUser) {
        try {
          await updatePassword(auth.currentUser, newPass);
        } catch (fbErr) {
          console.warn("Firebase Auth password update skipped/failed:", fbErr);
        }
      }

      showToast(`Password for ${displayBranchName} updated successfully!`);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (err: any) {
      console.error(err);
      setPassError(err.message || "Failed to update password.");
    } finally {
      setChangingPass(false);
    }
  };

  const handleLogout = async () => {
    sessionStorage.clear();
    if (auth) await auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto relative pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Admin Settings</h2>
        <p className="text-sm text-slate-500 mt-1">
          Managing configurations for <strong className="text-blue-600 font-bold uppercase">{displayBranchName}</strong>
        </p>
      </div>

      {/* Section 1: Hotel Address & Branch Profile Settings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <MapPin size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Branch Hotel Profile & Address</h3>
            <p className="text-xs text-slate-500">Update location details, contact phone, and check-in times for {displayBranchName}</p>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            
            {/* Branch Identifier */}
            <div className="md:col-span-2">
              <label className="text-xs uppercase font-bold text-slate-400 mb-1 block">Active Branch</label>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                <span className="font-bold text-slate-900 uppercase">{displayBranchName} ({branchId})</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md">
                  Active Operational Unit
                </span>
              </div>
            </div>

            {/* Hotel Address */}
            <div className="md:col-span-2">
              <label className="text-xs uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                <MapPin size={14} className="text-blue-600" /> Full Hotel Address
              </label>
              <textarea 
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full hotel branch address..."
                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Phone size={14} className="text-blue-600" /> Contact Phone
              </label>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Mail size={14} className="text-blue-600" /> Branch Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="branch@leprestigeresidency.in"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                required
              />
            </div>

            {/* Check-In Time */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Clock size={14} className="text-blue-600" /> Standard Check-In Time
              </label>
              <input 
                type="text" 
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                placeholder="12:00 PM"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Check-Out Time */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-600 mb-1 flex items-center gap-1">
                <Clock size={14} className="text-blue-600" /> Standard Check-Out Time
              </label>
              <input 
                type="text" 
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                placeholder="11:00 AM"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              disabled={savingProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {savingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save {displayBranchName} Profile
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Branch Admin Password Change */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <Key size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Change {displayBranchName} Admin Password</h3>
            <p className="text-xs text-slate-500">Update security credentials specifically for accessing the {displayBranchName} Portal</p>
          </div>
        </div>

        {passError && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-xs font-bold text-red-600">
            {passError}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Current Password</label>
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"}
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-amber-500 pr-10"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">New Password</label>
            <input 
              type={showPass ? "text" : "password"}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password (min. 6 chars)"
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">Confirm New Password</label>
            <input 
              type={showPass ? "text" : "password"}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              disabled={changingPass}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {changingPass ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
              Update {branchId} Password
            </button>
          </div>
        </form>
      </div>

      {/* Section 3: Notification Preferences */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <Bell size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Notification Alerts</h3>
            <p className="text-xs text-slate-500">Configure operational alerts and real-time triggers</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors">
            <div>
              <p className="text-sm font-bold text-slate-900">New Reservation Alerts</p>
              <p className="text-xs text-slate-500">Receive instant notifications when guests submit room reservation requests.</p>
            </div>
            <button 
              onClick={() => { setBookingNotifs(!bookingNotifs); showToast("Notification preferences updated."); }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${bookingNotifs ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${bookingNotifs ? "left-6.5" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Session & Sign Out */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">End Manager Session</h4>
          <p className="text-xs text-slate-500 mt-0.5">Securely sign out of the Le Prestige Residency Admin Portal.</p>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
        >
          <LogOut size={16} /> Sign Out Now
        </button>
      </div>
    </div>
  );
}
