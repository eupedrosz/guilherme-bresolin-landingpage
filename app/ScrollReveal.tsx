'use client';

import { useEffect } from 'react';

const revealGroups = [
  { selector: '.season__title, .season-video__title, .history-copy__title, .gallery__heading', variant: 'left' },
  { selector: '.season-card, .history-copy__body, .season-video__subscribe, .site-footer__inner', variant: 'up' },
  { selector: '.season-video__frame, .history-copy__photos figure, .history-copy__feature-photo, .history-copy__milestone-video, .gallery__panel', variant: 'zoom' },
  { selector: '.history-copy__milestone-title, .sponsors', variant: 'fade' },
  { selector: '.contact__intro', variant: 'left' },
  { selector: '.contact-form', variant: 'right' },
] as const;

export default function ScrollReveal() {
  useEffect(() => {
    const motionQuery = window.matchMedia(
      '(min-width: 1051px), (min-width: 641px) and (max-width: 1050px) and (min-height: 521px)',
    );
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    let targets: HTMLElement[] = [];
    let cleanupTimers: number[] = [];

    const reset = () => {
      observer?.disconnect();
      observer = null;
      cleanupTimers.forEach((timer) => window.clearTimeout(timer));
      cleanupTimers = [];
      document.documentElement.classList.remove('scroll-reveal-ready');

      targets.forEach((target) => {
        target.classList.remove('is-revealed');
        target.removeAttribute('data-scroll-reveal');
        target.style.removeProperty('--reveal-delay');
      });
      targets = [];
    };

    const setup = () => {
      reset();

      if (!motionQuery.matches || reducedMotionQuery.matches) return;

      revealGroups.forEach(({ selector, variant }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((target, index) => {
          target.dataset.scrollReveal = variant;
          target.style.setProperty('--reveal-delay', `${(index % 4) * 70}ms`);
          targets.push(target);
        });
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            const delay = Number.parseInt(target.style.getPropertyValue('--reveal-delay'), 10) || 0;

            target.classList.add('is-revealed');
            observer?.unobserve(target);

            cleanupTimers.push(window.setTimeout(() => {
              target.classList.remove('is-revealed');
              target.removeAttribute('data-scroll-reveal');
              target.style.removeProperty('--reveal-delay');
              targets = targets.filter((item) => item !== target);
            }, 820 + delay));
          });
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.12,
        },
      );

      targets.forEach((target) => observer?.observe(target));
      requestAnimationFrame(() => {
        document.documentElement.classList.add('scroll-reveal-ready');
      });
    };

    setup();
    motionQuery.addEventListener('change', setup);
    reducedMotionQuery.addEventListener('change', setup);

    return () => {
      motionQuery.removeEventListener('change', setup);
      reducedMotionQuery.removeEventListener('change', setup);
      reset();
    };
  }, []);

  return null;
}
