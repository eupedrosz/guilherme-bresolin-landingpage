import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guilherme Bresolin | Piloto 109',
  description: 'Site oficial de Guilherme Bresolin, piloto de motocross número 109.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
