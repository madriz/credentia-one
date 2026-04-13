'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'cookie_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? '';

export default function CookieConsent() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setConsent('declined');
  };

  if (!loaded) return null;

  const showBanner = consent === null;
  const loadGa = consent === 'accepted' && GA_ID;

  return (
    <>
      {loadGa && (
        <>
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
        </>
      )}
      {showBanner && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <div className="container-content py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-text-body">
              This site uses cookies for analytics (Google Analytics). No personal data
              from your Credentia file is stored. By clicking Accept, you consent to
              the use of analytics cookies. You may decline without affecting your use
              of this site.
            </p>
            <div className="flex gap-3 shrink-0">
              <button type="button" className="btn-primary text-sm py-2 px-4" onClick={accept}>
                Accept
              </button>
              <button type="button" className="btn-outline text-sm py-2 px-4" onClick={decline}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
