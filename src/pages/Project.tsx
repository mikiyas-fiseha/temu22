import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { gsap } from '../animations/gsapInit';
import { ArrowLeft, ArrowRight, Compass, Maximize2 } from 'lucide-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { useLightbox } from '../components/LightboxModal';

interface ProjectProps {
  onNavigate?: (path: string) => void;
}

export const ProjectPage: React.FC<ProjectProps> = ({ onNavigate }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const { openLightbox } = useLightbox();

  // Find project by slug or id
  const project = PROJECTS.find((p) => p.slug === id || p.id === id) || PROJECTS[0];
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Prepare full gallery list for lightbox
  const galleryItems = [
    { image: project.heroImage, caption: `${project.title} — Principal Elevation`, projectTitle: project.title, category: project.category },
    { image: project.conceptImage, caption: `${project.title} — Volumetric Architectural Concept`, projectTitle: project.title, category: 'Concept' },
    { image: project.spatialStrategyImage, caption: `${project.title} — Spatial Strategy & Living Flow`, projectTitle: project.title, category: 'Strategy' },
    ...project.detailImages.map((img, idx) => ({
      image: img,
      caption: `${project.title} — Joinery & Material Detail 0${idx + 1}`,
      projectTitle: project.title,
      category: 'Detail',
    })),
    { image: project.finalViewImage, caption: `${project.title} — Twilight Final View`, projectTitle: project.title, category: 'Twilight View' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax on project hero image
      if (heroImgRef.current) {
        gsap.to(heroImgRef.current, {
          y: '12%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Stagger section reveals
      const revealElements = gsap.utils.toArray<HTMLElement>('.project-reveal');
      revealElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  const handleNextProject = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/work/${nextProject.slug}`);
    } else {
      e.preventDefault();
      navigate(`/work/${nextProject.slug}`);
    }
  };

  const handleBackToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/work');
    }
  };

  return (
    <div ref={pageRef} className="w-full bg-[#F2F0EB] text-[#171717] pt-24 md:pt-32">
      {/* Back to Work Link */}
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 mb-6 flex justify-between items-center">
        <Link
          to="/work"
          onClick={handleBackToWork}
          className="inline-flex items-center gap-2 font-mono-subtle text-xs tracking-widest text-[#6B6B65] hover:text-[#171717] transition-colors uppercase no-underline font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>

        {/* Quick Lightbox Action */}
        <button
          onClick={() => openLightbox(galleryItems, 0)}
          className="inline-flex items-center gap-2 font-mono-subtle text-xs tracking-widest text-[#171717] hover:text-[#8A7E72] transition-colors uppercase font-semibold"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>VIEW FULL-SCREEN DOSSIER</span>
        </button>
      </div>

      {/* 1. Project Title & Metadata Header with balanced typography */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 mb-10 md:mb-14">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-[#171717]/15">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] font-semibold">
                {project.number}
              </span>
              <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#6B6B65] uppercase">
                {project.category}
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[0.98]">
              {project.title}
            </h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 font-mono-subtle text-xs tracking-widest uppercase">
            <div>
              <p className="text-[#8A7E72] mb-1">LOCATION</p>
              <p className="text-[#171717] font-medium">{project.location.split(',')[0]}</p>
            </div>
            <div>
              <p className="text-[#8A7E72] mb-1">YEAR</p>
              <p className="text-[#171717] font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-[#8A7E72] mb-1">AREA</p>
              <p className="text-[#171717] font-medium">{project.specifications.area}</p>
            </div>
            <div>
              <p className="text-[#8A7E72] mb-1">STATUS</p>
              <p className="text-[#171717] font-medium">{project.specifications.status}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Massive Hero Image with integrated frame & click to zoom */}
      <section
        className="w-full h-[60vh] sm:h-[72vh] lg:h-[82vh] overflow-hidden bg-[#171717] relative border-y border-[#171717]/10 cursor-pointer group"
        onClick={() => openLightbox(galleryItems, 0)}
      >
        <img
          ref={heroImgRef}
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover object-center will-change-transform scale-105 filter saturate-[0.95]"
        />
        <div className="absolute bottom-5 left-6 md:left-12 bg-black/60 backdrop-blur-md px-3.5 py-1.5 text-xs font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10 flex items-center gap-2">
          <span>{project.title} — PRINCIPAL ELEVATION</span>
          <span className="opacity-70">(CLICK TO EXPAND)</span>
        </div>
      </section>

      {/* 3. Narrative & Overview */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-2 font-semibold">
              THE BRIEF & SITE CONTEXT
            </span>
            <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-[#171717]">
              SPATIAL SYNTHESIS
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <p className="text-lg sm:text-xl md:text-2xl text-[#171717] font-light leading-relaxed">
              {project.description}
            </p>
            {project.challenge && (
              <div className="pt-5 border-t border-[#171717]/10">
                <p className="font-mono-subtle text-xs tracking-widest text-[#8A7E72] uppercase mb-1.5 font-semibold">
                  ARCHITECTURAL CHALLENGE
                </p>
                <p className="text-sm md:text-base text-[#6B6B65] leading-relaxed font-light">
                  {project.challenge}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. CONCEPT SECTION */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1.5 font-semibold">
              SECTION 01
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]">
              CONCEPT
            </h2>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#6B6B65] max-w-xl font-light">
            {project.conceptText}
          </p>
        </div>

        <div
          onClick={() => openLightbox(galleryItems, 1)}
          className="relative w-full h-[52vh] sm:h-[65vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm cursor-pointer group"
        >
          <img
            src={project.conceptImage}
            alt={`${project.title} Architectural Concept`}
            className="w-full h-full object-cover object-center filter saturate-[0.92] transition-transform duration-700 group-hover:scale-102"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            EXPAND VIEW ↗
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE BEFORE / AFTER SLIDER SECTION */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8">
          <BeforeAfterSlider
            beforeImage="/images/courtyard_spatial.jpg"
            afterImage={project.heroImage}
            beforeLabel="RAW STRUCTURE & EXCAVATION"
            afterLabel="BUILT ARCHITECTURAL MONOLITH"
            title="SPATIAL TRANSFORMATION"
            description="Drag the slider to examine how the raw volcanic excavation was refined into the finished concrete residence."
          />
        </div>
      </section>

      {/* 6. SPATIAL STRATEGY */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1.5 font-semibold">
              SECTION 02
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]">
              SPATIAL STRATEGY
            </h2>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#6B6B65] max-w-xl font-light">
            {project.spatialStrategyText}
          </p>
        </div>

        <div
          onClick={() => openLightbox(galleryItems, 2)}
          className="relative w-full h-[52vh] sm:h-[65vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm cursor-pointer group"
        >
          <img
            src={project.spatialStrategyImage}
            alt={`${project.title} Spatial Strategy`}
            className="w-full h-full object-cover object-center filter saturate-[0.92] transition-transform duration-700 group-hover:scale-102"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-[11px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase opacity-0 group-hover:opacity-100 transition-opacity">
            EXPAND VIEW ↗
          </div>
        </div>
      </section>

      {/* 7. FLOOR PLAN / ARCHITECTURAL DRAWINGS */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8 mb-8">
          <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1.5 font-semibold">
            DOCUMENTATION
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]">
            PLAN & SECTIONAL DRAWINGS
          </h2>
        </div>

        <div className="relative w-full p-6 md:p-10 bg-[#E9E6DF] border border-[#171717]/20 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl aspect-[16/9] border border-[#171717]/40 relative p-5 bg-[#F2F0EB]">
            {/* North Indicator */}
            <div className="absolute top-4 right-4 flex flex-col items-center gap-1 font-mono-subtle text-[10px] text-[#171717]">
              <Compass className="w-5 h-5 stroke-1" />
              <span>N</span>
            </div>

            {/* Architectural Grid & Floorplan Schema */}
            <div className="w-full h-full flex flex-col justify-between border-dashed border border-[#171717]/20 p-5">
              <div className="grid grid-cols-3 gap-3 h-3/4">
                <div className="border border-[#171717]/60 flex items-center justify-center p-2 text-center bg-black/5">
                  <span className="font-mono-subtle text-[10px] tracking-wider text-[#171717]">
                    GALLERY & ATRIUM<br />+0.00
                  </span>
                </div>
                <div className="border-2 border-[#171717] flex items-center justify-center p-2 text-center bg-[#8A7E72]/15">
                  <span className="font-mono-subtle text-[10px] tracking-wider text-[#171717] font-semibold">
                    CENTRAL COURTYARD POOL<br />-0.45
                  </span>
                </div>
                <div className="border border-[#171717]/60 flex items-center justify-center p-2 text-center bg-black/5">
                  <span className="font-mono-subtle text-[10px] tracking-wider text-[#171717]">
                    LIVING PAVILION<br />+0.00
                  </span>
                </div>
              </div>

              {/* Dimension bar & Title Block */}
              <div className="border-t border-[#171717]/30 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] font-mono-subtle text-[#6B6B65]">
                <span>SCALE 1:100 @ A1 — STRUCTURAL GROUND PLAN</span>
                <span>PROLIQ ARCHITECTURAL STUDIO — ADDIS ABABA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MATERIALITY SECTION */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1.5 font-semibold">
              SECTION 03
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]">
              MATERIALITY
            </h2>
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#6B6B65] max-w-xl font-light">
            {project.materialityText}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {project.materialImages.map((mat, idx) => (
            <div key={idx} className="group flex flex-col">
              <div className="relative w-full aspect-square overflow-hidden bg-[#171717]/10 border border-[#171717]/15">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter saturate-[0.92]"
                  loading="lazy"
                />
              </div>
              <p className="font-mono-subtle text-xs tracking-wider text-[#171717] mt-2.5 uppercase font-medium">
                {mat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. DETAILS SECTION with Lightbox interaction */}
      <section className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 pb-16 md:pb-24 project-reveal">
        <div className="border-t border-[#171717]/15 pt-8 mb-8">
          <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1.5 font-semibold">
            SECTION 04
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717]">
            DETAILS & JOINERY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {project.detailImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(galleryItems, 3 + idx)}
              className="relative w-full h-[40vh] sm:h-[46vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 group shadow-sm cursor-pointer"
            >
              <img
                src={img}
                alt={`Detail 0${idx + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter saturate-[0.92]"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10">
                DETAIL 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL VIEW — FULL-WIDTH IMAGE with Lightbox */}
      <section
        onClick={() => openLightbox(galleryItems, galleryItems.length - 1)}
        className="w-full h-[60vh] sm:h-[75vh] overflow-hidden bg-[#171717] relative project-reveal border-t border-[#171717]/20 cursor-pointer group"
      >
        <img
          src={project.finalViewImage}
          alt={`${project.title} Twilight Final View`}
          className="w-full h-full object-cover object-center filter saturate-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-12">
          <p className="font-editorial text-xl sm:text-2xl md:text-3xl text-[#F5F3EE] font-light max-w-xl">
            "{project.tagline}"
          </p>
        </div>
      </section>

      {/* 11. NEXT PROJECT NAVIGATION */}
      <section className="w-full bg-[#171717] text-[#F5F3EE] py-20 md:py-32 border-t border-[#F5F3EE]/15">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
          <Link
            to={`/work/${nextProject.slug}`}
            onClick={handleNextProject}
            className="group block text-inherit no-underline"
          >
            <div className="flex items-center gap-3 font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-3 font-semibold">
              <span>NEXT ARCHITECTURAL DOSSIER</span>
              <span>→</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F3EE] group-hover:translate-x-3 transition-transform duration-500">
                {nextProject.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-mono-subtle text-[#8A7E72]">
                <span>{nextProject.category}</span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
