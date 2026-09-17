'use client';

import { useEffect, useState } from 'react';
import DesktopStoryMenu from './DesktopStoryMenu';

type NavigationItem = {
  label: string;
  href: string;
};

export default function SiteNavigation({ items }: { items: readonly NavigationItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <nav className={`site-nav${isOpen ? ' site-nav--open' : ''}`} aria-label="Navegação principal">
      <a className="site-nav__wordmark" href="#home" aria-label="Voltar ao início">
        <img src="/images/texto-bresolin.png" alt="Bresolin" width="521" height="274" />
      </a>

      <a className="site-nav__brand" href="#home" aria-label="Voltar ao início">
        <span className="site-nav__brand-mark" aria-hidden="true">
          <img src="/favicon-512x512.png" alt="" width="512" height="512" />
        </span>
      </a>

      <button
        className="site-nav__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="site-nav__links" id="primary-navigation">
        {items.map((item) => (
          <a
            className="site-nav__link"
            href={item.href}
            aria-current={item.href === '#home' ? 'page' : undefined}
            key={item.label}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>

      <DesktopStoryMenu />
    </nav>
  );
}
