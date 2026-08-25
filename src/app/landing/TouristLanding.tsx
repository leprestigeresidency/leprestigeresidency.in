// ── Le Prestige — Tourist Landing Page ──────────────────────────────

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import TouristForm from "@/components/landing/TouristForm";
import { HOTEL } from "@/constants/hotel";
import {
  Coffee,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Bike,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function TouristLanding() {
  useEffect(() => {
    document.title =
      "Le Prestige Residency — Pondicherry Weekend Stays & Rooms from ₹3,000";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#262626] font-sans">
      {/* Isolated Landing Header */}
      <LandingHeader
        campaignTitle="Pondicherry · Weekend Stays"
        ctaText="Check Availability"
        ctaHref="#reserve"
      />

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F8F4EE] via-[#F3EEE7] to-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5DED5]/80 text-[#C45A37] text-xs font-semibold uppercase tracking-widest border border-[#C45A37]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pondicherry · Weekend Stays</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#262626] leading-[1.15] tracking-tight">
                Don't let your stay be the worst part of your weekend.
              </h1>

              <p className="font-sans text-base sm:text-lg text-[#575757] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A comfortable room to come back to, around 10–15 minutes from
                Pondicherry beaches, cafés, and Heritage French Quarter.
              </p>

              {/* Price Pill & Quick Benefits */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div className="bg-[#262626] text-white px-4 py-2.5 rounded-xl font-serif text-lg font-semibold flex items-center gap-2 shadow-md">
                  <span className="text-xs font-sans text-white/70 font-normal uppercase">Starts at</span>
                  <span className="text-[#D8B98A]">₹3,000</span>
                  <span className="text-xs font-sans text-white/70 font-normal">/ night</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-white/80 rounded-xl border border-[#E5DED5] text-xs font-medium text-[#262626]">
                  <Coffee className="w-4 h-4 text-[#C45A37]" />
                  <span>Complimentary Breakfast</span>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 bg-white/80 rounded-xl border border-[#E5DED5] text-xs font-medium text-[#262626]">
                  <MapPin className="w-4 h-4 text-[#C45A37]" />
                  <span>10–15 mins from everywhere</span>
                </div>
              </div>

              {/* Hero CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#reserve"
                  className="w-full sm:w-auto px-8 py-4 bg-[#C45A37] hover:bg-[#B24F30] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                >
                  Check Room Availability
                </a>

                <a
                  href="#included"
                  className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#F3EEE7] text-[#262626] border border-[#E5DED5] font-sans font-semibold text-sm rounded-xl transition-all duration-200 text-center"
                >
                  See What's Included
                </a>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/room.jpeg"
                  alt="Le Prestige Residency Luxury Room interior"
                  className="w-full h-[380px] sm:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-xl font-semibold text-[#D8B98A]">
                    Le Prestige Residency
                  </p>
                  <p className="text-xs text-white/80 font-sans mt-0.5">
                    120 C, Villianur Main Road, Reddiarpalayam, Puducherry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE WEEKEND AS IT SHOULD GO (PROBLEM & REASSURANCE) ──────── */}
      <section className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              The Weekend, As It Should Go
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626]">
              More Than Just a Room to Sleep In
            </h2>
            <p className="text-base text-[#575757] leading-relaxed">
              When visiting Pondicherry for the weekend, your hotel shouldn't feel like a compromise. You deserve a peaceful, air-conditioned retreat that's spotlessly clean and conveniently located.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C45A37]/10 flex items-center justify-center text-[#C45A37]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                10–15 Mins to Beaches
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Located right on Villianur Main Road. Reach Promenade Beach, French Quarter, and Auroville without getting stuck in congested alley traffic.
              </p>
            </div>

            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C45A37]/10 flex items-center justify-center text-[#C45A37]">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                Complimentary Breakfast
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Wake up to hot, fresh breakfast served daily. No need to scramble for morning food before starting your sightseeing.
              </p>
            </div>

            <div className="p-8 bg-[#F8F4EE] rounded-2xl border border-[#E5DED5] space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#C45A37]/10 flex items-center justify-center text-[#C45A37]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#262626]">
                Guaranteed Quiet & Clean
              </h3>
              <p className="text-sm text-[#575757] leading-relaxed">
                Pristine linen, spotless private bathrooms, powerful air conditioning, and a peaceful environment for deep weekend rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE HAVE VS WHAT WE DON'T HAVE ───────────────────────── */}
      <section id="included" className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Transparent Hospitality
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              What We Have & What We Don't
            </h2>
            <p className="text-sm text-[#575757] mt-2">
              Clear expectations for your peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What We Have */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-sm space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#262626] flex items-center gap-2 border-b border-[#E5DED5] pb-4">
                <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" />
                <span>What We Have</span>
              </h3>
              <ul className="space-y-4 text-sm text-[#575757] font-sans">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Relaxing, comfortable air-conditioned rooms</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Complimentary fresh breakfast served daily</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Nearby veg & non-veg restaurants within walking distance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Scooter, bike & car rental assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Free offline tourist map with top spots</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Surprise party / celebration setups on request</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                  <span>Convenient location — 10–15 mins from beaches & cafés</span>
                </li>
              </ul>
            </div>

            {/* What We Don't Have */}
            <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-sm space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#262626] flex items-center gap-2 border-b border-[#E5DED5] pb-4">
                <XCircle className="w-6 h-6 text-[#C45A37]" />
                <span>What We Don't Have</span>
              </h3>
              <ul className="space-y-4 text-sm text-[#575757] font-sans">
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-[#C45A37] shrink-0 mt-0.5" />
                  <span>No hidden charges or last-minute fee surprises</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-[#C45A37] shrink-0 mt-0.5" />
                  <span>No loud, disturbing late-night party crowds</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-[#C45A37] shrink-0 mt-0.5" />
                  <span>No cramped, ill-maintained rooms or old beds</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-[#C45A37] shrink-0 mt-0.5" />
                  <span>No confusing check-in procedures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOM SHOWCASE GALLERY ───────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              Rooms Built Around Your Weekend
            </h2>
            <p className="text-sm text-[#575757] mt-2">
              Starting from ₹3,000/night with complimentary breakfast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Deluxe Room */}
            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/Delux room.jpeg"
                  alt="Deluxe Room"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#262626] text-[#D8B98A] text-xs font-semibold px-3 py-1 rounded-full font-serif">
                  From ₹3,000 / night
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#262626]">
                    Deluxe Room
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Ideal for couples & weekend getaways. Plush queen bed, modern AC, attached pristine bath.
                  </p>
                </div>
                <a
                  href="#reserve"
                  className="w-full py-2.5 bg-[#C45A37] hover:bg-[#B24F30] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Reserve Deluxe Room
                </a>
              </div>
            </div>

            {/* Family Room */}
            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/Twin bed.jpeg"
                  alt="Twin Bed Family Room"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#262626] text-[#D8B98A] text-xs font-semibold px-3 py-1 rounded-full font-serif">
                  Family Choice
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#262626]">
                    Family Room
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Spacious room with flexible bedding options for families or groups traveling together.
                  </p>
                </div>
                <a
                  href="#reserve"
                  className="w-full py-2.5 bg-[#C45A37] hover:bg-[#B24F30] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Reserve Family Room
                </a>
              </div>
            </div>

            {/* Suite */}
            <div className="bg-[#F8F4EE] rounded-2xl overflow-hidden border border-[#E5DED5] flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="/images/suit.jpeg"
                  alt="Le Prestige Executive Suite"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-[#262626] text-[#D8B98A] text-xs font-semibold px-3 py-1 rounded-full font-serif">
                  Luxury Experience
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#262626]">
                    Prestige Suite
                  </h3>
                  <p className="text-xs text-[#575757] mt-1 font-sans">
                    Premium space with balcony views, lounge seating, and high-end hospitality features.
                  </p>
                </div>
                <a
                  href="#reserve"
                  className="w-full py-2.5 bg-[#C45A37] hover:bg-[#B24F30] text-white text-xs font-sans font-bold uppercase tracking-wider rounded-xl text-center block transition-colors"
                >
                  Reserve Suite
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Simple & Fast
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              How It Works
            </h2>
            <p className="text-sm text-[#575757] mt-2">
              4 simple steps to lock in your Pondicherry stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#E5DED5] relative">
              <span className="text-3xl font-serif font-bold text-[#C45A37] block mb-2">01</span>
              <h4 className="font-serif text-lg font-bold text-[#262626] mb-1">
                Submit Dates
              </h4>
              <p className="text-xs text-[#575757] leading-relaxed">
                Fill out the quick form below with your check-in & check-out dates.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E5DED5] relative">
              <span className="text-3xl font-serif font-bold text-[#C45A37] block mb-2">02</span>
              <h4 className="font-serif text-lg font-bold text-[#262626] mb-1">
                Availability Check
              </h4>
              <p className="text-xs text-[#575757] leading-relaxed">
                Our front desk team checks live room status and holds the best room option.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E5DED5] relative">
              <span className="text-3xl font-serif font-bold text-[#C45A37] block mb-2">03</span>
              <h4 className="font-serif text-lg font-bold text-[#262626] mb-1">
                Confirmation
              </h4>
              <p className="text-xs text-[#575757] leading-relaxed">
                We reach out directly via call/WhatsApp to confirm your stay details.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E5DED5] relative">
              <span className="text-3xl font-serif font-bold text-[#C45A37] block mb-2">04</span>
              <h4 className="font-serif text-lg font-bold text-[#262626] mb-1">
                Arrive & Enjoy
              </h4>
              <p className="text-xs text-[#575757] leading-relaxed">
                Check in seamlessly, enjoy complimentary breakfast, and explore Pondicherry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOTEL PHOTO SHOWCASE ──────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Property Photos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              See Le Prestige Residency
            </h2>
            <p className="text-sm text-[#575757] mt-2">
              Your comfortable home base in Pondicherry — exactly as it looks.
            </p>
          </div>

          {/* ── ROW 1: Large left + tall right ── */}
          <div className="grid grid-cols-12 grid-rows-1 gap-3 mb-3">
            {/* Large feature — 8 cols wide */}
            <div className="col-span-12 md:col-span-8 h-72 md:h-[420px] rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/extrior.jpeg"
                alt="Le Prestige Residency Exterior"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-serif text-lg font-semibold">Hotel Exterior</p>
                <p className="text-xs text-white/80 font-sans">Villianur Main Road, Puducherry</p>
              </div>
            </div>

            {/* Tall right — 4 cols */}
            <div className="col-span-12 md:col-span-4 h-72 md:h-[420px] rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/lobby.jpeg"
                alt="Hotel Lobby"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-serif text-base font-semibold">Lobby & Reception</p>
              </div>
            </div>
          </div>

          {/* ── ROW 2: Three equal squares ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            <div className="h-52 sm:h-64 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/Delux room.jpeg"
                alt="Deluxe Room"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#C45A37] text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Deluxe Room
                </span>
              </div>
            </div>

            <div className="h-52 sm:h-64 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/room.jpeg"
                alt="Guest Room"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#C45A37] text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Standard Room
                </span>
              </div>
            </div>

            <div className="h-52 sm:h-64 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/Twin bed.jpeg"
                alt="Twin Bed Room"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-[#C45A37] text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Family Room
                </span>
              </div>
            </div>
          </div>

          {/* ── ROW 3: 5-col tall left + 7-col two-stacked right ── */}
          <div className="grid grid-cols-12 gap-3 mb-3">
            {/* Tall left */}
            <div className="col-span-12 md:col-span-5 h-56 md:h-[460px] rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/suit.jpeg"
                alt="Executive Suite"
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif text-xl font-bold text-[#D8B98A]">Prestige Suite</p>
                <p className="text-xs text-white/80 font-sans mt-1">Luxury Experience · Premium Comfort</p>
              </div>
            </div>

            {/* Right: two stacked */}
            <div className="col-span-12 md:col-span-7 grid grid-rows-2 gap-3 h-56 md:h-[460px]">
              <div className="rounded-2xl overflow-hidden relative group cursor-default">
                <img
                  src="/images/balcony.jpeg"
                  alt="Room Balcony"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-serif text-sm font-semibold">Private Balcony</span>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden relative group cursor-default">
                <img
                  src="/images/resturant.jpg"
                  alt="Restaurant & Dining"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-serif text-sm font-semibold">Dining & Breakfast Area</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 4: Four equal squares ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <div className="h-44 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/bathroom .jpeg"
                alt="Attached Bathroom"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-sans font-semibold">Attached Bath</span>
              </div>
            </div>
            <div className="h-44 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/receptions.jpeg"
                alt="Reception Area"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-sans font-semibold">Front Desk</span>
              </div>
            </div>
            <div className="h-44 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/corridor.jpeg"
                alt="Hotel Corridor"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-sans font-semibold">Hotel Corridor</span>
              </div>
            </div>
            <div className="h-44 rounded-2xl overflow-hidden relative group cursor-default">
              <img
                src="/images/Hotel Expreince.jpeg"
                alt="Hotel Experience"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="text-white text-xs font-sans font-semibold">Hotel Experience</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C45A37] hover:bg-[#B24F30] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Book Your Room Now
            </a>
          </div>
        </div>
      </section>


      <section id="reserve" className="py-16 md:py-24 bg-white border-y border-[#E5DED5]">

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <TouristForm />
            </div>

            {/* Side Information Column */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="bg-[#F8F4EE] p-8 rounded-2xl border border-[#E5DED5] space-y-4">
                <span className="text-xs font-sans uppercase tracking-widest text-[#C45A37] font-semibold">
                  Why Reserve Now?
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#262626]">
                  Weekend Dates Fill Quickly
                </h4>
                <p className="text-sm text-[#575757] leading-relaxed font-sans">
                  Pondicherry is a top weekend destination. Submitting an enquiry locks your spot on priority before rooms sell out.
                </p>
                <div className="pt-2 border-t border-[#E5DED5] space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#262626] font-medium">
                    <Bike className="w-4 h-4 text-[#C45A37]" />
                    <span>Free scooter / bike rental guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#262626] font-medium">
                    <Compass className="w-4 h-4 text-[#C45A37]" />
                    <span>Free offline tourist map provided</span>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Help Card */}
              <div className="bg-[#262626] text-white p-8 rounded-2xl space-y-4">
                <h4 className="font-serif text-xl font-bold text-[#D8B98A]">
                  Prefer Direct WhatsApp Message?
                </h4>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  Send us a message directly with word <strong className="text-white">"PONDICHERRY"</strong> for fast response.
                </p>
                <a
                  href={`https://wa.me/${HOTEL.phoneRaw}?text=PONDICHERRY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#4CAF50] hover:bg-[#43A047] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Front Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#C45A37]">
              Got Questions?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" />
                <span>How far is Le Prestige Residency from Pondicherry beaches?</span>
              </h4>
              <p className="text-sm text-[#575757] font-sans pl-7">
                We are located on Villianur Main Road, Reddiarpalayam — approx. 10–15 minutes drive from Rock Beach, Promenade, French Colony, and top cafés.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" />
                <span>Is breakfast included with room stay?</span>
              </h4>
              <p className="text-sm text-[#575757] font-sans pl-7">
                Yes! Fresh complimentary breakfast is included for all guests every morning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" />
                <span>What is the starting price per night?</span>
              </h4>
              <p className="text-sm text-[#575757] font-sans pl-7">
                Our rooms start at ₹3,000/night with no hidden fees.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" />
                <span>Can you help with bike or scooter rentals?</span>
              </h4>
              <p className="text-sm text-[#575757] font-sans pl-7">
                Yes, our team assists guests with bike, scooter, and cab bookings for effortless sightseeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ───────────────────────────────────────── */}
      <section className="py-16 bg-[#262626] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#D8B98A]">
            Ready for Pondicherry?
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/70 max-w-xl mx-auto">
            Lock in your room at Le Prestige Residency for a comfortable, stress-free weekend stay.
          </p>
          <div>
            <a
              href="#reserve"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C45A37] hover:bg-[#B24F30] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              <span>Check Room Availability</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Dedicated Landing Footer */}
      <LandingFooter />
    </div>
  );
}
