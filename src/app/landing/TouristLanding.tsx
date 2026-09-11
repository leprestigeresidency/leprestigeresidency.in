import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import TouristForm from "@/components/landing/TouristForm";
import { HOTEL } from "@/constants/hotel";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  MessageCircle,
  Sparkles,
  Phone,
  Gift
} from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";

export default function TouristLanding() {
  const { livePrices } = useLivePrices();
  const liveBasePrice = livePrices["pondicherry_deluxe"] || 2500;
  const reservePrice = liveBasePrice + 500;

  useEffect(() => {
    document.title = "Pondicherry Weekend Stays — Le Prestige Residency";
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F4EE] text-[#262626] font-sans">
      <LandingHeader
        campaignTitle="Pondicherry · Weekend Stays"
        ctaText="Book Now"
        ctaHref={`https://wa.me/${HOTEL.phoneRaw}?text=PONDICHERRY`}
      />

      {/* ── SECTION 1: HERO ─────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F8F4EE] via-[#F3EEE7] to-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#262626] leading-[1.15] tracking-tight">
              The Most Comfortable Room You'll Book in Pondicherry.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#575757] leading-relaxed">
              Soft beds, calm rooms, a stay that's actually worth the rest — clean, quiet, and easy on the senses. 10–15 mins from Pondicherry's best spots.
            </p>

            <div className="bg-[#262626] text-white px-6 py-3 rounded-full font-serif text-xl font-semibold inline-block shadow-md">
              Rooms from ₹{liveBasePrice.toLocaleString("en-IN")} / night
            </div>
            <p className="text-sm font-semibold text-[#C45A37] uppercase tracking-widest mt-2">
              Offer valid for the next 7 days only.
            </p>

            <div className="pt-6 flex flex-col items-center justify-center gap-4">
              {/* Primary Book Now */}
              <a
                href={`https://wa.me/${HOTEL.phoneRaw}?text=PONDICHERRY_BOOK_NOW`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-sans font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Book Now at ₹{liveBasePrice.toLocaleString("en-IN")} — Call or WhatsApp
              </a>

              {/* Secondary Reserve */}
              <a
                href="#reserve-form"
                className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-[#F3EEE7] text-[#262626] border-2 border-[#E5DED5] font-sans font-semibold text-sm rounded-xl transition-all duration-200"
              >
                Reserve at ₹{reservePrice.toLocaleString("en-IN")}
              </a>
            </div>

            <div className="text-sm text-[#575757] space-y-2 pt-4">
              <p>Book immediately and save ₹500 per night. Confirm later by phone and the standard rate of ₹{reservePrice.toLocaleString("en-IN")} applies.</p>
              <p className="font-semibold text-[#262626]">14 rooms booked this week — only a few left at ₹{liveBasePrice.toLocaleString("en-IN")}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: ROOM PHOTOS ───────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E5DED5] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626]">Your Room</h2>
            <p className="text-[#575757] mt-3 max-w-2xl mx-auto">Soft beds. Quiet nights. A room that smells clean the moment you walk in, with a calm view to match. Exactly as shown.</p>
          </div>

          {/* Swipeable Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 no-scrollbar hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <img src="/images/bed.jpeg" alt="Bed shot" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E5DED5]" onError={(e) => { e.currentTarget.src = "/images/Delux room.jpeg" }} />
            <img src="/images/room.jpeg" alt="Wide room shot" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E5DED5]" />
            <img src="/images/bathroom .jpeg" alt="Bathroom" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E5DED5]" />
            <img src="/images/balcony.jpeg" alt="Window/Lights" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E5DED5]" />
            <img src="/images/Twin bed.jpeg" alt="Twin room" className="w-[85vw] sm:w-[400px] h-[300px] object-cover rounded-2xl snap-center shrink-0 border border-[#E5DED5]" />
          </div>
          <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
      </section>

      {/* ── SECTION 3: WHAT WE HAVE & SECTION 4: WHAT WE DON'T HAVE ─── */}
      <section className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Section 3: What We Have */}
          <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#262626] mb-6 flex items-center gap-2 border-b border-[#E5DED5] pb-4">
              <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" /> What You Get With Every Stay
            </h3>
            <ul className="space-y-4 text-[#575757] font-sans">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">Complimentary breakfast</span> — every morning, no extra cost.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">In-room food service</span> — brought straight to your door.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">Exclusive boating offer</span> — special rate for guests.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">Bike, scooter & car rental</span> — arranged for you.</li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-[#4CAF50] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">24hr hot water · Central AC · Smart TV · Fast WiFi.</span></li>
            </ul>
          </div>

          {/* Section 4: What We Don't Have */}
          <div className="bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#262626] mb-6 flex items-center gap-2 border-b border-[#E5DED5] pb-4">
              <XCircle className="w-6 h-6 text-[#DC2626]" /> What We Don't Have
            </h3>
            <ul className="space-y-4 text-[#575757] font-sans">
              <li className="flex items-center gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0" /> <span className="font-semibold text-[#262626]">No swimming pool</span></li>
              <li className="flex items-center gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0" /> <span className="font-semibold text-[#262626]">No bathtubs</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">No hidden charges or last-minute fee surprises</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">No cramped, ill-maintained rooms or old beds</span></li>
              <li className="flex items-start gap-3"><XCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" /> <span className="font-semibold text-[#262626]">No confusing check-in procedures</span></li>
            </ul>
          </div>

        </div>
      </section>

      {/* ── SECTION 5: CELEBRATIONS ──────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[800px] mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 bg-[#FCE7F3] rounded-full flex items-center justify-center mx-auto text-[#DB2777]">
            <Gift className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#262626]">Surprise Someone? We'll Help You Pull It Off.</h2>
          <p className="text-base text-[#575757]">
            Birthday. Anniversary. Just because. Tell us in advance and we'll set the room up for it — decorations, the works.
          </p>
          <a
            href={`https://wa.me/${HOTEL.phoneRaw}?text=SURPRISE_PLAN`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#DB2777] hover:bg-[#BE185D] text-white font-sans font-bold text-sm rounded-xl transition-all"
          >
            WhatsApp Us the Plan <Sparkles className="w-4 h-4" />
          </a>
          <p className="text-xs text-[#575757]">Planning a surprise? Message us the plan now, before you book.</p>
        </div>
      </section>

      {/* ── SECTION 6: THE FORM & SECTION 7: HOW TO BOOK NOW ────────── */}
      <section id="reserve-form" className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-[#262626]">Book Your Room</h2>
              <p className="text-sm font-semibold text-[#575757] mt-3">Two clear choices — above the form:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#262626] p-6 rounded-2xl text-white space-y-4 border border-[#404040]">
                <h3 className="font-serif text-2xl font-bold text-[#F59E0B]">Book Now — ₹{liveBasePrice.toLocaleString("en-IN")}/night</h3>
                <p className="text-sm text-white/80">Call or WhatsApp us directly. Booked and confirmed immediately.</p>
                <div className="flex gap-2">
                  <a href={`https://wa.me/${HOTEL.phoneRaw}?text=PONDICHERRY`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#4CAF50] hover:bg-[#43A047] py-2 rounded font-bold text-xs">WhatsApp Now</a>
                  <a href={`tel:${HOTEL.phoneRaw}`} className="flex-1 text-center bg-transparent border border-white hover:bg-white/10 py-2 rounded font-bold text-xs">Call Now</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-[#E5DED5] space-y-4 shadow-sm">
                <h3 className="font-serif text-2xl font-bold text-[#262626]">Reserve — ₹{reservePrice.toLocaleString("en-IN")}/night</h3>
                <p className="text-sm text-[#575757]">Reserve now, book later — we'll call you back to confirm.</p>
                <div className="text-xs text-[#262626] font-semibold p-2 bg-[#F8F4EE] rounded">
                  Use the form below to reserve.
                </div>
              </div>
            </div>

            <div className="text-center text-sm font-medium text-[#262626] space-y-1">
              <p>Immediate bookings — ₹{liveBasePrice.toLocaleString("en-IN")}. Confirmed-later bookings — ₹{reservePrice.toLocaleString("en-IN")}.</p>
              <p className="text-[#C45A37] font-bold">Save ₹500 by booking now. Offer valid for the next 7 days only.</p>
            </div>

            {/* Tourist Form Component containing exact fields */}
            <TouristForm />

            <div className="text-center pt-2">
              <p className="text-sm text-[#575757]">Have questions before you book? Call us — we're happy to help.</p>
              <a href={`tel:${HOTEL.phoneRaw}`} className="inline-flex items-center gap-2 text-sm font-bold text-[#262626] border-b-2 border-[#262626] pb-0.5 mt-2 hover:text-[#C45A37] hover:border-[#C45A37] transition-all"><Phone size={14}/> Call Us</a>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:pl-10">
            {/* Section 7: How to Book Now */}
            <div className="sticky top-24 bg-white p-8 rounded-2xl border border-[#E5DED5] shadow-lg">
              <h3 className="font-serif text-2xl font-bold text-[#262626] border-b border-[#E5DED5] pb-4 mb-4">
                Confirmed in Minutes — Here's How
              </h3>
              <ol className="space-y-4">
                <li className="flex items-start gap-4 text-sm font-semibold text-[#262626]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F8F4EE] rounded-full text-[#C45A37] shrink-0 font-serif">1</span>
                  <span className="pt-1">Tap Call or WhatsApp above</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#262626]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F8F4EE] rounded-full text-[#C45A37] shrink-0 font-serif">2</span>
                  <span className="pt-1">Tell us your details</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#262626]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F8F4EE] rounded-full text-[#C45A37] shrink-0 font-serif">3</span>
                  <span className="pt-1">Payment</span>
                </li>
                <li className="flex items-start gap-4 text-sm font-semibold text-[#262626]">
                  <span className="flex items-center justify-center w-7 h-7 bg-[#F8F4EE] rounded-full text-[#C45A37] shrink-0 font-serif">4</span>
                  <span className="pt-1">We confirm your room at ₹{liveBasePrice.toLocaleString("en-IN")} — done</span>
                </li>
              </ol>

              <div className="mt-8 p-4 bg-[#F8F4EE] text-xs text-[#575757] rounded-xl border border-[#E5DED5]/50">
                Keep a valid government ID ready for check-in — required for all guests.
              </div>
              <p className="mt-4 text-sm font-bold text-center text-[#DC2626]">
                Only a few rooms left this week at ₹{liveBasePrice.toLocaleString("en-IN")}.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION 8: NEARBY ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-[#E5DED5]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] text-center mb-12">Everything Within 15 Minutes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-[#F8F4EE] p-6 rounded-2xl border border-[#E5DED5]">
              <h3 className="font-serif text-xl font-bold text-[#C45A37] mb-4">Beaches</h3>
              <ul className="space-y-3 text-sm text-[#262626] font-medium">
                <li className="flex justify-between border-b border-[#E5DED5] pb-2"><span>Promenade Beach</span> <span>13 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-2"><span>Rock Beach</span> <span>12 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-2"><span>Paradise Beach</span> <span>14 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-2"><span>Eden Beach</span> <span>15 mins</span></li>
              </ul>
            </div>

            <div className="bg-[#F8F4EE] p-6 rounded-2xl border border-[#E5DED5]">
              <h3 className="font-serif text-xl font-bold text-[#262626] mb-4">Landmarks</h3>
              <ul className="space-y-3 text-sm text-[#575757] font-medium">
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Botanical Garden</span> <span>10 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Sri Aurobindo Ashram</span> <span>15 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Manakula Vinayagar Temple</span> <span>15 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Sacred Heart of Jesus Church</span> <span>11 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Auroville</span> <span>15 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Airport</span> <span>15 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Best veg & non-veg restaurants</span> <span>5 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Bus stop</span> <span>2 mins</span></li>
                <li className="flex justify-between border-b border-[#E5DED5] pb-1"><span>Auto stand</span> <span>2 mins</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: FAQ ───────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#F8F4EE]">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#262626] text-center mb-12">FAQ</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Is breakfast included?</h4>
              <p className="text-sm text-[#575757]">Yes — complimentary hot breakfast every morning.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Is there a swimming pool?</h4>
              <p className="text-sm text-[#575757]">No.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Are there bathtubs?</h4>
              <p className="text-sm text-[#575757]">No — showers only.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> What's the difference between Book Now and Reserve?</h4>
              <p className="text-sm text-[#575757]">Book Now (call/WhatsApp) = ₹{liveBasePrice.toLocaleString("en-IN")}/night, confirmed instantly by our team. Reserve (form) = ₹{reservePrice.toLocaleString("en-IN")}/night, we call to confirm.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Can you arrange transport?</h4>
              <p className="text-sm text-[#575757]">Yes — bike, scooter, and car rentals arranged by our team.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> How far are the beaches?</h4>
              <p className="text-sm text-[#575757]">Promenade Beach is about 13 minutes away, with more beaches close by.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Can you help with a birthday or surprise?</h4>
              <p className="text-sm text-[#575757]">Yes — message us your plan in advance and we'll set the room up for it.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> What do I need at check-in?</h4>
              <p className="text-sm text-[#575757]">A valid government-issued photo ID for every guest — mandatory as per local regulations.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-[#E5DED5]">
              <h4 className="font-serif text-lg font-bold text-[#262626] flex items-center gap-2 mb-2"><HelpCircle className="w-5 h-5 text-[#C45A37] shrink-0" /> Are the rates negotiable?</h4>
              <p className="text-sm text-[#575757]">No — fixed, transparent pricing. That's how we keep the direct-booking rate this low.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
