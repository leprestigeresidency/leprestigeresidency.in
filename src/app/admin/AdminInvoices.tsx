import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { FileText, Download, Eye, Send, Loader2, CheckCircle2, Building } from "lucide-react";

export default function AdminInvoices() {
  const { adminData } = useOutletContext<any>();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Build invoices from bookings in this branch
    const q = query(
      collection(db, "bookings"),
      where("branchId", "==", adminData.branchId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const invList: any[] = [];

      snapshot.forEach(doc => {
        const d = doc.data();
        const total = Number(d.total) || 0;
        const subtotal = Math.round(total / 1.05); // 5% GST calculation
        const gst = total - subtotal;
        
        const bookingId = d.bookingId || doc.id.slice(0, 6).toUpperCase();
        
        invList.push({
          id: doc.id,
          invoiceNumber: `INV-${new Date().getFullYear()}-${bookingId}`,
          bookingId: bookingId,
          guestName: d.guestDetails?.fullName || "Guest",
          guestEmail: d.guestDetails?.email || "N/A",
          guestPhone: d.guestDetails?.phone || "N/A",
          roomType: d.roomType || "Deluxe Suite",
          checkIn: d.checkIn || "-",
          checkOut: d.checkOut || "-",
          invoiceDate: d.createdAt ? new Date(d.createdAt.toMillis ? d.createdAt.toMillis() : d.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
          subtotal: subtotal,
          gst: gst,
          total: total,
          status: d.paymentStatus || (d.status === "Confirmed" ? "Paid" : "Unpaid"),
          paymentMethod: d.paymentMethod || "Razorpay Online"
        });
      });

      setInvoices(invList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching invoices: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce">
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Invoice View Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl space-y-6 relative my-8">
            <button 
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 font-bold text-lg"
            >
              ✕
            </button>

            {/* Invoice Printable Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">LE PRESTIGE RESIDENCY</h2>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Branch: {adminData?.branchId}</p>
                <p className="text-xs text-slate-500 mt-1">Luxury Hospitality & Residency</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Tax Invoice</span>
                <span className="text-lg font-bold font-mono text-slate-900">{selectedInvoice.invoiceNumber}</span>
                <span className="text-xs text-slate-500 block mt-1">Date: {selectedInvoice.invoiceDate}</span>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl text-xs">
              <div>
                <span className="font-bold uppercase text-slate-400 block mb-1">Billed To (Guest)</span>
                <p className="font-bold text-slate-900 text-sm">{selectedInvoice.guestName}</p>
                <p className="text-slate-600 mt-0.5">{selectedInvoice.guestEmail}</p>
                <p className="text-slate-600">{selectedInvoice.guestPhone}</p>
              </div>
              <div>
                <span className="font-bold uppercase text-slate-400 block mb-1">Reservation Reference</span>
                <p className="font-bold text-slate-900 text-sm">Booking ID: {selectedInvoice.bookingId}</p>
                <p className="text-slate-600 mt-0.5">Room: {selectedInvoice.roomType}</p>
                <p className="text-slate-600">Dates: {selectedInvoice.checkIn} → {selectedInvoice.checkOut}</p>
              </div>
            </div>

            {/* Line Items */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                <tr>
                  <td className="py-3">Room Accommodation Charges ({selectedInvoice.roomType})</td>
                  <td className="py-3 text-right">₹{selectedInvoice.subtotal.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-right font-bold">₹{selectedInvoice.subtotal.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-slate-200 pt-4 flex justify-end">
              <div className="w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{selectedInvoice.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (5%)</span>
                  <span className="font-semibold">₹{selectedInvoice.gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-blue-600">₹{selectedInvoice.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                selectedInvoice.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
              }`}>
                Payment Status: {selectedInvoice.status}
              </span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => { window.print(); showToast("Sent to printer / PDF exporter"); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Download size={14} /> Download / Print PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Invoices</h2>
          <p className="text-sm text-slate-500 mt-1">Official tax invoices for confirmed bookings at <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Generating invoice records...</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 border-4 border-dashed border-slate-200 m-4 rounded-xl">
            <FileText size={40} className="text-slate-300 mb-2" />
            <p className="font-semibold text-slate-600">No invoices generated yet</p>
            <p className="text-xs text-slate-400 mt-1">Invoices are automatically compiled from confirmed guest reservations.</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Invoice #</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Booking ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Guest</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Subtotal</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">GST (5%)</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedInvoice(inv)}>
                  <td className="px-6 py-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600 text-xs">
                    {inv.bookingId}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {inv.guestName}
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">
                    ₹{inv.subtotal.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    ₹{inv.gst.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    ₹{inv.total.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                      <button 
                        onClick={() => setSelectedInvoice(inv)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Eye size={13} /> View Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <span>{invoices.length} invoices generated</span>
          <span>Compliant with 5% GST Standard</span>
        </div>
      </div>
    </div>
  );
}
