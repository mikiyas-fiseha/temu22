import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award } from 'lucide-react';

interface StudioProps {
  onNavigate?: (path: string) => void;
}

export const Studio: React.FC<StudioProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const recognitions = [
    { year: '2025', award: 'African Architecture Prize', category: 'Best Residential Concept' },
    { year: '2025', award: 'Awwwards Studio Site of the Day', category: 'Design Excellence & Motion' },
    { year: '2024', award: 'Addis Design Biennial', category: 'Material Innovation Pavilion' },
    { year: '2024', award: 'ArchDaily Building of the Year', category: 'Shortlisted — Houses' },
  ];

  return (
    <div className="w-full bg-[#F2F0EB] text-[#171717] pt-24 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Title Header with balanced typography */}
        <div className="mb-12 md:mb-18 pb-6 border-b border-[#171717]/15">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
            ETHOS & PRACTICE
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171717] leading-[0.98]">
            THE STUDIO
          </h1>
        </div>

        {/* Large Manifesto Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-[#171717] leading-snug">
              PROLIQ is an international architecture and interior studio founded on the conviction that physical spaces exert a profound psychological and tactile resonance.
            </h2>
          </div>
          <div className="lg:col-span-4 space-y-5 text-[#6B6B65] text-sm sm:text-base font-light leading-relaxed">
            <p>
              Based in Addis Ababa, our studio interrogates the intersection between raw natural geology and refined architectural geometry. We reject superficial ornament in pursuit of structural clarity.
            </p>
            <p>
              By engaging directly with local master stone-masons, timber craftsmen, and acoustic engineers, we create private homes, cultural institutions, and commercial spaces designed to endure across generations.
            </p>
          </div>
        </div>

        {/* Full-width Atelier Photography with local image */}
        <div className="relative w-full h-[52vh] sm:h-[65vh] overflow-hidden bg-[#171717] mb-20 md:mb-28 border border-[#171717]/15 shadow-sm">
          <img
            src="/images/studio_atelier.jpg"
            alt="PROLIQ Studio Spatial Atmosphere"
            className="w-full h-full object-cover object-center filter saturate-[0.92]"
          />
          <div className="absolute bottom-5 left-6 md:left-10 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 font-mono-subtle text-xs tracking-widest text-[#F5F3EE] uppercase border border-white/10">
            PROLIQ ATELIER — ADDIS ABABA
          </div>
        </div>

        {/* Studio Tenets */}
        <div className="mb-20 md:mb-28">
          <div className="border-t border-[#171717]/15 pt-6 mb-10">
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
              OUR CORE TENETS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="font-mono-subtle text-xs text-[#8A7E72] block mb-2 font-semibold">01</span>
              <h3 className="font-editorial text-xl font-bold mb-2">TECTONIC HONESTY</h3>
              <p className="text-xs sm:text-sm text-[#6B6B65] font-light leading-relaxed">
                Materials are left unmasked. Concrete expresses its timber formwork; basalt bears its volcanic origins.
              </p>
            </div>
            <div>
              <span className="font-mono-subtle text-xs text-[#8A7E72] block mb-2 font-semibold">02</span>
              <h3 className="font-editorial text-xl font-bold mb-2">SOLAR GEOMETRY</h3>
              <p className="text-xs sm:text-sm text-[#6B6B65] font-light leading-relaxed">
                Daylight is our chief building material. We orient openings to choreograph shadows that shift as the day progresses.
              </p>
            </div>
            <div>
              <span className="font-mono-subtle text-xs text-[#8A7E72] block mb-2 font-semibold">03</span>
              <h3 className="font-editorial text-xl font-bold mb-2">TOPOGRAPHY FIRST</h3>
              <p className="text-xs sm:text-sm text-[#6B6B65] font-light leading-relaxed">
                A building must grow organically out of its site contours, preserving horizon vistas and native trees.
              </p>
            </div>
            <div>
              <span className="font-mono-subtle text-xs text-[#8A7E72] block mb-2 font-semibold">04</span>
              <h3 className="font-editorial text-xl font-bold mb-2">QUIET SILENCE</h3>
              <p className="text-xs sm:text-sm text-[#6B6B65] font-light leading-relaxed">
                We craft spaces that filter out the noise of modern life, creating contemplative sanctuaries of calm.
              </p>
            </div>
          </div>
        </div>

        {/* Recognitions & Awards */}
        <div className="mb-20">
          <div className="border-t border-[#171717]/15 pt-6 mb-10 flex justify-between items-end">
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
              HONORS & PEER RECOGNITION
            </span>
          </div>

          <div className="divide-y divide-[#171717]/15">
            {recognitions.map((item, idx) => (
              <div key={idx} className="py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#8A7E72]" />
                  <span className="font-editorial text-lg font-bold text-[#171717]">{item.award}</span>
                </div>
                <div className="flex items-center gap-6 font-mono-subtle text-xs text-[#6B6B65] uppercase">
                  <span>{item.category}</span>
                  <span className="text-[#8A7E72] font-semibold">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ready to connect banner */}
        <div className="bg-[#171717] text-[#F5F3EE] p-8 md:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-white/10">
          <div>
            <h3 className="font-editorial text-xl sm:text-3xl font-bold mb-1.5">COMMISSION A PROJECT</h3>
            <p className="text-[#F5F3EE]/60 text-xs sm:text-sm font-light">
              We welcome visionary clients seeking bespoke spatial interventions.
            </p>
          </div>
          <Link
            to="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="flex items-center gap-3 px-6 py-3.5 bg-[#F5F3EE] text-[#171717] font-mono-subtle text-xs tracking-widest uppercase hover:bg-[#8A7E72] hover:text-[#F5F3EE] transition-all no-underline font-semibold"
          >
            <span>DISCUSS WITH OUR PARTNERS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
