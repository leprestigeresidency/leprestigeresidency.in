import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LayoutDashboard, CalendarCheck, BedDouble, MessageSquare, IndianRupee, TrendingUp, Users, Search, RefreshCw, Shield, MapPin, Building2, Globe, LogOut, Trash2 } from "lucide-react"
import { AdminService, BookingRecord, RoomRecord, InquiryRecord } from "@/services/admin.service"

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

  useEffect(() => {
    document.title = "Admin Portal | Le Prestige Residency"
    loadAdminData()
  }, [])

  const handleExitAdmin = () => {
    sessionStorage.removeItem("lp_admin_session")
    window.location.href = "/"
  }

  const handleClearLocalData = () => {
    if (window.confirm("Are you sure you want to clear all locally cached test bookings?")) {
      localStorage.removeItem("le_prestige_user_bookings")
      loadAdminData()
    }
  }

  const loadAdminData = async () => {
    setLoading(true)
    const [bData, rData, iData] = await Promise.all([
      AdminService.getBookings(),
      AdminService.getRooms(),
      AdminService.getInquiries(),
    ])
    setBookings(bData)
    setRooms(rData)
    setInquiries(iData)
    setLoading(false)
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
    selectedBranch === "ALL" || b.branch.toLowerCase().includes(selectedBranch.toLowerCase())
  )
  const branchRooms = rooms.filter((r) => 
    selectedBranch === "ALL" || r.branch.toLowerCase().includes(selectedBranch.toLowerCase())
  )
  const branchInquiries = inquiries.filter((inq) => 
    selectedBranch === "ALL" || inq.branch.toLowerCase().includes(selectedBranch.toLowerCase())
  )

  // Search & Status Filtered Bookings
  const filteredBookings = branchBookings.filter((b) => {
    const matchesSearch = b.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.guestDetails.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.branch.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "ALL" || b.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Summary Metrics calculated per active branch selection
  const totalRevenue = branchBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0)
  const occupiedRooms = branchRooms.filter((r) => r.status === "OCCUPIED").length
  const occupancyRate = branchRooms.length ? Math.round((occupiedRooms / branchRooms.length) * 100) : 0

  return (
    <main className="w-full bg-[#F8F4EE] min-h-screen pt-28 pb-20 text-[var(--lp-heading)]">
      <div className="container mx-auto px-6 max-w-[1280px]">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-[var(--lp-border)]">
          <div>
            <div className="flex items-center gap-2 text-[var(--lp-accent)] text-xs uppercase tracking-[0.2em] font-bold mb-1">
              <Shield size={14} /> Multi-Branch Management Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-medium font-serif">Le Prestige Admin Portal</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={loadAdminData}
              disabled={loading}
              className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-[var(--lp-border)] hover:bg-[#F3EEE7] text-xs font-bold text-black transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh Data
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
              <LogOut size={15} className="text-black" /> Exit Admin Session
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-[var(--lp-border)] shadow-sm flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <IndianRupee size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold">
                    {selectedBranch === "ALL" ? "Total Revenue" : `${selectedBranch} Revenue`}
                  </p>
                  <p className="text-2xl font-bold font-serif text-[var(--lp-heading)]">₹{totalRevenue.toLocaleString()}</p>
                </div>
              </div>

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
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--lp-muted)] font-semibold">Inquiries</p>
                  <p className="text-2xl font-bold font-serif text-[var(--lp-heading)]">{branchInquiries.length}</p>
                </div>
              </div>

            </div>

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
                      <th className="p-4">Amount</th>
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
                        <td className="p-4 font-medium">{b.guestDetails.fullName}</td>
                        <td className="p-4">{b.roomType} Room</td>
                        <td className="p-4 text-xs text-[var(--lp-muted)]">{b.checkIn} to {b.checkOut}</td>
                        <td className="p-4 font-semibold">₹{(b.totalPrice || 0).toLocaleString()}</td>
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
                      <th className="p-4">Amount</th>
                      <th className="p-4">Actions / Status</th>
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
                          <p className="font-medium text-[var(--lp-heading)]">{b.guestDetails.fullName}</p>
                          <p className="text-xs text-[var(--lp-muted)]">{b.guestDetails.email} | {b.guestDetails.phone}</p>
                        </td>
                        <td className="p-4 font-medium">{b.roomType} Room</td>
                        <td className="p-4 text-xs text-[var(--lp-muted)]">{b.checkIn} → {b.checkOut}</td>
                        <td className="p-4 text-xs">{b.adults} Adults, {b.children} Kids</td>
                        <td className="p-4 font-semibold text-green-700">₹{(b.totalPrice || 0).toLocaleString()}</td>
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
