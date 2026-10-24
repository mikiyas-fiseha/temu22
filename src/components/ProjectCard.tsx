import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { gsap } from '../animations/gsapInit';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onHoverStart?: (image: string, title: string) => void;
  onHoverEnd?: () => void;
  onNavigate?: (path: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onHoverStart,
  onHoverEnd,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Sophisticated clip-path reveal for image container
      if (imageWrapperRef.current && imageRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(16% 0% 16% 0%)', opacity: 0.3 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.4, ease: 'power4.inOut' }
        );

        tl.fromTo(
          imageRef.current,
          { scale: 1.15 },
          { scale: 1.03, duration: 1.6, ease: 'power3.out' },
          0
        );

        // 2. Parallax vertical travel while scrolling through
        gsap.to(imageRef.current, {
          y: '6%',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 3. Info text stagger reveal
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/work/${project.slug}`);
    }
  };

  const isEven = index % 2 === 0;

  return (
    <article
      ref={containerRef}
      className={`relative w-full mb-24 md:mb-36 lg:mb-44 ${
        isEven ? 'lg:pl-0 lg:pr-10' : 'lg:pl-10 lg:pr-0'
      }`}
    >
      <Link
        to={`/work/${project.slug}`}
        onClick={handleClick}
        className="block group text-inherit no-underline"
        onMouseEnter={() => onHoverStart?.(project.heroImage, project.title)}
        onMouseLeave={() => onHoverEnd?.()}
      >
        {/* Top Editorial Header for the Project */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 md:mb-6 gap-3 border-b border-[#171717]/15 pb-3">
          <div className="flex items-baseline gap-4 md:gap-5">
            <span className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] font-semibold">
              {project.number}
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#171717] transition-transform duration-500 group-hover:translate-x-2">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-subtle text-[#6B6B65] uppercase">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#171717]/30" />
            <span>{project.location.split(',')[0]} / {project.year}</span>
            <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#171717]/20 transition-all duration-300 group-hover:bg-[#171717] group-hover:text-[#F5F3EE] group-hover:scale-110 ml-2">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Large Editorial Image Frame with architectural border integration */}
        <div
          ref={imageWrapperRef}
          className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] max-h-[840px] overflow-hidden bg-[#171717]/10 border border-[#171717]/10 shadow-sm will-change-transform"
        >
          <img
            ref={imageRef}
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover object-center will-change-transform transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Subtle architectural vignette overlay for contrast and integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

          {/* Floating subtle overlay caption on desktop */}
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-[#F5F3EE] pointer-events-none">
            <p className="font-mono-subtle text-[11px] tracking-widest uppercase opacity-90 backdrop-blur-md bg-black/40 px-3 py-1 border border-white/10">
              EXPLORE ARCHITECTURE
            </p>
            <p className="hidden md:block font-mono-subtle text-xs tracking-wider opacity-85 text-right max-w-sm">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Editorial Caption */}
        <div ref={infoRef} className="mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          <p className="text-xs sm:text-sm md:text-base text-[#6B6B65] max-w-2xl leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center gap-2 font-mono-subtle text-xs tracking-widest text-[#171717] group-hover:translate-x-1 transition-transform duration-300">
            <span>VIEW CASE STUDY</span>
            <span>→</span>
          </div>
        </div>
      </Link>
    </article>
  );
};
