// ── Le Prestige — Landing Page Dedicated Header ────────────────────

import { HOTEL } from "@/constants/hotel";
import { Phone, CalendarCheck } from "lucide-react";

interface LandingHeaderProps {
  campaignTitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function LandingHeader({
  campaignTitle = "Pondicherry Weekend Stays",
  ctaText = "Check Availability",
  ctaHref = "#reserve",
}: LandingHeaderProps) {
  const scrollToCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(ctaHref);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8F4EE]/95 backdrop-blur-md border-b border-[#E5DED5] transition-all">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#262626] text-[#D8B98A] flex items-center justify-center font-serif font-bold text-xl shadow-sm border border-[#C7A56B]/30">
            LP
          </div>
          <div>
            <span className="font-serif font-semibold text-lg sm:text-xl tracking-wider text-[#262626] block leading-tight">
              LE PRESTIGE
            </span>
            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-[#C45A37] block font-medium">
              {campaignTitle}
            </span>
          </div>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${HOTEL.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-sans font-medium text-[#262626] hover:text-[#C45A37] border border-[#E5DED5] hover:border-[#C45A37] rounded-full transition-all duration-200 bg-white"
          >
            <Phone className="w-3.5 h-3.5 text-[#C45A37]" />
            <span>{HOTEL.phone}</span>
          </a>

          <a
            href={ctaHref}
            onClick={scrollToCTA}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-sans font-semibold text-white bg-[#C45A37] hover:bg-[#B24F30] rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>{ctaText}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
