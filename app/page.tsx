const navItems = ['Home', 'História', 'Galeria', 'Contato'];
const waveRows = [0, 1, 2, 3];
const letters = 'BRESOLIN'.split('');

function SocialIcon({ type }: { type: 'tiktok' | 'youtube' | 'instagram' }) {
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

function WavyName() {
  return (
    <div className="name-wave" aria-label="Bresolin">
      {waveRows.map((row) => (
        <div
          className="name-wave__row"
          key={row}
          aria-hidden="true"
          style={{ '--row': row } as React.CSSProperties}
        >
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              style={{ '--letter': index } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero__scene" aria-hidden="true" />
        <div className="hero__shade" aria-hidden="true" />

        <header className="site-header">
          <a className="skip-link" href="#hero-title">
            Ir para o conteúdo
          </a>
          <nav className="site-nav" aria-label="Navegação principal">
            {navItems.map((item, index) => (
              <a
                className={`site-nav__link${index === 0 ? ' is-active' : ''}`}
                href={index === 0 ? '#home' : `#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        <div className="hero__content">
          <h1 className="hero__title" id="hero-title">
            <span>Guilherme</span>
            <span className="hero__surname">Bresolin</span>
          </h1>

          <div className="hero__lower">
            <div className="hero__number" aria-label="Número 109">
              109
            </div>
            <WavyName />
          </div>

          <div className="socials" id="redes-sociais">
            <p className="socials__label">Redes<br />Sociais</p>
            <div className="socials__links">
              <a href="#redes-sociais" aria-label="TikTok de Guilherme Bresolin">
                <SocialIcon type="tiktok" />
              </a>
              <a href="#redes-sociais" aria-label="YouTube de Guilherme Bresolin">
                <SocialIcon type="youtube" />
              </a>
              <a href="#redes-sociais" aria-label="Instagram de Guilherme Bresolin">
                <SocialIcon type="instagram" />
              </a>
            </div>
          </div>
        </div>

        <img
          className="hero__rider"
          src="/images/guilherme-bresolin.png"
          alt="Guilherme Bresolin sorrindo com uniforme de motocross"
        />
      </section>
    </main>
  );
}
