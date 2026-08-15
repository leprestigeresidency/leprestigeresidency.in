import { MapPin, Phone, Clock, Car, Hotel } from "lucide-react"
import { HOTEL, GOOGLE_MAPS_LINK, GOOGLE_MAPS_EMBED } from "@/constants/hotel"
import SectionHeading from "@/components/common/SectionHeading"
import Button from "@/components/ui/Button"
import FadeUp from "@/components/animations/FadeUp"
import Reveal from "@/components/animations/Reveal"

interface LocationProps {
  address?: string
  phone?: string
  mapEmbedUrl?: string
  mapLinkUrl?: string
  hotelName?: string
}

export default function Location({
  address = HOTEL.address.short,
  phone = HOTEL.phone,
  mapEmbedUrl = GOOGLE_MAPS_EMBED,
  mapLinkUrl = GOOGLE_MAPS_LINK,
  hotelName = HOTEL.name,
}: LocationProps) {
  const locationFeatures = [
    { icon: MapPin, label: address },
    { icon: Phone, label: phone },
    { icon: Clock, label: HOTEL.status },
    { icon: Car, label: "Easy Parking" },
    { icon: Hotel, label: "Boutique Hotel" },
  ]

  return (
    <section
      id="location"
      style={{
        background: "var(--lp-bg-alt)",
        padding: "var(--space-14) var(--container-padding)",
      }}
    >
      <div
        className="two-col"
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        {/* Map */}
        <Reveal direction="right">
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              aspectRatio: "16/10",
              background: "#E8DED4",
            }}
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${hotelName} Location`}
            />
          </div>
        </Reveal>

        {/* Contact card */}
        <div>
          <SectionHeading
            eyebrow="Find Us"
            title="Our Location"
            showDivider
          />
          <FadeUp delay={0.1}>
            <address style={{ fontStyle: "normal", marginTop: 24, marginBottom: 32 }}>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 20,
                  fontWeight: 500,
                  color: "var(--lp-primary)",
                  marginBottom: 16,
                }}
              >
                {hotelName}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {locationFeatures.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <Icon
                      size={16}
                      color="var(--lp-accent)"
                      strokeWidth={1.5}
                      style={{ marginTop: 3, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "var(--lp-muted)",
                        lineHeight: 1.6,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </address>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button
                href={mapLinkUrl}
                variant="dark"
              >
                Get Directions →
              </Button>
              <Button
                href={`tel:${phone.replace(/\s+/g, '')}`}
                variant="outline"
              >
                Call Now
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
