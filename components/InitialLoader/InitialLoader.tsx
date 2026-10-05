'use client';

import { useEffect, useState } from 'react';

type LoaderPhase = 'visible' | 'leaving' | 'hidden';

export default function InitialLoader() {
  const [phase, setPhase] = useState<LoaderPhase>('visible');

  useEffect(() => {
    const startedAt = performance.now();
    let hasFinished = false;
    let leaveTimer: number | undefined;
    let hideTimer: number | undefined;

    const hideLoader = () => {
      if (hasFinished) return;
      hasFinished = true;
      setPhase('leaving');

      hideTimer = window.setTimeout(() => {
        document.body.classList.remove('site-is-loading');
        setPhase('hidden');
      }, 720);
    };

    const prepareFirstView = async () => {
      const heroImage = document.querySelector<HTMLImageElement>('.hero__rider');
      const criticalResources: Promise<unknown>[] = [document.fonts.ready];

      if (heroImage && !heroImage.complete) {
        criticalResources.push(heroImage.decode());
      }

      await Promise.race([
        Promise.allSettled(criticalResources),
        new Promise((resolve) => window.setTimeout(resolve, 2200)),
      ]);

      const minimumDuration = Math.max(0, 5000 - (performance.now() - startedAt));
      leaveTimer = window.setTimeout(hideLoader, minimumDuration);
    };

    const handleWindowLoad = () => void prepareFirstView();

    if (document.readyState === 'complete') {
      handleWindowLoad();
    } else {
      window.addEventListener('load', handleWindowLoad, { once: true });
    }

    const fallbackTimer = window.setTimeout(hideLoader, 6500);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      window.clearTimeout(fallbackTimer);
      if (leaveTimer) window.clearTimeout(leaveTimer);
      if (hideTimer) window.clearTimeout(hideTimer);
      document.body.classList.remove('site-is-loading');
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={`initial-loader${phase === 'leaving' ? ' initial-loader--leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Carregando o site de Guilherme Bresolin"
    >
      <div className="initial-loader__content">
        <div className="initial-loader__mark" aria-hidden="true">
          <span className="initial-loader__ring" />
          <img src="/favicon-512x512.png" alt="" width="152" height="152" />
        </div>

        <p className="initial-loader__name">Guilherme Bresolin</p>

        <div className="initial-loader__progress" aria-hidden="true">
          <span />
        </div>

        <span className="initial-loader__label">Carregando</span>
      </div>
    </div>
  );
}
