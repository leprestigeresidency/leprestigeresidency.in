import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Loader2, BedDouble, User, Info } from "lucide-react";

export default function AdminCalendar() {
  const { adminData } = useOutletContext<any>();
  const [bookings, setBookings] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // Current view date (defaults to current month)
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!db || !adminData?.branchId) return;

    // Fetch branch rooms
    const roomsQuery = query(
      collection(db, "rooms"),
      where("branchId", "==", adminData.branchId)
    );
    const unsubRooms = onSnapshot(roomsQuery, (snapshot) => {
      const rData: any[] = [];
      snapshot.forEach(doc => rData.push({ id: doc.id, ...doc.data() }));
      rData.sort((a, b) => (a.roomNumber || "").localeCompare(b.roomNumber || "", undefined, { numeric: true }));
      setRooms(rData);
    });

    // Fetch branch bookings
    const bookingsQuery = query(
      collection(db, "bookings"),
      where("branchId", "==", adminData.branchId)
    );
    const unsubBookings = onSnapshot(bookingsQuery, (snapshot) => {
      const bData: any[] = [];
      snapshot.forEach(doc => bData.push({ id: doc.id, ...doc.data() }));
      setBookings(bData);
      setLoading(false);
    });

    return () => {
      unsubRooms();
      unsubBookings();
    };
  }, [adminData?.branchId]);

  // Generate 7 days starting from current selected date
  const getDaysHeader = () => {
    const days = [];
    const start = new Date(currentDate);
    for (let i = 0; i < 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const daysHeader = getDaysHeader();

  const prevDays = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const nextDays = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const resetToday = () => {
    setCurrentDate(new Date());
  };

  const isSameDay = (d1: Date, d2Str: string) => {
    if (!d2Str) return false;
    const d2 = new Date(d2Str);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const getBookingForRoomAndDate = (roomNameOrType: string, date: Date) => {
    const targetTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    
    return bookings.find(b => {
      const checkInTime = new Date(b.checkIn).getTime();
      const checkOutTime = new Date(b.checkOut).getTime();
      const matchesRoom = b.roomType === roomNameOrType || b.roomNumber === roomNameOrType;
      const isWithinStay = targetTime >= checkInTime && targetTime < checkOutTime;
      return matchesRoom && isWithinStay;
    });
  };

  return (
    <div className="space-y-6 relative">
      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 relative">
            <button 
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 font-bold text-lg"
            >
              ✕
            </button>
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Reservation Details
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedBooking.bookingId || "Booking Details"}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 font-medium block">Guest Name</span>
                <span className="font-bold text-slate-900">{selectedBooking.guestDetails?.fullName || "Guest"}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Phone / Contact</span>
                <span className="font-semibold text-slate-700">{selectedBooking.guestDetails?.phone || selectedBooking.guestDetails?.email || "N/A"}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Check In</span>
                <span className="font-semibold text-emerald-600">{selectedBooking.checkIn}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Check Out</span>
                <span className="font-semibold text-rose-600">{selectedBooking.checkOut}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Room Category</span>
                <span className="font-bold text-slate-800">{selectedBooking.roomType || "Standard"}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Total Amount</span>
                <span className="font-bold text-slate-900">₹{selectedBooking.total ? selectedBooking.total.toLocaleString("en-IN") : "0"}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Availability Calendar</h2>
          <p className="text-sm text-slate-500 mt-1">Live timeline view of room bookings for <strong className="text-blue-600">{adminData?.branchId}</strong> branch.</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
          <button onClick={prevDays} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={resetToday} className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            Today
          </button>
          <button onClick={nextDays} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative min-h-[400px]">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-white/50 backdrop-blur-sm z-10">
            <Loader2 size={32} className="animate-spin text-blue-600 mb-4" />
            <p className="font-medium text-sm">Building room timeline...</p>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest sticky left-0 bg-slate-50 z-20 border-r border-slate-200 w-48">
                  Room / Category
                </th>
                {daysHeader.map((d, idx) => {
                  const isToday = isSameDay(d, new Date().toISOString());
                  return (
                    <th key={idx} className={`px-4 py-3 text-center border-r border-slate-200 min-w-[100px] ${isToday ? "bg-blue-50/80" : ""}`}>
                      <div className="text-[10px] font-bold uppercase text-slate-400">
                        {d.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className={`text-sm font-bold mt-0.5 ${isToday ? "text-blue-600" : "text-slate-800"}`}>
                        {d.getDate()} {d.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rooms.length === 0 ? (
                // Fallback default categories if no room collection records exist yet
                ["Deluxe King", "Twin Special", "Executive Suite", "Family Suite"].map((roomType, rIdx) => (
                  <tr key={rIdx}>
                    <td className="px-6 py-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-200 flex items-center gap-2">
                      <BedDouble size={16} className="text-blue-600" />
                      {roomType}
                    </td>
                    {daysHeader.map((d, dIdx) => {
                      const booking = getBookingForRoomAndDate(roomType, d);
                      return (
                        <td key={dIdx} className="p-1 border-r border-slate-100 text-center relative h-14">
                          {booking ? (
                            <div 
                              onClick={() => setSelectedBooking(booking)}
                              className="w-full h-full bg-blue-600 text-white rounded-lg p-2 flex flex-col justify-center items-start text-xs font-semibold cursor-pointer hover:bg-blue-700 transition-colors shadow-sm overflow-hidden"
                            >
                              <span className="truncate w-full font-bold">{booking.guestDetails?.fullName || "Reserved"}</span>
                              <span className="text-[9px] opacity-80 uppercase tracking-tight">{booking.status}</span>
                            </div>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-emerald-50/50 hover:bg-emerald-100/50 transition-colors flex items-center justify-center text-[10px] font-bold text-emerald-600 cursor-default">
                              Available
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                rooms.map((room) => (
                  <tr key={room.id}>
                    <td className="px-6 py-4 font-bold text-slate-900 sticky left-0 bg-white z-10 border-r border-slate-200">
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} className="text-blue-600 shrink-0" />
                        <div>
                          <div>Room {room.roomNumber}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{room.type || room.name}</div>
                        </div>
                      </div>
                    </td>
                    {daysHeader.map((d, dIdx) => {
                      const booking = getBookingForRoomAndDate(room.type || room.roomNumber, d);
                      return (
                        <td key={dIdx} className="p-1 border-r border-slate-100 text-center relative h-14">
                          {booking ? (
                            <div 
                              onClick={() => setSelectedBooking(booking)}
                              className="w-full h-full bg-blue-600 text-white rounded-lg p-2 flex flex-col justify-center items-start text-xs font-semibold cursor-pointer hover:bg-blue-700 transition-colors shadow-sm overflow-hidden"
                            >
                              <span className="truncate w-full font-bold">{booking.guestDetails?.fullName || "Reserved"}</span>
                              <span className="text-[9px] opacity-80 uppercase tracking-tight">{booking.status}</span>
                            </div>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-emerald-50/50 hover:bg-emerald-100/50 transition-colors flex items-center justify-center text-[10px] font-bold text-emerald-600 cursor-default">
                              Available
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-emerald-500 rounded"></span> Available</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-600 rounded"></span> Confirmed / Reserved</span>
          </div>
          <span>Showing 14-day rolling timeline</span>
        </div>
      </div>
    </div>
  );
}
