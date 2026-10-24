import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, type ServiceItem } from '../data/services';
import { ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onNavigate?: (path: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate }) => {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);

  const handleRowClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/services#${serviceId}`);
    }
  };

  return (
    <section
      id="services"
      className="relative w-full py-20 md:py-32 bg-[#171717] text-[#F5F3EE] overflow-hidden"
      aria-label="PROLIQ Services"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header with balanced typography */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-18 pb-6 border-b border-[#F5F3EE]/15 gap-6">
          <div>
            <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
              DISCIPLINES & EXPERTISE
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F3EE]">
              WHAT WE DO
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#F5F3EE]/65 max-w-md font-light leading-relaxed">
            From monumental architectural form to bespoke interior joinery, our practice delivers integrated spatial solutions.
          </p>
        </div>

        {/* Large Horizontal Rows */}
        <div className="flex flex-col divide-y divide-[#F5F3EE]/15">
          {SERVICES.map((service) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              onClick={(e) => handleRowClick(e, service.id)}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-8 md:py-11 px-4 sm:px-6 transition-all duration-500 hover:bg-[#F5F3EE]/[0.03] text-inherit no-underline"
            >
              {/* Left: Number & Service Name */}
              <div className="flex items-baseline gap-6 md:gap-10 w-full lg:w-1/2 mb-3 lg:mb-0">
                <span className="font-mono-subtle text-xs sm:text-sm tracking-widest text-[#8A7E72] group-hover:text-[#F5F3EE] transition-colors duration-300">
                  {service.number}
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F5F3EE] group-hover:translate-x-3 transition-transform duration-500">
                  {service.title}
                </h3>
              </div>

              {/* Middle: Short Description */}
              <div className="w-full lg:w-1/3 mb-3 lg:mb-0 lg:px-4">
                <p className="text-xs sm:text-sm md:text-base text-[#F5F3EE]/65 font-light leading-relaxed group-hover:text-[#F5F3EE]/90 transition-colors duration-300">
                  {service.shortDesc}
                </p>
              </div>

              {/* Right: Arrow & Action */}
              <div className="w-full lg:w-auto flex justify-end items-center">
                <div className="flex items-center gap-3">
                  <span className="font-mono-subtle text-[11px] tracking-widest uppercase text-[#8A7E72] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline-block">
                    VIEW DISCIPLINE
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#F5F3EE]/25 flex items-center justify-center transition-all duration-400 group-hover:bg-[#F5F3EE] group-hover:text-[#171717] group-hover:scale-110">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              {/* Dynamic Image Preview on desktop hover */}
              {hoveredService?.id === service.id && (
                <div className="hidden xl:block absolute right-32 top-1/2 -translate-y-1/2 w-48 h-32 rounded-sm overflow-hidden pointer-events-none shadow-2xl border border-white/20 z-20 animate-fadeIn bg-black">
                  <img
                    src={service.previewImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
