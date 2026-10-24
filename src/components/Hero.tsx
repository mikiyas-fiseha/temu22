import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';
import { useSmoothScroll } from './SmoothScroll';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(['.hero-title-line', metadataRef.current, scrollIndicatorRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      // Calm, expensive page-load entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image starts slightly zoomed and slowly settles
      tl.fromTo(
        imageRef.current,
        { scale: 1.15, filter: 'brightness(0.6)' },
        { scale: 1.04, filter: 'brightness(0.82)', duration: 2.2, ease: 'power2.out' },
        0
      );

      // Main heading reveals line by line
      tl.fromTo(
        '.hero-title-line',
        { y: '120%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.5, stagger: 0.18, ease: 'power4.out' },
        0.35
      );

      // Metadata elements fade upward
      tl.fromTo(
        metadataRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        1.0
      );

      // Bottom bar & scroll indicator appears last
      tl.fromTo(
        '.hero-bottom-element',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out' },
        1.3
      );

      // Subtle Parallax on scroll
      if (containerRef.current && imageRef.current && textContainerRef.current) {
        gsap.to(imageRef.current, {
          y: '14%',
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(textContainerRef.current, {
          y: '-20%',
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    scrollTo('#introduction', { offset: -60, duration: 1.2 });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[660px] overflow-hidden bg-[#171717] text-[#F5F3EE] flex flex-col justify-between"
      aria-label="PROLIQ Architecture Hero"
    >
      {/* Background Architectural Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          ref={imageRef}
          src="/images/hero.jpg"
          alt="PROLIQ Modern Architectural Villa Monolith"
          className="w-full h-full object-cover object-center origin-center will-change-transform"
          loading="eager"
        />
        {/* Cinematic dark subtle overlay for typography contrast and architectural grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 via-[#171717]/45 to-[#171717]/60" />
      </div>

      {/* Top spacer to accommodate fixed navbar */}
      <div className="pt-24 md:pt-28" />

      {/* Hero Central Editorial Content with balanced typography */}
      <div
        ref={textContainerRef}
        className="relative z-10 max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-center will-change-transform my-auto"
      >
        {/* Small metadata text */}
        <div ref={metadataRef} className="mb-4 md:mb-5">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-medium">
            ARCHITECTURE / INTERIOR / VISUALIZATION
          </p>
        </div>

        {/* Large Editorial Heading - Balanced proportions */}
        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] font-bold tracking-tight text-[#F5F3EE] leading-[0.96] select-none">
          <div className="overflow-hidden pb-1">
            <span className="hero-title-line inline-block will-change-transform">
              ARCHITECTURE
            </span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="hero-title-line inline-block will-change-transform">
              THAT SHAPES
            </span>
          </div>
          <div className="overflow-hidden pb-1">
            <span className="hero-title-line inline-block text-[#F5F3EE]/95 will-change-transform">
              HOW WE LIVE.
            </span>
          </div>
        </h1>
      </div>

      {/* Hero Bottom Bar */}
      <div className="relative z-10 max-w-[1700px] w-full mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        {/* Bottom Left */}
        <div className="hero-bottom-element flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#8A7E72]" />
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#F5F3EE]/85 uppercase">
            ADDIS ABABA — ETHIOPIA
          </p>
        </div>

        {/* Bottom Right Scroll Indicator */}
        <button
          ref={scrollIndicatorRef}
          onClick={handleScrollClick}
          className="hero-bottom-element group flex items-center gap-3 font-mono-subtle text-xs tracking-[0.25em] text-[#F5F3EE]/85 uppercase bg-transparent border-none cursor-pointer p-0 transition-opacity hover:opacity-100"
          aria-label="Scroll to explore introduction section"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            SCROLL TO EXPLORE
          </span>
          <span className="inline-block transform group-hover:translate-y-1 transition-transform duration-300">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};
