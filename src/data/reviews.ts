// ── Le Prestige — Reviews Data ──────────────────────────────────

export interface Review {
  name: string
  location: string
  rating: number
  text: string
  avatar?: string
}

export const REVIEWS: Review[] = [
  {
    name: "Priya M.",
    location: "Chennai",
    rating: 5,
    text: "A truly exceptional stay. The rooms are beautifully designed and the staff goes above and beyond. Will definitely return.",
  },
  {
    name: "Arjun R.",
    location: "Bangalore",
    rating: 5,
    text: "Le Prestige exceeded every expectation. The attention to detail is remarkable — from the linen to the lighting, everything is perfect.",
  },
  {
    name: "Sneha K.",
    location: "Mumbai",
    rating: 5,
    text: "Peaceful, elegant, and warm. This is what boutique hospitality should feel like. One of the best stays in Puducherry.",
  },
]

export interface Stat {
  value: string
  suffix: string
  label: string
}

export const STATS: Stat[] = [
  { value: "4.8", suffix: "★", label: "Google Rating" },
  { value: "500", suffix: "+", label: "Happy Guests" },
  { value: "22", suffix: "", label: "Luxury Rooms" },
  { value: "95", suffix: "%", label: "Repeat Guests" },
]
