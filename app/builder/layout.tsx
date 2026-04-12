import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Your Credentia File | Credentia One',
  description:
    'Create your portable .credentia.json file. Fill out your professional data once and use it for every job application.',
  alternates: { canonical: 'https://credentia.one/builder/' },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
