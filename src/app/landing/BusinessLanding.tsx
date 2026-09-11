import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import BusinessForm from "@/components/landing/BusinessForm";
import { HOTEL } from "@/constants/hotel";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Phone,
  Briefcase
} from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";

export default function BusinessLanding() {
  const { livePrices } = useLivePrices();
  const liveBasePrice = livePrices["pondicherry_deluxe"] || 2500;
  const reservePrice = liveBasePrice + 500;

  useEffect(() => {
    document.title = "Pondicherry Work Trips — Le Prestige Residency";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1E293B] font-sans">
      <LandingHeader
        campaignTitle="Pondicherry · Corporate & Work Stays"
        ctaText="Book Now"
        ctaHref={`https://wa.me/${HOTEL.phoneRaw}?text=BUSINESS_STAY`}
      />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F0F4F8] via-[#E2E8F0] to-[#F0F4F8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] tracking-tight">
              The Most Comfortable Room for Your Pondicherry Work Trip.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#475569] leading-relaxed">
              A room that actually lets you switch off — clean, calm, professional. 10–15 mins from Pondicherry's business areas and best restaurants.
            </p>

            <div className="bg-[#0F172A] text-white px-6 py-3 rounded-full font-serif text-xl font-semibold inline-block shadow-md">
              Rooms from ₹{liveBasePrice.toLocaleString("en-IN")} / night
            </div>
            <p className="text-sm font-semibold text-[#0284C7] uppercase tracking-widest mt-2">
              Offer valid for the next 7 days only.
            </p>

            <div className="pt-6 flex flex-col items-center justify-center gap-4">
              {/* Primary Book Now */}
              <a
                href={`https://wa.me/${HOTEL.phoneRaw}?text=BUSINESS_BOOK_NOW`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-sans font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Book Now at ₹{liveBasePrice.toLocaleString("en-IN")} — Call or WhatsApp
              </a>

              {/* Secondary Reserve */}
              <a
                href="#reserve-form"
                className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-[#F1F5F9] text-[#0F172A] border-2 border-[#CBD5E1] font-sans font-semibold text-sm rounded-xl transition-all duration-200"
              >
                Reserve at ₹{reservePrice.toLocaleString("en-IN")}
              </a>
            </div>

            <div className="text-sm text-[#475569] space-y-2 pt-4">
              <p>Book immediately and save ₹500 per night. Confirm later by phone and the standard rate of ₹{reservePrice.toLocaleString("en-IN")} applies.</p>
              <p className="font-semibold text-[#0F172A]">14 rooms booked this week — only a few left at ₹{liveBasePrice.toLocaleString("en-IN")}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: ROOM PHOTOS ───────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E2E8F0] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A]">Your Room</h2>
            <p className="text-[#475569] mt-3 max-w-2xl mx-auto">Calm space. Soft beds. A room that feels like a break, not just a place to sleep.</p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <img src="/images/bed.jpeg" alt="Bed" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E2E8F0]" onError={(e) => { e.currentTarget.src = "/images/Delux room.jpeg" }} />
            <img src="/images/room.jpeg" alt="Wide room shot" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E2E8F0]" />
            <img src="/images/bathroom .jpeg" alt="Bathroom" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E2E8F0]" />
            <img src="/images/balcony.jpeg" alt="Window" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E2E8F0]" />
            <img src="/images/Twin bed.jpeg" alt="Twin room" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E2E8F0]" />
          </div>
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </section>

      {/* ── SECTION 3: WHAT YOU GET & SECTION 4: WHAT WE DON'T HAVE ─── */}
      <section className="py-16 md:py-24 bg-[#F0F4F8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 3: What You Get */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] mb-4 flex items-center gap-2 border-b border-[#E2E8F0] pb-4">
              <CheckCircle2 className="w-6 h-6 text-[#0284C7]" /> Everything You Need to Work, Rest, and Reset
            </h3>
            <p className="text-sm text-[#475569] mb-6 font-medium">A space that smells clean the moment you walk in. Soft linen, a calm view, nothing loud or chaotic — just a room built to help you actually rest before the next day starts.</p>
            <ul className="space-y-4 text-[#475569] font-sans">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Central AC and fast WiFi</span> — work without interruptions.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Dedicated work table</span> — a proper space to sit and focus.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Smart TV, spotless bathroom, hot water any hour.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Soft, comfortable beds</span> — real rest after a long day.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Some of Pondicherry's best restaurants nearby.</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">Vehicle arranged on request</span> — for meetings or getting around.</li>
            </ul>
          </div>

          {/* Section 4: What We Don't Have */}
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#0F172A] mb-6 flex items-center gap-2 border-b border-[#E2E8F0] pb-4">
              <XCircle className="w-6 h-6 text-[#DC2626]" /> What We Don't Have
            </h3>
            <ul className="space-y-4 text-[#475569] font-sans">
              <li className="flex items-center gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0" /> <span className="font-semibold text-[#0F172A]">No noisy, crowded common areas</span></li>
              <li className="flex items-center gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0" /> <span className="font-semibold text-[#0F172A]">No hidden charges or last-minute surprises</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" /> <span className="font-semibold text-[#0F172A]">No confusing check-in process</span></li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: THE FORM & SECTION 6: HOW TO BOOK NOW ────────── */}
      <section id="reserve-form" className="py-16 md:py-24 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-[#0F172A]">Book Your Stay</h2>
              <p className="text-sm font-semibold text-[#475569] mt-3">Two clear choices — above the form:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0F172A] p-6 rounded-2xl text-white space-y-4 border border-[#334155]">
                <h3 className="font-serif text-2xl font-bold text-[#F59E0B]">Book Now — ₹{liveBasePrice.toLocaleString("en-IN")}/night</h3>
                <p className="text-sm text-white/80">Call or WhatsApp us directly. Booked and confirmed immediately.</p>
                <div className="flex gap-2">
                  <a href={`https://wa.me/${HOTEL.phoneRaw}?text=BUSINESS_STAY`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#4CAF50] hover:bg-[#43A047] py-2 rounded font-bold text-xs">WhatsApp Now</a>
                  <a href={`tel:${HOTEL.phoneRaw}`} className="flex-1 text-center bg-transparent border border-white hover:bg-white/10 py-2 rounded font-bold text-xs">Call Now</a>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border-2 border-[#E2E8F0] space-y-4 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#0F172A]">Reserve — ₹{reservePrice.toLocaleString("en-IN")}/night</h3>
                <p className="text-sm text-[#475569]">Reserve now, book later — we'll call you back to confirm.</p>
                <div className="text-xs text-[#0F172A] font-semibold p-2 bg-white border border-[#E2E8F0] rounded">
                  Use the form below to reserve.
                </div>
              </div>
            </div>

            <div className="text-center text-sm font-medium text-[#0F172A] space-y-1">
              <p>Immediate bookings — ₹{liveBasePrice.toLocaleString("en-IN")}. Confirmed-later bookings — ₹{reservePrice.toLocaleString("en-IN")}.</p>
              <p className="text-[#0284C7] font-bold">Save ₹500 by booking now. Offer valid for the next 7 days only.</p>
            </div>

            <BusinessForm />

            <div className="text-center pt-2">
              <p className="text-sm text-[#475569]">Have questions before you book? Call us — we're happy to help.</p>
              <a href={`tel:${HOTEL.phoneRaw}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] border-b-2 border-[#0F172A] pb-0.5 mt-2 hover:text-[#0284C7] hover:border-[#0284C7] transition-all"><Phone size={14}/> Call Us</a>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:pl-10">
            {/* Section 6: How to Book Now */}
            <div className="sticky top-24 bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-lg">
              <h3 className="font-serif text-2xl font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-4 mb-4">
                Confirmed in Minutes — Here's How
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-4 text-sm font-semibold text-[#0F172A]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F0F4F8] rounded-full text-[#0284C7] shrink-0 font-serif">1</span>
                  <span className="pt-1">Tap Call or WhatsApp above</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#0F172A]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F0F4F8] rounded-full text-[#0284C7] shrink-0 font-serif">2</span>
                  <span className="pt-1">Tell us your details</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#0F172A]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F0F4F8] rounded-full text-[#0284C7] shrink-0 font-serif">3</span>
                  <span className="pt-1">Payment</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#0F172A]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F0F4F8] rounded-full text-[#0284C7] shrink-0 font-serif">4</span>
                  <span className="pt-1">We confirm your room at ₹{liveBasePrice.toLocaleString("en-IN")} — done</span>
                </li>
              </ol>

              <div className="mt-8 p-4 bg-[#F0F4F8] text-xs text-[#475569] rounded-xl border border-[#E2E8F0]">
                Keep a valid government ID ready for check-in — required for all guests.
              </div>
              <p className="mt-4 text-sm font-bold text-center text-[#DC2626]">
                Only a few rooms left this week at ₹{liveBasePrice.toLocaleString("en-IN")}.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 7: NEARBY ────────────────────────────────────────── */}
      <section className="py-16 bg-[#F0F4F8] border-y border-[#E2E8F0]">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] text-center mb-10">Everything Within Easy Reach</h2>
          
          <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm">
            <ul className="space-y-4 text-sm text-[#0F172A] font-medium">
              <li className="flex justify-between border-b border-[#E2E8F0] pb-2"><span>French Quarter</span> <span>12 mins</span></li>
              <li className="flex justify-between border-b border-[#E2E8F0] pb-2"><span>Best veg & non-veg restaurants</span> <span>5 mins</span></li>
              <li className="flex justify-between border-b border-[#E2E8F0] pb-2"><span>Bus stop</span> <span>2 mins</span></li>
              <li className="flex justify-between border-b border-[#E2E8F0] pb-2"><span>Auto stand</span> <span>2 mins</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F172A] text-center mb-12">FAQ</h2>
          
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> Is the WiFi good enough to work from the room?</h4>
              <p className="text-sm text-[#475569]">Yes — fast WiFi throughout, built for work as much as rest.</p>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> Can you arrange a vehicle for meetings?</h4>
              <p className="text-sm text-[#475569]">Yes — bike, scooter, or car rental arranged on request.</p>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> What's the difference between Book Now and Reserve?</h4>
              <p className="text-sm text-[#475569]">Book Now (call/WhatsApp) = ₹{liveBasePrice.toLocaleString("en-IN")}/night, confirmed instantly by our team. Reserve (form) = ₹{reservePrice.toLocaleString("en-IN")}/night, we call to confirm.</p>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> Are the rates negotiable?</h4>
              <p className="text-sm text-[#475569]">No — fixed, transparent pricing. That's how we keep the direct-booking rate this low.</p>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> Is breakfast included?</h4>
              <p className="text-sm text-[#475569]">Yes — complimentary hot breakfast every morning.</p>
            </div>
            <div className="bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0]">
              <h4 className="font-serif text-lg font-bold text-[#0F172A] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#0284C7] shrink-0" /> What do I need at check-in?</h4>
              <p className="text-sm text-[#475569]">A valid government-issued photo ID for every guest — mandatory as per local regulations.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
