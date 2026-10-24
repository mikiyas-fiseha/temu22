import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from '../animations/gsapInit';
import { useArchitecturalTheme } from '../context/ThemeContext';

interface NavbarProps {
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLUListElement>(null);
  const { mode, toggleMode } = useArchitecturalTheme();

  const navLinks = [
    { label: 'WORK', path: '/work' },
    { label: 'STUDIO', path: '/studio' },
    { label: 'SERVICES', path: '/services' },
    { label: 'CONTACT', path: '/contact' },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Mobile menu GSAP animations
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.to(mobileMenuRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.45,
        ease: 'power3.inOut',
      });
      tl.fromTo(
        '.mobile-nav-item',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.visibility = 'hidden';
          }
        },
      });
    }
  }, [isMobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate && location.pathname !== path) {
      e.preventDefault();
      setIsMobileOpen(false);
      onNavigate(path);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#F2F0EB]/85 backdrop-blur-md border-b border-[#171717]/10'
            : 'py-6 md:py-7 bg-transparent'
        }`}
      >
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Studio Name Logo */}
          <Link
            to="/home"
            onClick={(e) => handleLinkClick(e, '/home')}
            className="group flex items-center gap-3 text-inherit no-underline"
          >
            <span className="font-editorial text-xl md:text-2xl font-bold tracking-tight text-[#171717] transition-transform duration-300 group-hover:scale-105">
              PROLIQ
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#171717]/40"></span>
            <span className="hidden sm:inline-block font-mono-subtle text-[10px] tracking-widest text-[#6B6B65] uppercase">
              STUDIO
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <ul ref={navItemsRef} className="flex items-center gap-6 lg:gap-10 list-none p-0 m-0">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path} className="relative">
                    <Link
                      to={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className={`font-mono-subtle text-xs tracking-[0.2em] uppercase transition-colors duration-300 py-1 hover-editorial-line ${
                        isActive
                          ? 'text-[#171717] font-semibold'
                          : 'text-[#6B6B65] hover:text-[#171717]'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#171717]" />
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Architectural View Mode Toggle (Natural vs Monochrome Noir) */}
            <button
              onClick={toggleMode}
              className="flex items-center gap-1.5 font-mono-subtle text-[10px] tracking-widest uppercase px-2.5 py-1 border border-[#171717]/25 hover:border-[#171717] transition-all bg-transparent cursor-pointer"
              title="Toggle Architectural View Mode (Natural Earth / Monochrome Noir)"
            >
              <span className={mode === 'natural' ? 'text-[#171717] font-bold' : 'text-[#6B6B65]'}>
                NATURAL
              </span>
              <span className="text-[#6B6B65]/40">/</span>
              <span className={mode === 'mono' ? 'text-[#171717] font-bold' : 'text-[#6B6B65]'}>
                MONO
              </span>
            </button>

            {/* Inquire Direct Indicator */}
            <Link
              to="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="hidden lg:flex items-center gap-2 font-mono-subtle text-[11px] tracking-widest uppercase px-3.5 py-1.5 border border-[#171717]/25 rounded-full hover:bg-[#171717] hover:text-[#F5F3EE] hover:border-[#171717] transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>INQUIRE</span>
            </Link>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleMode}
              className="text-[10px] font-mono-subtle uppercase px-2 py-0.5 border border-[#171717]/20"
            >
              {mode === 'natural' ? 'NATURAL' : 'MONO'}
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex flex-col justify-center items-end gap-1.5 w-10 h-10 p-1.5 focus:outline-none z-50"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`block h-[1.5px] bg-[#171717] transition-all duration-300 ${
                  isMobileOpen ? 'w-6 translate-y-2 rotate-45' : 'w-6'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#171717] transition-all duration-300 ${
                  isMobileOpen ? 'opacity-0' : 'w-4'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-[#171717] transition-all duration-300 ${
                  isMobileOpen ? 'w-6 -translate-y-2 -rotate-45' : 'w-5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Editorial Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#171717] text-[#F5F3EE] z-40 flex flex-col justify-between px-8 py-20 opacity-0 pointer-events-auto"
        style={{ visibility: 'hidden' }}
      >
        <div className="flex flex-col gap-6 pt-6">
          <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase">
            NAVIGATION
          </p>
          <ul className="flex flex-col gap-5 list-none p-0 m-0">
            {navLinks.map((item, idx) => (
              <li key={item.path} className="mobile-nav-item overflow-hidden">
                <Link
                  to={item.path}
                  onClick={(e) => handleLinkClick(e, item.path)}
                  className="font-editorial text-3xl sm:text-4xl font-light tracking-tight hover:italic text-[#F5F3EE] flex items-baseline gap-4 group transition-transform duration-300"
                >
                  <span className="font-mono-subtle text-xs text-[#8A7E72]">0{idx + 1}</span>
                  <span className="group-hover:translate-x-3 transition-transform duration-300">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-nav-item border-t border-white/10 pt-5 flex flex-col gap-4 text-xs font-mono-subtle text-[#8A7E72]">
          <div className="flex justify-between items-center">
            <span>VIEW MODE:</span>
            <button
              onClick={toggleMode}
              className="text-white border border-white/20 px-3 py-1 uppercase"
            >
              {mode === 'natural' ? 'NATURAL COLOR' : 'MONOCHROME NOIR'}
            </button>
          </div>
          <div>
            <p className="text-white uppercase">PROLIQ STUDIO</p>
            <p>ADDIS ABABA, ETHIOPIA</p>
          </div>
        </div>
      </div>
    </>
  );
};
