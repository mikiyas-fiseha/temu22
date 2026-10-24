import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';

export const Introduction: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        gsap.set(['.intro-line', paragraphRef.current, imageFrameRef.current], { opacity: 1, y: 0 });
        return;
      }

      // Heading line-by-line reveal as section enters viewport
      gsap.fromTo(
        '.intro-line',
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1.3,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Paragraph and image frame appear slightly later
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            delay: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 lg:py-40 bg-[#F2F0EB] text-[#171717] overflow-hidden"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Subtle section identifier */}
        <div className="mb-6 md:mb-10">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
            PHILOSOPHY / 01
          </p>
        </div>

        {/* Large Statement & Adjacent Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main Statement (7 cols) - Refined size */}
          <div className="lg:col-span-7">
            <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#171717] leading-[1.04] select-none">
              <div className="overflow-hidden pb-1">
                <span className="intro-line inline-block will-change-transform">
                  WE DESIGN SPACES
                </span>
              </div>
              <div className="overflow-hidden pb-1">
                <span className="intro-line inline-block will-change-transform">
                  WITH PURPOSE,
                </span>
              </div>
              <div className="overflow-hidden pb-1">
                <span className="intro-line inline-block will-change-transform">
                  CHARACTER
                </span>
              </div>
              <div className="overflow-hidden pb-1">
                <span className="intro-line inline-block will-change-transform text-[#6B6B65]">
                  AND TIME IN MIND.
                </span>
              </div>
            </h2>
          </div>

          {/* Adjacent Descriptive Paragraph (5 cols) & Integrated Architectural Vignette */}
          <div ref={paragraphRef} className="lg:col-span-5 lg:pt-2 flex flex-col gap-6">
            <div className="w-10 h-[1.5px] bg-[#171717]/40" />
            <p className="text-base sm:text-lg text-[#171717] font-normal leading-relaxed">
              We create architecture and interiors that balance function, material, light and human experience.
            </p>
            <p className="text-sm text-[#6B6B65] leading-relaxed font-light">
              Rooted in Addis Ababa with an international resonance, our studio crafts monolithic volumes that age with grace, celebrating local stone, tectonic timber, and tactile calm.
            </p>

            {/* Seamlessly integrated architectural detail image */}
            <div
              ref={imageFrameRef}
              className="relative w-full h-44 sm:h-52 overflow-hidden border border-[#171717]/15 mt-2 bg-[#E9E6DF]"
            >
              <img
                src="/images/addis_detail.jpg"
                alt="Tactile timber and stone architectural detail"
                className="w-full h-full object-cover object-center filter saturate-[0.9] contrast-[1.05]"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 bg-[#171717]/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase">
                MATERIAL HONESTY — ADDIS ABABA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
