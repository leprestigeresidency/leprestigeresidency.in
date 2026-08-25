import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Bell, CalendarCheck, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminNotifications() {
  const { adminData } = useOutletContext<any>();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Listen to real-time bookings to construct notifications feed
    const q = query(
      collection(db, "bookings"),
      where("branchId", "==", adminData.branchId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs: any[] = [];

      snapshot.forEach(doc => {
        const d = doc.data();
        const guestName = d.guestDetails?.fullName || "Guest";
        const bookingId = d.bookingId || doc.id.slice(0, 6).toUpperCase();
        const timeStr = d.createdAt ? new Date(d.createdAt.toMillis ? d.createdAt.toMillis() : d.createdAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recently";

        // Notification 1: New Booking
        notifs.push({
          id: `notif-booking-${doc.id}`,
          type: "New Booking",
          title: "New Reservation Received",
          description: `${guestName} reserved ${d.roomType || "Room"} for ${d.checkIn || "upcoming dates"}.`,
          bookingId: bookingId,
          date: timeStr,
          timestamp: d.createdAt?.toMillis ? d.createdAt.toMillis() : 0,
          targetRoute: "/admin/bookings"
        });
      });

      // Sort newest first
      notifs.sort((a, b) => b.timestamp - a.timestamp);

      setNotifications(notifs);
      setLoading(false);
    }, (error) => {
      console.error("Error loading notifications: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [adminData?.branchId]);

  const markAsRead = (id: string) => {
    setReadIds(prev => ({ ...prev, [id]: true }));
  };

  const markAllAsRead = () => {
    const allRead: Record<string, boolean> = {};
    notifications.forEach(n => { allRead[n.id] = true; });
    setReadIds(allRead);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "New Booking":
        return <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><CalendarCheck size={20} /></div>;
      default:
        return <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Bell size={20} /></div>;
    }
  };

  return (
    <div className="space-y-6 relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Notifications</h2>
          <p className="text-sm text-slate-500 mt-1">Real-time alerts for <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>

        {notifications.length > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <CheckCircle2 size={14} /> Mark All as Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px] relative">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Listening for branch updates...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-slate-50 border-2 border-dashed border-slate-200 m-6 rounded-xl">
            <Bell size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="font-semibold text-slate-600">No notifications available</p>
            <p className="text-xs text-slate-400 mt-1">New reservation events and payment activities will trigger alerts here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((n) => {
              const isRead = readIds[n.id];
              return (
                <div 
                  key={n.id} 
                  onClick={() => { markAsRead(n.id); navigate(n.targetRoute); }}
                  className={`p-5 flex items-start gap-4 transition-colors cursor-pointer group ${
                    isRead ? "bg-white hover:bg-slate-50/80 opacity-75" : "bg-blue-50/40 hover:bg-blue-50/80"
                  }`}
                >
                  {getIcon(n.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {n.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">{n.date}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">{n.description}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded">
                        Ref: #{n.bookingId}
                      </span>

                      {!isRead && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                          className="text-[11px] font-medium text-slate-400 hover:text-slate-700 underline"
                        >
                          Dismiss
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
