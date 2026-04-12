import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Employers',
  description: 'The Credentia One employer portal. Receive, verify, and process structured candidate data.',
  alternates: { canonical: 'https://credentia.one/employer/' },
};

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
