'use client';

import { useEffect, useState } from 'react';

const galleryPhotos = [
  { src: '/images/gallery/gallery-01.jpg', alt: 'Guilherme Bresolin em ação durante uma prova de motocross' },
  { src: '/images/gallery/gallery-02.jpg', alt: 'Bresolin conduzindo a moto número 109 na pista' },
  { src: '/images/gallery/gallery-03.jpg', alt: 'Bresolin disputando uma etapa da temporada' },
  { src: '/images/gallery/gallery-04.jpg', alt: 'Bresolin acelerando durante uma corrida' },
  { src: '/images/gallery/gallery-05.jpg', alt: 'Bresolin em uma curva de terra durante a prova' },
  { src: '/images/gallery/gallery-06.jpg', alt: 'Piloto Guilherme Bresolin em movimento na pista' },
  { src: '/images/gallery/gallery-07.jpg', alt: 'Detalhe da participação de Bresolin na corrida' },
  { src: '/images/gallery/gallery-08.jpg', alt: 'Bresolin competindo com a moto verde' },
  { src: '/images/gallery/gallery-09.jpg', alt: 'Guilherme Bresolin durante uma bateria de motocross' },
  { src: '/images/gallery/gallery-10.jpg', alt: 'Bresolin avançando pela pista de terra' },
  { src: '/images/gallery/gallery-11.jpg', alt: 'Registro de Bresolin durante a competição' },
  { src: '/images/gallery/gallery-12.jpg', alt: 'Bresolin pilotando a moto número 109' },
];

const desktopSlides = Array.from({ length: Math.ceil(galleryPhotos.length / 4) }, (_, index) =>
  galleryPhotos.slice(index * 4, index * 4 + 4),
);

export default function GalleryCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const gallerySlides = isMobile ? galleryPhotos.map((photo) => [photo]) : desktopSlides;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 640px), (min-width: 641px) and (max-width: 1050px) and (orientation: portrait), (max-width: 950px) and (max-height: 520px)',
    );
    const updateLayout = () => {
      setIsMobile(mediaQuery.matches);
      setActiveSlide(0);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    return () => mediaQuery.removeEventListener('change', updateLayout);
  }, []);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + gallerySlides.length) % gallerySlides.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % gallerySlides.length);
  };

  return (
    <section className="gallery" id="galeria" aria-labelledby="gallery-title">
      <h2 className="gallery__heading" id="gallery-title">Galeria</h2>

      <div className="gallery__panel">
        <div className="gallery__carousel">
          <button
            className="gallery__arrow gallery__arrow--previous"
            type="button"
            onClick={showPrevious}
            aria-label="Mostrar fotos anteriores"
          >
            ‹
          </button>

          <div className="gallery__viewport" aria-live="polite">
            <div
              className="gallery__track"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {gallerySlides.map((slide, slideIndex) => (
                <div
                  className="gallery__slide"
                  key={slideIndex}
                  aria-hidden={activeSlide !== slideIndex}
                >
                  {slide.map((photo, photoIndex) => (
                    <figure className="gallery__photo" key={`${slideIndex}-${photoIndex}`}>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="gallery__arrow gallery__arrow--next"
            type="button"
            onClick={showNext}
            aria-label="Mostrar próximas fotos"
          >
            ›
          </button>
        </div>

        <div className="gallery__dots" aria-label="Selecionar fotos">
          {gallerySlides.map((_, index) => (
            <button
              className={index === activeSlide ? 'gallery__dot gallery__dot--active' : 'gallery__dot'}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Mostrar slide ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              key={index}
            />
          ))}
        </div>

        <a
          className="gallery__all"
          href="https://drive.google.com/drive/folders/1lWqiBmgUaRGjwKf4pL_FOM0OVabEMj3B?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver todas
        </a>
      </div>
    </section>
  );
}
