import { createContext, useContext, useState, ReactNode } from "react"

export type RoomType = "Deluxe" | "Twin" | "Suite" | string | null

export interface BookingData {
  branch: string
  roomId?: string
  roomType: RoomType
  roomName?: string
  pricePerNight?: number
  checkIn: Date | null
  checkOut: Date | null
  adults: number
  children: number
  specialRequest: string
  coupon: string
}

export interface GuestDetails {
  fullName: string
  email: string
  phone: string
  address: string
}

export interface BookingResult {
  bookingId: string
  referenceNumber: string
  totalPrice: number
  paymentStatus: string
  status: string
}

interface BookingContextType {
  bookingData: BookingData
  guestDetails: GuestDetails
  bookingResult: BookingResult | null
  updateBooking: (data: Partial<BookingData>) => void
  updateGuest: (data: Partial<GuestDetails>) => void
  setBookingResult: (result: BookingResult | null) => void
  resetBooking: () => void
}

const initialBookingData: BookingData = {
  branch: "Pondicherry",
  roomId: "pondy-deluxe",
  roomType: "Deluxe",
  roomName: "Deluxe Room",
  pricePerNight: 4500,
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  specialRequest: "",
  coupon: "",
}

const initialGuestDetails: GuestDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
}

const BookingContext = createContext<BookingContextType>({} as BookingContextType)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData)
  const [guestDetails, setGuestDetails] = useState<GuestDetails>(initialGuestDetails)
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null)

  const updateBooking = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const updateGuest = (data: Partial<GuestDetails>) => {
    setGuestDetails((prev) => ({ ...prev, ...data }))
  }

  const resetBooking = () => {
    setBookingData(initialBookingData)
    setGuestDetails(initialGuestDetails)
    setBookingResult(null)
  }

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        guestDetails,
        bookingResult,
        updateBooking,
        updateGuest,
        setBookingResult,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)

