import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Credentia One',
  description:
    'Why Credentia One exists, how it works for candidates and employers, and how the open standard is built.',
  alternates: { canonical: 'https://credentia.one/about/' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
