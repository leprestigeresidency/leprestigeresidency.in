import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { db } from "@/firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Users, BedDouble, CalendarCheck, Megaphone, Keyboard, CheckCircle2 } from "lucide-react";

export default function AdminDashboard() {
  const { adminData } = useOutletContext<any>();
  const branchId = adminData?.branchId;
  const navigate = useNavigate();

  const [dateFilter, setDateFilter] = useState("Today");
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayCheckIns: 0,
    todayCheckOuts: 0,
    roomsAvailable: 0,
    roomsReserved: 0,
    roomsOccupied: 0,
    totalRooms: 0,
    occupancyRate: 0,
  });
  const [todaysBookings, setTodaysBookings] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db || !branchId) return;

    // 1. Rooms
    const qRooms = query(collection(db, "rooms"), where("branchId", "==", branchId));
    const unsubRooms = onSnapshot(qRooms, (snapshot) => {
      let total = 0, avail = 0, reserved = 0, occupied = 0;
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.active !== false) {
          total++;
          if (data.status === "Available") avail++;
          else if (data.status === "Reserved") reserved++;
          else if (data.status === "Occupied") occupied++;
        }
      });
      const occupancy = total > 0 ? Math.round((occupied / total) * 100) : 0;
      setStats(prev => ({
        ...prev,
        totalRooms: total,
        roomsAvailable: avail,
        roomsReserved: reserved,
        roomsOccupied: occupied,
        occupancyRate: occupancy,
      }));
    });

    // 2. Bookings
    const unsubBookings = onSnapshot(collection(db, "bookings"), (snapshot) => {
      let tBookings = 0;
      let checkIns = 0;
      let checkOuts = 0;
      const todayStr = new Date().toISOString().split("T")[0]; 

      let allBookings: any[] = [];

      snapshot.forEach(doc => {
        const b = { id: doc.id, ...doc.data() } as any;
        const bBranch = (b.branchId || b.branch || "").toString().toLowerCase();
        const aBranch = (branchId || "").toString().toLowerCase();

        const matchesBranch = 
          bBranch === aBranch ||
          (aBranch.includes("pond") && (bBranch.includes("pond") || bBranch.includes("pudu"))) ||
          (aBranch.includes("tind") && bBranch.includes("tind")) ||
          !b.branchId; // Fallback if branch unassigned

        if (matchesBranch) {
          allBookings.push(b);
        }
      });

      // Client-side sort by createdAt
      allBookings.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (new Date(a.createdAt).getTime() || 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (new Date(b.createdAt).getTime() || 0);
        return timeB - timeA;
      });

      const upcoming: any[] = [];
      const todayList: any[] = [];

      allBookings.forEach(b => {
        tBookings++;
        if (b.checkIn === todayStr) {
          checkIns++;
          todayList.push(b);
        }
        if (b.checkOut === todayStr) {
          checkOuts++;
        }
        if (b.checkIn >= todayStr && upcoming.length < 5) upcoming.push(b);
      });

      setStats(prev => ({ ...prev, totalBookings: tBookings, todayCheckIns: checkIns, todayCheckOuts: checkOuts }));
      setTodaysBookings(todayList.slice(0, 5));
      setUpcomingBookings(upcoming);
      setLoading(false);
    }, (error) => {
      console.error("Bookings query error:", error);
      setLoading(false);
    });

    return () => {
      unsubRooms();
      unsubBookings();
    };
  }, [branchId, dateFilter]);

  if (loading) {
    return <div className="text-center p-8 text-[#64748B]">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-6">
      
      {/* Date Filter */}
      <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4">
        <select 
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-white border border-[#E2E8F0] text-[#0F172A] p-2 rounded-lg text-sm font-semibold shadow-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 cursor-pointer"
        >
          <option>Today</option>
          <option>Yesterday</option>
          <option>Last 7 Days</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="TOTAL BOOKINGS" value={stats.totalBookings} icon={<CalendarCheck size={24} />} color="blue" />
        <KPICard title="TODAY'S CHECK-INS" value={stats.todayCheckIns} icon={<Users size={24} />} color="emerald" />
        <KPICard title="TODAY'S CHECK-OUTS" value={stats.todayCheckOuts} icon={<Users size={24} />} color="amber" />
        <KPICard title="TOTAL ROOMS" value={stats.totalRooms} icon={<BedDouble size={24} />} color="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROOM OVERVIEW */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <h3 className="text-[#0F172A] font-bold mb-6">ROOM OVERVIEW</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#64748B] font-medium">Total Rooms</span>
              <span className="font-bold text-[#0F172A]">{stats.totalRooms}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-emerald-600 font-medium tracking-wide">Available</span>
              <span className="font-semibold text-emerald-700">{stats.roomsAvailable}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-amber-600 font-medium tracking-wide">Reserved</span>
              <span className="font-semibold text-amber-700">{stats.roomsReserved}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-indigo-600 font-medium tracking-wide">Occupied</span>
              <span className="font-semibold text-indigo-700">{stats.roomsOccupied}</span>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-xs font-bold text-[#64748B] tracking-wider uppercase mb-3">OCCUPANCY</h4>
            <div className="h-3 w-full bg-[#F1F5F9] rounded-full overflow-hidden flex">
              <div style={{ width: `${stats.occupancyRate}%` }} className="bg-[#2563EB] h-full rounded-r-full transition-all"></div>
            </div>
            <p className="text-right text-xs font-bold text-[#0F172A] mt-2">{stats.occupancyRate}%</p>
          </div>
        </div>

        {/* TODAY'S BOOKINGS & UPCOMING */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#E2E8F0]">
              <h3 className="text-[#0F172A] font-bold">TODAY'S BOOKINGS</h3>
            </div>
            {todaysBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8FAFC] text-[#64748B] text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Booking ID</th>
                      <th className="px-6 py-3 font-semibold">Guest</th>
                      <th className="px-6 py-3 font-semibold">Room</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {todaysBookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={() => navigate(`/admin/bookings?id=${b.bookingId}`)}>
                        <td className="px-6 py-3 font-mono font-medium text-[#2563EB]">{b.bookingId || b.referenceNumber || b.id.slice(0, 8)}</td>
                        <td className="px-6 py-3 font-medium text-[#0F172A]">{b.guestDetails?.fullName || "Guest"}</td>
                        <td className="px-6 py-3 text-[#64748B]">{b.roomType}</td>
                        <td className="px-6 py-3">
                          <span className="px-2 py-1 rounded bg-[#F0FDF4] text-[#16A34A] text-xs font-bold">{b.status || "Confirmed"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-[#64748B] text-sm">No bookings scheduled for today.</div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex justify-between items-center">
              <h3 className="text-[#0F172A] font-bold">UPCOMING BOOKINGS</h3>
              <button 
                onClick={() => navigate("/admin/bookings")} 
                className="text-[#2563EB] text-sm font-semibold hover:underline"
              >
                View All Bookings →
              </button>
            </div>
            {upcomingBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8FAFC] text-[#64748B] text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Date</th>
                      <th className="px-6 py-3 font-semibold">Guest</th>
                      <th className="px-6 py-3 font-semibold">Duration</th>
                      <th className="px-6 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {upcomingBookings.map(b => (
                      <tr key={b.id} className="hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={() => navigate(`/admin/bookings?id=${b.bookingId}`)}>
                        <td className="px-6 py-3 font-medium text-[#0F172A]">{b.checkIn}</td>
                        <td className="px-6 py-3 font-medium text-[#0F172A]">{b.guestDetails?.fullName || "Guest"}</td>
                        <td className="px-6 py-3 text-[#64748B]">{(new Date(b.checkOut).getTime() - new Date(b.checkIn).getTime()) / (1000*3600*24)} Nights</td>
                        <td className="px-6 py-3">
                          <span className="px-2 py-1 rounded bg-[#EFF6FF] text-[#2563EB] text-xs font-bold">{b.status || "Confirmed"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-[#64748B] text-sm">No upcoming bookings.</div>
            )}
          </div>

        </div>
      </div>

      {/* ── Campaign Landing Pages — Display Only ─────────────── */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#E2E8F0]">
          <div className="p-2 rounded-xl bg-[#EFF6FF] text-[#2563EB]">
            <Megaphone size={20} />
          </div>
          <div>
            <h3 className="text-[#0F172A] font-bold text-sm tracking-wide uppercase">Campaign Landing Pages</h3>
            <p className="text-xs text-[#64748B] mt-0.5">Active ad campaign destinations — display reference only</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tourist Landing Page */}
          <div className="border border-[#E2E8F0] rounded-xl p-5 bg-[#F8FAFC] select-none">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <Megaphone size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Tourist Landing Page</p>
                  <p className="text-xs text-[#64748B]">Campaign page</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#16A34A] text-xs font-bold border border-[#BBF7D0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E2E8F0]">
              <Keyboard size={14} className="text-[#64748B] shrink-0" />
              <div>
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-semibold">Public Shortcut</p>
                <p className="text-sm font-bold text-[#0F172A] font-mono">Alt + Shift + F1</p>
              </div>
            </div>
          </div>

          {/* Business Landing Page */}
          <div className="border border-[#E2E8F0] rounded-xl p-5 bg-[#F8FAFC] select-none">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <Megaphone size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A]">Business Landing Page</p>
                  <p className="text-xs text-[#64748B]">Campaign page</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#16A34A] text-xs font-bold border border-[#BBF7D0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block"></span>
                Active
              </span>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#E2E8F0]">
              <Keyboard size={14} className="text-[#64748B] shrink-0" />
              <div>
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-semibold">Public Shortcut</p>
                <p className="text-sm font-bold text-[#0F172A] font-mono">Alt + Shift + F2</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-[#94A3B8] text-center">
          These shortcuts are active on the public website only and do not navigate within the admin panel.
        </p>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, color }: { title: string, value: string|number, icon: any, color: string }) {
  const bgColors: any = {
    blue: "bg-[#EFF6FF] text-[#2563EB]",
    emerald: "bg-[#ECFDF5] text-[#10B981]",
    amber: "bg-[#FFFBEB] text-[#F59E0B]",
    indigo: "bg-[#EEF2FF] text-[#6366F1]"
  };
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-bold text-[#64748B] tracking-wider uppercase">{title}</h4>
        <div className={`p-2.5 rounded-xl ${bgColors[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-[#0F172A]">{value}</p>
    </div>
  );
}
