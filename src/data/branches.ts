// ── Le Prestige — Branches Data ─────────────────────────────────

export interface Branch {
  city: string
  status: "active" | "coming-soon"
  tag: string
  description: string
  address?: string
  phone?: string
  email?: string
  landline?: string
}

export const BRANCHES: Branch[] = [
  {
    city: "Puducherry",
    status: "active",
    tag: "Main Branch",
    description:
      "Our flagship property on Villianur Main Road — the original Le Prestige experience, in the heart of Puducherry.",
    address: "TRENDS Building, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry – 605010",
    phone: "+91 96777 51329",
  },
  {
    city: "Tindivanam",
    status: "active",
    tag: "Second Branch",
    description:
      "Our second branch in Tindivanam — delivering the same quiet luxury and premium stay experience.",
    address: "No. 15/1B, Indhra Nagar, Marakanam Road, Tindivanam, Villupuram, Tamil Nadu",
    phone: "7200651329",
    email: "leprestigeresidency1@gmail.com",
    landline: "0414 7251329",
  },
]

export const GALLERY_ITEMS = [
  { ratio: "4/3", label: "Lobby", src: "/images/lobby.jpeg" },
  { ratio: "3/4", label: "Room", src: "/images/room.jpeg" },
  { ratio: "1/1", label: "Detail", src: "/images/details.jpeg" },
  { ratio: "4/3", label: "Restaurant", src: "/images/resturant.jpg" },
  { ratio: "3/4", label: "Suite", src: "/images/suit.jpeg" },
  { ratio: "16/9", label: "Exterior", src: "/images/extrior.jpeg" },
  { ratio: "1/1", label: "Bathroom", src: "/images/bathroom .jpeg" },
  { ratio: "4/3", label: "Corridor", src: "/images/corridor.jpeg" },
  { ratio: "3/4", label: "Balcony", src: "/images/balcony.jpeg" },
  { ratio: "4/3", label: "Reception", src: "/images/receptions.jpeg" },
]
