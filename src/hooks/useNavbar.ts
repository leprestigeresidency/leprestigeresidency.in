// ── Le Prestige — useNavbar Hook ────────────────────────────────

import { useState, useCallback } from "react"

interface NavbarState {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

export function useNavbar(): NavbarState {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((v) => !v), [])
  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, toggle, close }
}
