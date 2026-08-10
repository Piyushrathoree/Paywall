import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../provider';
import ClientWrapper from '../ClientWrapper';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LenisProvider from '../providers/LenisProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Paywall',
  description: 'Paywall is a simulated wallet app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showAppbarAndFooter = true; // default value

  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper>
            <SpeedInsights />
            <Analytics />
            <LenisProvider>
            {children}
             </LenisProvider>
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
