import { useEffect } from "react"
import ContactHero from "@/components/contact/ContactHero"
import ContactQuickCards from "@/components/contact/ContactQuickCards"
import ContactForm from "@/components/contact/ContactForm"
import ContactLocations from "@/components/contact/ContactLocations"
import ContactMap from "@/components/contact/ContactMap"
import ContactFeedback from "@/components/contact/ContactFeedback"
import ContactFAQ from "@/components/contact/ContactFAQ"
import ContactCTA from "@/components/contact/ContactCTA"

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = "Contact | Le Prestige Residency"
  }, [])

  return (
    <main className="w-full bg-[#FFFFFF] min-h-screen">
      <ContactHero />
      <ContactQuickCards />
      <ContactForm />
      <ContactLocations />
      <ContactMap />
      <ContactFeedback />
      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}
