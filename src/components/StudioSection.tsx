import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '../animations/gsapInit';
import { ArrowRight } from 'lucide-react';

interface StudioSectionProps {
  onNavigate?: (path: string) => void;
}

export const StudioSection: React.FC<StudioSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax on the studio image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: '8%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Clip path reveal on entering
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(14% 0% 14% 0%)', opacity: 0.3 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/studio');
    }
  };

  return (
    <section
      id="studio"
      ref={containerRef}
      className="relative w-full py-20 md:py-36 bg-[#F2F0EB] text-[#171717] overflow-hidden"
      aria-label="PROLIQ Studio Philosophy"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Identifier */}
        <div className="mb-8 md:mb-12">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase font-semibold">
            ABOUT THE PRACTICE / 03
          </p>
        </div>

        {/* Split Editorial Layout with refined typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading & Description (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[3.2rem] font-bold tracking-tight text-[#171717] leading-[1.02] mb-6 md:mb-8">
              WE BELIEVE<br />
              GOOD SPACES<br />
              CHANGE HOW<br />
              <span className="text-[#6B6B65]">PEOPLE FEEL.</span>
            </h2>

            <div className="space-y-5 max-w-xl">
              <p className="text-base sm:text-lg text-[#171717] font-normal leading-relaxed">
                We approach every project through space, light, material and context. From the first sketch to the final detail, every decision is made to create spaces that feel considered and lasting.
              </p>

              <p className="text-sm md:text-base text-[#6B6B65] font-light leading-relaxed">
                Operating between Addis Ababa and global architectural dialogues, PROLIQ brings rigorous structural discipline and atmospheric poetry to every built work. We refuse decorative excess in favor of proportion, materiality, and light.
              </p>

              <div className="pt-4">
                <Link
                  to="/studio"
                  onClick={handleLinkClick}
                  className="group inline-flex items-center gap-3 font-mono-subtle text-xs tracking-widest uppercase text-[#171717] border-b border-[#171717] pb-1 hover-editorial-line no-underline font-semibold"
                >
                  <span>LEARN MORE ABOUT OUR PRACTICE</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Image (6 cols) */}
          <div className="lg:col-span-6">
            <div
              ref={imageWrapperRef}
              className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[72vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm"
            >
              <img
                ref={imageRef}
                src="/images/studio_atelier.jpg"
                alt="PROLIQ Studio Interior and Architectural Form"
                className="w-full h-full object-cover object-center will-change-transform filter saturate-[0.92]"
                loading="lazy"
              />

              {/* Minimal architectural coordinate caption */}
              <div className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-sm px-3.5 py-1.5 text-[#F5F3EE] font-mono-subtle text-[10px] tracking-widest uppercase border border-white/10">
                9°01'N 38°45'E — ADDIS ABABA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
