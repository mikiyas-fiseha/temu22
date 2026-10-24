import { gsap } from './gsapInit';

export const animatePageIn = (overlayEl: HTMLElement, onComplete?: () => void) => {
  if (!overlayEl) return;
  return gsap.fromTo(
    overlayEl,
    { scaleY: 1, transformOrigin: 'bottom' },
    {
      scaleY: 0,
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete,
    }
  );
};

export const animatePageOut = (overlayEl: HTMLElement, onComplete?: () => void) => {
  if (!overlayEl) return;
  return gsap.fromTo(
    overlayEl,
    { scaleY: 0, transformOrigin: 'top' },
    {
      scaleY: 1,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete,
    }
  );
};
