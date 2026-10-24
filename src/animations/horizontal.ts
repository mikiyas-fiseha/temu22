import { gsap } from './gsapInit';

export interface HorizontalScrollOptions {
  container: HTMLElement;
  slider: HTMLElement;
  trigger?: HTMLElement;
}

export const createHorizontalScroll = ({
  container,
  slider,
  trigger = container,
}: HorizontalScrollOptions) => {
  if (typeof window === 'undefined') return;

  const totalWidth = slider.scrollWidth - window.innerWidth;
  if (totalWidth <= 0) return;

  const ctx = gsap.context(() => {
    gsap.to(slider, {
      x: () => -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: () => `+=${totalWidth * 1.1}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  }, container);

  return () => ctx.revert();
};
