import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Users, Mail, Phone, Calendar, Loader2, Search, Filter } from "lucide-react";

export default function AdminGuests() {
  const { adminData } = useOutletContext<any>();
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Aggregate guests from bookings for this branch
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const guestMap: Record<string, any> = {};

      snapshot.forEach(doc => {
        const data = doc.data();
        const bBranch = (data.branchId || data.branch || "").toString().toLowerCase();
        const aBranch = (adminData?.branchId || "").toString().toLowerCase();

        const matchesBranch = 
          bBranch === aBranch ||
          (aBranch.includes("pond") && (bBranch.includes("pond") || bBranch.includes("pudu"))) ||
          (aBranch.includes("tind") && bBranch.includes("tind")) ||
          !data.branchId;

        if (matchesBranch) {
          const email = data.guestDetails?.email || data.guestDetails?.phone || doc.id;
          const name = data.guestDetails?.fullName || "Guest";
          const amount = Number(data.total) || 2199;

          if (!guestMap[email]) {
            guestMap[email] = {
              id: email,
              name: name,
              email: data.guestDetails?.email || "N/A",
              phone: data.guestDetails?.phone || "N/A",
              totalStays: 1,
              totalSpent: amount,
              lastStay: data.checkIn ? data.checkIn.split("T")[0] : "Recent",
              status: "Active"
            };
          } else {
            guestMap[email].totalStays += 1;
            guestMap[email].totalSpent += amount;
            if (data.checkIn && data.checkIn > guestMap[email].lastStay) {
              guestMap[email].lastStay = data.checkIn.split("T")[0];
            }
          }
        }
      });

      setGuests(Object.values(guestMap));
      setLoading(false);
    }, (error) => {
      console.error("Error fetching guest data: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Directory</h2>
          <p className="text-sm text-slate-500 mt-1">Guest profiles and stay history for <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search guests by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-blue-600 shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Loading guest records...</p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 border-4 border-dashed border-slate-200 m-4 rounded-xl">
            <Users size={40} className="text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No guest records found</p>
            <p className="text-xs text-slate-400 mt-1">Guests will automatically populate when bookings are recorded.</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Guest Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Stays</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Spent</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Loyalty Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.map((g, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleAction(`Viewing ${g.name}'s profile`)}>
                  <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                      {g.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div>{g.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">Last stay: {g.lastStay || "Recent"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 flex items-center gap-1.5 text-xs"><Mail size={12} className="text-slate-400" /> {g.email}</div>
                    <div className="text-slate-500 flex items-center gap-1.5 text-xs mt-1"><Phone size={12} className="text-slate-400" /> {g.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {g.totalStays} {g.totalStays === 1 ? "Stay" : "Stays"}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₹{g.totalSpent.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      g.totalStays >= 5 ? "bg-purple-100 text-purple-700" :
                      g.totalStays >= 2 ? "bg-blue-100 text-blue-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {g.totalStays >= 5 ? "VIP Platinum" : g.totalStays >= 2 ? "Repeat Guest" : "New Guest"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAction(`Exported history for ${g.name}`); }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>Showing {filteredGuests.length} unique guest profiles</span>
          <span>Filtered by {adminData?.branchId}</span>
        </div>
      </div>
    </div>
  );
}
