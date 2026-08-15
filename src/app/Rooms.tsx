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

export default function Rooms() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<RoomType>(null)
  const [activeLocationId, setActiveLocationId] = useState<string>("pondicherry")
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedDetailRoom, setSelectedDetailRoom] = useState<RoomData | null>(null)

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
    setSelectedRoom(type)
    updateBooking({
      branch: currentLocation.name,
      roomType: type,
      roomId: roomMatch.id,
      roomName: roomMatch.name,
      pricePerNight: roomMatch.pricePerNight,
    })
    setBookingModalOpen(true)
  }

  const handleViewDetailsByType = (type: RoomType) => {
    const roomMatch = currentRooms.find((r) => r.type === type) || currentRooms[0]
    setSelectedDetailRoom(roomMatch)
    setDetailModalOpen(true)
  }

  const handleBookFromModal = (room: RoomData) => {
    updateBooking({
      branch: currentLocation.name,
      roomType: room.type,
      roomId: room.id,
      roomName: room.name,
      pricePerNight: room.pricePerNight,
    })
    setSelectedRoom(room.type)
    setBookingModalOpen(true)
  }

  return (
    <main>
      {/* Rooms Hero Header */}
      <RoomsHero onBook={handleBook} location={currentLocation} rooms={currentRooms} />

      {/* Location Switcher Sub-bar */}
      <div className="bg-[#F5F1EA] py-6 border-b border-[var(--lp-border)]">
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--lp-accent)] block">
              Active Property Location
            </span>
            <h2 className="text-xl md:text-2xl font-medium text-[var(--lp-heading)] mt-0.5" style={{ fontFamily: "var(--font-heading)" }}>
              Le Prestige {currentLocation.name}
            </h2>
          </div>

          <div className="inline-flex items-center p-1 rounded-full bg-white border border-[var(--lp-border)] shadow-sm">
            <button
              onClick={() => handleLocationSwitch("pondicherry")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-1 ${
                activeLocationId === "pondicherry"
                  ? "shadow-sm"
                  : "text-black hover:text-[var(--lp-accent)] bg-transparent"
              }`}
              style={{
                backgroundColor: activeLocationId === "pondicherry" ? "var(--lp-accent)" : "transparent",
                color: activeLocationId === "pondicherry" ? "#ffffff" : undefined
              }}
            >
              Pondicherry
            </button>
            <button
              onClick={() => handleLocationSwitch("tindivanam")}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer border-none flex items-center justify-center gap-1 ${
                activeLocationId === "tindivanam"
                  ? "shadow-sm"
                  : "text-black hover:text-[var(--lp-accent)] bg-transparent"
              }`}
              style={{
                backgroundColor: activeLocationId === "tindivanam" ? "var(--lp-accent)" : "transparent",
                color: activeLocationId === "tindivanam" ? "#ffffff" : undefined
              }}
            >
              Tindivanam
            </button>
          </div>
        </div>
      </div>

      {/* Rooms Cards */}
      {currentRooms.map((room, index) => (
        <RoomHorizontalCard 
          key={room.id}
          id={room.slug}
          type={room.type as any}
          title={room.name}
          description={room.description}
          image={room.images[0] || "/images/Delux room.jpeg"}
          availability={`${room.capacity} Guests Available`}
          badge={index === 0 ? "MOST POPULAR" : undefined}
          features={[
            room.bedType, 
            room.roomSize, 
            ...(room.amenities.slice(0, 8))
          ]}
          pricing={{ weekdays: room.pricePerNight, weekends: room.pricePerNight + 500 }}
          reverse={index % 2 !== 0}
          onBook={handleBook}
          onViewDetails={handleViewDetailsByType}
        />
      ))}

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
