import React, { useState, useRef } from 'react';
import { Eye, MapPin, Sparkles } from 'lucide-react';

export interface MaterialItemData {
  name: string;
  role: string;
  aspect: string;
  description: string;
  image: string;
  origin?: string;
  finish?: string;
  thermal?: string;
}

interface MaterialLoupeCardProps {
  material: MaterialItemData;
  className?: string;
}

export const MaterialLoupeCard: React.FC<MaterialLoupeCardProps> = ({
  material,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, relX: 50, relY: 50 });
  const [showSpecs, setShowSpecs] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relX = (x / rect.width) * 100;
    const relY = (y / rect.height) * 100;
    setLoupePos({ x, y, relX, relY });
  };

  return (
    <div className={`relative group flex flex-col ${className}`}>
      {/* Interactive Image Frame with Loupe */}
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setShowSpecs(!showSpecs)}
        className="relative w-full h-full overflow-hidden bg-[#171717]/10 border border-[#171717]/15 shadow-sm cursor-crosshair select-none"
      >
        {/* Base Texture Image */}
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter saturate-[0.92]"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10 z-10">
          {material.name}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowSpecs(!showSpecs);
          }}
          className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono-subtle tracking-widest text-[#F5F3EE] uppercase border border-white/10 hover:bg-white hover:text-black transition-colors z-10 flex items-center gap-1.5"
        >
          <Eye className="w-3 h-3" />
          <span>{showSpecs ? 'CLOSE' : 'ORIGIN SPECS'}</span>
        </button>

        {/* 2X Magnifying Tactile Loupe on Hover (Desktop) */}
        {isHovered && !showSpecs && (
          <div
            className="hidden md:block absolute w-28 h-28 rounded-full pointer-events-none border-2 border-white/80 shadow-2xl overflow-hidden z-20 -translate-x-1/2 -translate-y-1/2 backdrop-blur-none"
            style={{
              left: `${loupePos.x}px`,
              top: `${loupePos.y}px`,
              backgroundImage: `url(${material.image})`,
              backgroundPosition: `${loupePos.relX}% ${loupePos.relY}%`,
              backgroundSize: '250%',
            }}
          >
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="font-mono-subtle text-[8px] text-white/90 bg-black/50 px-1 rounded tracking-widest uppercase">
                2X MACRO
              </span>
            </div>
          </div>
        )}

        {/* Tactile Origin Specs Overlay Drawer */}
        {showSpecs && (
          <div className="absolute inset-0 bg-[#171717]/90 backdrop-blur-md p-6 flex flex-col justify-between text-[#F5F3EE] z-30 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2 text-[#8A7E72] font-mono-subtle text-xs tracking-widest uppercase mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>REGIONAL SPECIFICATION</span>
              </div>
              <h4 className="font-editorial text-xl font-bold text-[#F5F3EE] mb-2">
                {material.name} — {material.role}
              </h4>
              <p className="text-xs text-[#F5F3EE]/80 leading-relaxed font-light mb-4">
                {material.description}
              </p>

              <div className="space-y-2 border-t border-white/10 pt-3 text-[11px] font-mono-subtle">
                <div className="flex justify-between">
                  <span className="text-[#8A7E72]">PROVENANCE:</span>
                  <span className="text-white">{material.origin || 'Addis Ababa / Regional Highland quarries'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E72]">SURFACE FINISH:</span>
                  <span className="text-white">{material.finish || 'Hand-planed / Honed raw matte'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A7E72]">PERFORMANCE:</span>
                  <span className="text-white">{material.thermal || 'High thermal inertia / Low embodied carbon'}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono-subtle text-[#8A7E72] pt-2 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                TACTILE HONESTY
              </span>
              <button
                onClick={() => setShowSpecs(false)}
                className="underline uppercase hover:text-white"
              >
                RETURN TO PREVIEW
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Caption info below */}
      <div className="mt-3 flex justify-between items-baseline">
        <p className="font-editorial text-lg font-bold text-[#171717]">
          {material.role}
        </p>
        <p className="text-xs text-[#6B6B65] font-mono-subtle">
          {material.description}
        </p>
      </div>
    </div>
  );
};
