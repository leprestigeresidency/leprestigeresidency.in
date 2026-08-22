// ── Le Prestige — Business Thank-You / Request Received Page ───────

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { HOTEL } from "@/constants/hotel";
import { CheckCircle2, MessageCircle, Phone, Mail, Building2 } from "lucide-react";

export default function BusinessThankYou() {
  useEffect(() => {
    document.title = "Corporate Enquiry Received — Le Prestige Residency";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#262626] font-sans flex flex-col justify-between">
      <div>
        <LandingHeader
          campaignTitle="Enquiry Submitted"
          ctaText="Contact Reservations"
          ctaHref={`tel:${HOTEL.phoneRaw}`}
        />

        {/* ── SUCCESS BANNER ────────────────────────────────────────── */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-[#F3EEE7] to-[#F8F4EE]">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center space-y-6">
            <div className="w-16 h-16 bg-[#262626] border border-[#C7A56B]/40 rounded-full flex items-center justify-center mx-auto text-[#D8B98A]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#262626] text-[#D8B98A] font-sans text-xs font-semibold uppercase tracking-widest rounded-full">
              <Building2 className="w-3.5 h-3.5" />
              Corporate Request Received
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#262626]">
              Enquiry Received
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#575757] leading-relaxed max-w-2xl mx-auto">
              Thank you for reaching out. Our reservations team has received your corporate stay request and will review date availability and contact you shortly.
            </p>

            <div className="p-4 bg-white rounded-xl border border-[#E5DED5] max-w-md mx-auto text-xs text-[#262626] font-medium shadow-sm">
              ✉️ Please keep your phone or corporate email available. Our reservations manager will reach out with availability details.
            </div>
          </div>
        </section>

        {/* ── WHAT HAPPENS NEXT ────────────────────────────────────── */}
        <section className="py-14 bg-white border-y border-[#E5DED5]">
          <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-10">
            <div className="text-center mb-12">
              <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
                Next Steps
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#262626] mt-2">
                Corporate Reservation Workflow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Step 01 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">01</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Date & Inventory Review
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  We check room availability and room configuration options for your requested dates.
                </p>
              </div>

              {/* Step 02 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">02</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Direct Coordination
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  Our reservations manager contacts you via phone or email to confirm stay requirements.
                </p>
              </div>

              {/* Step 03 */}
              <div className="p-6 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
                <span className="text-2xl font-serif font-bold text-[#C45A37] block">03</span>
                <h3 className="font-serif text-lg font-bold text-[#262626]">
                  Seamless Check-In
                </h3>
                <p className="text-xs text-[#575757] leading-relaxed font-sans">
                  Complete your reservation and enjoy hassle-free corporate lodging in Puducherry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIRECT CONTACT CTA ────────────────────────────────────── */}
        <section className="py-14 bg-[#F8F4EE]">
          <div className="max-w-[800px] mx-auto px-4 text-center">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-[#E5DED5] shadow-lg space-y-6">
              <span className="text-xs font-sans uppercase tracking-widest text-[#C45A37] font-semibold">
                Need Immediate Assistance?
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#262626]">
                Connect Directly with Reservations
              </h3>

              <p className="text-sm text-[#575757] font-sans leading-relaxed max-w-lg mx-auto">
                For urgent stay inquiries, long-stay bookings, or team coordination, reach out to our team directly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <a
                  href={`tel:${HOTEL.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#262626] hover:bg-[#1C1C1C] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D8B98A]" />
                  <span>Call {HOTEL.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${HOTEL.phoneRaw}?text=BUSINESS_STAY_ENQUIRY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#4CAF50] hover:bg-[#43A047] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Business Desk</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── ADDRESS SECTION ───────────────────────────────────────── */}
        <section className="py-12 bg-[#262626] text-white text-center">
          <div className="max-w-[700px] mx-auto px-4 space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#D8B98A]">
              LE PRESTIGE RESIDENCY
            </h3>
            <p className="text-xs text-white/70 font-sans leading-relaxed">
              120 C, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry – 605010
            </p>
          </div>
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}
