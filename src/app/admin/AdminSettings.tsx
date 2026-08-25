import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { auth } from "@/firebase/config";
import { User, Shield, Bell, Key, LogOut, CheckCircle2, Lock } from "lucide-react";

export default function AdminSettings() {
  const { adminData } = useOutletContext<any>();
  const navigate = useNavigate();

  const [bookingNotifs, setBookingNotifs] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  const handleLogout = async () => {
    if (auth) await auth.signOut();
    navigate("/admin-login");
  };

  const showSaveToast = () => {
    setToastMsg("Settings saved successfully!");
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-900">Admin Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage system configurations and permissions for your branch account.</p>
      </div>

      {/* Section 1: Profile & Security */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Admin Profile & Access</h3>
            <p className="text-xs text-slate-500">Authenticated user identity and role restriction</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <label className="text-xs uppercase font-bold text-slate-400 mb-1 block">Account Username</label>
            <input 
              type="text" 
              readOnly 
              value={adminData?.username || adminData?.email?.split('@')[0] || "admin"}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-medium text-slate-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs uppercase font-bold text-slate-400 mb-1 block">User Role</label>
            <input 
              type="text" 
              readOnly 
              value={adminData?.role ? adminData.role.toUpperCase() : "HOTEL MANAGER"}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-bold text-blue-600 cursor-not-allowed"
            />
          </div>

          {/* READ ONLY BRANCH PERMISSION - STRICT REQUIREMENT */}
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-emerald-600" />
                <span className="text-sm font-bold text-slate-900">Assigned Branch Permission</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold uppercase flex items-center gap-1">
                  <Lock size={10} /> READ-ONLY
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">This account is strictly locked to accessing data from the <strong className="text-blue-600 uppercase">{adminData?.branchId}</strong> branch.</p>
            </div>
            
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-800 uppercase shadow-sm">
              {adminData?.branchId}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Notification Preferences */}
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
              onClick={() => { setBookingNotifs(!bookingNotifs); showSaveToast(); }}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${bookingNotifs ? "bg-blue-600" : "bg-slate-300"}`}
            >
              <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${bookingNotifs ? "left-6.5" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Session & Sign Out */}
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
