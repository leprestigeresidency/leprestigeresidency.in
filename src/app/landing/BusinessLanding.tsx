// ── Le Prestige — Business Landing Page ─────────────────────────────

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import BusinessForm from "@/components/landing/BusinessForm";
import { HOTEL } from "@/constants/hotel";
import {
  Building2,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Briefcase,
  Wifi,
  Car,
} from "lucide-react";

export default function BusinessLanding() {
  useEffect(() => {
    document.title =
      "Le Prestige Residency — Corporate & Business Accommodation | Puducherry";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#262626] font-sans">
      {/* Isolated Landing Header */}
      <LandingHeader
        campaignTitle="Business & Corporate Stays"
        ctaText="Request Business Stay"
        ctaHref="#enquiry"
      />

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-[#F8F4EE] via-[#F3EEE7] to-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#262626] text-[#D8B98A] text-xs font-semibold uppercase tracking-widest">
                <Briefcase className="w-3.5 h-3.5 text-[#C45A37]" />
                <span>Business Stays in Puducherry</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#262626] leading-[1.15] tracking-tight">
                Reliable, Premium Accommodation for Business & Corporate Travelers
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#575757] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Centrally located on Villianur Main Road. Enjoy clean, quiet rooms, prompt front desk service, and seamless stay arrangements for individual professionals and company teams.
              </p>

              {/* Business Key Pillars */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#E5DED5] text-xs font-medium text-[#262626] shadow-sm">
                  <MapPin className="w-4 h-4 text-[#C45A37]" />
                  <span>Prime Commercial Main Road</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#E5DED5] text-xs font-medium text-[#262626] shadow-sm">
                  <Clock className="w-4 h-4 text-[#C45A37]" />
                  <span>24/7 Desk & Assistance</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-xl border border-[#E5DED5] text-xs font-medium text-[#262626] shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-[#C45A37]" />
                  <span>Quiet Rest Environment</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#enquiry"
                  className="w-full sm:w-auto px-8 py-4 bg-[#262626] hover:bg-[#1C1C1C] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
                >
                  Submit Corporate Enquiry
                </a>

                <a
                  href="#features"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F3EEE7] text-[#262626] border border-[#E5DED5] font-sans font-semibold text-sm rounded-xl transition-all text-center"
                >
                  View Stay Highlights
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/extrior.jpeg"
                  alt="Le Prestige Residency Exterior & Location"
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-xl font-semibold text-[#D8B98A]">
                    Le Prestige Residency
                  </p>
                  <p className="text-xs text-white/80 font-sans mt-0.5">
                    Villianur Main Road, Reddiarpalayam, Puducherry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS ADVANTAGES ────────────────────────────────────── */}
      <section id="features" className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Designed for Professionals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              Why Corporate Travelers Choose Le Prestige
            </h2>
            <p className="text-sm text-[#575757] mt-2">
              Essential amenities and convenient access for hassle-free work trips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#262626] text-[#D8B98A] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                Strategic Main Road Location
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Situated on Villianur Main Road, offering fast connectivity to industrial parks, commercial complexes, and government offices in Puducherry.
              </p>
            </div>

            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#262626] text-[#D8B98A] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                Quiet & Restful Rooms
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Well-insulated, air-conditioned rooms designed to offer uninterrupted sleep after a demanding day of business meetings.
              </p>
            </div>

            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#262626] text-[#D8B98A] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                24/7 Front Desk & Parking
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Seamless check-in and check-out regardless of your arrival time. On-site parking and round-the-clock desk assistance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOM CATEGORIES SHOWCASE ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Accommodation Options
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              Rooms Built for Productivity & Comfort
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Double Room */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col shadow-sm">
              <div className="h-52 overflow-hidden">
                <img
                  src="/images/Delux room.jpeg"
                  alt="Deluxe Double Room for Business Stay"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#262626]">
                    Double / Executive Room
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Comfortable king/queen bed, writing desk area, work lighting, and air conditioning.
                  </p>
                </div>
                <a
                  href="#enquiry"
                  className="w-full py-2.5 bg-[#262626] hover:bg-[#1C1C1C] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Enquire for Executive Room
                </a>
              </div>
            </div>

            {/* Twin Bed / Team Room */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col shadow-sm">
              <div className="h-52 overflow-hidden">
                <img
                  src="/images/Twin bed.jpeg"
                  alt="Twin Bed Room for Corporate Team Members"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#262626]">
                    Twin Bed Room
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Ideal choice for colleagues or project team members traveling on business together.
                  </p>
                </div>
                <a
                  href="#enquiry"
                  className="w-full py-2.5 bg-[#262626] hover:bg-[#1C1C1C] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Enquire for Twin Room
                </a>
              </div>
            </div>

            {/* Suite */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col shadow-sm">
              <div className="h-52 overflow-hidden">
                <img
                  src="/images/suit.jpeg"
                  alt="Executive Suite"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#262626]">
                    Executive Suite
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Spacious layout with seating area for senior executives and business leadership.
                  </p>
                </div>
                <a
                  href="#enquiry"
                  className="w-full py-2.5 bg-[#262626] hover:bg-[#1C1C1C] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Enquire for Suite
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS ENQUIRY FORM ───────────────────────────────────── */}
      <section id="enquiry" className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <BusinessForm />
            </div>

            {/* Right Side Corporate Info */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="bg-[#F8F4EE] p-8 rounded-2xl border border-[#E5DED5] space-y-4">
                <span className="text-xs font-sans uppercase tracking-widest text-[#C45A37] font-semibold">
                  Corporate Stay Assistance
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#262626]">
                  Direct Contact with Reservations
                </h4>
                <p className="text-sm text-[#575757] leading-relaxed font-sans">
                  Have specific date requirements, long-stay enquiries, or team bookings? Our reservations desk is available for direct assistance.
                </p>

                <div className="pt-4 border-t border-[#E5DED5] space-y-3 font-sans text-xs text-[#262626]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C45A37]" />
                    <span>Phone: {HOTEL.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C45A37]" />
                    <span>Email: {HOTEL.email}</span>
                  </div>
                </div>
              </div>

              {/* Property Details Card */}
              <div className="bg-[#262626] text-white p-8 rounded-2xl space-y-3">
                <h4 className="font-serif text-xl font-bold text-[#D8B98A]">
                  Property Address
                </h4>
                <p className="text-xs text-white/80 font-sans leading-relaxed">
                  LE PRESTIGE RESIDENCY
                  <br />
                  120 C, Villianur Main Road, Kamban Nagar, Reddiarpalayam, Puducherry – 605010
                </p>
                <div className="pt-2 text-xs text-white/60 font-sans">
                  Convenient access to bus station, railway station, and main Puducherry business hubs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Landing Footer */}
      <LandingFooter />
    </div>
  );
}
