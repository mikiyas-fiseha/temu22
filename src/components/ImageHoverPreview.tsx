import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';

interface ImageHoverPreviewProps {
  image: string | null;
  title: string | null;
  visible: boolean;
}

export const ImageHoverPreview: React.FC<ImageHoverPreviewProps> = ({
  image,
  title,
  visible,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Only run on desktop devices with fine pointer
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX + 32;
      posRef.current.targetY = e.clientY - 120;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Smooth RAF interpolation
    let animationFrameId: number;
    const updatePosition = () => {
      const ease = 0.14;
      posRef.current.x += (posRef.current.targetX - posRef.current.x) * ease;
      posRef.current.y += (posRef.current.targetY - posRef.current.y) * ease;

      if (previewRef.current) {
        gsap.set(previewRef.current, {
          x: posRef.current.x,
          y: posRef.current.y,
        });
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;

    if (visible && image) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 2.5,
        duration: 0.45,
        ease: 'power3.out',
      });
    } else {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -2,
        duration: 0.35,
        ease: 'power3.in',
      });
    }
  }, [visible, image]);

  if (!image) return null;

  return (
    <div
      ref={previewRef}
      className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 will-change-transform hidden md:block"
      style={{ transform: 'scale(0.8)' }}
    >
      <div className="w-64 h-80 rounded-sm overflow-hidden shadow-2xl bg-[#171717] border border-[#F5F3EE]/20 p-1.5 backdrop-blur-sm">
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={image}
            alt={title || 'Preview'}
            className="w-full h-full object-cover object-center"
          />
          {title && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="font-mono-subtle text-[10px] tracking-widest text-[#F5F3EE] uppercase truncate">
                {title}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
