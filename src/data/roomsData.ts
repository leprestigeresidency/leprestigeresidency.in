// ── Le Prestige — Structured Rooms & Locations Data ─────────────────────

export interface LocationData {
  id: string
  name: string
  slug: string
  description: string
  heroImage: string
  address: string
  mapUrl?: string
}

export interface RoomData {
  id: string
  locationId: string
  name: string
  slug: string
  type: "Deluxe" | "Twin" | "Suite" | string
  description: string
  pricePerNight: number
  currency: string
  images: string[]
  capacity: number
  bedType: string
  roomSize: string
  amenities: string[]
  available: boolean
  status: string
}

export const LOCATIONS: Record<string, LocationData> = {
  pondicherry: {
    id: "pondicherry",
    name: "Pondicherry",
    slug: "pondicherry",
    description: "Experience refined comfort and effortless hospitality in Puducherry.",
    heroImage: "/images/hero/hero-hotel.jpg",
    address: "TRENDS Building, Villianur Main Road, Reddiarpalayam, Puducherry – 605010",
    mapUrl: "https://maps.app.goo.gl/tH7zPWejHk5XyUvWA",
  },
  tindivanam: {
    id: "tindivanam",
    name: "Tindivanam",
    slug: "tindivanam",
    description: "Discover modern luxury and serene comfort at our Tindivanam retreat.",
    heroImage: "/images/tindivanam/tindivanam_room_1.jpg",
    address: "NH44 Highway Junction, Tindivanam – 604001",
    mapUrl: "https://maps.app.goo.gl/cE1GimPGioMb5Gus5",
  },
}

export const ROOMS_BY_LOCATION: Record<string, RoomData[]> = {
  pondicherry: [
    {
      id: "pondy-deluxe",
      locationId: "pondicherry",
      name: "Deluxe Room",
      slug: "deluxe-room",
      type: "Deluxe",
      description:
        "Designed for guests seeking comfort and elegance, the Deluxe Room offers a spacious king-size bed, contemporary interiors, premium furnishings, complimentary Wi-Fi, smart TV, work desk, wardrobe, modern bathroom, and personalised hospitality.",
      pricePerNight: 4500,
      currency: "INR",
      images: [
        "/images/Delux room.jpeg",
        "/images/hero/hero-hotel.jpg",
        "/images/Twin bed.jpeg",
      ],
      capacity: 2,
      bedType: "King Bed",
      roomSize: "320 sq.ft",
      amenities: [
        "King Size Bed",
        "320 sq.ft",
        "2 Adults + 1 Child",
        "Complimentary Breakfast",
        "Free High-Speed Wi-Fi",
        "43\" Smart TV",
        "Air Conditioning",
        "24/7 Hot Water",
        "Room Service",
        "Daily Housekeeping",
      ],
      available: true,
      status: "Available",
    },
    {
      id: "pondy-twin",
      locationId: "pondicherry",
      name: "Twin Room",
      slug: "twin-room",
      type: "Twin",
      description:
        "Perfect for friends, families, and business travellers. Twin Rooms feature two comfortable single beds with modern interiors and premium amenities throughout.",
      pricePerNight: 4000,
      currency: "INR",
      images: [
        "/images/Twin bed.jpeg",
        "/images/Delux room.jpeg",
        "/images/hero/hero-hotel.jpg",
      ],
      capacity: 2,
      bedType: "Twin Single Beds",
      roomSize: "360 sq.ft",
      amenities: [
        "2 Single Beds",
        "360 sq.ft",
        "2 Adults",
        "Complimentary Breakfast",
        "Free High-Speed Wi-Fi",
        "Smart TV",
        "Air Conditioning",
        "24/7 Hot Water",
        "Wardrobe",
        "Work Desk",
      ],
      available: true,
      status: "Available",
    },
    {
      id: "pondy-suite",
      locationId: "pondicherry",
      name: "Executive Suite",
      slug: "executive-suite",
      type: "Suite",
      description:
        "Our top-tier executive suite featuring a separate lounge area, city balcony views, luxury bath setup, and dedicated concierge service for an unforgettable stay.",
      pricePerNight: 6500,
      currency: "INR",
      images: [
        "/images/Delux room.jpeg",
        "/images/Twin bed.jpeg",
        "/images/hero/hero-hotel.jpg",
      ],
      capacity: 3,
      bedType: "King Bed + Lounge",
      roomSize: "450 sq.ft",
      amenities: [
        "King Size Bed",
        "450 sq.ft",
        "3 Guests",
        "Separate Living Area",
        "Complimentary Breakfast & Drinks",
        "Free Wi-Fi",
        "55\" Smart TV",
        "Premium Bathrobe & Slippers",
        "24/7 Room Service",
      ],
      available: true,
      status: "Available",
    },
  ],
  tindivanam: [
    {
      id: "tindi-deluxe",
      locationId: "tindivanam",
      name: "Deluxe Room",
      slug: "deluxe-room",
      type: "Deluxe",
      description:
        "Spacious and quiet room designed for highway travelers and vacationers alike, featuring soundproof windows, plush bedding, and modern luxury amenities.",
      pricePerNight: 3800,
      currency: "INR",
      images: [
        "/images/tindivanam/tindivanam_room_1.jpg",
        "/images/tindivanam/tindivanam_room_2.jpg",
        "/images/tindivanam/tindivanam_lounge.jpg",
        "/images/tindivanam/tindivanam_desk.jpg",
        "/images/tindivanam/tindivanam_corridor.jpg",
      ],
      capacity: 2,
      bedType: "King Bed",
      roomSize: "320 sq.ft",
      amenities: [
        "King Bed",
        "320 sq.ft",
        "Soundproof Windows",
        "Complimentary Breakfast",
        "Free Wi-Fi",
        "43\" Smart TV",
        "Air Conditioning",
        "Express Check-in",
      ],
      available: true,
      status: "Available",
    },
    {
      id: "tindi-twin",
      locationId: "tindivanam",
      name: "Twin Room",
      slug: "twin-room",
      type: "Twin",
      description:
        "Well-appointed room providing cozy relaxation, study desk, extra legroom, and modern amenities along the Tindivanam route.",
      pricePerNight: 3500,
      currency: "INR",
      images: [
        "/images/tindivanam/tindivanam_room_2.jpg",
        "/images/tindivanam/tindivanam_room_1.jpg",
        "/images/tindivanam/tindivanam_desk.jpg",
        "/images/tindivanam/tindivanam_lounge.jpg",
        "/images/tindivanam/tindivanam_corridor.jpg",
      ],
      capacity: 2,
      bedType: "Twin / Double Bed",
      roomSize: "360 sq.ft",
      amenities: [
        "Comfortable Bedding",
        "360 sq.ft",
        "Complimentary Breakfast",
        "Free Wi-Fi",
        "Air Conditioning",
        "24/7 Hot Shower",
        "Work Desk",
      ],
      available: true,
      status: "Available",
    },
    {
      id: "tindi-suite",
      locationId: "tindivanam",
      name: "Executive Suite",
      slug: "executive-suite",
      type: "Suite",
      description:
        "Generously sized executive suite equipped with comfortable lounge seating, dedicated desk setup, mini fridge, and complete amenities.",
      pricePerNight: 5500,
      currency: "INR",
      images: [
        "/images/tindivanam/tindivanam_lounge.jpg",
        "/images/tindivanam/tindivanam_room_1.jpg",
        "/images/tindivanam/tindivanam_room_2.jpg",
        "/images/tindivanam/tindivanam_desk.jpg",
        "/images/tindivanam/tindivanam_corridor.jpg",
      ],
      capacity: 4,
      bedType: "King Bed + Lounge",
      roomSize: "480 sq.ft",
      amenities: [
        "King Bed + Lounge",
        "480 sq.ft",
        "4 Guests",
        "Free Wi-Fi",
        "50\" Smart TV",
        "Complimentary Breakfast",
        "Mini Fridge",
        "24/7 Room Service",
      ],
      available: true,
      status: "Available",
    },
  ],
}
