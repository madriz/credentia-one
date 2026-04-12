import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'What comes next for Credentia One: Chrome extension, mobile app, and Word/Google Docs plugin.',
  alternates: { canonical: 'https://credentia.one/roadmap/' },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
