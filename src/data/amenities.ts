// ── Le Prestige — Amenities Data ────────────────────────────────

export interface Amenity {
  label: string
  icon: string // Lucide icon name
  description?: string
}

export const AMENITIES: Amenity[] = [
  { label: "Free WiFi", icon: "Wifi", description: "High-speed wireless internet throughout the hotel" },
  { label: "Free Parking", icon: "Car", description: "Complimentary secure parking for all guests" },
  { label: "24×7 Reception", icon: "Clock", description: "Round-the-clock assistance for every need" },
  { label: "Air Conditioning", icon: "Snowflake", description: "Climate-controlled rooms for optimal comfort" },
  { label: "Restaurant", icon: "UtensilsCrossed", description: "Fine dining with local and international cuisine" },
  { label: "Daily Housekeeping", icon: "Sparkles", description: "Pristine rooms maintained by professional staff" },
  { label: "Power Backup", icon: "Zap", description: "Uninterrupted power supply for your comfort" },
  { label: "Elevator", icon: "ArrowUpDown", description: "Easy access to all floors" },
]

export const WHY_FEATURES = [
  {
    title: "Luxury Stay",
    description: "Meticulously designed rooms that blend aesthetics with uncompromising comfort.",
    icon: "Star",
  },
  {
    title: "Prime Location",
    description: "Centrally located in Reddiarpalayam, minutes from Puducherry's key landmarks.",
    icon: "MapPin",
  },
  {
    title: "Boutique Rooms",
    description: "Intimate and curated — only 22 rooms, ensuring every guest receives personal attention.",
    icon: "Hotel",
  },
  {
    title: "Free Parking",
    description: "Complimentary secure parking available for all guests throughout their stay.",
    icon: "Car",
  },
  {
    title: "24×7 Reception",
    description: "Round-the-clock assistance to ensure your every need is met, day or night.",
    icon: "Clock",
  },
  {
    title: "Premium Hospitality",
    description: "Warm, professional service inspired by the finest boutique hotel traditions.",
    icon: "Heart",
  },
]
