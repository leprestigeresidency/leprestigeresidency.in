import { useEffect } from "react"
import ExploreHero from "@/components/explore/ExploreHero"
import ExploreStory from "@/components/explore/ExploreStory"
import ExploreSpaces from "@/components/explore/ExploreSpaces"
import ExploreRooms from "@/components/explore/ExploreRooms"
import ExploreTimeline from "@/components/explore/ExploreTimeline"
import ExploreAmenities from "@/components/explore/ExploreAmenities"
import ExploreMoments from "@/components/explore/ExploreMoments"
import ExploreWhyChoose from "@/components/explore/ExploreWhyChoose"
import ExploreReviews from "@/components/explore/ExploreReviews"
import OurBranches from "@/components/about/OurBranches"
import ExploreCTA from "@/components/explore/ExploreCTA"

export default function Explore() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Explore | Le Prestige Boutique Hotel"
  }, [])

  return (
    <main className="w-full bg-[#F8F4EE] min-h-screen">
        <ExploreHero />
        <ExploreStory />
        <ExploreSpaces />
        <ExploreRooms />
        <ExploreTimeline />
        <ExploreAmenities />
        <ExploreMoments />
        <ExploreWhyChoose />
        <ExploreReviews />
        <OurBranches />
        <ExploreCTA />
    </main>
  )
}
