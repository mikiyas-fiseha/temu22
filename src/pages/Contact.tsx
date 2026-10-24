import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight, Globe } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Architecture',
    location: '',
    timeline: 'Within 6 months',
    budget: '$250k - $500k',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#171717] text-[#F5F3EE] pt-24 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Title Header with balanced typography */}
        <div className="mb-12 md:mb-18 pb-6 border-b border-[#F5F3EE]/15">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
            INITIATE A DIALOGUE
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F3EE] leading-[0.98]">
            CONTACT
          </h1>
        </div>

        {/* Split Form & Studio Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Studio Information */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold mb-3">
                WE WELCOME AMBITIOUS COMMISSIONS.
              </h2>
              <p className="text-[#F5F3EE]/65 text-sm md:text-base font-light leading-relaxed">
                Whether you are planning a private residence, an adaptive reuse cultural pavilion, or an interior overhaul, we invite you to discuss your project with our founding architects.
              </p>
            </div>

            <div className="space-y-5 border-t border-[#F5F3EE]/15 pt-6 font-mono-subtle text-xs tracking-widest uppercase">
              <div>
                <p className="text-[#8A7E72] mb-1 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>DIRECT INQUIRIES</span>
                </p>
                <a
                  href="mailto:hello@proliqdesign.com"
                  className="text-base text-[#F5F3EE] hover:text-[#8A7E72] transition-colors lowercase"
                >
                  hello@proliqdesign.com
                </a>
              </div>

              <div>
                <p className="text-[#8A7E72] mb-1 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>STUDIO LINE</span>
                </p>
                <a
                  href="tel:+251913168803"
                  className="text-base text-[#F5F3EE] hover:text-[#8A7E72] transition-colors block"
                >
                  +251 91 316 8803
                </a>
                <p className="text-[11px] text-[#F5F3EE]/50 mt-0.5">
                  Monday to Friday, 9:00 — 18:00 (EAT)
                </p>
              </div>

              <div>
                <p className="text-[#8A7E72] mb-1 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span>DIGITAL ARCHIVE / WEBSITE</span>
                </p>
                <a
                  href="https://proliqdesign.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-[#F5F3EE] hover:text-[#8A7E72] transition-colors lowercase"
                >
                  proliqdesign.com
                </a>
              </div>

              <div>
                <p className="text-[#8A7E72] mb-1 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>ATELIER ADDRESS</span>
                </p>
                <p className="text-sm text-[#F5F3EE] leading-relaxed">
                  Bole, beside Bora Amusement Park,<br />
                  Next Building, 2nd Floor<br />
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>

            {/* Atmosphere local image */}
            <div className="relative w-full h-44 overflow-hidden bg-black/40 border border-white/10 hidden sm:block shadow-sm">
              <img
                src="/images/addis_hero.jpg"
                alt="PROLIQ Studio Facade"
                className="w-full h-full object-cover filter brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-mono-subtle text-[11px] tracking-widest text-[#F5F3EE]">
                ATELIER VISIT BY APPOINTMENT ONLY
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Project Inquiry Form */}
          <div className="lg:col-span-7 bg-[#1F1F1F] p-7 md:p-10 border border-[#F5F3EE]/10 shadow-lg">
            {submitted ? (
              <div className="py-14 flex flex-col items-center text-center gap-5">
                <CheckCircle className="w-14 h-14 text-[#8A7E72]" />
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F5F3EE]">
                  INQUIRY RECEIVED
                </h3>
                <p className="text-sm sm:text-base text-[#F5F3EE]/70 max-w-md font-light leading-relaxed">
                  Thank you for sharing your spatial vision with PROLIQ Studio. A partner architect will review your project details and respond within two business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-5 py-2.5 border border-[#F5F3EE]/30 text-xs font-mono-subtle tracking-widest uppercase hover:bg-white hover:text-black transition-colors font-semibold"
                >
                  SUBMIT ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="border-b border-[#F5F3EE]/15 pb-3 mb-1">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#F5F3EE]">
                    COMMISSION DOSSIER
                  </h3>
                  <p className="text-[11px] font-mono-subtle text-[#8A7E72] tracking-wider uppercase mt-1">
                    PLEASE DETAIL YOUR PROJECT OBJECTIVES
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elias Bekele"
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elias@example.com"
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    />
                  </div>
                </div>

                {/* Project Type & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      DISCIPLINE / TYPE
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    >
                      <option>Residential Architecture</option>
                      <option>Private Residence</option>
                      <option>Interior Architecture</option>
                      <option>3D Visualization & CGI</option>
                      <option>Commercial / Cultural Space</option>
                      <option>Design Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      PROJECT LOCATION *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Addis Ababa / International"
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    />
                  </div>
                </div>

                {/* Timeline & Scope */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      ESTIMATED TIMELINE
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    >
                      <option>Immediate / Next 3 months</option>
                      <option>Within 6 months</option>
                      <option>6 - 12 months</option>
                      <option>Long term exploration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                      PROJECT BUDGET BRACKET
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                    >
                      <option>$100k - $250k</option>
                      <option>$250k - $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M+ / Monumental Scale</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase mb-1.5 font-medium">
                    PROJECT VISION & SITE DETAILS *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your site, programmatic requirements, or spatial intentions..."
                    className="w-full bg-[#171717] border border-[#F5F3EE]/20 px-3.5 py-2.5 text-sm text-[#F5F3EE] focus:outline-none focus:border-[#F5F3EE] transition-colors"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="group mt-1 w-full py-4 bg-[#F5F3EE] text-[#171717] flex items-center justify-center gap-3 font-mono-subtle text-xs tracking-[0.25em] uppercase font-semibold hover:bg-[#8A7E72] hover:text-[#F5F3EE] transition-all duration-300 cursor-pointer"
                >
                  <span>SUBMIT COMMISSION BRIEF</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
