import type { Metadata } from 'next';
import { Newsreader, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
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
const GA_ID = 'G-1N55B2TSSX';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Credentia One | One File. Any Employer. Any Country.',
    template: '%s | Credentia One',
  },
  description:
    'The open document standard that replaces repetitive job applications with a single portable file. Fill out your data once, use it everywhere.',
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
