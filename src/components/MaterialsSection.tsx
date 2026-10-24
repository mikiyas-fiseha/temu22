import React, { useEffect, useRef } from 'react';
import { MaterialLoupeCard, type MaterialItemData } from './MaterialLoupeCard';
import { gsap } from '../animations/gsapInit';

const DETAILED_MATERIALS: MaterialItemData[] = [
  {
    name: 'CONCRETE',
    role: 'Structural Honesty',
    aspect: 'tall',
    description: 'Board-formed, raw and pigmented concrete celebrating tectonic grain and permanence.',
    image: '/images/mat_concrete.jpg',
    origin: 'Locally batched volcanic pozzolanic aggregate',
    finish: 'Board-formed horizontal pine formwork grain',
    thermal: 'High thermal mass with passive solar absorption',
  },
  {
    name: 'WOOD',
    role: 'Warmth & Tactility',
    aspect: 'wide',
    description: 'Ethically harvested rift oak and warm cedar aged with organic beeswax finishes.',
    image: '/images/mat_wood.jpg',
    origin: 'Certified highland rift oak & white cedar',
    finish: 'Hand-rubbed organic beeswax and cold-pressed tung oil',
    thermal: 'Acoustic softening and carbon-sequestering joinery',
  },
  {
    name: 'STONE',
    role: 'Topographical Anchor',
    aspect: 'tall',
    description: 'Native Ethiopian basalt, honed travertine, and chiseled limestone slabs.',
    image: '/images/mat_stone.jpg',
    origin: 'Quarried 40km north in Oromia, Ethiopia',
    finish: 'Bush-hammered textured plinth & sawn flagstone',
    thermal: 'High night thermal radiation for highland evenings',
  },
  {
    name: 'GLASS',
    role: 'Aperture & Horizon',
    aspect: 'wide',
    description: 'Ultra-clear low-iron acoustic glazing establishing continuous outdoor dialogue.',
    image: '/images/mat_glass.jpg',
    origin: 'Ultra-clear low-iron acoustic float glazing',
    finish: 'Double-glazed with argon gas cavity and solar film',
    thermal: 'SHGC: 0.28 / U-Value: 1.1 W/m²K',
  },
  {
    name: 'METAL',
    role: 'Precision & Contrast',
    aspect: 'tall',
    description: 'Blackened structural steel, hand-patinated bronze hardware, and architectural zinc.',
    image: '/images/mat_metal.jpg',
    origin: 'Artisan architectural steel & cast bronze alloy',
    finish: 'Chemical blackening with microcrystalline wax sealant',
    thermal: 'Precision laser-cut architectural tolerances',
  },
  {
    name: 'TEXTILE',
    role: 'Acoustic Softness',
    aspect: 'square',
    description: 'Raw Belgian linen, handspun Ethiopian cotton, and natural wool tapestries.',
    image: '/images/mat_textile.jpg',
    origin: 'Traditional handloom spun cotton & organic wool',
    finish: 'Unbleached natural loom texture with raw selvage',
    thermal: 'Class-A acoustic reverberation dampening',
  },
];

export const MaterialsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const ctx = gsap.context(() => {
      // Differential parallax speeds for depth
      const items = gsap.utils.toArray<HTMLElement>('.material-parallax-item');
      items.forEach((item, index) => {
        const speed = (index % 3 + 1) * 20; // 20px, 40px, 60px
        gsap.to(item, {
          y: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-36 bg-[#F2F0EB] text-[#171717] overflow-hidden"
      aria-label="PROLIQ Materiality"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header with balanced typography */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 md:mb-20 gap-6 border-b border-[#171717]/15 pb-6">
          <div>
            <p className="font-mono-subtle text-xs tracking-[0.25em] text-[#8A7E72] uppercase mb-2 font-semibold">
              TACTILE HONESTY / 05
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#171717] leading-[0.98]">
              MATERIAL.<br />
              LIGHT.<br />
              <span className="text-[#6B6B65]">SPACE.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-[#6B6B65] font-light leading-relaxed mb-2">
              We select raw textures that record the passage of sunlight, weather, and touch.
            </p>
            <p className="font-mono-subtle text-xs text-[#8A7E72] uppercase">
              HOVER FOR 2X MACRO LOUPE — CLICK FOR ORIGIN SPECS
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Composition with Loupe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Item 1: CONCRETE (Tall - 7 cols) */}
          <div className="md:col-span-7 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[0]}
              className="h-[48vh] sm:h-[58vh]"
            />
          </div>

          {/* Item 2: WOOD (Wide - 5 cols) */}
          <div className="md:col-span-5 md:pt-14 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[1]}
              className="h-[36vh] sm:h-[44vh]"
            />
          </div>

          {/* Item 3: STONE (5 cols) */}
          <div className="md:col-span-5 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[2]}
              className="h-[40vh] sm:h-[48vh]"
            />
          </div>

          {/* Item 4: GLASS (7 cols) */}
          <div className="md:col-span-7 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[3]}
              className="h-[40vh] sm:h-[48vh]"
            />
          </div>

          {/* Item 5: METAL (6 cols) */}
          <div className="md:col-span-6 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[4]}
              className="h-[36vh] sm:h-[44vh]"
            />
          </div>

          {/* Item 6: TEXTILE (6 cols) */}
          <div className="md:col-span-6 md:pt-10 material-parallax-item">
            <MaterialLoupeCard
              material={DETAILED_MATERIALS[5]}
              className="h-[36vh] sm:h-[44vh]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
