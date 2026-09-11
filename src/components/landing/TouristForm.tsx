// ── Le Prestige — Tourist Landing Page Booking Form ────────────────

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeadService, TouristLeadPayload } from "@/services/lead.service";
import { getTodayDateString, getMinCheckOutDateString } from "@/utils/dateHelpers";
import { Loader2, AlertCircle } from "lucide-react";
import { useLivePrices } from "@/hooks/useLivePrices";

export default function TouristForm() {
  const navigate = useNavigate();
  const today = getTodayDateString();
  const { livePrices } = useLivePrices();
  const liveBasePrice = livePrices["pondicherry_deluxe"] || 2500;

  const [formData, setFormData] = useState<Omit<TouristLeadPayload, "source"> & { captcha: boolean }>({
    name: "",
    phone: "",
    checkIn: today,
    checkOut: getMinCheckOutDateString(today),
    guests: "2 Guests",
    roomPreference: "No preference",
    captcha: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };

      // If checkIn changes, adjust checkOut if checkOut <= checkIn
      if (name === "checkIn") {
        if (updated.checkOut <= value) {
          updated.checkOut = getMinCheckOutDateString(value);
        }
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length < 10 || !/^\+?\d+$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    else if (formData.checkIn < today) newErrors.checkIn = "Check-in date cannot be in the past";

    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    else if (formData.checkOut <= formData.checkIn) newErrors.checkOut = "Check-out date must be after check-in date";

    if (!formData.guests) newErrors.guests = "Please select number of guests";
    if (!formData.roomPreference) newErrors.roomPreference = "Please select room preference";
    if (!formData.captcha) newErrors.captcha = "Please verify you are not a robot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload: TouristLeadPayload = {
        source: "Tourist Landing Page",
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        roomPreference: formData.roomPreference,
      };

      await LeadService.submitTouristLead(payload);
      navigate("/tourist/thank-you");
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors({ form: "Failed to submit request. Please try again or call us directly." });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#E5DED5]">
      {errors.form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Full Name <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.name ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Phone Number <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.phone ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            />
            {errors.phone && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Check-in Date <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="date"
              name="checkIn"
              min={today}
              value={formData.checkIn}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.checkIn ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            />
            {errors.checkIn && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.checkIn}</p>}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Check-out Date <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="date"
              name="checkOut"
              min={getMinCheckOutDateString(formData.checkIn)}
              value={formData.checkOut}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.checkOut ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            />
            {errors.checkOut && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.checkOut}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Number of Guests <span className="text-[#C45A37]">*</span>
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.guests ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            >
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3 Guests">3 Guests</option>
              <option value="4+ Guests">4+ Guests / Family</option>
            </select>
            {errors.guests && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.guests}</p>}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Room Preference <span className="text-[#C45A37]">*</span>
            </label>
            <select
              name="roomPreference"
              value={formData.roomPreference}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.roomPreference ? "border-red-500" : "border-[#E5DED5] focus:border-[#C45A37]"
              }`}
            >
              <option value="No preference">No preference</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Twin">Twin</option>
            </select>
            {errors.roomPreference && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.roomPreference}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            name="captcha"
            id="captcha"
            checked={formData.captcha}
            onChange={handleChange}
            className="w-4 h-4 text-[#C45A37] border-gray-300 rounded focus:ring-[#C45A37]"
          />
          <label htmlFor="captcha" className="text-sm text-[#262626] font-semibold">I'm not a robot <span className="text-[#C45A37]">*</span></label>
        </div>
        {errors.captcha && <p className="mt-1 text-xs text-red-600 font-sans">{errors.captcha}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 text-sm font-sans font-bold uppercase tracking-wider text-white bg-[#C45A37] hover:bg-[#B24F30] border-t border-[#B24F30]/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-baseline justify-center gap-2 cursor-pointer disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin relative top-1" />
              <span>Checking Availability...</span>
            </>
          ) : (
            <span>Check Availability &rarr; </span>
          )}
        </button>
      </form>
    </div>
  );
}
