// ── Le Prestige — Business Landing Page Corporate Enquiry Form ─────

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeadService, BusinessLeadPayload } from "@/services/lead.service";
import { getTodayDateString, getMinCheckOutDateString } from "@/utils/dateHelpers";
import { Loader2, CheckCircle2, AlertCircle, Building2 } from "lucide-react";

export default function BusinessForm() {
  const navigate = useNavigate();
  const today = getTodayDateString();

  const [formData, setFormData] = useState<Omit<BusinessLeadPayload, "source">>({
    name: "",
    phone: "",
    email: "",
    company: "",
    checkIn: today,
    checkOut: getMinCheckOutDateString(today),
    guests: "1 Guest",
    roomPreference: "No preference",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

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

    if (!formData.name.trim()) {
      newErrors.name = "Contact name is required";
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length < 10 || !/^\+?\d+$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Business email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@company.com)";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company / Organisation name is required";
    }

    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    } else if (formData.checkIn < today) {
      newErrors.checkIn = "Check-in date cannot be in the past";
    }

    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }

    if (!formData.guests) {
      newErrors.guests = "Please select number of guests";
    }

    if (!formData.roomPreference) {
      newErrors.roomPreference = "Please select room preference";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: BusinessLeadPayload = {
        source: "Business Landing Page",
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        roomPreference: formData.roomPreference,
      };

      await LeadService.submitBusinessLead(payload);

      // Navigate ONLY to dedicated thank-you page
      navigate("/business/thank-you");
    } catch (error) {
      console.error("Business form submission error:", error);
      setErrors({
        form: "Failed to submit enquiry. Please try again or call us directly.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-[#E5DED5]">
      {/* Form Header */}
      <div className="mb-8 text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EEE7] text-[#262626] font-sans text-xs font-semibold uppercase tracking-widest rounded-full mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#C45A37]" />
          Corporate Accommodation Enquiry
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#262626] mb-2">
          Request Business Stay Details
        </h3>
        <p className="font-sans text-sm text-[#575757]">
          Provide your stay requirements and our reservations manager will get in touch with availability.
        </p>
      </div>

      {/* Corporate Reassurance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 p-4 bg-[#F8F4EE] rounded-xl text-xs font-sans text-[#262626]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C45A37] shrink-0" />
          <span>Priority response</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C45A37] shrink-0" />
          <span>Direct corporate rates</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C45A37] shrink-0" />
          <span>GST invoicing available</span>
        </div>
      </div>

      {/* Form Error Banner */}
      {errors.form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errors.form}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name & Company */}
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
              placeholder="e.g. Vikram Seth"
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] placeholder-[#8C8C8C] focus:outline-none transition-all ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Company / Organisation <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. TechCorp Solutions Ltd"
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] placeholder-[#8C8C8C] focus:outline-none transition-all ${
                errors.company
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.company && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.company}</span>
              </p>
            )}
          </div>
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Phone Number <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] placeholder-[#8C8C8C] focus:outline-none transition-all ${
                errors.phone
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Corporate Email <span className="text-[#C45A37]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. vikram@company.com"
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] placeholder-[#8C8C8C] focus:outline-none transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Check-in & Check-out */}
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
                errors.checkIn
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.checkIn && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.checkIn}</span>
              </p>
            )}
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
                errors.checkOut
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            />
            {errors.checkOut && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.checkOut}</span>
              </p>
            )}
          </div>
        </div>

        {/* Guests & Room Preference */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#262626] mb-2">
              Number of Guests / Team Members <span className="text-[#C45A37]">*</span>
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm font-sans rounded-xl bg-[#F8F4EE] border text-[#262626] focus:outline-none transition-all ${
                errors.guests
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            >
              <option value="1 Guest">1 Guest (Single Executive)</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3-5 Guests">3-5 Guests (Project Team)</option>
              <option value="5+ Guests">5+ Guests (Corporate Delegation)</option>
            </select>
            {errors.guests && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.guests}</span>
              </p>
            )}
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
                errors.roomPreference
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-[#E5DED5] focus:border-[#C45A37] focus:ring-2 focus:ring-[#C45A37]/10"
              }`}
            >
              <option value="No preference">No preference</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Family Room">Family Room</option>
              <option value="Suite">Suite</option>
            </select>
            {errors.roomPreference && (
              <p className="mt-1.5 text-xs text-red-600 font-sans flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.roomPreference}</span>
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 text-sm font-sans font-bold uppercase tracking-wider text-white bg-[#262626] hover:bg-[#1C1C1C] disabled:bg-[#262626]/60 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Corporate Enquiry...</span>
            </>
          ) : (
            <span>Submit Corporate Enquiry</span>
          )}
        </button>

        <p className="text-[11px] font-sans text-center text-[#8C8C8C] leading-relaxed">
          🏢 Fast turnaround on stay requests. Your details remain 100% confidential.
        </p>
      </form>
    </div>
  );
}
