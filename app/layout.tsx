import type { Metadata } from 'next';
import './globals.css';
import InitialLoader from './InitialLoader';

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
