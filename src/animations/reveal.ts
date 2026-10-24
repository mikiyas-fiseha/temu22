import { gsap } from './gsapInit';

export interface AnimationOptions {
  trigger?: Element | string;
  start?: string;
  end?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  scrub?: boolean | number;
  markers?: boolean;
}

const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const fadeUp = (
  targets: gsap.DOMTarget,
  options: AnimationOptions = {}
) => {
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  const {
    trigger = targets as Element,
    start = 'top 85%',
    delay = 0,
    duration = 1.2,
    ease = 'power3.out',
    stagger = 0.12,
  } = options;

  gsap.fromTo(
    targets,
    { opacity: 0, y: 45 },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

export const fadeIn = (
  targets: gsap.DOMTarget,
  options: AnimationOptions = {}
) => {
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1 });
    return;
  }

  const {
    trigger = targets as Element,
    start = 'top 88%',
    delay = 0,
    duration = 1.4,
    ease = 'power2.out',
    stagger = 0.1,
  } = options;

  gsap.fromTo(
    targets,
    { opacity: 0 },
    {
      opacity: 1,
      duration,
      delay,
      ease,
      stagger,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
};

/**
 * Editorial Image Reveal:
 * Container expands via clip-path while image inside scales gently from 1.15 to 1.
 */
export const revealImage = (
  container: HTMLElement | string,
  imageTarget?: HTMLElement | string,
  options: AnimationOptions = {}
) => {
  if (isReducedMotion()) {
    gsap.set(container, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
    if (imageTarget) gsap.set(imageTarget, { scale: 1 });
    return;
  }

  const {
    trigger = container as Element,
    start = 'top 82%',
    duration = 1.6,
    ease = 'power4.inOut',
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
  });

  tl.fromTo(
    container,
    {
      clipPath: 'inset(14% 0% 14% 0%)',
      opacity: 0.4,
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration,
      ease,
    }
  );

  if (imageTarget) {
    tl.fromTo(
      imageTarget,
      {
        scale: 1.18,
      },
      {
        scale: 1,
        duration: duration * 1.2,
        ease: 'power3.out',
      },
      0
    );
  }

  return tl;
};

export const scaleOnScroll = (
  target: gsap.DOMTarget,
  options: AnimationOptions = {}
) => {
  if (isReducedMotion()) return;

  const {
    trigger = target as Element,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1.2,
  } = options;

  gsap.fromTo(
    target,
    { scale: 1.08 },
    {
      scale: 0.98,
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
