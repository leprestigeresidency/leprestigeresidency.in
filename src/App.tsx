// ── Le Prestige — App Shell ─────────────────────────────────────

import { useState, useEffect, useCallback } from "react"
import Lenis from "lenis"
import { useScroll } from "@/hooks/useScroll"
import Loader from "@/components/layout/Loader"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollProgress from "@/components/layout/ScrollProgress"
import Home from "@/app/Home"

export default function App() {
  const [loading, setLoading] = useState(true)
  const { isScrolled } = useScroll(60)

  const handleLoaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  // ── Lenis smooth scroll ──────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Loading screen */}
      <Loader onComplete={handleLoaderComplete} duration={2400} />

      {/* Scroll progress */}
      {!loading && <ScrollProgress />}

      {/* Navigation */}
      <Navbar scrolled={isScrolled} />

      {/* Page content */}
      <Home />

      {/* Footer */}
      <Footer />
    </>
  )
}
