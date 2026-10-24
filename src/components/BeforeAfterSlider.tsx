import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'RAW STRUCTURAL FRAME / FOUNDATION',
  afterLabel = 'FINISHED ARCHITECTURAL REALIZATION',
  title = 'SPATIAL TRANSFORMATION',
  description = 'Drag the divider to observe the tectonic transition from raw structural concrete to the final monolithic residence.',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <span className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase block mb-1 font-semibold">
            EVOLUTION STUDY
          </span>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#171717]">
            {title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#6B6B65] max-w-md font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[50vh] sm:h-[62vh] max-h-[700px] overflow-hidden select-none cursor-ew-resize border border-[#171717]/15 shadow-sm bg-[#171717]"
      >
        {/* Background "After" Image (Finished State) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter saturate-[0.95]"
        />

        {/* Foreground "Before" Image (Raw / Construction State) with Clip Path */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.9]"
          />
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#171717] border border-white flex items-center justify-center text-white shadow-xl pointer-events-auto cursor-ew-resize">
            <span className="text-[10px] tracking-tighter">◀ ▶</span>
          </div>
        </div>

        {/* Bottom Left Label: Before */}
        <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10 pointer-events-none">
          {beforeLabel} ({Math.round(sliderPosition)}%)
        </div>

        {/* Bottom Right Label: After */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10 pointer-events-none">
          {afterLabel} ({Math.round(100 - sliderPosition)}%)
        </div>
      </div>

      <div className="mt-3 flex justify-between items-center text-[11px] font-mono-subtle text-[#6B6B65]">
        <span>DRAG SLIDER HORIZONTALLY TO COMPARE</span>
        <span>RAW FOUNDATION ↔ BUILT RESIDENCE</span>
      </div>
    </div>
  );
};
