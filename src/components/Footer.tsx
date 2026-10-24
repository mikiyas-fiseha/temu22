import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="w-full bg-[#171717] text-[#F5F3EE] border-t border-[#F5F3EE]/15 pt-16 pb-12">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#F5F3EE]/10 items-start">
          {/* Logo & Manifesto (4 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link
              to="/home"
              onClick={(e) => handleLinkClick(e, '/home')}
              className="font-editorial text-2xl md:text-3xl font-bold tracking-tight text-[#F5F3EE] no-underline"
            >
              PROLIQ
            </Link>
            <p className="text-xs sm:text-sm text-[#F5F3EE]/60 max-w-sm font-light leading-relaxed">
              Architecture & Interior Design Studio shaping enduring spaces through light, honest materiality, and tectonic silence.
            </p>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono-subtle text-xs tracking-widest uppercase">
            <p className="text-[#8A7E72] mb-1">PAGES</p>
            <Link
              to="/work"
              onClick={(e) => handleLinkClick(e, '/work')}
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              WORK / ARCHIVE
            </Link>
            <Link
              to="/studio"
              onClick={(e) => handleLinkClick(e, '/studio')}
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              THE STUDIO
            </Link>
            <Link
              to="/services"
              onClick={(e) => handleLinkClick(e, '/services')}
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              DISCIPLINES
            </Link>
            <Link
              to="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              CONTACT & INQUIRY
            </Link>
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="text-[#8A7E72] hover:text-[#F5F3EE] transition-colors py-1 text-[11px]"
            >
              COMING SOON PORTAL ↗
            </Link>
          </div>

          {/* Social Links (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-3 font-mono-subtle text-xs tracking-widest uppercase">
            <p className="text-[#8A7E72] mb-1">NETWORK</p>
            <a
              href="https://proliqdesign.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#F5F3EE]/90 hover:text-[#8A7E72] transition-colors py-1 font-semibold"
            >
              PROLIQDESIGN.COM ↗
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              INSTAGRAM ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#F5F3EE]/80 hover:text-[#F5F3EE] transition-colors py-1"
            >
              LINKEDIN ↗
            </a>
          </div>

          {/* Location & Contact (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-1 font-mono-subtle text-xs tracking-widest uppercase">
            <p className="text-[#8A7E72] mb-1">CONTACT & LOCALE</p>
            <a
              href="tel:+251913168803"
              className="text-[#F5F3EE] hover:text-[#8A7E72] transition-colors block text-xs tracking-wider"
            >
              +251 91 316 8803
            </a>
            <p className="text-[#F5F3EE] mt-2 text-[11px] leading-snug">
              Bole, beside Bora Amusement Park,<br />
              Next Building, 2nd Floor
            </p>
            <p className="text-[#F5F3EE]/70 mt-1">ADDIS ABABA, ETHIOPIA</p>
            <p className="text-[#8A7E72] text-[10px] mt-1">UTC+3 (EAT)</p>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono-subtle text-[#F5F3EE]/50 tracking-wider">
          <p>© 2026 PROLIQ STUDIO. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR ENDURING SPACES & ARCHITECTURAL CULTURE.</p>
        </div>
      </div>
    </footer>
  );
};
