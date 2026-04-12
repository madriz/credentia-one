import type { Metadata } from 'next';
import Nav from '@/components/shared/Nav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import SonnetSection from '@/components/landing/SonnetSection';
import WhyCredentia from '@/components/landing/WhyCredentia';
import OpenStandard from '@/components/landing/OpenStandard';
import MadeInCanada from '@/components/landing/MadeInCanada';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Credentia One | One File. Any Employer. Any Country.',
  description:
    'Credentia One is an open document standard for job applications. Free for candidates. Verified by employers. One file replaces hundreds of repetitive forms.',
  alternates: { canonical: 'https://credentia.one/' },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Credentia One',
  url: 'https://credentia.one',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <SonnetSection />
        <WhyCredentia />
        <OpenStandard />
        <MadeInCanada />
      </main>
      <Footer />
    </>
  );
}
