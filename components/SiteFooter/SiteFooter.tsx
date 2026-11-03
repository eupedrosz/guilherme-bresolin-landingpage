import SocialIcon from '@/components/SocialIcon/SocialIcon';

type NavigationItem = {
  label: string;
  href: string;
};

export default function SiteFooter({ items }: { items: readonly NavigationItem[] }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="site-footer__brand" href="#home" aria-label="Voltar ao início">
          <span>Guilherme</span>
          <span>Bresolin</span>
        </a>

        <nav className="site-footer__nav" aria-label="Navegação do rodapé">
          {items.map((item) => (
            <a href={item.href} key={item.label}>
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
        <div className="site-footer__meta">
          <p>
            <span>© 2026 Todos os direitos reservados.</span>
            <a
              className="site-footer__developer"
              href="https://sztechnology.cloud"
              target="_blank"
              rel="noreferrer"
              aria-label="Desenvolvido por SZ Tech — visitar site"
            >
              <span>Desenvolvido por</span>
              <img src="/images/sz-tech-logo.webp" alt="SZ Tech" />
            </a>
          </p>
        </div>
        <a href="mailto:contatobresolin109@gmail.com">contatobresolin109@gmail.com</a>
      </div>
    </footer>
  );
}
