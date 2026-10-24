import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

export interface LightboxItem {
  image: string;
  caption?: string;
  projectTitle?: string;
  category?: string;
}

interface LightboxContextType {
  openLightbox: (items: LightboxItem[], initialIndex?: number) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType>({
  openLightbox: () => {},
  closeLightbox: () => {},
});

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const openLightbox = (newItems: LightboxItem[], initialIndex = 0) => {
    setItems(newItems);
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
    document.body.style.overflow = '';
  }, []);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeLightbox, handleNext, handlePrev]);

  const currentItem = items[currentIndex];

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}

      {/* Full-Screen Minimalist Lightbox Modal */}
      {isOpen && currentItem && (
        <div
          className="fixed inset-0 z-[99999] bg-[#171717]/95 backdrop-blur-md flex flex-col justify-between text-[#F5F3EE] p-6 md:p-10 select-none animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar: Title & Controls */}
          <div className="flex justify-between items-center z-10 border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <span className="font-editorial text-lg md:text-xl font-bold tracking-tight">
                {currentItem.projectTitle || 'PROLIQ ARCHIVE'}
              </span>
              {currentItem.category && (
                <span className="hidden sm:inline-block font-mono-subtle text-xs tracking-widest text-[#8A7E72] uppercase">
                  / {currentItem.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Zoom toggle button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-white/20 hover:border-white text-xs font-mono-subtle tracking-wider uppercase transition-colors"
                title="Toggle Zoom"
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isZoomed ? '1X' : '2X'}</span>
              </button>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="w-9 h-9 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center: Image Display with Optional Zoom & Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Previous Button */}
            {items.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors bg-black/40 backdrop-blur-sm"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Main Image */}
            <div
              className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={currentItem.image}
                alt={currentItem.caption || 'Architectural view'}
                className="max-h-[72vh] md:max-h-[78vh] max-w-[85vw] object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Next Button */}
            {items.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors bg-black/40 backdrop-blur-sm"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption & Index */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-white/10 pt-4 font-mono-subtle text-xs text-[#F5F3EE]/80">
            <p className="max-w-2xl text-xs sm:text-sm font-light text-[#F5F3EE]">
              {currentItem.caption || 'Architectural Dossier Photograph'}
            </p>

            <div className="flex items-center gap-6 text-[#8A7E72]">
              <span>USE ARROW KEYS OR CLICK TO PAN</span>
              <span className="font-semibold text-white">
                0{currentIndex + 1} / 0{items.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
