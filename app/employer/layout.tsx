import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Employers',
  description:
    'Receive structured, verified candidate data through the Credentia One standard. Zero parsing errors. Pay per job posting.',
  alternates: { canonical: 'https://credentia.one/employer/' },
};

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
