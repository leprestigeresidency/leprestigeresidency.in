// ── Le Prestige — Hotel Information (Single Source of Truth) ─────

export const HOTEL = {
  name: "Le Prestige Boutique Hotel",
  shortName: "Le Prestige",
  logo: "LP",
  tagline: "Where You Stay Matters",
  description:
    "Experience premium comfort in the heart of Puducherry.",
  phone: "+91 96777 51329",
  phoneRaw: "919677751329",
  email: "leprestigeresidency@gmail.com",
  website: "www.leprestigeresidency.in",
  status: "Open 24 Hours",

  address: {
    building: "TRENDS",
    street: "Villianur Main Road",
    area: "Kamban Nagar",
    locality: "Reddiarpalayam",
    city: "Puducherry",
    pincode: "605010",
    full: "TRENDS Building, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry – 605010",
    short: "Villianur Main Road, Reddiarpalayam, Puducherry",
  },

  social: {
    instagram: "#",
    facebook: "#",
    google: "https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8",
  },

  totalRooms: 22,
  established: 2024,

  seo: {
    title: "Le Prestige Boutique Hotel — Where You Stay Matters | Puducherry",
    description:
      "Experience luxury boutique hospitality at Le Prestige in Puducherry. 22 premium rooms, 24/7 service, prime location on Villianur Main Road.",
    keywords:
      "Le Prestige, boutique hotel, Puducherry, luxury hotel, Reddiarpalayam, hotel rooms",
  },
} as const

export const NAV_LINKS = [
  "Home",
  "Rooms",
  "Explore Le Prestige",
  "About",
  "Contact",
] as const

export const FOOTER_LINKS = [
  "Rooms",
  "About",
  "Contact",
  "Explore",
  "Reservation",
] as const

export const LEGAL_LINKS = [
  "Privacy Policy",
  "Terms & Conditions",
  "Refund Policy",
] as const

export const GOOGLE_MAPS_EMBED =
  "https://maps.google.com/maps?q=Le+Prestige+Residency+TRENDS+Villianur+Main+Road+Reddiarpalayam+Puducherry+605010&t=&z=16&ie=UTF8&iwloc=&output=embed"

export const GOOGLE_MAPS_LINK =
  "https://maps.app.goo.gl/VR7cPnL7TpeDLGRB8"
