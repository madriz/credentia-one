import type { Metadata } from 'next';
import { Newsreader, JetBrains_Mono } from 'next/font/google';
import CookieConsent from '@/components/shared/CookieConsent';
import './globals.css';

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-newsreader',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const SITE_URL = 'https://credentia.one';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Credentia One | One File. Any Employer. Any Country.',
    template: '%s | Credentia One',
  },
  description:
    'The open document standard that replaces repetitive job applications with a single portable file. Fill out your data once, use it everywhere.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
  },
  openGraph: {
    title: 'Credentia One | One File. Any Employer. Any Country.',
    description:
      'The open document standard that replaces repetitive job applications with a single portable file.',
    url: SITE_URL,
    siteName: 'Credentia One',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Credentia One' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credentia One',
    description:
      'The open document standard that replaces repetitive job applications with a single portable file.',
    images: ['/og-image.svg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jetbrains.variable}`}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
