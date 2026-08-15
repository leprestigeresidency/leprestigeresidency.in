// ── Le Prestige — About Us Page ───────────────────────────────────

import { useEffect } from "react"
import AboutHero from "@/components/about/AboutHero"
import OurStory from "@/components/about/OurStory"
import VisionMission from "@/components/about/VisionMission"
import WhyChooseUs from "@/components/about/WhyChooseUs"
import OurBranches from "@/components/about/OurBranches"
import OurPromise from "@/components/about/OurPromise"
import AboutCTA from "@/components/about/AboutCTA"

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <AboutHero />
      <OurStory />
      <VisionMission />
      <WhyChooseUs />
      <OurBranches />
      <OurPromise />
      <AboutCTA />
    </main>
  )
}
