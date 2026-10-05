'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

const storyLinks = [
  { label: 'História', href: '#historia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Títulos', href: '#titulos' },
  { label: 'Arena', href: '#arena' },
  { label: 'MX1GP', href: '#mx1gp' },
  { label: 'MXON', href: '#mxon-history' },
];

const socialLinks = [
  { type: 'tiktok', href: 'https://www.tiktok.com/@bresolin109', label: 'TikTok de Guilherme Bresolin' },
  { type: 'youtube', href: 'https://www.youtube.com/@bresolin109', label: 'YouTube de Guilherme Bresolin' },
  { type: 'instagram', href: 'https://www.instagram.com/bresolin109', label: 'Instagram de Guilherme Bresolin' },
] as const;

function SocialIcon({ type }: { type: (typeof socialLinks)[number]['type'] }) {
  if (type === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3v11.2a4.3 4.3 0 1 1-3.5-4.2" />
      <path d="M14 3c.7 2.8 2.3 4.5 5 5" />
    </svg>
  );
}

function AnimatedMenuLabel({ label }: { label: string }) {
  const characters = Array.from(label);

  return (
    <span className="story-hub__link-text" aria-hidden="true">
      <span className="story-hub__link-layer story-hub__link-layer--base">
        {characters.map((character, index) => (
          <span
            className="story-hub__link-char"
            key={`base-${character}-${index}`}
            style={{ '--char-delay': `${index * 24}ms` } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
      <span className="story-hub__link-layer story-hub__link-layer--accent">
        {characters.map((character, index) => (
          <span
            className="story-hub__link-char"
            key={`accent-${character}-${index}`}
            style={{ '--char-delay': `${index * 24}ms` } as CSSProperties}
          >
            {character}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function DesktopStoryMenu() {
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setIsClosing(false);
    setIsRendered(true);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsOpen(true));
    });
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setIsClosing(true);
    setIsOpen(false);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setIsRendered(false);
      setIsClosing(false);
      if (returnFocus) toggleRef.current?.focus();
    }, 1080);
  }, []);

  useEffect(() => {
    if (!isRendered) return;

    document.body.classList.add('story-menu-is-open');

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      document.body.classList.remove('story-menu-is-open');
    };
  }, [closeMenu, isRendered]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const handleToggle = () => {
    if (isRendered) closeMenu();
    else openMenu();
  };

  const handleLinkClick = () => closeMenu(false);

  return (
    <>
      <a
        className={`desktop-contact-button${isRendered ? ' desktop-contact-button--hidden' : ''}`}
        href="#contato"
        aria-label="Ir para contato"
        aria-hidden={isRendered}
        tabIndex={isRendered ? -1 : 0}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4.5 7 7.5 6 7.5-6" />
        </svg>
        <AnimatedMenuLabel label="Contato" />
      </a>

      <button
        className={`desktop-story-menu__toggle${isOpen ? ' desktop-story-menu__toggle--open' : ''}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls="desktop-story-menu"
        aria-label={isOpen ? 'Fechar navegação especial' : 'Abrir navegação especial'}
        onClick={handleToggle}
        ref={toggleRef}
      >
        <span />
        <span />
      </button>

      {isRendered ? (
        <section
          className={`story-hub story-hub--overlay${isOpen ? ' story-hub--open' : ''}${isClosing ? ' story-hub--closing' : ''}`}
          id="desktop-story-menu"
          role="dialog"
          aria-modal="true"
          aria-label="História e títulos"
          aria-hidden={!isOpen}
        >
          <div className="story-hub__backdrop" aria-hidden="true" />
          <div className="story-hub__brand" aria-hidden="true">
            <div className="story-hub__brand-mark">
              <img className="story-hub__brand-logo story-hub__brand-logo--base" src="/favicon-512x512.png" alt="" width="512" height="512" />
            </div>
          </div>

          <div className="story-hub__socials" aria-label="Redes sociais de Guilherme Bresolin">
            {socialLinks.map((item, index) => (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                key={item.type}
                style={{ '--social-delay': `${430 + index * 80}ms` } as CSSProperties}
                tabIndex={isOpen ? 0 : -1}
              >
                <SocialIcon type={item.type} />
              </a>
            ))}
          </div>

          <nav className="story-hub__titles story-hub__titles--all" aria-label="Conteúdos sobre Guilherme Bresolin">
            {storyLinks.map((item, index) => (
              <a
                href={item.href}
                aria-label={item.label}
                key={item.label}
                onClick={handleLinkClick}
                style={{
                  '--story-delay': `${250 + index * 65}ms`,
                  '--story-close-delay': `${(5 - index) * 55}ms`,
                } as CSSProperties}
                tabIndex={isOpen ? 0 : -1}
              >
                <AnimatedMenuLabel label={item.label} />
              </a>
            ))}
          </nav>
        </section>
      ) : null}
    </>
  );
}
