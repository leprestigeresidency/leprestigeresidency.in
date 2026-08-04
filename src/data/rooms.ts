// ── Le Prestige — Room Data ─────────────────────────────────────

import type { Room } from "@/types/room"

export const ROOMS: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    type: "deluxe",
    count: 20,
    weekdayPrice: 3000,
    weekendPrice: 3500,
    image: "/images/Delux room.jpeg",
    description:
      "Spacious and elegantly appointed rooms with premium furnishings, designed for the discerning traveller seeking comfort and style.",
    facilities: [
      "King Bed",
      "Air Conditioning",
      "Free WiFi",
      "Room Service",
      "Daily Housekeeping",
      "Smart TV",
    ],
    available: true,
  },
  {
    id: "twin",
    name: "Twin Room",
    type: "twin",
    count: 2,
    weekdayPrice: 3500,
    weekendPrice: 4000,
    image: "/images/Twin bed.jpeg",
    description:
      "Thoughtfully designed twin rooms perfect for two guests, offering all the luxury of Le Prestige in an intimate, well-curated space.",
    facilities: [
      "Twin Beds",
      "Air Conditioning",
      "Free WiFi",
      "Room Service",
      "Daily Housekeeping",
      "Smart TV",
    ],
    available: true,
  },
]
