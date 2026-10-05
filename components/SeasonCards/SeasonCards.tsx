'use client';

import { useEffect, useState } from 'react';

type SeasonRound = {
  city: string;
  image: string;
  alt: string;
  videoUrl: string;
};

export default function SeasonCards({ rounds }: { rounds: readonly SeasonRound[] }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 640px), (max-width: 950px) and (max-height: 520px)',
    );
    let rotationTimer: number | undefined;

    const updateRotation = () => {
      if (rotationTimer) window.clearInterval(rotationTimer);

      if (!mediaQuery.matches) {
        setActiveCard(null);
        return;
      }

      let currentCard = 0;
      let isHighlightVisible = true;
      setActiveCard(0);

      rotationTimer = window.setInterval(() => {
        if (isHighlightVisible) {
          setActiveCard(null);
        } else {
          currentCard = (currentCard + 1) % rounds.length;
          setActiveCard(currentCard);
        }

        isHighlightVisible = !isHighlightVisible;
      }, 30_000);
    };

    updateRotation();
    mediaQuery.addEventListener('change', updateRotation);

    return () => {
      mediaQuery.removeEventListener('change', updateRotation);
      if (rotationTimer) window.clearInterval(rotationTimer);
    };
  }, [rounds.length]);

  return (
    <div className="season__grid">
      {rounds.map((round, index) => (
        <figure className="season-card" key={round.city}>
          <a
            className={`season-card__media${activeCard === index ? ' season-card__media--active' : ''}`}
            href={round.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver vídeo da etapa de ${round.city} no YouTube`}
          >
            <img src={round.image} alt={round.alt} loading="lazy" />
            <span className="season-card__action">Ver vídeo</span>
          </a>
          <figcaption>{round.city}</figcaption>
        </figure>
      ))}
    </div>
  );
}
