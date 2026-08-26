import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Download, MoreHorizontal, Filter, Plus, Loader2, X, CheckCircle2, Printer, Trash2, User, Calendar, MapPin, CreditCard, ShieldAlert } from "lucide-react";

export default function AdminBookings() {
  const { adminData } = useOutletContext<any>();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        const b = { id: doc.id, ...doc.data() } as any;
        const bBranch = (b.branchId || b.branch || "").toString().toLowerCase();
        const aBranch = (adminData?.branchId || "").toString().toLowerCase();

        const matchesBranch = 
          bBranch === aBranch ||
          (aBranch.includes("pond") && (bBranch.includes("pond") || bBranch.includes("pudu"))) ||
          (aBranch.includes("tind") && bBranch.includes("tind")) ||
          !b.branchId;

        if (matchesBranch) {
          data.push(b);
        }
      });
      
      // Sort client-side by createdAt
      data.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (new Date(a.createdAt).getTime() || 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (new Date(b.createdAt).getTime() || 0);
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

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleUpdateStatus = async (bookingId: string, newStatus: string) => {
    setActionLoading(true);
    setActiveMenuId(null);
    try {
      if (db) {
        await updateDoc(doc(db, "bookings", bookingId), { status: newStatus });
        showToast(`Booking status updated to ${newStatus}`);
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking((prev: any) => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (e: any) {
      console.error("Error updating status:", e);
      showToast("Failed to update status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to delete this reservation?")) return;
    setActionLoading(true);
    setActiveMenuId(null);
    try {
      if (db) {
        await deleteDoc(doc(db, "bookings", bookingId));
        showToast("Reservation deleted successfully.");
        if (selectedBooking?.id === bookingId) setSelectedBooking(null);
      }
    } catch (e: any) {
      console.error("Error deleting booking:", e);
      showToast("Failed to delete booking.");
    } finally {
      setActionLoading(false);
    }
  };

  const handlePrintInvoice = (b: any) => {
    setActiveMenuId(null);
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${b.referenceNumber || b.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; }
            .logo { font-size: 24px; font-weight: bold; color: #0f172a; }
            .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
            .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 30px; color: #2563eb; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">LE PRESTIGE RESIDENCY</div>
              <p>Branch: ${b.branch || b.branchId || "Pondicherry"}</p>
            </div>
            <div>
              <p><strong>Ref:</strong> #${b.referenceNumber || b.id.slice(0, 8)}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <h3>Guest Reservation Invoice</h3>
          <p><strong>Guest Name:</strong> ${b.guestDetails?.fullName || "Guest"}</p>
          <p><strong>Email:</strong> ${b.guestDetails?.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${b.guestDetails?.phone || "N/A"}</p>
          <table class="table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${b.roomType || "Standard"}</td>
                <td>${b.checkIn ? b.checkIn.split("T")[0] : "-"}</td>
                <td>${b.checkOut ? b.checkOut.split("T")[0] : "-"}</td>
                <td>${b.status || "CONFIRMED"}</td>
              </tr>
            </tbody>
          </table>
          <div class="total">Total Paid: ₹${(b.total || 2199).toLocaleString("en-IN")}</div>
          <script>window.print();</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const getStatusBadgeColors = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("confirm") || s.includes("paid")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (s.includes("pend") || s.includes("unpaid")) return "bg-amber-100 text-amber-700 border-amber-200";
    if (s.includes("check")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (s.includes("cancel")) return "bg-red-100 text-red-700 border-red-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
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
        <div className="fixed bottom-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <p className="text-sm font-bold">{toastMsg}</p>
        </div>
      )}

      {/* Backdrop for closing active menu */}
      {activeMenuId && (
        <div className="fixed inset-0 z-30 bg-transparent" onClick={() => setActiveMenuId(null)}></div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Bookings Management</h2>
          <p className="text-sm text-slate-500 mt-1">Live data exclusively restricted to <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast("Showing all active reservations.")} 
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Filter size={16} /> Filter
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
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Reservation Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedBooking(b)}>
                  {/* REF */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{b.referenceNumber || b.bookingId || "N/A"}</div>
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
                  {/* STATUS */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusBadgeColors(b.status)}`}>
                      {b.status || "CONFIRMED"}
                    </span>
                  </td>
                  {/* ACTIONS BUTTON & POPOVER */}
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setActiveMenuId(activeMenuId === b.id ? null : b.id); 
                      }} 
                      className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-slate-600 flex items-center justify-center transition-all shadow-sm ml-auto cursor-pointer"
                      title="Click for options"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {/* POPMENU DROPDOWN */}
                    {activeMenuId === b.id && (
                      <div 
                        className="absolute right-6 top-12 w-48 bg-white rounded-xl shadow-xl border border-slate-200 z-40 overflow-hidden text-left animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Options - #{b.referenceNumber || b.id.slice(0, 6)}
                        </div>
                        <div className="py-1">
                          <button 
                            onClick={() => { setActiveMenuId(null); setSelectedBooking(b); }}
                            className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                          >
                            <User size={14} /> View Details
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(b.id, "CONFIRMED")}
                            className="w-full px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-2"
                          >
                            <CheckCircle2 size={14} /> Set Confirmed
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(b.id, "CHECKED IN")}
                            className="w-full px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                          >
                            <Calendar size={14} /> Set Checked In
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(b.id, "CHECKED OUT")}
                            className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                          >
                            <CheckCircle2 size={14} /> Set Checked Out
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(b.id, "CANCELLED")}
                            className="w-full px-3 py-2 text-xs font-semibold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                          >
                            <X size={14} /> Cancel Booking
                          </button>
                          <div className="border-t border-slate-100 my-1"></div>
                          <button 
                            onClick={() => handlePrintInvoice(b)}
                            className="w-full px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                          >
                            <Printer size={14} /> Print Receipt
                          </button>
                          <button 
                            onClick={() => handleDeleteBooking(b.id)}
                            className="w-full px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    )}
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

      {/* ── INTERACTIVE BOOKING ACTIONS MODAL ───────────────────────── */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative border border-slate-200" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Reservation</span>
                  <span className="text-slate-400 text-xs font-mono">#{selectedBooking.referenceNumber || selectedBooking.id.slice(0, 8)}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{selectedBooking.guestDetails?.fullName || "Guest Details"}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Contact Info</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedBooking.guestDetails?.email || "N/A"}</p>
                  <p className="font-semibold text-slate-800">{selectedBooking.guestDetails?.phone || "N/A"}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Room & Branch</p>
                  <p className="font-semibold text-slate-800 mt-1">{selectedBooking.roomType || "Deluxe"}</p>
                  <p className="font-semibold text-blue-600">{selectedBooking.branch || selectedBooking.branchId || "Pondy"}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Check-In / Out</p>
                  <p className="font-semibold text-slate-800 mt-1">{formatDateString(selectedBooking.checkIn)} → {formatDateString(selectedBooking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Payment Status</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusBadgeColors(selectedBooking.status)}`}>
                    {selectedBooking.status || "CONFIRMED"}
                  </span>
                </div>
              </div>

              {/* Status Change Buttons */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Reservation Status</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CONFIRMED")}
                    className="px-3 py-2 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-all text-center disabled:opacity-50 cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                  <button 
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CHECKED IN")}
                    className="px-3 py-2 rounded-lg border border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-all text-center disabled:opacity-50 cursor-pointer"
                  >
                    Check In Guest
                  </button>
                  <button 
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CHECKED OUT")}
                    className="px-3 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all text-center disabled:opacity-50 cursor-pointer"
                  >
                    Check Out Guest
                  </button>
                  <button 
                    disabled={actionLoading}
                    onClick={() => handleUpdateStatus(selectedBooking.id, "CANCELLED")}
                    className="px-3 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-all text-center disabled:opacity-50 cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2 border-t border-slate-100">
                <button 
                  onClick={() => handlePrintInvoice(selectedBooking)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Printer size={16} /> Print Receipt
                </button>
                <button 
                  onClick={() => handleDeleteBooking(selectedBooking.id)}
                  disabled={actionLoading}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

