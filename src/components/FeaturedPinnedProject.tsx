import React, { useEffect, useRef, useState } from 'react';
import type { Project } from '../data/projects';
import { gsap, ScrollTrigger } from '../animations/gsapInit';
import { Link } from 'react-router-dom';

interface FeaturedPinnedProjectProps {
  project: Project;
  onNavigate?: (path: string) => void;
}

export const FeaturedPinnedProject: React.FC<FeaturedPinnedProjectProps> = ({
  project,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slides = project.pinnedSlides || [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current || slides.length === 0) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const totalSlides = slides.length;

      // Create a master scroll trigger with pinning
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: () => `+=${window.innerHeight * (totalSlides * 1.15)}`,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Determine which slide is active based on progress
          const index = Math.min(
            Math.floor(progress * totalSlides),
            totalSlides - 1
          );
          setActiveIndex(index);

          if (!isReducedMotion) {
            // Animate images opacity according to progress
            slides.forEach((_, idx) => {
              const imgEl = document.getElementById(`pinned-img-${idx}`);
              if (!imgEl) return;
              
              if (idx === index) {
                gsap.to(imgEl, { opacity: 1, scale: 1, duration: 0.3, overwrite: 'auto' });
              } else {
                gsap.to(imgEl, { opacity: 0, scale: 1.04, duration: 0.4, overwrite: 'auto' });
              }
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slides]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/work/${project.slug}`);
    }
  };

  if (slides.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#171717] text-[#F5F3EE] overflow-hidden flex flex-col justify-between"
      aria-label="Featured Project Story"
    >
      {/* Background Images Stack with local images */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            id={`pinned-img-${idx}`}
            className="absolute inset-0 w-full h-full transition-opacity will-change-transform"
            style={{
              opacity: idx === 0 ? 1 : 0,
              zIndex: idx + 1,
            }}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="w-full h-full object-cover object-center will-change-transform filter brightness-[0.88]"
            />
            {/* Architectural contrast overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/40 to-[#171717]/65" />
          </div>
        ))}
      </div>

      {/* Top Header of Pinned Section */}
      <div className="relative z-20 max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 pt-24 md:pt-28 flex justify-between items-start">
        <div>
          <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-2 font-semibold">
            SPATIAL STORYTELLING / PINNED SEQUENCE
          </span>
          <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F3EE]">
            {project.title}
          </h2>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-2 font-mono-subtle text-xs text-[#8A7E72]">
          <span>0{activeIndex + 1}</span>
          <span className="w-8 h-[1px] bg-white/20 inline-block">
            <span
              className="h-full bg-white block transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
            />
          </span>
          <span>0{slides.length}</span>
        </div>
      </div>

      {/* Center / Bottom Pinned State Descriptions */}
      <div className="relative z-20 max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-10 md:pb-14 flex flex-col md:flex-row justify-between items-end gap-6">
        {/* Active Slide Details with balanced typography */}
        <div className="max-w-xl">
          <div className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] uppercase mb-2 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{slides[activeIndex]?.label}</span>
          </div>
          <p className="font-editorial text-lg sm:text-xl md:text-2xl text-[#F5F3EE] font-medium leading-snug">
            {slides[activeIndex]?.caption}
          </p>
        </div>

        {/* Action Link & Scroll guidance */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] uppercase hidden lg:block">
            CONTINUE SCROLLING TO UNPIN ↓
          </div>
          <Link
            to={`/work/${project.slug}`}
            onClick={handleLinkClick}
            className="group flex items-center gap-3 px-5 py-2.5 border border-[#F5F3EE]/40 hover:bg-[#F5F3EE] hover:text-[#171717] transition-all duration-300 text-xs font-mono-subtle tracking-widest uppercase text-[#F5F3EE] no-underline"
          >
            <span>FULL ARCHITECTURAL DOSSIER</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
