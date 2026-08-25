import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, CalendarCheck, BedDouble, MessageSquare, TrendingUp, Users, Search, RefreshCw, Shield, MapPin, Building2, Globe, LogOut, Trash2, BellRing } from "lucide-react"
import { AdminService, BookingRecord, RoomRecord, InquiryRecord } from "@/services/admin.service"
import { db } from "@/firebase/config"
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore"

export type BranchFilter = "ALL" | "Pondicherry" | "Tindivanam"

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "BOOKINGS" | "ROOMS" | "INQUIRIES">("OVERVIEW")
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>("ALL")
  const [bookings, setBookings] = useState<BookingRecord[]>([])
  const [rooms, setRooms] = useState<RoomRecord[]>([])
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("ALL")
  const [newBookingAlert, setNewBookingAlert] = useState<BookingRecord | null>(null)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    document.title = "Admin Portal | Le Prestige Residency"
    
    if (!db) return
    setLoading(true)

    // Listen to Bookings real-time
    const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"), limit(50))
    const unsubBookings = onSnapshot(qBookings, (snapshot) => {
      if (!isFirstLoad.current) {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const addedB = { id: change.doc.id, branch: change.doc.data().branch || "Pondicherry", ...change.doc.data() } as BookingRecord
            setNewBookingAlert(addedB)
            setTimeout(() => setNewBookingAlert(null), 8000)
          }
        })
      }
      
      const liveBookings = snapshot.docs.map(doc => ({ id: doc.id, branch: doc.data().branch || "Pondicherry", ...doc.data() })) as BookingRecord[]
      
      // Merge with local storage mock bookings if any
      let localBookings: BookingRecord[] = []
      try {
        const stored = localStorage.getItem("le_prestige_user_bookings")
        if (stored) localBookings = JSON.parse(stored)
      } catch (e) {}

      setBookings([...localBookings, ...liveBookings])
    })

    // Listen to Rooms real-time
    const unsubRooms = onSnapshot(collection(db, "rooms"), (snapshot) => {
      const liveRooms = snapshot.docs.map(doc => ({ id: doc.id, branch: doc.data().branch || "Pondicherry", ...doc.data() })) as RoomRecord[]
      if (liveRooms.length > 0) {
        setRooms(liveRooms)
      } else {
        // Fallback static rooms if db is completely empty
        AdminService.getRooms().then(setRooms)
      }
    })

    // Listen to Contact Inquiries real-time
    const unsubInquiries = onSnapshot(collection(db, "contact"), (snapshot) => {
      const liveInquiries = snapshot.docs.map(doc => ({ id: doc.id, branch: doc.data().branch || "Pondicherry", ...doc.data() })) as InquiryRecord[]
      setInquiries(liveInquiries)
      setLoading(false)
    })

    return () => {
      unsubBookings()
      unsubRooms()
      unsubInquiries()
    }
  }, [])

  useEffect(() => {
    // ensure first load flag clears after initial fetch
    const timer = setTimeout(() => { isFirstLoad.current = false }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleExitAdmin = () => {
    sessionStorage.removeItem("lp_admin_session")
    window.location.href = "/"
  }

  const handleClearLocalData = () => {
    if (window.confirm("Are you sure you want to clear all locally cached test bookings?")) {
      localStorage.removeItem("le_prestige_user_bookings")
      window.location.reload()
    }
  }

  // loadAdminData is not strictly needed for fetch anymore, just for fallback
  const loadAdminData = () => {
    // Relying on onSnapshot, just blink the button state
    setLoading(true)
    setTimeout(() => setLoading(false), 500)
  }

  const handleStatusChange = async (bookingId: string, newStatus: BookingRecord["status"]) => {
    await AdminService.updateBookingStatus(bookingId, newStatus)
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)))
  }

  const handleRoomStatusChange = async (roomId: string, newStatus: RoomRecord["status"]) => {
    await AdminService.updateRoomStatus(roomId, newStatus)
    setRooms((prev) => prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r)))
  }

  // Branch-Filtered Datasets
  const branchBookings = bookings.filter((b) => 
    selectedBranch === "ALL" || (b.branch || "").toLowerCase().includes(selectedBranch.toLowerCase())
  )
  const branchRooms = rooms.filter((r) => 
    selectedBranch === "ALL" || (r.branch || "").toLowerCase().includes(selectedBranch.toLowerCase())
  )
  const branchInquiries = inquiries.filter((inq) => 
    selectedBranch === "ALL" || (inq.branch || "").toLowerCase().includes(selectedBranch.toLowerCase())
  )

  // Search & Status Filtered Bookings
  const filteredBookings = branchBookings.filter((b) => {
    const matchesSearch = (b.referenceNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.guestDetails?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.roomType || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (b.branch || "").toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "ALL" || b.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Summary Metrics calculated per active branch selection
  const occupiedRooms = branchRooms.filter((r) => r.status === "OCCUPIED").length
  const occupancyRate = branchRooms.length ? Math.round((occupiedRooms / branchRooms.length) * 100) : 0

  // Most Booked Room Calculation
  const roomCounts = branchBookings.reduce((acc, b) => {
    acc[b.roomType] = (acc[b.roomType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostBookedRoom = Object.keys(roomCounts).length > 0 
    ? Object.keys(roomCounts).reduce((a, b) => roomCounts[a] > roomCounts[b] ? a : b) 
    : "N/A"

  const handleExportCSV = () => {
    let dataToExport: any[] = []
    let filename = ""

    if (activeTab === "BOOKINGS" || activeTab === "OVERVIEW") {
      dataToExport = branchBookings.map(b => ({
        "Booking ID": b.id,
        "Reference": b.referenceNumber,
        "Branch": b.branch,
        "Guest Name": b.guestDetails?.fullName || "N/A",
        "Email": b.guestDetails?.email || "N/A",
        "Phone": b.guestDetails?.phone || "N/A",
        "Room Type": b.roomType,
        "Check In": b.checkIn,
        "Check Out": b.checkOut,
        "Guests": `${b.adults} Adults, ${b.children} Kids`,
        "Status": b.status,
      }))
      filename = `LePrestige_Bookings_${selectedBranch}.csv`
    } else if (activeTab === "INQUIRIES") {
      dataToExport = branchInquiries.map(i => ({
        "Inquiry ID": i.id,
        "Branch": i.branch,
        "Guest Name": i.name,
        "Email": i.email,
        "Phone": i.phone || "N/A",
        "Subject": i.subject || "N/A",
        "Message": i.message,
        "Status": i.status
      }))
      filename = `LePrestige_Inquiries_${selectedBranch}.csv`
    } else {
      alert("Please switch to Bookings or Inquiries tab to export data.")
      return
    }

    if (dataToExport.length === 0) {
      alert("No data available to export.")
      return
    }

    // Convert JSON to CSV string
    const headers = Object.keys(dataToExport[0])
    const csvRows = [
      headers.join(","),
      ...dataToExport.map(row => headers.map(header => `"${String(row[header as keyof typeof row]).replace(/"/g, '""')}"`).join(","))
    ]
    const csvString = csvRows.join("\n")

    // Trigger Download
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="w-full bg-[#F8F4EE] min-h-screen pt-28 pb-20 text-[var(--lp-heading)]">
      
      {/* 🔔 New Booking Alert Popup */}
      <AnimatePresence>
        {newBookingAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-24 left-1/2 z-[100] bg-[#111827] text-white p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700 w-[90%] max-w-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                <BellRing size={24} className="animate-bounce" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-green-400 mb-1 uppercase tracking-wider">New Booking Received!</h4>
                <p className="text-white font-serif text-lg leading-tight mb-1">{newBookingAlert.guestDetails.fullName}</p>
                <div className="flex flex-col gap-0.5 text-xs text-slate-300">
                  <span>📍 {newBookingAlert.branch} • {newBookingAlert.roomType} Room</span>
                  <span>📅 {newBookingAlert.checkIn} to {newBookingAlert.checkOut}</span>
                  <span className="text-green-300 mt-1 font-semibold">Status: {newBookingAlert.status || "CONFIRMED"}</span>
                </div>
              </div>
              <button onClick={() => setNewBookingAlert(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 max-w-[1280px]">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-[var(--lp-border)]">
          <div>
            <div className="flex items-center gap-2 text-[var(--lp-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-1">
              <Shield size={14} /> Multi-Branch Management Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-medium font-serif">Le Prestige Admin Portal</h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            
            <button 
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[var(--lp-border)] hover:bg-[#F3EEE7] text-xs font-bold text-black transition-all shadow-sm cursor-pointer"
            >
              <span className="text-lg leading-none">📊</span> Export Data (CSV)
            </button>

            <button 
              onClick={loadAdminData}
              disabled={loading}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[var(--lp-border)] hover:bg-[#F3EEE7] text-xs font-bold text-black transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
            </button>

            <button 
              onClick={handleClearLocalData}
              title="Clear locally stored test bookings"
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[var(--lp-border)] hover:bg-red-50 text-xs font-bold text-red-700 transition-all shadow-sm cursor-pointer"
            >
              <Trash2 size={15} className="text-red-600" /> Clear Test Data
            </button>

            <button 
              onClick={handleExitAdmin}
              className="flex items-center gap-2 bg-[#E6D7C3] hover:bg-[#D4C3AC] active:scale-95 text-black hover:text-black px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md cursor-pointer border-2 border-black"
            >
              <LogOut size={15} className="text-black" /> Exit
            </button>
          </div>
        </div>

        {/* 🏢 BRANCH SWITCHER WIDGET */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[var(--lp-border)] shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[var(--lp-accent)]/10 text-[var(--lp-accent)] rounded-xl">
                <Building2 size={20} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-black font-extrabold block mb-0.5">Select Active Property</span>
                <p className="text-sm font-extrabold text-black flex items-center gap-1.5">
                  <MapPin size={14} className="text-black" /> 
                  Currently Viewing: <span className="text-black font-black underline underline-offset-2">{selectedBranch === "ALL" ? "All Branches (Combined)" : `${selectedBranch} Branch`}</span>
                </p>
              </div>
            </div>

            {/* Branch Switch Buttons */}
            <div className="flex items-center gap-2 bg-[#F8F4EE] p-1.5 rounded-xl border border-[var(--lp-border)] w-full md:w-auto overflow-x-auto">
              <button
                onClick={() => setSelectedBranch("ALL")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedBranch === "ALL"
                    ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold"
                    : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
                }`}
              >
                <Globe size={14} className="text-black" /> All Branches
              </button>

              <button
                onClick={() => setSelectedBranch("Pondicherry")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedBranch === "Pondicherry"
                    ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold"
                    : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
                }`}
              >
                <MapPin size={14} className="text-black" /> Pondicherry Branch
              </button>

              <button
                onClick={() => setSelectedBranch("Tindivanam")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedBranch === "Tindivanam"
                    ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold"
                    : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
                }`}
              >
                <MapPin size={14} className="text-black" /> Tindivanam Branch
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-[var(--lp-border-light)] pb-4">
          <button 
            onClick={() => setActiveTab("OVERVIEW")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "OVERVIEW" 
                ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold" 
                : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
            }`}
          >
            <LayoutDashboard size={18} className="text-black" /> Overview & Analytics
          </button>
          
          <button 
            onClick={() => setActiveTab("BOOKINGS")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "BOOKINGS" 
                ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold" 
                : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
            }`}
          >
            <CalendarCheck size={18} className="text-black" /> Bookings ({branchBookings.length})
          </button>
          
          <button 
            onClick={() => setActiveTab("ROOMS")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "ROOMS" 
                ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold" 
                : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
            }`}
          >
            <BedDouble size={18} className="text-black" /> Room Inventory ({branchRooms.length})
          </button>

          <button 
            onClick={() => setActiveTab("INQUIRIES")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "INQUIRIES" 
                ? "bg-[#E6D7C3] text-black border-2 border-black shadow-md font-extrabold" 
                : "bg-white text-black border border-[var(--lp-border)] hover:bg-[#F3EEE7] hover:text-black hover:border-black"
            }`}
          >
            <MessageSquare size={18} className="text-black" /> Guest Inquiries ({branchInquiries.length})
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === "OVERVIEW" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <CalendarCheck size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold">
                    {selectedBranch === "ALL" ? "Active Bookings" : `${selectedBranch} Bookings`}
                  </p>
                  <p className="text-2xl font-bold font-serif text-[var(--lp-heading)]">{branchBookings.length}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold">Occupancy Rate</p>
                  <p className="text-2xl font-bold font-serif text-[var(--lp-heading)]">{occupancyRate}%</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold relative overflow-hidden">
                  <div className="absolute inset-0 bg-purple-200/50 animate-pulse" />
                  <BedDouble size={24} className="relative z-10" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold">Most Booked</p>
                  <p className="text-xl font-bold font-serif text-[var(--lp-heading)] truncate max-w-[150px]">{mostBookedRoom}</p>
                </div>
              </div>

            </div>

            {/* 📊 Graphical Breakdown section */}
            {branchBookings.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm mb-8">
                <h3 className="font-serif text-xl font-semibold mb-6">Booking Distribution by Room Type</h3>
                <div className="space-y-4">
                  {Object.entries(roomCounts).sort((a,b) => b[1]-a[1]).map(([room, count]) => {
                    const percentage = Math.round((count / branchBookings.length) * 100)
                    return (
                      <div key={room} className="flex items-center gap-4">
                        <div className="w-24 shrink-0 text-sm font-semibold truncate" title={room}>{room}</div>
                        <div className="flex-1 h-3 bg-[#F8F4EE] rounded-full overflow-hidden border border-[var(--lp-border)]">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${percentage}%` }} 
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-[var(--lp-accent)] rounded-full" 
                          />
                        </div>
                        <div className="w-12 text-right text-xs font-bold text-[var(--lp-muted)]">{percentage}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Recent Reservations Table Preview */}
            <div className="bg-white rounded-2xl border border-[var(--lp-border)] p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-xl font-semibold">Recent Reservations ({selectedBranch === "ALL" ? "All Properties" : selectedBranch})</h3>
                <span className="text-xs font-semibold px-3 py-1 bg-[#F8F4EE] border border-[var(--lp-border)] rounded-full text-[var(--lp-muted)]">
                  Showing {Math.min(5, branchBookings.length)} of {branchBookings.length}
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8F4EE] border-b border-[var(--lp-border)] text-xs uppercase tracking-wider text-[var(--lp-muted)]">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Branch</th>
                      <th className="p-4">Guest</th>
                      <th className="p-4">Room</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--lp-border-light)]">
                    {branchBookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#F8F4EE]/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-[var(--lp-accent)]">{b.referenceNumber}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            b.branch.toLowerCase().includes("pondicherry") 
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-teal-100 text-teal-800 border border-teal-200"
                          }`}>
                            📍 {b.branch}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{b.guestDetails?.fullName || "N/A"}</td>
                        <td className="p-4">{b.roomType} Room</td>
                        <td className="p-4 text-xs text-[var(--lp-muted)]">{b.checkIn} to {b.checkOut}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            b.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                            b.status === "CHECKED_IN" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: BOOKINGS MANAGER */}
        {activeTab === "BOOKINGS" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[var(--lp-border)] shadow-sm">
              <div className="flex items-center gap-3 bg-[#F8F4EE] px-4 py-2.5 rounded-xl border border-[var(--lp-border)] w-full sm:w-80">
                <Search size={18} className="text-[var(--lp-muted)]" />
                <input 
                  type="text" 
                  placeholder="Search by ref, guest, branch or room..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm focus:outline-none w-full"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--lp-muted)] font-semibold uppercase">Choose Branch:</span>
                  <select 
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value as any)}
                    className="bg-[#F8F4EE] border border-[var(--lp-border)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--lp-heading)] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">🌐 All Branches</option>
                    <option value="Pondicherry">📍 Pondicherry</option>
                    <option value="Tindivanam">📍 Tindivanam</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--lp-muted)] font-semibold uppercase">Filter Status:</span>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-[#F8F4EE] border border-[var(--lp-border)] rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="CHECKED_IN">CHECKED IN</option>
                    <option value="CHECKED_OUT">CHECKED OUT</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[var(--lp-border)] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8F4EE] border-b border-[var(--lp-border)] text-xs uppercase tracking-wider text-[var(--lp-muted)]">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Branch</th>
                      <th className="p-4">Guest Details</th>
                      <th className="p-4">Room Type</th>
                      <th className="p-4">Stay Dates</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--lp-border-light)]">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F8F4EE]/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-[var(--lp-accent)]">{b.referenceNumber}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                            b.branch.toLowerCase().includes("pondicherry") 
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-teal-100 text-teal-800 border border-teal-200"
                          }`}>
                            📍 {b.branch}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-[var(--lp-heading)]">{b.guestDetails?.fullName || "N/A"}</p>
                          <p className="text-xs text-[var(--lp-muted)]">{b.guestDetails?.email || ""} | {b.guestDetails?.phone || ""}</p>
                        </td>
                        <td className="p-4 font-medium">{b.roomType} Room</td>
                        <td className="p-4 text-xs text-[var(--lp-muted)]">{b.checkIn} → {b.checkOut}</td>
                        <td className="p-4 text-xs">{b.adults} Adults, {b.children} Kids</td>
                        <td className="p-4 text-xs">
                          {b.specialRequest ? (
                            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium" title={b.specialRequest}>
                              {b.specialRequest}
                            </span>
                          ) : (
                            <span className="text-[var(--lp-muted)]">None</span>
                          )}
                        </td>
                        <td className="p-4">
                          <select
                            value={b.status}
                            onChange={(e) => handleStatusChange(b.id, e.target.value as BookingRecord["status"])}
                            className="bg-[#F8F4EE] border border-[var(--lp-border)] rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
                          >
                            <option value="CONFIRMED">CONFIRMED</option>
                            <option value="CHECKED_IN">CHECKED IN</option>
                            <option value="CHECKED_OUT">CHECKED OUT</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: ROOM INVENTORY */}
        {activeTab === "ROOMS" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[var(--lp-border)] shadow-sm">
              <div className="flex items-center gap-2">
                <BedDouble className="text-[var(--lp-accent)]" size={20} />
                <h3 className="font-serif text-lg font-bold text-[var(--lp-heading)]">Room Inventory & Status</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--lp-muted)] font-semibold uppercase">Choose Branch:</span>
                <select 
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value as any)}
                  className="bg-[#F8F4EE] border border-[var(--lp-border)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--lp-heading)] focus:outline-none cursor-pointer"
                >
                  <option value="ALL">🌐 All Branches ({rooms.length} Rooms)</option>
                  <option value="Pondicherry">📍 Pondicherry ({rooms.filter(r => r.branch === "Pondicherry").length} Rooms)</option>
                  <option value="Tindivanam">📍 Tindivanam ({rooms.filter(r => r.branch === "Tindivanam").length} Rooms)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchRooms.map((r) => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-mono font-bold bg-[#F8F4EE] px-3 py-1 rounded-lg border border-[var(--lp-border)]">
                      Room #{r.roomNumber}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      r.status === "AVAILABLE" ? "bg-green-100 text-green-700" :
                      r.status === "OCCUPIED" ? "bg-blue-100 text-blue-700" :
                      r.status === "CLEANING" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                    }`}>
                      {r.status}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-block mb-1.5 ${
                      r.branch.toLowerCase().includes("pondicherry") 
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-teal-100 text-teal-800 border border-teal-200"
                    }`}>
                      📍 {r.branch} Branch
                    </span>
                    <h3 className="font-serif text-xl font-semibold">{r.name}</h3>
                  </div>

                  {r.status === "OCCUPIED" && (() => {
                    // Try to find a guest who checked in or is confirmed for this room type
                    const occupant = branchBookings.find(b => b.roomType === r.type && (b.status === "CHECKED_IN" || b.status === "CONFIRMED"))
                    return occupant ? (
                      <div className="bg-blue-50 border border-blue-200 p-2.5 rounded-lg mb-3">
                        <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-0.5">👤 Current Guest</p>
                        <p className="text-xs font-bold text-blue-950 truncate">{occupant.guestDetails?.fullName || "N/A"}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] font-semibold text-blue-700">Till: {occupant.checkOut}</p>
                          <p className="text-[10px] text-blue-700 font-mono">#{occupant.referenceNumber}</p>
                        </div>
                      </div>
                    ) : null
                  })()}
                  
                  <p className="text-xs text-[var(--lp-muted)] mb-4">{r.type} Category</p>

                  <div className="mb-4">
                    <span className="text-2xl font-bold font-serif">₹{r.basePrice.toLocaleString()}</span>
                    <span className="text-xs text-[var(--lp-muted)]"> / night</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {r.features.map((f, idx) => (
                      <span key={idx} className="bg-[#F8F4EE] text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md text-[var(--lp-body)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--lp-border-light)] pt-4 mt-2">
                  <label className="block text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold mb-2">Update Room Status</label>
                  <select
                    value={r.status}
                    onChange={(e) => handleRoomStatusChange(r.id, e.target.value as RoomRecord["status"])}
                    className="w-full bg-[#F8F4EE] border border-[var(--lp-border)] rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="OCCUPIED">OCCUPIED</option>
                    <option value="CLEANING">CLEANING IN PROGRESS</option>
                    <option value="MAINTENANCE">UNDER MAINTENANCE</option>
                  </select>
                </div>
              </div>
            ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: GUEST INQUIRIES */}
        {activeTab === "INQUIRIES" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[var(--lp-border)] shadow-sm">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-[var(--lp-accent)]" size={20} />
                <h3 className="font-serif text-lg font-bold text-[var(--lp-heading)]">Guest Inquiries & Support</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--lp-muted)] font-semibold uppercase">Choose Branch:</span>
                <select 
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value as any)}
                  className="bg-[#F8F4EE] border border-[var(--lp-border)] rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--lp-heading)] focus:outline-none cursor-pointer"
                >
                  <option value="ALL">🌐 All Branches ({inquiries.length} Inquiries)</option>
                  <option value="Pondicherry">📍 Pondicherry ({inquiries.filter(i => i.branch === "Pondicherry").length} Inquiries)</option>
                  <option value="Tindivanam">📍 Tindivanam ({inquiries.filter(i => i.branch === "Tindivanam").length} Inquiries)</option>
                </select>
              </div>
            </div>
            {branchInquiries.map((inq) => (
              <div key={inq.id} className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex flex-col md:flex-row justify-between gap-6 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg text-[var(--lp-heading)]">{inq.name}</h3>
                    <span className="text-xs text-[var(--lp-muted)]">({inq.email} {inq.phone ? `| ${inq.phone}` : ""})</span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inq.branch.toLowerCase().includes("pondicherry") 
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-teal-100 text-teal-800 border border-teal-200"
                    }`}>
                      📍 {inq.branch}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--lp-accent)] uppercase tracking-wider mb-2">{inq.subject || "General Inquiry"}</p>
                  <p className="text-sm text-[var(--lp-body)] bg-[#F8F4EE] p-4 rounded-xl border border-[var(--lp-border-light)] leading-relaxed">
                    "{inq.message}"
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    inq.status === "NEW" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                  }`}>
                    {inq.status}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </main>
  )
}
