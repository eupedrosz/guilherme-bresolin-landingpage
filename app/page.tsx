import GalleryCarousel from './GalleryCarousel';
import ContactSection from './ContactSection';
import CookieConsent from './CookieConsent';
import SiteNavigation from './SiteNavigation';
import SeasonCards from './SeasonCards';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Institucional', href: '#historia' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#contato' },
];

const seasonRounds = [
  {
    city: 'Interlagos-SP',
    image: '/images/temporada/1.webp',
    alt: 'Guilherme Bresolin disputando uma prova noturna em Interlagos',
    videoUrl: 'https://youtu.be/BRfOa_oJ2R4',
  },
  {
    city: 'Santa Cruz-PE',
    image: '/images/temporada/2.webp',
    alt: 'Guilherme Bresolin saltando com a moto em Santa Cruz',
    videoUrl: 'https://youtu.be/yvVLQd3L7Ms',
  },
  {
    city: 'Goiânia-GO',
    image: '/images/temporada/3.webp',
    alt: 'Guilherme Bresolin contornando uma curva de terra em Goiânia',
    videoUrl: 'https://youtu.be/3uxE05iAU_o',
  },
];

const sponsorLogos = [
  { src: '/images/sponsors/alpinestars.png', alt: 'Alpinestars' },
  { src: '/images/sponsors/kawasaki.png', alt: 'Kawasaki' },
  { src: '/images/sponsors/logo.png', alt: 'Vibe Energy Drink' },
  { src: '/images/sponsors/motul-tight.png', alt: 'Motul' },
  { src: '/images/sponsors/pirelli-tight.png', alt: 'Pirelli' },
  { src: '/images/sponsors/bud-racing.png', alt: 'Bud Racing' },
  { src: '/images/sponsors/sacramento.svg', alt: 'Sacramento' },
  { src: '/images/sponsors/aguai.png', alt: 'Águaí Água Mineral Natural', className: 'sponsors__logo--aguai' },
  { src: '/images/sponsors/dropmud.svg', alt: 'Dropmud' },
  { src: '/images/sponsors/durag.webp', alt: 'Durag Racing Industry' },
  { src: '/images/sponsors/rock-solid.webp', alt: 'Rock Solid Eyewear' },
  { src: '/images/sponsors/tg.png', alt: 'TG', className: 'sponsors__logo--tg' },
  { src: '/images/sponsors/zombie-industries.png', alt: 'Zombie Industries' },
];

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

function SponsorsMarquee({ className = '' }: { className?: string }) {
  return (
    <section className={`sponsors ${className}`.trim()} aria-label="Patrocinadores e parceiros">
      <div className="sponsors__viewport">
        <div className="sponsors__track">
          {[false, true].map((duplicate) => (
            <div className="sponsors__group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'original'}>
              {sponsorLogos.map((sponsor) => (
                <div
                  className={`sponsors__logo ${sponsor.className ?? ''}`.trim()}
                  key={`${duplicate ? 'duplicate' : 'original'}-${sponsor.alt}`}
                >
                  <img src={sponsor.src} alt={duplicate ? '' : sponsor.alt} loading="lazy" draggable="false" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
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
          <SiteNavigation items={navItems} />
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
            <div className="socials" id="redes-sociais">
              <p className="socials__label">Redes<br />Sociais</p>
              <div className="socials__links">
                <a
                  href="https://www.tiktok.com/@bresolin109"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de Guilherme Bresolin"
                >
                  <SocialIcon type="tiktok" />
                </a>
                <a
                  href="https://www.youtube.com/@bresolin109"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube de Guilherme Bresolin"
                >
                  <SocialIcon type="youtube" />
                </a>
                <a
                  href="https://www.instagram.com/bresolin109"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de Guilherme Bresolin"
                >
                  <SocialIcon type="instagram" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <img
          className="hero__rider"
          src="/images/guilherme-bresolin.png"
          alt="Guilherme Bresolin sorrindo com uniforme de motocross"
          width={1080}
          height={1350}
          fetchPriority="high"
        />
      </section>

      <aside className="mobile-social-prompt" aria-label="Redes sociais de Guilherme Bresolin">
        <p>Redes<br />sociais</p>
        <div className="mobile-social-prompt__links">
          <a
            href="https://www.tiktok.com/@bresolin109"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok de Guilherme Bresolin"
          >
            <SocialIcon type="tiktok" />
          </a>
          <a
            href="https://www.youtube.com/@bresolin109"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube de Guilherme Bresolin"
          >
            <SocialIcon type="youtube" />
          </a>
          <a
            href="https://www.instagram.com/bresolin109"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Guilherme Bresolin"
          >
            <SocialIcon type="instagram" />
          </a>
        </div>
      </aside>

      <section className="season" id="temporada" aria-labelledby="season-title">
        <h2 className="season__title" id="season-title">
          Temporada 2026
        </h2>

        <SeasonCards rounds={seasonRounds} />

        <section className="season-video" aria-labelledby="season-video-title">
          <h3 className="season-video__title" id="season-video-title">
            Acompanhe pelo YouTube
          </h3>

          <div className="season-video__frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/yvVLQd3L7Ms?controls=1"
              title="Acompanhe Guilherme Bresolin pelo YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />

            <img
              className="season-video__controls-art"
              src="/images/player-controls-integrated.png"
              alt=""
              aria-hidden="true"
            />
          </div>

          <a
            className="season-video__subscribe"
            href="https://www.youtube.com/@bresolin109"
            target="_blank"
            rel="noopener noreferrer"
          >
            Inscreva-se
          </a>
        </section>
      </section>

      <SponsorsMarquee className="sponsors--between-sections" />

      <section className="story-hub" id="historia-visual" aria-label="História e títulos" hidden>
        <nav className="story-hub__nav" aria-label="Conteúdos sobre Guilherme Bresolin">
          <a href="#historia">História</a>
          <a href="#galeria">Galeria</a>
          <a href="#mxon">MXON</a>
        </nav>

        <div className="story-hub__titles" id="mxon">
          <a href="#titulos">Títulos</a>
          <a href="#mx1gp">MX1GP</a>
          <a href="#arena">Arena</a>
        </div>
      </section>

      <div className="light-sections">
      <section className="history-copy" id="historia" aria-labelledby="history-copy-title">
        <div className="history-copy__inner">
          <h2 className="history-copy__title" id="history-copy-title">Minha história</h2>

          <div className="history-copy__body">
            <p>
              Meu nome é <strong>Guilherme Bresolin</strong>, nasci e fui criado em <strong>Parobé, no Rio Grande do Sul</strong>. Foi aqui que começou a minha história com o motocross, uma paixão que apareceu cedo e acabou se transformando no meu estilo de vida.
            </p>
            <p>
              Comecei a andar de moto <strong>aos 9 anos</strong>. Desde o primeiro contato, percebi que aquilo era muito mais do que uma diversão. Eu queria evoluir, competir e descobrir até onde poderia chegar. <strong>Aos 16 anos, já me tornei piloto profissional</strong>, assumindo responsabilidades e desafios que exigiram muita dedicação desde cedo.
            </p>
            <p>
              <strong>Sempre fui obcecado por vencer.</strong> Odeio perder, mas uso cada derrota como combustível para treinar mais, corrigir os meus erros e voltar ainda mais preparado. Sou muito focado e sei que nenhum resultado acontece por acaso. <strong>Cada conquista é resultado de disciplina, esforço e inúmeras horas de treinamento.</strong>
            </p>
            <p>
              Posso dizer que <strong>sou viciado em treinar</strong>. Estou sempre buscando melhorar minha velocidade, minha técnica e meu preparo físico. Quando entro na pista, quero saber que fiz tudo o que estava ao meu alcance para <strong>disputar a vitória</strong>.
            </p>
            <p>
              O motocross me ensinou a enfrentar dificuldades, superar limites e <strong>nunca desistir</strong>. Minha história ainda está sendo construída, treino após treino e corrida após corrida. Continuo com a mesma vontade de quando comecei, mas agora com ainda mais experiência, foco e <strong>fome de vencer</strong>.
            </p>
          </div>

          <div className="history-copy__photos" aria-label="Registros da trajetória de Guilherme Bresolin">
            <figure>
              <img src="/images/story/story-01.jpg" alt="Guilherme Bresolin ainda criança no pódio de uma competição de motocross" loading="lazy" />
            </figure>
            <figure>
              <img src="/images/story/story-02.jpg" alt="Guilherme Bresolin pilotando a moto número 109 durante sua infância" loading="lazy" />
            </figure>
            <figure>
              <img src="/images/story/story-03.jpg" alt="Guilherme Bresolin competindo com a moto número 109 em uma pista de terra" loading="lazy" />
            </figure>
          </div>

          <div className="history-copy__chapter" id="mxon-history">
            <h2 className="history-copy__title">MXON</h2>

            <div className="history-copy__body">
              <p>
                Em 2023, vivi um dos momentos mais importantes da minha carreira: <strong>recebi minha primeira convocação para representar o Brasil no Motocross das Nações</strong>. Vestir as cores do meu país era um dos meus maiores sonhos como piloto, e receber essa oportunidade foi a realização de tudo aquilo que eu vinha buscando desde que comecei no esporte.
              </p>
              <p>
                A competição aconteceu na <strong>lendária pista de Ernée, na França</strong>. Estar naquele lugar, ao lado dos melhores pilotos do mundo, foi uma sensação difícil de explicar. Cada vez que eu entrava na pista carregando a bandeira brasileira, sentia uma mistura de orgulho, responsabilidade e emoção.
              </p>
              <p>
                Tive a oportunidade de disputar a <strong>categoria MX2</strong> no evento que é considerado a “Copa do Mundo” do motocross. Foi uma experiência única, com um nível de competição altíssimo e diante de uma torcida apaixonada pelo esporte.
              </p>
              <p>
                Com muita dedicação e trabalho em equipe, conseguimos garantir o <strong>17º lugar geral para o Brasil, o melhor resultado do país na competição até 2023</strong>. Foi uma conquista especial, que tornou aquela primeira convocação ainda mais marcante.
              </p>
              <p>
                Representar o Brasil em uma das maiores competições do mundo é algo que ficará para sempre na minha memória. Mais do que um resultado, essa experiência me mostrou que <strong>todo o esforço, os treinos e os desafios enfrentados ao longo da minha trajetória estavam me levando na direção certa</strong>.
              </p>
            </div>

            <figure className="history-copy__feature-photo">
              <img
                src="/images/mxon/mxon-team.jpg"
                alt="Guilherme Bresolin com a equipe brasileira no Motocross das Nações"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="history-copy__chapter" id="titulos">
            <h2 className="history-copy__title">Títulos</h2>

            <h3 className="history-copy__milestone-title">
              <span>2019</span> Campeão Brasileiro — MXJR
            </h3>

            <div className="history-copy__body">
              <p>
                Em 2019, conquistei <strong>meu primeiro título brasileiro, na categoria MXJR</strong>. Foi um momento inesquecível e muito especial na minha carreira, pois representou a realização de um sonho e a recompensa por todo o esforço e dedicação nos treinos. <strong>A emoção de me tornar campeão brasileiro pela primeira vez ficará para sempre na minha memória.</strong>
              </p>
            </div>

            <div className="history-copy__milestone-video">
              <video autoPlay muted loop playsInline preload="metadata" aria-label="Registro da conquista do título brasileiro de MXJR em 2019">
                <source src="/videos/titles/2019-mxjr.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="history-copy__milestone">
              <h3 className="history-copy__milestone-title">
                <span>2021</span> Campeão Brasileiro — MX2JR
              </h3>

              <div className="history-copy__body">
                <p>
                  Em 2021, conquistei <strong>meu primeiro título pilotando uma moto de 250 cilindradas, na categoria MX2JR</strong>. Essa conquista representou uma nova fase na minha carreira e mostrou que eu estava preparado para desafios ainda maiores. Foi um título muito importante, que abriu portas e <strong>fortaleceu minha confiança para construir um futuro promissor dentro do esporte</strong>.
                </p>
              </div>

              <div className="history-copy__photos" aria-label="Registros da conquista do título brasileiro de MX2JR em 2021">
                <figure>
                  <img
                    src="/images/titles/2021-mx2jr.jpg"
                    alt="Guilherme Bresolin celebrando o título brasileiro de MX2JR com sua equipe"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2021-mx2jr-02.jpg"
                    alt="Guilherme Bresolin comemorando a conquista ao lado de sua moto"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2021-mx2jr-03.jpg"
                    alt="Guilherme Bresolin com a bandeira de campeão após a conquista de 2021"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>

            <div className="history-copy__milestone">
              <h3 className="history-copy__milestone-title">
                <span>2023</span> Campeão Brasileiro — MX2
              </h3>

              <div className="history-copy__body">
                <p>
                  Em 2023, conquistei <strong>meu primeiro título na categoria MX2</strong>, um dos mais importantes da minha carreira até aqui. Além de representar uma grande evolução como piloto, essa também foi <strong>minha primeira conquista defendendo uma equipe de fábrica</strong>, o que tornou o momento ainda mais especial.
                </p>
                <p>
                  Foi o resultado de <strong>muito trabalho, dedicação e superação</strong> ao longo de toda a temporada. Cada treino, cada dificuldade e cada corrida contribuíram para essa conquista. Esse título confirmou que eu estava seguindo pelo caminho certo e <strong>ficará marcado para sempre na minha vida e na minha trajetória dentro do motocross</strong>.
                </p>
              </div>

              <div className="history-copy__photos" aria-label="Registros da conquista do título brasileiro de MX2 em 2023">
                <figure>
                  <img
                    src="/images/titles/2023-mx2-01.jpg"
                    alt="Guilherme Bresolin celebrando o título brasileiro de MX2 com o troféu de campeão"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2023-mx2-02.jpg"
                    alt="Guilherme Bresolin comemorando o título brasileiro de MX2 com o troféu de campeão"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2023-mx2-03.jpg"
                    alt="Guilherme Bresolin emocionado com a placa de campeão brasileiro de MX2 em 2023"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>

            <div className="history-copy__milestone">
              <h3 className="history-copy__milestone-title">
                <span>2024</span> Campeão Latino-Americano — MX2
              </h3>

              <div className="history-copy__body">
                <p>
                  Em 2024, conquistei <strong>meu primeiro título Latino-Americano pela FIM</strong>, a Federação Internacional de Motociclismo. Foi uma conquista muito marcante e especial, principalmente por ter acontecido durante <strong>um final de semana do Mundial de Motocross, na Patagônia, Argentina</strong>.
                </p>
                <p>
                  Participar daquela etapa foi uma experiência inesquecível. Estar no mesmo ambiente dos principais pilotos e equipes do mundo, acompanhando de perto <strong>o nível mais alto do motocross</strong>, trouxe ainda mais importância para aquele momento.
                </p>
                <p>
                  Conquistar o título em um cenário tão especial foi a recompensa por <strong>todo o trabalho, dedicação e preparação</strong>. Foi um final de semana que ficará para sempre na minha memória e <strong>mais um capítulo muito importante da minha trajetória como piloto</strong>.
                </p>
              </div>

              <div className="history-copy__photos" aria-label="Registros da conquista do título Latino-Americano pela FIM em 2024">
                <figure>
                  <img
                    src="/images/titles/2024-latino-americano-01.jpg"
                    alt="Guilherme Bresolin no lugar mais alto do pódio do Latino-Americano de Motocross na Patagônia"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2024-latino-americano-02.jpg"
                    alt="Guilherme Bresolin pilotando durante a etapa do Mundial de Motocross na Argentina"
                    loading="lazy"
                  />
                </figure>
                <figure>
                  <img
                    src="/images/titles/2024-latino-americano-03.jpg"
                    alt="Guilherme Bresolin nos bastidores da competição na Patagônia em 2024"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>
          </div>

          <div className="history-copy__chapter" id="mx1gp">
            <h2 className="history-copy__title">MX1GP</h2>

            <div className="history-copy__body">
              <p>
                Em 2026, iniciei <strong>um novo e importante capítulo da minha carreira ao lado da Factory Kawasaki Racing Team</strong>. Atualmente, estou disputando a categoria MX1 no Campeonato Brasileiro de Motocross MX1GP, enfrentando os principais pilotos do país e vivendo <strong>uma temporada de muito aprendizado e evolução</strong>.
              </p>
              <p>
                Antes da etapa final, <strong>ocupo a 4ª posição do campeonato, com 239 pontos</strong>. Sigo totalmente focado e trabalhando forte para encerrar a temporada da melhor maneira possível, buscando <strong>um grande resultado para mim e para toda a equipe</strong>.
              </p>
            </div>

            <div className="history-copy__photos" aria-label="Registros da temporada de Guilherme Bresolin na categoria MX1GP em 2026">
              <figure>
                <img
                  src="/images/mx1gp/mx1gp-2026-01.jpg"
                  alt="Guilherme Bresolin celebrando um resultado na temporada do MX1GP"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/images/mx1gp/mx1gp-2026-02.jpg"
                  alt="Guilherme Bresolin competindo na categoria MX1 do Campeonato Brasileiro de Motocross"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  className="history-copy__photo--focus-top"
                  src="/images/mx1gp/mx1gp-2026-03.jpg"
                  alt="Guilherme Bresolin comemorando no pódio durante a temporada de 2026"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>

          <div className="history-copy__chapter" id="arena">
            <h2 className="history-copy__title">Arena Cross</h2>

            <div className="history-copy__body">
              <p>
                No Arena Cross 2026, <strong>finalizamos a temporada na 3ª colocação geral da categoria AX2</strong>. Chegamos à última etapa com chances reais de conquistar o título, depois de um ano de muita dedicação, bons resultados e grandes disputas.
              </p>
              <p>
                Infelizmente, <strong>um tombo logo na largada da corrida decisiva</strong> acabou tirando nossas chances de título e também a possibilidade de terminar o campeonato na 2ª posição. Dessa forma, encerramos o ano em <strong>3º lugar na classificação geral</strong>.
              </p>
              <p>
                Mesmo não sendo o resultado que buscávamos, levo tudo o que aconteceu como aprendizado. No motocross, nem sempre as coisas saem como planejamos e nem todo dia será o nosso dia. O mais importante é <strong>saber levantar, aprender com os momentos difíceis e continuar trabalhando</strong>.
              </p>
              <p>
                Saio dessa temporada <strong>ainda mais motivado, experiente e com vontade de voltar mais forte</strong>. Cada vitória e cada dificuldade fazem parte da caminhada, e tenho certeza de que tudo isso será importante para os próximos desafios da minha carreira.
              </p>
            </div>

            <div className="history-copy__photos" aria-label="Registros da temporada de Guilherme Bresolin no Arena Cross 2026">
              <figure>
                <img
                  src="/images/arena/arena-cross-2026-01.jpg"
                  alt="Guilherme Bresolin saltando durante uma corrida do Arena Cross 2026"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  src="/images/arena/arena-cross-2026-02.jpg"
                  alt="Guilherme Bresolin após uma disputa do Arena Cross 2026"
                  loading="lazy"
                />
              </figure>
              <figure>
                <img
                  className="history-copy__photo--focus-top"
                  src="/images/arena/arena-cross-2026-03.jpg"
                  alt="Guilherme Bresolin no pódio da categoria AX2 no Arena Cross 2026"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <GalleryCarousel />

      <SponsorsMarquee />

      <ContactSection />
      </div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <a className="site-footer__brand" href="#home" aria-label="Voltar ao início">
            <span>Guilherme</span>
            <span>Bresolin</span>
          </a>

          <nav className="site-footer__nav" aria-label="Navegação do rodapé">
            {navItems.map((item) => (
              <a
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-footer__socials" aria-label="Redes sociais">
            <a
              href="https://www.tiktok.com/@bresolin109"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Guilherme Bresolin"
            >
              <SocialIcon type="tiktok" />
            </a>
            <a
              href="https://www.youtube.com/@bresolin109"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube de Guilherme Bresolin"
            >
              <SocialIcon type="youtube" />
            </a>
            <a
              href="https://www.instagram.com/bresolin109"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Guilherme Bresolin"
            >
              <SocialIcon type="instagram" />
            </a>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© 2026 Desenvolvido Por Souza Tecnologia. Todos os direitos reservados.</p>
          <a href="mailto:contatobresolin109@gmail.com">contatobresolin109@gmail.com</a>
        </div>
      </footer>

      <CookieConsent />
    </main>
  );
}
