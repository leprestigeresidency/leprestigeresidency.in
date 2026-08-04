// ── Le Prestige — Home Page (Landing Page) ─────────────────────

import Hero from "@/components/hero/Hero"
import Experience from "@/components/sections/Experience"
import FeaturedRooms from "@/components/sections/FeaturedRooms"
import Amenities from "@/components/sections/Amenities"
import Gallery from "@/components/sections/Gallery"
import Reviews from "@/components/sections/Reviews"
import Branches from "@/components/sections/Branches"
import Location from "@/components/sections/Location"
import CTA from "@/components/sections/CTA"

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <FeaturedRooms />
      <Amenities />
      <Gallery />
      <Reviews />
      <Branches />
      <Location />
      <CTA />
    </main>
  )
}
