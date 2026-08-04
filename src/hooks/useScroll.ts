// ── Le Prestige — useScroll Hook ────────────────────────────────

import { useState, useEffect } from "react"

interface ScrollState {
  scrollY: number
  scrollProgress: number
  isScrolled: boolean
}

export function useScroll(threshold = 60): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
  })

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0

      setState({
        scrollY,
        scrollProgress: Math.min(scrollProgress, 1),
        isScrolled: scrollY > threshold,
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return state
}
