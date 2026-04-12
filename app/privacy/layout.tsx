import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Credentia One privacy policy. How your data is handled, what we collect, and your rights.',
  alternates: { canonical: 'https://credentia.one/privacy/' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
