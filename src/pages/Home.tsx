import React from 'react';
import { Hero } from '../components/Hero';
import { Introduction } from '../components/Introduction';
import { ProjectShowcase } from '../components/ProjectShowcase';
import { FeaturedPinnedProject } from '../components/FeaturedPinnedProject';
import { HorizontalGallery } from '../components/HorizontalGallery';
import { ServicesSection } from '../components/ServicesSection';
import { StudioSection } from '../components/StudioSection';
import { ProcessSection } from '../components/ProcessSection';
import { MaterialsSection } from '../components/MaterialsSection';
import { StatisticsSection } from '../components/StatisticsSection';
import { ContactSection } from '../components/ContactSection';
import { PROJECTS } from '../data/projects';

interface HomeProps {
  onNavigate?: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const featuredProject = PROJECTS[0]; // Addis Residence with pinned slides

  return (
    <div className="w-full flex flex-col">
      {/* 1. Cinematic Full-Screen Hero */}
      <Hero />

      {/* 2. Whitespace Introduction */}
      <Introduction />

      {/* 3. Selected Projects (01 — 04) */}
      <ProjectShowcase projects={PROJECTS} onNavigate={onNavigate} />

      {/* 4. Featured Project Pinned Scroll Sequence */}
      <FeaturedPinnedProject project={featuredProject} onNavigate={onNavigate} />

      {/* 5. Horizontal Gallery: The Details Matter */}
      <HorizontalGallery />

      {/* 6. Dark Services Section: What We Do */}
      <ServicesSection onNavigate={onNavigate} />

      {/* 7. Studio Section: Split Layout */}
      <StudioSection onNavigate={onNavigate} />

      {/* 8. Architectural Process Timeline */}
      <ProcessSection />

      {/* 9. Materiality Asymmetrical Showcase */}
      <MaterialsSection />

      {/* 10. Understated Statistics */}
      <StatisticsSection />

      {/* 11. Dramatic Dark Contact Section */}
      <ContactSection onNavigate={onNavigate} />
    </div>
  );
};
