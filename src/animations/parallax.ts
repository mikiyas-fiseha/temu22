import { gsap } from './gsapInit';

export interface ParallaxOptions {
  trigger?: Element | string;
  start?: string;
  end?: string;
  speed?: number; // y distance in percent or pixels
  direction?: 'up' | 'down';
  scrub?: boolean | number;
}

export const parallaxImage = (
  target: gsap.DOMTarget,
  options: ParallaxOptions = {}
) => {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const {
    trigger = target as Element,
    start = 'top bottom',
    end = 'bottom top',
    speed = 12, // percentage shift
    direction = 'up',
    scrub = 1,
  } = options;

  const yFrom = direction === 'up' ? `${speed}%` : `-${speed}%`;
  const yTo = direction === 'up' ? `-${speed}%` : `${speed}%`;

  return gsap.fromTo(
    target,
    { y: yFrom },
    {
      y: yTo,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    }
  );
};

export const parallaxElement = (
  target: gsap.DOMTarget,
  yOffset: number = 80,
  trigger?: Element | string
) => {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  return gsap.to(target, {
    y: -yOffset,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || (target as Element),
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
    },
  });
};
