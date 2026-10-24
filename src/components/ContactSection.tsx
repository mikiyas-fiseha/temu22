import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { gsap } from '../animations/gsapInit';

interface ContactSectionProps {
  onNavigate?: (path: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-text-line',
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.3,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleStartProjectClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/contact');
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-20 md:py-36 bg-[#171717] text-[#F5F3EE] overflow-hidden"
      aria-label="PROLIQ Contact Inquiries"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Subtle section label */}
        <div className="mb-8 md:mb-12">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
            COMMISSION & INQUIRY / 06
          </p>
        </div>

        {/* Big Editorial Heading - Scaled to balanced proportions */}
        <div className="mb-14 md:mb-20">
          <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F3EE] leading-[0.98] select-none">
            <div className="overflow-hidden pb-1">
              <span className="contact-text-line inline-block will-change-transform">
                LET'S CREATE
              </span>
            </div>
            <div className="overflow-hidden pb-1">
              <span className="contact-text-line inline-block will-change-transform">
                SOMETHING
              </span>
            </div>
            <div className="overflow-hidden pb-1">
              <span className="contact-text-line inline-block will-change-transform text-[#8A7E72]">
                MEANINGFUL.
              </span>
            </div>
          </h2>
        </div>

        {/* Content Grid: Inquiry Action & Studio Details with integrated imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-8 border-t border-[#F5F3EE]/15 items-start">
          {/* Left Column: Call to action */}
          <div className="lg:col-span-7 flex flex-col items-start gap-8">
            <div>
              <p className="text-lg sm:text-xl text-[#F5F3EE] font-light mb-2">
                Have a project in mind?
              </p>
              <p className="text-base text-[#F5F3EE]/60 font-light">
                Let's talk about space, material, and your spatial vision.
              </p>
            </div>

            {/* START A PROJECT Button with minimal animated hover effect */}
            <Link
              to="/contact"
              onClick={handleStartProjectClick}
              className="group relative inline-flex items-center gap-4 px-8 py-4.5 bg-[#F5F3EE] text-[#171717] rounded-none overflow-hidden transition-all duration-300 hover:bg-[#8A7E72] hover:text-[#F5F3EE] no-underline font-semibold"
            >
              <span className="font-mono-subtle text-xs tracking-[0.25em] uppercase">
                START A PROJECT
              </span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>

            {/* Integrated architectural visual thumbnail */}
            <div className="relative w-full max-w-lg h-36 overflow-hidden border border-white/10 mt-2 bg-black">
              <img
                src="/images/addis_night.jpg"
                alt="Architectural Night Ambiance"
                className="w-full h-full object-cover filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent flex items-center p-6">
                <span className="font-mono-subtle text-[11px] tracking-widest text-[#F5F3EE] uppercase">
                  ATELIER CONSULTATIONS BY APPOINTMENT
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Details */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-7 text-sm font-mono-subtle">
            <div>
              <p className="text-xs tracking-widest text-[#8A7E72] uppercase mb-1.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <span>DIRECT EMAIL</span>
              </p>
              <a
                href="mailto:hello@proliqdesign.com"
                className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors block text-base"
              >
                hello@proliqdesign.com
              </a>
              <a
                href="mailto:commissions@proliqdesign.com"
                className="text-[#F5F3EE]/70 hover:text-[#8A7E72] transition-colors block text-xs mt-1"
              >
                commissions@proliqdesign.com
              </a>
            </div>

            <div>
              <p className="text-xs tracking-widest text-[#8A7E72] uppercase mb-1.5 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <span>TELEPHONE</span>
              </p>
              <a
                href="tel:+251913168803"
                className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors text-base block"
              >
                +251 91 316 8803
              </a>
              <p className="text-[#F5F3EE]/70 text-xs mt-1">
                Mon — Fri, 9:00 — 18:00 EAT
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest text-[#8A7E72] uppercase mb-1.5 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" />
                <span>ONLINE PORTFOLIO</span>
              </p>
              <a
                href="https://proliqdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors block text-base"
              >
                proliqdesign.com
              </a>
              <p className="text-[#F5F3EE]/70 text-xs mt-1">
                Official Studio Platform
              </p>
            </div>

            <div>
              <p className="text-xs tracking-widest text-[#8A7E72] uppercase mb-1.5 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>STUDIO LOCATION</span>
              </p>
              <p className="text-[#F5F3EE] text-base leading-relaxed">
                Bole, beside Bora Amusement Park,<br />
                Next Building, 2nd Floor<br />
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
