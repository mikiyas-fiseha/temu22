import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ImageHoverPreview } from './ImageHoverPreview';
import { ArrowRight } from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
  onNavigate?: (path: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onNavigate,
}) => {
  const [hoveredData, setHoveredData] = useState<{
    image: string | null;
    title: string | null;
    visible: boolean;
  }>({
    image: null,
    title: null,
    visible: false,
  });

  const handleHoverStart = (image: string, title: string) => {
    setHoveredData({ image, title, visible: true });
  };

  const handleHoverEnd = () => {
    setHoveredData((prev) => ({ ...prev, visible: false }));
  };

  const handleViewAllClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('/work');
    }
  };

  return (
    <section className="relative w-full py-14 md:py-20 bg-[#F2F0EB] text-[#171717] overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header with balanced typography */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-20 gap-6 border-b border-[#171717]/15 pb-6">
          <div>
            <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
              PORTFOLIO ARCHIVE
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717]">
              SELECTED WORK
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-mono-subtle text-xs sm:text-sm tracking-[0.25em] text-[#6B6B65] uppercase">
              01 — 04
            </span>
          </div>
        </div>

        {/* Projects List with Editorial Spacing */}
        <div className="flex flex-col">
          {projects.slice(0, 4).map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              onNavigate={onNavigate}
            />
          ))}
        </div>

        {/* View All Projects Action */}
        <div className="pt-6 pb-12 flex justify-center">
          <Link
            to="/work"
            onClick={handleViewAllClick}
            className="group flex items-center gap-4 px-8 py-4.5 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-[#F5F3EE] transition-all duration-300 no-underline"
          >
            <span className="font-mono-subtle text-xs tracking-[0.25em] uppercase font-semibold">
              EXPLORE FULL ARCHIVE (ALL PROJECTS)
            </span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Floating Hover Preview (Desktop) */}
      <ImageHoverPreview
        image={hoveredData.image}
        title={hoveredData.title}
        visible={hoveredData.visible}
      />
    </section>
  );
};
