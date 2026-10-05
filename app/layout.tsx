import type { Metadata } from 'next';
import InitialLoader from '@/components/InitialLoader/InitialLoader';
import '@/components/ContactSection/ContactSection.css';
import '@/components/CookieConsent/CookieConsent.css';
import '@/components/GalleryCarousel/GalleryCarousel.css';
import '@/components/InAppBrowserNotice/InAppBrowserNotice.css';
import '@/components/InitialLoader/InitialLoader.css';
import '@/components/SeasonCards/SeasonCards.css';
import '@/components/SiteFooter/SiteFooter.css';
import '@/components/SiteNavigation/SiteNavigation.css';
import '@/components/SponsorsMarquee/SponsorsMarquee.css';
import '@/components/DesktopStoryMenu/DesktopStoryMenu.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guilherme Bresolin',
  description: 'Site oficial de Guilherme Bresolin, piloto de motocross número 109.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="site-is-loading">
        <noscript>
          <style>{'body.site-is-loading{overflow:auto}.initial-loader{display:none}'}</style>
        </noscript>
        <InitialLoader />
        {children}
      </body>
    </html>
  );
}
