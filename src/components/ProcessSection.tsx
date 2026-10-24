import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';

export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'LISTEN',
      desc: 'Understanding the client, site and requirements.',
      subtext: 'Site topography, solar angles, lifestyle rituals, and cultural context analysis.',
    },
    {
      number: '02',
      title: 'CONCEPT',
      desc: 'Exploring ideas, materials and spatial relationships.',
      subtext: 'Initial volumetric massing, light studies, and raw material pairing dialogues.',
    },
    {
      number: '03',
      title: 'DEVELOP',
      desc: 'Turning the concept into detailed architecture.',
      subtext: 'Bespoke joinery schematics, structural engineering, and technical coordination.',
    },
    {
      number: '04',
      title: 'REALIZE',
      desc: 'Bringing the design into the built environment.',
      subtext: 'Supervised on-site construction, artisan craft management, and spatial delivery.',
    },
  ];

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Line drawing effect
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Step cards stagger reveal
      gsap.fromTo(
        '.process-step-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
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

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-40 bg-[#F2F0EB] text-[#171717] overflow-hidden"
      aria-label="PROLIQ Architectural Process"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 md:mb-24 gap-6">
          <div>
            <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-3">
              METHODOLOGY / 04
            </p>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171717]">
              HOW WE WORK
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#6B6B65] max-w-md font-light leading-relaxed">
            A methodical architectural trajectory from raw curiosity to enduring physical realization.
          </p>
        </div>

        {/* Subtle Line Drawing Effect */}
        <div ref={lineRef} className="w-full h-[1px] bg-[#171717]/25 mb-12 md:mb-16 will-change-transform" />

        {/* 4 Process Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="process-step-item flex flex-col justify-between">
              <div>
                <span className="font-mono-subtle text-sm tracking-widest text-[#8A7E72] block mb-4">
                  {step.number}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[#171717] font-medium leading-relaxed mb-3">
                  {step.desc}
                </p>
              </div>
              <p className="text-xs text-[#6B6B65] font-light leading-relaxed mt-2 border-t border-[#171717]/10 pt-3">
                {step.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
