// ── Le Prestige — Tourist Thank-You / Request Received Page ────────

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { HOTEL } from "@/constants/hotel";
import { CheckCircle2, MessageCircle, Phone, MapPin, ArrowRight } from "lucide-react";

export default function TouristThankYou() {
  useEffect(() => {
    document.title = "Request Received — Le Prestige Residency Pondicherry";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#262626] font-sans flex flex-col justify-between">
      <div>
        <LandingHeader
          campaignTitle="Request Received"
          ctaText="Contact Front Desk"
          ctaHref={`tel:${HOTEL.phoneRaw}`}
        />

        {/* ── SUCCESS BANNER ────────────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-[#F3EEE7] to-[#F8F4EE]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="w-16 h-16 bg-[#4CAF50]/10 border border-[#4CAF50]/30 rounded-full flex items-center justify-center mx-auto text-[#4CAF50]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-block px-4 py-1 bg-[#4CAF50]/10 text-[#4CAF50] font-sans text-xs font-semibold uppercase tracking-widest rounded-full">
              Status: Request Processing
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#262626]">
              Request Received
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#575757] leading-relaxed max-w-2xl mx-auto">
              Your Pondicherry stay request has been received. Our team will check room availability for your selected dates and get back to you shortly.
            </p>

            <div className="p-4 bg-white rounded-xl border border-[#E5DED5] max-w-md mx-auto text-xs text-[#262626] font-medium shadow-sm">
              📞 Please keep your phone available. Our front desk team will call or WhatsApp you with room confirmation details.
            </div>
          </div>
        </section>

        {/* ── WHAT HAPPENS NEXT (CLIENT PDF FLOW) ───────────────────── */}
        <section className="py-14 bg-white border-y border-[#E5DED5]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center mb-12">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
                What Happens Next
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#262626] mt-2">
                Your Stay Request Journey
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 01 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-2">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">01</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Your Room Options
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  We check live room inventory for Double, Family, or Suite availability.
                </p>
              </div>

              {/* 02 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-2">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">02</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Your Stay Dates
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  We verify your check-in & check-out timeline to guarantee optimal room rates.
                </p>
              </div>

              {/* 03 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-2">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">03</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Your Booking Options
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  You receive instant confirmation details directly on phone or WhatsApp.
                </p>
              </div>

              {/* 04 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-2">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">04</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Your Weekend Plan
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  Get our free offline Pondicherry map and local bike/cab rental assistance upon check-in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPEED UP CTA (WHATSAPP) ────────────────────────────────── */}
        <section className="py-14 bg-[#F8F4EE]">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DED5] shadow-lg space-y-6">
              <span className="text-xs font-sans uppercase tracking-widest text-[#C45A37] font-semibold">
                Fast Track Confirmation
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#262626]">
                Want to Speed Things Up?
              </h3>

              <p className="text-sm text-[#575757] font-sans leading-relaxed max-w-lg mx-auto">
                Skip the wait time and text our front desk team directly on WhatsApp with prefilled message <strong className="text-[#262626]">"PONDICHERRY"</strong>.
              </p>

              <div>
                <a
                  href={`https://wa.me/${HOTEL.phoneRaw}?text=PONDICHERRY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#4CAF50] hover:bg-[#43A047] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Message Us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL REASSURANCE & ADDRESS ───────────────────────────── */}
        <section className="py-12 bg-[#262626] text-white text-center">
          <div className="max-w-[700px] mx-auto px-4 space-y-4">
            <h3 className="font-serif text-3xl font-bold text-[#D8B98A]">
              Ready for Pondicherry?
            </h3>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              LE PRESTIGE RESIDENCY — 120 C, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry – 605010
            </p>
            <div className="pt-2">
              <a
                href={`tel:${HOTEL.phoneRaw}`}
                className="inline-flex items-center gap-2 text-xs font-sans text-white/90 hover:text-white border-b border-white/30 pb-0.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C45A37]" />
                <span>Call Front Desk: {HOTEL.phone}</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}
