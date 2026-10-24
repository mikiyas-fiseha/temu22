import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onNavigate?: (path: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <div className="w-full bg-[#F2F0EB] text-[#171717] pt-24 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Title Header with balanced typography */}
        <div className="mb-12 md:mb-18 pb-6 border-b border-[#171717]/15">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
            CAPABILITIES & DISCIPLINES
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171717] leading-[0.98]">
            SERVICES
          </h1>
        </div>

        {/* Introduction text */}
        <div className="max-w-3xl mb-18 md:mb-24">
          <p className="text-lg sm:text-xl md:text-2xl text-[#171717] font-light leading-relaxed">
            We provide a complete spatial practice spanning conceptual architecture to high-precision interior detailing and computational visualization. Every commission is approached with uncompromising rigor.
          </p>
        </div>

        {/* Detailed Disciplines Breakdown */}
        <div className="flex flex-col gap-18 md:gap-28">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 pt-10 border-t border-[#171717]/20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
            >
              {/* Left Column: Number, Title, Overview */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] font-semibold">
                    {service.number}
                  </span>
                  <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#6B6B65] uppercase">
                    DISCIPLINE
                  </span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#171717] mb-4">
                  {service.title}
                </h2>

                <p className="text-sm md:text-base text-[#6B6B65] leading-relaxed font-light mb-6">
                  {service.fullDesc}
                </p>

                {/* Deliverables List */}
                <div className="mb-6">
                  <h3 className="font-mono-subtle text-xs tracking-widest uppercase text-[#171717] mb-3 font-semibold">
                    KEY SCOPE & DELIVERABLES:
                  </h3>
                  <ul className="space-y-2.5 list-none p-0 m-0">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]/85 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8A7E72] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="inline-flex items-center gap-2 font-mono-subtle text-xs tracking-widest uppercase text-[#171717] hover:text-[#8A7E72] transition-colors font-semibold"
                >
                  <span>INQUIRE ABOUT THIS DISCIPLINE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right Column: Architectural Photography for the service */}
              <div className="lg:col-span-7">
                <div className="relative w-full h-[40vh] sm:h-[48vh] lg:h-[56vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm group">
                  <img
                    src={service.previewImage}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter saturate-[0.92]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3.5 left-3.5 bg-black/60 backdrop-blur-sm px-3 py-1 font-mono-subtle text-[11px] tracking-widest text-[#F5F3EE] uppercase border border-white/10">
                    PROLIQ — {service.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
