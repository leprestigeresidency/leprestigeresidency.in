import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CalendarDays, 
  BedDouble, 
  Users, 
  CreditCard, 
  FileText, 
  Bell, 
  Settings, 
  LogOut,
  Search,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isSessionAuth = sessionStorage.getItem("lp_admin_session") === "authenticated";
      const sessionBranch = sessionStorage.getItem("lp_admin_branch") || "Pondy";
      const sessionUser = sessionStorage.getItem("lp_admin_user") || "leprestigeresidency@gmail.com";

      if (isSessionAuth) {
        setAdminData({
          role: "admin",
          branchId: sessionBranch,
          email: sessionUser.includes("@") ? sessionUser : `${sessionUser}@leprestige.com`
        });
        setLoading(false);
        return;
      }

      if (auth?.currentUser && db) {
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setAdminData({ ...userDoc.data(), email: auth.currentUser.email });
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }

      // If not authenticated via session or Firebase Auth, redirect to login
      setLoading(false);
      navigate("/admin-login", { replace: true });
    };

    const unsubscribe = auth?.onAuthStateChanged(() => {
      checkAuth();
    });

    checkAuth();

    return () => unsubscribe && unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    sessionStorage.removeItem("lp_admin_session");
    sessionStorage.removeItem("lp_admin_branch");
    sessionStorage.removeItem("lp_admin_user");
    if (auth) await auth.signOut().catch(() => {});
    navigate("/admin-login", { replace: true });
  };

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 bg-slate-50 flex items-center justify-center w-full h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Dynamic Header map
  const path = location.pathname.split("/").pop();
  const headerTitleMap: Record<string, string> = {
    "admin": "Dashboard",
    "dashboard": "Dashboard",
    "bookings": "Bookings Management",
    "calendar": "Availability Calendar",
    "rooms": "Room Inventory",
    "guests": "Guest Directory",
    "notifications": "System Notifications",
    "settings": "Admin Settings",
  };
  const title = path && headerTitleMap[path] ? headerTitleMap[path] : "Dashboard";

  return (
    <div className="flex w-full min-h-screen bg-slate-50 font-sans text-slate-900 m-0 p-0 absolute inset-0 z-40 overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ----------- INTERACTIVE SEARCH MODAL ----------- */}
      {showSearch && (
        <div className="fixed inset-0 bg-slate-900/60 z-[100] flex justify-center p-4 sm:p-20 items-start overflow-y-auto" onClick={() => setShowSearch(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden mt-[10vh] animate-in fade-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center px-4 py-4 border-b border-slate-100">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search bookings, guests, or reservations..." 
                className="flex-1 bg-transparent text-lg font-medium text-slate-900 focus:outline-none placeholder:text-slate-400"
              />
              <button 
                onClick={() => setShowSearch(false)}
                className="bg-slate-100 text-slate-500 hover:bg-slate-200 px-3 py-1 rounded-md text-xs font-bold uppercase transition-colors"
              >Esc</button>
            </div>
            <div className="p-4 bg-slate-50 text-center py-10">
              <p className="text-slate-500 font-medium text-sm">Start typing to search across {adminData?.branchId} branch...</p>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:flex-shrink-0 lg:block`}
      >
        <div className="h-full flex flex-col overflow-y-auto">
          {/* Logo Area */}
          <div className="px-6 py-6 border-b border-white/10 shrink-0 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white mb-1">LE PRESTIGE</h1>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                Admin — {adminData?.branchId}
              </span>
            </div>
            <button className="lg:hidden text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
            {/* MAIN */}
            <div>
              <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Main Navigation</p>
              <div className="space-y-1">
                <NavItem to="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem to="/admin/bookings" icon={<CalendarCheck size={20} />} label="Bookings" />
                <NavItem to="/admin/calendar" icon={<CalendarDays size={20} />} label="Calendar" />
                <NavItem to="/admin/rooms" icon={<BedDouble size={20} />} label="Rooms" />
                <NavItem to="/admin/guests" icon={<Users size={20} />} label="Guests" />
              </div>
            </div>

            {/* SYSTEM */}
            <div>
              <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">System</p>
              <div className="space-y-1">
                <NavItem to="/admin/notifications" icon={<Bell size={20} />} label="Notifications" />
                <NavItem to="/admin/settings" icon={<Settings size={20} />} label="Settings" />
              </div>
            </div>
          </nav>

          {/* Bottom Area */}
          <div className="px-4 py-4 border-t border-white/10 shrink-0">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-800 text-blue-400 font-bold flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-blue-500 transition-colors">
                {adminData?.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-white">{adminData?.email.split('@')[0]}</p>
                <p className="text-[11px] text-slate-400 font-medium">Log out</p>
              </div>
              <LogOut size={16} className="text-slate-500 group-hover:text-red-400 transition-colors shrink-0" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50 relative">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shrink-0 h-[72px] flex items-center justify-between px-4 sm:px-6 lg:px-8 relative z-30">
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              className="lg:hidden text-slate-500 hover:text-slate-900"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-none mb-1">{title}</h2>
              <p className="text-xs text-slate-500 font-medium">Welcome back, {adminData?.email.split('@')[0]}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <span className="hidden md:inline-block text-slate-500 font-medium">{currentDate}</span>
            <div className="hidden md:block w-px h-6 bg-slate-200" />
            
            <div className="flex items-center gap-4 sm:gap-5 relative">
              {/* SEARCH BUTTON */}
              <button 
                onClick={() => setShowSearch(true)}
                className="text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <Search size={20} />
              </button>

              {/* NOTIFICATION BUTTON */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`transition-colors cursor-pointer relative ${showNotifications ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'}`}
                >
                  <Bell size={20} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                {/* NOTIFICATIONS DROPDOWN */}
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                    <div className="absolute right-0 mt-4 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Notifications</span>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">1 NEW</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-50">
                        <div className="p-4 bg-blue-50/50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><CalendarDays size={14}/></div>
                          <div>
                            <p className="text-sm text-slate-900 font-semibold mb-0.5">New Booking Received</p>
                            <p className="text-xs text-slate-500 line-clamp-2">Rajesh Kumar reserved Deluxe Room.</p>
                            <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase">10 mins ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border-t border-slate-100 text-center">
                        <button className="text-blue-600 text-xs font-semibold hover:underline">View All Notifications</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 z-10 relative">
          <div className="mx-auto max-w-7xl">
            <Outlet context={{ adminData }} />
          </div>
        </div>
      </main>

    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  // Using end={false} inside standard useLocation to precisely match root /admin or /admin/dashboard
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/admin/dashboard" && location.pathname === "/admin");

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <div className={`shrink-0 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}>
        {icon}
      </div>
      <span className="font-semibold text-sm">{label}</span>
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
      )}
    </NavLink>
  )
}
