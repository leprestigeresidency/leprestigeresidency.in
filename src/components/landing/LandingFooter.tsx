// ── Le Prestige — Landing Page Dedicated Footer ────────────────────

import { HOTEL } from "@/constants/hotel";
import { MapPin, Phone, Mail } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-[#1C1C1C] text-white/80 pt-16 pb-10 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-white/10 text-[#D8B98A] flex items-center justify-center font-serif font-bold text-lg border border-[#C7A56B]/30">
                LP
              </div>
              <span className="font-serif font-semibold text-xl tracking-widest text-white">
                LE PRESTIGE RESIDENCY
              </span>
            </div>
            <p className="text-sm text-white/60 font-sans leading-relaxed max-w-sm">
              Experience comfortable, hospitality-first stays in Puducherry.
              Ideally located 10–15 minutes from major beaches, cafés, and central commercial hubs.
            </p>
          </div>

          {/* Column 2: Exact Client Address */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#D8B98A] font-semibold mb-4">
              Property Location
            </h4>
            <div className="flex items-start gap-3 text-sm text-white/70 font-sans leading-relaxed">
              <MapPin className="w-5 h-5 text-[#C45A37] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">LE PRESTIGE RESIDENCY</p>
                <p>120 C, Villianur Main Road,</p>
                <p>Kamban Nagar, Reddiarpalayam,</p>
                <p>Puducherry – 605010</p>
              </div>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-[#D8B98A] font-semibold mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-white/70 font-sans">
              <a
                href={`tel:${HOTEL.phoneRaw}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C45A37]" />
                <span>{HOTEL.phone}</span>
              </a>
              <a
                href={`mailto:${HOTEL.email}`}
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C45A37]" />
                <span>{HOTEL.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40 font-sans">
          <p>© {new Date().getFullYear()} LE PRESTIGE RESIDENCY. All rights reserved.</p>
          <p className="tracking-wide">Puducherry · Luxury Hospitality</p>
        </div>
      </div>
    </footer>
  );
}
