import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { ImageHoverPreview } from '../components/ImageHoverPreview';

interface WorkProps {
  onNavigate?: (path: string) => void;
}

export const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [hoveredData, setHoveredData] = useState<{
    image: string | null;
    title: string | null;
    visible: boolean;
  }>({
    image: null,
    title: null,
    visible: false,
  });

  const categories = ['ALL', 'RESIDENTIAL', 'INTERIOR', 'ARCHITECTURE'];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'RESIDENTIAL') return project.category.includes('Residential') || project.type.includes('Residence');
    if (activeFilter === 'INTERIOR') return project.category.includes('Interior') || project.type.includes('Interior');
    if (activeFilter === 'ARCHITECTURE') return project.category.includes('Architecture');
    return true;
  });

  const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(`/work/${slug}`);
    }
  };

  return (
    <div className="w-full bg-[#F2F0EB] text-[#171717] pt-24 md:pt-36 pb-24 md:pb-36">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Header Block with balanced typography */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-18 pb-6 border-b border-[#171717]/15 gap-6">
          <div>
            <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
              COMPLETE PORTFOLIO / 2024 — 2026
            </p>
            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#171717] leading-[0.98]">
              ARCHITECTURAL<br />ARCHIVE
            </h1>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 font-mono-subtle text-xs tracking-widest uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#171717] text-[#F5F3EE] border-[#171717]'
                    : 'bg-transparent text-[#6B6B65] border-[#171717]/20 hover:border-[#171717] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Project Grid / List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {filteredProjects.map((project) => (
            <article key={project.id} className="group flex flex-col">
              <Link
                to={`/work/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project.slug)}
                onMouseEnter={() =>
                  setHoveredData({ image: project.heroImage, title: project.title, visible: true })
                }
                onMouseLeave={() =>
                  setHoveredData((prev) => ({ ...prev, visible: false }))
                }
                className="text-inherit no-underline"
              >
                {/* Image Container with Editorial Reveal and local images */}
                <div className="relative w-full h-[42vh] sm:h-[50vh] lg:h-[58vh] overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm mb-5">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter saturate-[0.92]"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono-subtle tracking-widest text-[#F5F3EE] border border-white/10">
                    {project.number}
                  </div>
                </div>

                {/* Content info */}
                <div className="flex justify-between items-start border-b border-[#171717]/15 pb-3.5">
                  <div>
                    <h2 className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#171717] group-hover:translate-x-1.5 transition-transform duration-300">
                      {project.title}
                    </h2>
                    <p className="font-mono-subtle text-xs tracking-wider text-[#6B6B65] uppercase mt-1">
                      {project.category} — {project.location.split(',')[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono-subtle text-xs text-[#8A7E72] font-semibold">{project.year}</span>
                    <div className="w-7 h-7 rounded-full border border-[#171717]/20 flex items-center justify-center group-hover:bg-[#171717] group-hover:text-[#F5F3EE] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <ImageHoverPreview
        image={hoveredData.image}
        title={hoveredData.title}
        visible={hoveredData.visible}
      />
    </div>
  );
};
