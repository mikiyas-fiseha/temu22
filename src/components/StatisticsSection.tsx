import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';

export const StatisticsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const stats = [
    { value: '12+', label: 'COMPLETED PROJECTS' },
    { value: '8', label: 'YEARS OF PRACTICE' },
    { value: '6', label: 'DESIGN DISCIPLINES' },
    { value: '3', label: 'CITIES' },
  ];

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-item',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
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
      className="relative w-full py-16 md:py-24 bg-[#F2F0EB] text-[#171717] border-y border-[#171717]/15"
      aria-label="Studio Numbers"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-start">
              <span className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-none mb-2">
                {stat.value}
              </span>
              <span className="font-mono-subtle text-xs tracking-[0.2em] text-[#6B6B65] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
