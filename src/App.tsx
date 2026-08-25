// ── Le Prestige — App Shell ─────────────────────────────────────

import { useState, useEffect, useCallback, Suspense, lazy } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Lenis from "lenis"
import { useScroll } from "@/hooks/useScroll"
import Loader from "@/components/layout/Loader"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollProgress from "@/components/layout/ScrollProgress"

const Home = lazy(() => import("@/app/Home"))
const Rooms = lazy(() => import("@/app/Rooms"))
const AboutUs = lazy(() => import("@/app/AboutUs"))
const Explore = lazy(() => import("@/app/Explore"))
const Contact = lazy(() => import("@/app/Contact"))

// Campaign Landing Pages
const TouristLanding = lazy(() => import("@/app/landing/TouristLanding"))
const TouristThankYou = lazy(() => import("@/app/landing/TouristThankYou"))
const BusinessLanding = lazy(() => import("@/app/landing/BusinessLanding"))
const BusinessThankYou = lazy(() => import("@/app/landing/BusinessThankYou"))

// Admin Flow
const AdminLogin = lazy(() => import("@/app/admin/AdminLogin"))
const AdminLayout = lazy(() => import("@/app/admin/AdminLayout"))
const AdminDashboard = lazy(() => import("@/app/admin/AdminDashboard"))
const AdminBookings = lazy(() => import("@/app/admin/AdminBookings"))
const AdminCalendar = lazy(() => import("@/app/admin/AdminCalendar"))
const AdminRooms = lazy(() => import("@/app/admin/AdminRooms"))
const AdminGuests = lazy(() => import("@/app/admin/AdminGuests"))
const AdminNotifications = lazy(() => import("@/app/admin/AdminNotifications"))
const AdminSettings = lazy(() => import("@/app/admin/AdminSettings"))

export default function App() {
  const [loading, setLoading] = useState(true)
  const { isScrolled } = useScroll(60)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  // ── Keyboard Shortcut for Admin ─────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CTRL + SHIFT + F12 → Admin Login (unchanged)
      if (e.ctrlKey && e.shiftKey && e.key === "F12") {
        e.preventDefault()
        navigate("/admin-login")
      }

      // Alt + Shift + F1 → Tourist Landing Page (public website only)
      if (e.altKey && e.shiftKey && e.key === "F1") {
        const onAdmin = window.location.pathname.startsWith("/admin")
        if (!onAdmin) {
          e.preventDefault()
          navigate("/tourist")
        }
      }

      // Alt + Shift + F2 → Business Landing Page (public website only)
      if (e.altKey && e.shiftKey && e.key === "F2") {
        const onAdmin = window.location.pathname.startsWith("/admin")
        if (!onAdmin) {
          e.preventDefault()
          navigate("/business")
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigate])

  // ── Lenis smooth scroll ──────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy()
    }
  }, []) 

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  // Hide main Navbar/Footer on Admin and Campaign Landing Routes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isLandingRoute = location.pathname.startsWith("/tourist") || location.pathname.startsWith("/business");
  const hideMainLayout = isAdminRoute || isLandingRoute;

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} duration={2400} />

      {/* Scroll progress */}
      {!loading && !hideMainLayout && <ScrollProgress />}

      {/* Navigation */}
      {!hideMainLayout && <Navbar scrolled={isScrolled} />}

      {/* Page content */}
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-[#0F172A] bg-[#F8FAFC]">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<Contact />} />

          {/* Campaign Landing Pages */}
          <Route path="/tourist" element={<TouristLanding />} />
          <Route path="/tourist/thank-you" element={<TouristThankYou />} />
          <Route path="/business" element={<BusinessLanding />} />
          <Route path="/business/thank-you" element={<BusinessThankYou />} />
          
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="calendar" element={<AdminCalendar />} />
            <Route path="rooms" element={<AdminRooms />} />
            <Route path="guests" element={<AdminGuests />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Footer */}
      {!hideMainLayout && <Footer />}
    </>
  )
}
