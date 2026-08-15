// ── Le Prestige — App Shell ─────────────────────────────────────

import { useState, useEffect, useCallback, Suspense, lazy } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { useScroll } from "@/hooks/useScroll"
import Loader from "@/components/layout/Loader"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollProgress from "@/components/layout/ScrollProgress"

import AdminGuard from "@/components/auth/AdminGuard"

const Home = lazy(() => import("@/app/Home"))
const Rooms = lazy(() => import("@/app/Rooms"))
const AboutUs = lazy(() => import("@/app/AboutUs"))
const Explore = lazy(() => import("@/app/Explore"))
const Contact = lazy(() => import("@/app/Contact"))
const Admin = lazy(() => import("@/app/Admin"))

export default function App() {
  const [loading, setLoading] = useState(true)
  const { isScrolled } = useScroll(60)
  const location = useLocation()

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  // ── Lenis smooth scroll ──────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [location.pathname]) // re-init or just keep running, lenis handles it well globally.

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} duration={2400} />

      {/* Scroll progress */}
      {!loading && <ScrollProgress />}

      {/* Navigation */}
      <Navbar scrolled={isScrolled} />

      {/* Page content */}
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center text-[var(--lp-heading)]">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
        </Routes>
      </Suspense>

      {/* Footer */}
      <Footer />
    </>
  )
}
