import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, MapPin, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const ETHIOPIAN_WORKS = [
  {
    image: '/images/ethiopian_architecture_hero.jpg',
    title: 'HIGHLAND MONOLITHIC VILLA',
    category: 'Private Residence',
    material: 'Carved Volcanic Basalt, Eucalyptus Canopy & Cantilevered Glass',
    location: 'Bole Subcity / Addis Ababa',
  },
  {
    image: '/images/ethiopian_interior_hero.jpg',
    title: 'CONTEMPORARY LIVING ATELIER',
    category: 'Interior Architecture',
    material: 'Chiseled Basalt Hearth, Woven Earth Textiles & Exposed Timber',
    location: 'Addis Ababa Highlands',
  },
  {
    image: '/images/ethiopian_pavilion_dusk.jpg',
    title: 'ADDIS CULTURAL PAVILION',
    category: 'Public & Cultural Space',
    material: 'Tectonic Basalt Fins, Structural Timber & Night Illumination',
    location: 'Addis Ababa, Ethiopia',
  },
];

export const ComingSoon: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ETHIOPIAN_WORKS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ETHIOPIAN_WORKS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ETHIOPIAN_WORKS.length) % ETHIOPIAN_WORKS.length);
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const activeWork = ETHIOPIAN_WORKS[currentSlide];

  return (
    <div className="min-h-screen w-full bg-[#111111] text-[#F5F3EE] flex flex-col justify-between py-6 md:py-8 px-6 md:px-12 lg:px-16 selection:bg-[#F5F3EE] selection:text-[#111111]">
      
      {/* 1. Header Bar: Logo, Studio Tag & EAT Clock */}
      <header className="w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F5F3EE]/15">
        <div className="flex items-center gap-4">
          <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F3EE]">
            PROLIQ
          </span>
          <span className="hidden sm:inline-block font-mono-subtle text-[10px] tracking-[0.25em] text-[#8A7E72] uppercase border-l border-[#F5F3EE]/20 pl-4 py-0.5">
            ARCHITECTURE & INTERIORS
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono-subtle text-[11px] tracking-widest text-[#8A7E72] uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[#F5F3EE]">ADDIS ABABA</span>
          <span className="text-[#8A7E72]/60 hidden sm:inline">|</span>
          <span className="text-[#8A7E72] hidden sm:inline">DIGITAL ARCHIVE IN PRODUCTION</span>
        </div>
      </header>

      {/* 2. Main Split-Screen Showcase Grid */}
      <main className="my-auto py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column (5 Cols): Typography, Manifesto & Interactive CTA */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8A7E72]/15 border border-[#8A7E72]/30 w-fit">
            <span className="font-mono-subtle text-[10px] tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
              ETHIOPIAN TECTONICS // 2026
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F3EE] leading-[0.96] uppercase">
            ROOTED IN ETHIOPIA.<br />
            BUILT FOR TODAY.
          </h1>

          <p className="text-[#F5F3EE]/75 text-sm sm:text-base font-light leading-relaxed">
            Drawing from Ethiopia’s monumental stone traditions, volcanic geology, and contemporary living, PROLIQ shapes enduring private residences and cultural interiors. Our full archive is currently in production.
          </p>

          {/* Interactive Call-to-Action: Early Portfolio Dossier Request */}
          <div className="pt-2">
            <p className="font-mono-subtle text-[11px] tracking-[0.2em] text-[#8A7E72] uppercase mb-2">
              REQUEST EARLY COMMISSION DOSSIER
            </p>
            {submitted ? (
              <div className="flex items-center gap-3 p-3.5 bg-white/5 border border-white/20 text-xs font-mono-subtle text-[#F5F3EE]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Thank you. Our studio partner will share our initial portfolio dossier.</span>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-[#1A1A1A] border border-[#F5F3EE]/25 px-3.5 py-2.5 text-xs font-mono-subtle text-[#F5F3EE] placeholder-[#F5F3EE]/40 focus:outline-none focus:border-[#F5F3EE] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F5F3EE] text-[#111111] hover:bg-[#8A7E72] hover:text-[#F5F3EE] transition-all font-mono-subtle text-[11px] tracking-widest uppercase font-semibold cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <span>REQUEST DOSSIER</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Quick Direct Contacts */}
          <div className="pt-4 border-t border-[#F5F3EE]/15 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-subtle text-xs">
            <div>
              <span className="text-[10px] text-[#8A7E72] tracking-widest block uppercase mb-1">
                TELEPHONE
              </span>
              <a
                href="tel:+251913168803"
                className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors font-sans tracking-normal font-medium text-sm"
              >
                +251 91 316 8803
              </a>
            </div>
            <div>
              <span className="text-[10px] text-[#8A7E72] tracking-widest block uppercase mb-1">
                OFFICIAL DOMAIN
              </span>
              <a
                href="https://proliqdesign.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors text-sm lowercase"
              >
                proliqdesign.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): High-Definition Architectural Showcase Frame */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Framed Image Container */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden bg-black/50 border border-white/15 shadow-2xl">
            {ETHIOPIAN_WORKS.map((work, idx) => {
              const isActive = idx === currentSlide;
              return (
                <div
                  key={work.image}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05]"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                </div>
              );
            })}

            {/* Top Project Tag Badge */}
            <div className="absolute top-4 left-4 z-20 font-mono-subtle text-[10px] tracking-widest uppercase px-3 py-1 bg-black/60 backdrop-blur-md border border-white/15 text-[#F5F3EE]">
              <span>{activeWork.category}</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
              <div>
                <p className="font-editorial text-xl sm:text-2xl font-bold tracking-tight">
                  {activeWork.title}
                </p>
                <p className="text-xs text-white/75 font-mono-subtle mt-0.5">
                  {activeWork.material}
                </p>
              </div>
              <span className="font-mono-subtle text-[11px] text-[#8A7E72] uppercase shrink-0">
                {activeWork.location}
              </span>
            </div>
          </div>

          {/* Slider Controls Explicitly Anchored Below Image */}
          <div className="flex items-center justify-between font-mono-subtle text-xs text-[#8A7E72] pt-1">
            {/* Slide Index Tabs */}
            <div className="flex items-center gap-2">
              {ETHIOPIAN_WORKS.map((work, idx) => (
                <button
                  key={work.title}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-2.5 py-1 text-xs border transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'border-[#F5F3EE] bg-white text-black font-semibold'
                      : 'border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/40'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#8A7E72] mr-2">
                0{currentSlide + 1} / 0{ETHIOPIAN_WORKS.length}
              </span>
              <button
                onClick={prevSlide}
                aria-label="Previous architectural project"
                className="p-1.5 border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors cursor-pointer text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next architectural project"
                className="p-1.5 border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-colors cursor-pointer text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* 3. Footer Bar: Studio Location & Direct Mail */}
      <footer className="w-full pt-5 border-t border-[#F5F3EE]/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-center font-mono-subtle text-xs text-[#8A7E72]">
        <div className="md:col-span-7 flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className="flex items-center gap-1.5 text-[#F5F3EE]">
            <MapPin className="w-3.5 h-3.5 text-[#8A7E72]" />
            <span>Bole, beside Bora Amusement Park, Next Building, 2nd Floor</span>
          </span>
          <span className="uppercase text-[11px] text-[#8A7E72]">Addis Ababa, Ethiopia</span>
        </div>

        <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-5">
          <a
            href="mailto:hello@proliqdesign.com"
            className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors lowercase flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-[#8A7E72]" />
            <span>hello@proliqdesign.com</span>
          </a>
          <span className="text-[#8A7E72]/50">|</span>
          <span className="text-[10px] text-[#8A7E72]">© 2026 PROLIQ</span>
        </div>
      </footer>

    </div>
  );
};
