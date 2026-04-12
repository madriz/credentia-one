import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify a Credentia One File',
  description:
    'Check whether a .credentia.json file was generated using the Credentia One standard.',
  alternates: { canonical: 'https://credentia.one/verify/' },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
