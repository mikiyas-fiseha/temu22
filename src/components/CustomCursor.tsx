import React, { useEffect, useRef } from 'react';
import { gsap } from '../animations/gsapInit';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Don't render on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        gsap.set(dotRef.current, { x: mouseX, y: mouseY, opacity: 1 });
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) gsap.set(dotRef.current, { opacity: 0 });
      if (ringRef.current) gsap.set(ringRef.current, { opacity: 0 });
    };

    // Hover effect on links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, [data-cursor-expand]');
      if (isInteractive && ringRef.current) {
        gsap.to(ringRef.current, { scale: 1.6, borderColor: 'rgba(23,23,23,0.7)', duration: 0.25 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, [data-cursor-expand]');
      if (isInteractive && ringRef.current) {
        gsap.to(ringRef.current, { scale: 1, borderColor: 'rgba(23,23,23,0.25)', duration: 0.25 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let rafId: number;
    const loop = () => {
      const ease = 0.18;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        gsap.set(ringRef.current, { x: ringX, y: ringY, opacity: 1 });
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#171717] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-0 will-change-transform"
      />
      {/* Subtle Trailing Geometric Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-[#171717]/25 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block opacity-0 will-change-transform transition-colors"
      />
    </>
  );
};
