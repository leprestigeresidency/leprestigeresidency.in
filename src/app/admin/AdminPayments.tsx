import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { CreditCard, Download, Loader2, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminPayments() {
  const { adminData } = useOutletContext<any>();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Fetch bookings to extract payments information for this branch
    const q = query(
      collection(db, "bookings"),
      where("branchId", "==", adminData.branchId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentList: any[] = [];

      snapshot.forEach(doc => {
        const d = doc.data();
        paymentList.push({
          id: d.paymentId || `TXN-${doc.id.slice(0, 8).toUpperCase()}`,
          bookingId: d.bookingId || doc.id.slice(0, 6),
          guestName: d.guestDetails?.fullName || "Guest",
          method: d.paymentMethod || "Razorpay (Online)",
          amount: Number(d.total) || 0,
          date: d.createdAt ? new Date(d.createdAt.toMillis ? d.createdAt.toMillis() : d.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
          status: d.paymentStatus || (d.status === "Confirmed" ? "Success" : "Pending")
        });
      });

      setPayments(paymentList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching payments: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const handleAction = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const totalRevenue = payments.reduce((acc, p) => p.status === "Success" || p.status === "Paid" ? acc + p.amount : acc, 0);

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
          <h2 className="text-2xl font-bold text-slate-900">Financial Payments</h2>
          <p className="text-sm text-slate-500 mt-1">Transaction logs and Razorpay payments for <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm flex items-center gap-4">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Branch Total Revenue</span>
            <span className="text-xl font-bold text-emerald-600">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>
          <CreditCard className="text-blue-600" size={24} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Syncing payment records...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 border-4 border-dashed border-slate-200 m-4 rounded-xl">
            <CreditCard size={40} className="text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No transactions recorded yet</p>
            <p className="text-xs text-slate-400 mt-1">Payments processed via Razorpay will show up here automatically.</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Transaction ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Booking Ref</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Method</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => handleAction(`Transaction ${p.id}`)}>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900 text-xs">
                    {p.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600 text-xs">
                    {p.bookingId}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {p.guestName}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">
                    {p.method}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {p.date}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₹{p.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      p.status === "Success" || p.status === "Paid" ? "bg-emerald-100 text-emerald-700" :
                      p.status === "Pending" ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={(e) => { e.stopPropagation(); window.print(); }}
                      className="text-slate-500 hover:text-blue-600 bg-white p-2 rounded-lg border border-slate-200 shadow-sm transition-colors"
                    >
                      <Download size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>{payments.length} transactions processed</span>
          <span>Secured via Razorpay API</span>
        </div>
      </div>
    </div>
  );
}
