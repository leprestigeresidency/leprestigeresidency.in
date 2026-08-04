export interface Room {
  id: string
  name: string
  type: "deluxe" | "twin"
  count: number
  weekdayPrice: number
  weekendPrice: number
  description: string
  facilities: string[]
  image?: string
  available: boolean
}

export interface RoomFilter {
  type?: "deluxe" | "twin" | "all"
  pricing: "weekday" | "weekend"
}
