export interface Booking {
  id: string
  userId: string
  roomId: string
  roomType: "deluxe" | "twin"
  checkIn: string
  checkOut: string
  guests: number
  totalAmount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: string
  updatedAt: string
}
