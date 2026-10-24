import React, { useEffect, useRef } from 'react';
import { HORIZONTAL_GALLERY_ITEMS } from '../data/projects';
import { gsap } from '../animations/gsapInit';

export const HorizontalGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${getScrollAmount() * 1.15}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#F2F0EB] text-[#171717] overflow-hidden flex flex-col justify-between py-10 md:py-14"
      aria-label="The Details Matter Gallery"
    >
      {/* Gallery Header with balanced typography */}
      <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#171717]/15 pb-5">
        <div>
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-1.5 font-semibold">
            MICROSCOPIC FOCUS / 02
          </p>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#171717]">
            THE DETAILS MATTER.
          </h2>
        </div>
        <p className="font-mono-subtle text-xs tracking-widest text-[#6B6B65] uppercase mt-2 sm:mt-0">
          ARCHITECTURE / INTERIOR / MATERIAL / LIGHT / FURNITURE
        </p>
      </div>

      {/* Horizontal Scrolling Track */}
      <div className="relative w-full flex-1 flex items-center overflow-visible my-4">
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 px-6 md:px-16 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {HORIZONTAL_GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              className="relative w-[280px] sm:w-[380px] md:w-[480px] flex-shrink-0 group"
            >
              {/* Image Frame with architectural border and styling */}
              <div className="relative w-full h-[48vh] sm:h-[54vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 will-change-transform filter saturate-[0.92]"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10">
                  {item.tag}
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3.5 flex flex-col">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-editorial text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[#171717]">
                    {item.title}
                  </h3>
                  <span className="font-mono-subtle text-xs text-[#8A7E72] font-semibold">
                    0{idx + 1}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#6B6B65] mt-1 font-light">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Horizontal Guide */}
      <div className="max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center text-xs font-mono-subtle text-[#6B6B65]">
        <span>SCROLL DOWN TO ADVANCE HORIZONTALLY</span>
        <span>01 — 05 SLIDES</span>
      </div>
    </section>
  );
};
