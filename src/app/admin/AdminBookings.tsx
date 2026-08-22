import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Download, MoreHorizontal, Filter, Plus, Loader2 } from "lucide-react";

export default function AdminBookings() {
  const { adminData } = useOutletContext<any>();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Fetch exclusively from this branch securely
    const q = query(
      collection(db, "bookings"),
      where("branchId", "==", adminData.branchId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      
      // Client-side sort by createdAt (to avoid missing composite index crashes)
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setBookings(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const handleAction = (actionName: string) => {
    setToastMsg(`Action "${actionName}" triggered successfully!`);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const getStatusBadgeColors = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("confirm") || s.includes("paid")) return "bg-emerald-100 text-emerald-700";
    if (s.includes("pend") || s.includes("unpaid")) return "bg-amber-100 text-amber-700";
    if (s.includes("check")) return "bg-blue-100 text-blue-700";
    if (s.includes("cancel")) return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-700";
  };

  const formatDateString = (dateStr: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6 relative">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bookings Management</h2>
          <p className="text-sm text-slate-500 mt-1">Live data exclusively restricted to <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleAction("Filter Toggled")} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
            <Filter size={16} /> Filter
          </button>
          <button onClick={() => handleAction("Create New Booking Modal")} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
            <Plus size={16} /> New Booking
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Syncing secure data...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 border-4 border-dashed border-slate-200 m-4 rounded-xl">
            <p className="font-semibold text-slate-500">No bookings exist yet</p>
            <p className="text-xs text-slate-400 mt-1">Wait for incoming online reservations or create one.</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">System Ref</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Guest Info</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Travel Dates</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Room Tier</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Value</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Booking Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleAction("View Booking Details")}>
                  {/* REF */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{b.bookingId || "N/A"}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{b.id.slice(0, 8)}</div>
                  </td>
                  {/* GUEST */}
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-700">{b.guestDetails?.fullName || "Not Provided"}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{b.guestDetails?.email || b.guestDetails?.phone || "No contact info"}</div>
                  </td>
                  {/* DATES */}
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    {formatDateString(b.checkIn)} <span className="text-slate-300 mx-1">→</span> {formatDateString(b.checkOut)}
                  </td>
                  {/* ROOM TIER */}
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1 rounded text-xs font-semibold">
                      {b.roomType || "Unassigned"}
                    </span>
                  </td>
                  {/* VALUE */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">₹{b.total ? b.total.toLocaleString("en-IN") : "0"}</div>
                    <div className="text-[10px] font-bold mt-0.5 uppercase tracking-wide">
                       <span className={b.paymentStatus === "Paid" ? "text-emerald-500" : "text-amber-500"}>
                         {b.paymentStatus || "Unpaid"}
                       </span>
                    </div>
                  </td>
                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getStatusBadgeColors(b.status)}`}>
                      {b.status || "Unknown"}
                    </span>
                  </td>
                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <button onClick={(e) => { e.stopPropagation(); handleAction("Edit Booking Options"); }} className="text-slate-400 hover:text-blue-600 bg-white p-2 rounded-lg border border-transparent group-hover:border-slate-200 transition-all shadow-sm opacity-0 group-hover:opacity-100">
                      <MoreHorizontal size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); window.print(); }} className="ml-2 text-slate-500 hover:text-emerald-600 bg-white p-2 rounded-lg border border-slate-200 transition-all shadow-sm">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 shrink-0 flex justify-between items-center text-xs text-slate-500">
          <span>{bookings.length} reservations found securely</span>
          <span>End of Report</span>
        </div>
      </div>
    </div>
  );
}
