import Link from 'next/link';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="container-content py-12 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-10">
          Privacy Policy
        </h1>

        <p className="text-text-muted text-sm mb-10">Effective date: April 12, 2026</p>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">What data we collect</h2>
          <p className="text-text-body mb-4">
            Credentia One does not collect personal information. The candidate form runs
            entirely in your browser. No account is required. No personal data is
            transmitted to our servers.
          </p>
          <p className="text-text-body">
            When you generate a Credentia One file, a SHA-256 cryptographic hash of
            your document is registered with our verification service. This hash is a
            one-way mathematical fingerprint. It cannot be reversed to recover your
            personal data. Alongside the hash, we store the two-letter country code you
            selected. Nothing else.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Cookies and analytics</h2>
          <p className="text-text-body mb-4">
            We use Google Analytics 4 (GA4) for aggregate site usage analytics. The GA4
            script is loaded only after you explicitly accept cookies via the consent
            banner. If you decline, no analytics cookies are set and no tracking scripts
            are loaded.
          </p>
          <p className="text-text-body">
            GA4 collects anonymized page view data, session duration, and referral
            sources. It does not have access to any data you enter in the Credentia One
            form.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Local storage</h2>
          <p className="text-text-body">
            Your form draft data is saved to your browser&apos;s localStorage to allow you
            to resume editing across sessions. This data never leaves your device. It is
            not transmitted to any server. You can clear it at any time using the
            &quot;Clear all data&quot; button on the builder page or by clearing your
            browser&apos;s local storage.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Verification service (Supabase)</h2>
          <p className="text-text-body">
            Our verification database, hosted on Supabase, stores token hashes and
            country codes. These records contain no personally identifiable information
            (PII). They exist solely to allow employers to confirm that a given
            .credentia.json file was generated using the Credentia One standard.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Contact form</h2>
          <p className="text-text-body">
            When you submit the contact form on our employer page, your name,
            institution, and email address are processed by Web3Forms (web3forms.com).
            This data is used solely to respond to your inquiry and is not stored by
            Credentia One.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Verification API</h2>
          <p className="text-text-body">
            When an employer verifies a candidate&apos;s file through the Credentia One
            API, the following data is processed: the employer&apos;s API key (for
            authentication) and a cryptographic hash (for token lookup). No candidate
            personal information is transmitted to or stored by the verification
            service. Verification requests are logged with the employer&apos;s account
            ID, the hash checked, the result (verified or not), and the timestamp.
            These logs are retained for audit and billing purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            PIPEDA (Canada) compliance
          </h2>
          <p className="text-text-body">
            Under the Personal Information Protection and Electronic Documents Act
            (PIPEDA), personal information means information about an identifiable
            individual. Credentia One does not collect, use, or disclose personal
            information as defined by PIPEDA. The cryptographic hashes stored in our
            verification database cannot identify any individual.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Quebec Law 25 compliance
          </h2>
          <p className="text-text-body">
            In compliance with Quebec&apos;s Act respecting the protection of personal
            information in the private sector (Law 25), consent is obtained before any
            analytics cookies are set. No personal information is collected or processed
            without consent.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            US state privacy laws (CCPA/CPRA)
          </h2>
          <p className="text-text-body">
            Credentia One does not sell, share, or disclose personal information as
            defined under the California Consumer Privacy Act (CCPA) or the California
            Privacy Rights Act (CPRA). Because we do not collect personal information,
            there is no data to sell or share. This applies equally to privacy laws in
            other US states including Virginia (VCDPA), Colorado (CPA), Connecticut
            (CTDPA), and others.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Contact</h2>
          <p className="text-text-body">
            For privacy inquiries, use the{' '}
            <Link href="/employer#contact" className="text-accent">
              contact form on our Employer page
            </Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
