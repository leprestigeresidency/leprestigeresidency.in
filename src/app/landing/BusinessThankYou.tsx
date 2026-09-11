// ── Le Prestige — Business Thank-You / Request Received Page ───────

import { useEffect } from "react";
import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/LandingFooter";
import { HOTEL } from "@/constants/hotel";
import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";

export default function BusinessThankYou() {
  const { livePrices } = useLivePrices();
  const liveBasePrice = livePrices["pondicherry_deluxe"] || 2500;

  useEffect(() => {
    document.title = "Enquiry Received — Le Prestige Residency";
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1E293B] font-sans flex flex-col justify-between">
      <div>
        <LandingHeader
          campaignTitle="Request Received"
          ctaText="Contact Front Desk"
          ctaHref={`tel:${HOTEL.phoneRaw}`}
        />

        <section className="py-12 md:py-20 bg-gradient-to-b from-[#E2E8F0] to-[#F0F4F8]">
          <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center space-y-6">
            
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0F172A]">
              Almost There. Lock It in 5 Minutes.
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl mx-auto">
              Your enquiry is received. Our team will reach you within the hour.
            </p>

            <div className="bg-[#0F172A] p-6 rounded-2xl text-left border border-[#334155] shadow-xl text-white space-y-4 my-8">
              <p className="text-sm font-semibold">
                Don't wait on Reserve — save <span className="text-[#F59E0B]">₹500</span> per night. 
                <br className="hidden sm:block"/> Book Now at just <span className="text-[#F59E0B]">₹{liveBasePrice.toLocaleString("en-IN")}</span> — call or WhatsApp us right now and lock your room instantly.
              </p>

              <div className="bg-white/5 p-4 rounded-xl space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#38BDF8]">How to book now:</h4>
                <ol className="space-y-2 text-sm text-white/90">
                  <li><strong>1.</strong> Tap WhatsApp or Call below</li>
                  <li><strong>2.</strong> Tell us your dates</li>
                  <li><strong>3.</strong> Payment</li>
                  <li><strong>4.</strong> We confirm your room — done in 5 minutes</li>
                </ol>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/${HOTEL.phoneRaw}?text=BUSINESS_STAY`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#4CAF50] hover:bg-[#43A047] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Now — Book at ₹{liveBasePrice.toLocaleString("en-IN")} &rarr;</span>
                </a>
                <a
                  href={`tel:${HOTEL.phoneRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-[#0F172A] text-white font-sans font-bold text-sm uppercase tracking-wider rounded-xl transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Now &rarr;</span>
                </a>
              </div>
            </div>

            <p className="text-sm font-bold text-[#0284C7] uppercase tracking-wider">
              14 rooms booked this week. Weekday dates fill fast.
            </p>
            
          </div>
        </section>

      </div>
      <LandingFooter />
    </div>
  );
}
