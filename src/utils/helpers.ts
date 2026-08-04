// ── Le Prestige — Utility Helpers ───────────────────────────────

import clsx, { type ClassValue } from "clsx"

/** Merge class names, filtering falsy values */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Format a number as Indian Rupee currency (₹3,000) */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Format phone number for display */
export function formatPhone(phone: string): string {
  return phone.replace(/(\+91)\s?(\d{5})(\d{5})/, "$1 $2 $3")
}

/** Generate a Google Maps directions link */
export function getDirectionsUrl(address: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
}
