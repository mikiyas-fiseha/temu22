import { gsap } from './gsapInit';

export interface TextRevealOptions {
  trigger?: Element | string;
  start?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  yOffset?: number;
}

export const splitTextReveal = (
  lines: gsap.DOMTarget,
  options: TextRevealOptions = {}
) => {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(lines, { opacity: 1, y: 0 });
    return;
  }

  const {
    trigger = lines as Element,
    start = 'top 85%',
    stagger = 0.16,
    duration = 1.3,
    delay = 0,
    yOffset = 45,
  } = options;

  return gsap.fromTo(
    lines,
    {
      opacity: 0,
      y: yOffset,
      rotateX: 10,
      transformOrigin: '0% 50% -50',
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};
