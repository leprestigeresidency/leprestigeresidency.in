import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import RoomsHero from "@/components/sections/RoomsHero"
import RoomHorizontalCard from "@/components/cards/RoomHorizontalCard"
import RoomComparison from "@/components/sections/RoomComparison"
import WhyChoose from "@/components/sections/WhyChoose"
import PremiumAmenities from "@/components/sections/PremiumAmenities"
import BookingInfo from "@/components/sections/BookingInfo"
import Location from "@/components/sections/Location"
import CTA from "@/components/sections/CTA"
import { RoomType, useBooking } from "@/context/BookingContext"
import BookingFlowManager from "@/components/booking/BookingFlowManager"
import RoomDetailModal from "@/components/rooms/RoomDetailModal"
import RoomsLocationSection from "@/components/rooms/RoomsLocationSection"
import { LOCATIONS, ROOMS_BY_LOCATION, RoomData, LocationData } from "@/data/roomsData"
import { useLivePrices } from "@/hooks/useLivePrices"

export default function Rooms() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(null)
  const [activeLocationId, setActiveLocationId] = useState<string>("pondicherry")
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedDetailRoom, setSelectedDetailRoom] = useState<RoomData | null>(null)
  const { livePrices, liveAvailability } = useLivePrices()

  const location = useLocation()
  const navigate = useNavigate()
  const { updateBooking } = useBooking()

  useEffect(() => {
    window.scrollTo(0, 0)
    const searchParams = new URLSearchParams(location.search)
    const locParam = searchParams.get("location")?.toLowerCase()
    if (locParam && LOCATIONS[locParam]) {
      setActiveLocationId(locParam)
    } else {
      setActiveLocationId("pondicherry")
    }

    if (searchParams.get("book") === "true") {
      setBookingModalOpen(true)
    }
  }, [location.search])


  const currentLocation: LocationData = LOCATIONS[activeLocationId] || LOCATIONS.pondicherry
  const currentRooms: RoomData[] = ROOMS_BY_LOCATION[activeLocationId] || ROOMS_BY_LOCATION.pondicherry

  const handleLocationSwitch = (locId: string) => {
    setActiveLocationId(locId)
    navigate(`/rooms?location=${locId}`, { replace: true })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBook = (type: RoomType) => {
    const roomMatch = currentRooms.find((r) => r.type === type) || currentRooms[0]
    const livePrice = livePrices[`${currentLocation.id}_${roomMatch.type.toLowerCase()}`] || roomMatch.pricePerNight
    setSelectedRoom(type)
    updateBooking({
      branch: currentLocation.name,
      roomType: type,
      roomId: roomMatch.id,
      roomName: roomMatch.name,
      pricePerNight: livePrice,
    })
    setBookingModalOpen(true)
  }

  const handleViewDetailsByType = (type: RoomType) => {
    const roomMatch = currentRooms.find((r) => r.type === type) || currentRooms[0]
    setSelectedDetailRoom(roomMatch)
    setDetailModalOpen(true)
  }

  const handleBookFromModal = (room: RoomData) => {
    const livePrice = livePrices[`${currentLocation.id}_${room.type.toLowerCase()}`] || room.pricePerNight
    updateBooking({
      branch: currentLocation.name,
      roomType: room.type,
      roomId: room.id,
      roomName: room.name,
      pricePerNight: livePrice,
    })
    setSelectedRoom(room.type)
    setBookingModalOpen(true)
  }

  return (
    <main>
      {/* Rooms Hero Header */}
      <RoomsHero onBook={handleBook} location={currentLocation} rooms={currentRooms} />

      {/* Rooms Cards */}
      {currentRooms.map((room, index) => {
        const isLiveAvailable = liveAvailability[`${currentLocation.id}_${room.type.toLowerCase()}`] !== undefined 
          ? liveAvailability[`${currentLocation.id}_${room.type.toLowerCase()}`] 
          : room.available

        const livePrice = livePrices[`${currentLocation.id}_${room.type.toLowerCase()}`] || room.pricePerNight

        return (
          <RoomHorizontalCard 
            key={room.id}
            id={room.slug}
            type={room.type as any}
            title={room.name}
            description={room.description}
            image={room.images[0] || "/images/Delux room.jpeg"}
            availability={isLiveAvailable ? `${room.capacity} Guests Available` : "CURRENTLY OCCUPIED"}
            badge={index === 0 ? "MOST POPULAR" : undefined}
            features={[
              room.bedType, 
              room.roomSize, 
              ...(room.amenities.slice(0, 8))
            ]}
            pricing={{ weekdays: livePrice, weekends: livePrice + 500 }}
            available={isLiveAvailable}
            reverse={index % 2 !== 0}
            onBook={handleBook}
            onViewDetails={handleViewDetailsByType}
          />
        )
      })}

      <RoomComparison />
      <WhyChoose />
      <PremiumAmenities />
      <BookingInfo />
      <Location 
        hotelName={`Le Prestige ${currentLocation.name}`}
        address={currentLocation.address}
        mapLinkUrl={currentLocation.mapUrl}
        mapEmbedUrl={`https://maps.google.com/maps?q=${encodeURIComponent("Le Prestige " + currentLocation.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
      />
      
      {/* OUR LOCATIONS (Footer-Above Location Section) */}
      <RoomsLocationSection
        currentLocationId={activeLocationId}
        onSelectLocation={handleLocationSwitch}
      />

      <CTA />
      
      {/* Modals */}
      <RoomDetailModal
        isOpen={detailModalOpen}
        room={selectedDetailRoom}
        location={currentLocation}
        onClose={() => setDetailModalOpen(false)}
        onBookNow={handleBookFromModal}
      />

      <BookingFlowManager
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialRoom={selectedRoom}
      />
    </main>
  )
}
