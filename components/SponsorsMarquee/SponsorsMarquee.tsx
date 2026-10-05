export type SponsorLogo = {
  src: string;
  alt: string;
  className?: string;
};

type SponsorsMarqueeProps = {
  logos: readonly SponsorLogo[];
  className?: string;
};

export default function SponsorsMarquee({ logos, className = '' }: SponsorsMarqueeProps) {
  return (
    <section className={`sponsors ${className}`.trim()} aria-label="Patrocinadores e parceiros">
      <div className="sponsors__viewport">
        <div className="sponsors__track">
          {[false, true].map((duplicate) => (
            <div className="sponsors__group" aria-hidden={duplicate || undefined} key={duplicate ? 'duplicate' : 'original'}>
              {logos.map((sponsor) => (
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
