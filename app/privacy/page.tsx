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
          <p className="text-text-body mb-4">
            When an employer verifies a candidate&apos;s file through the Credentia One
            API, the following data is processed: the employer&apos;s API key (for
            authentication) and a cryptographic hash (for token lookup). No candidate
            personal information is transmitted to or stored by the verification
            service. Verification requests are logged with the employer&apos;s account
            ID, the hash checked, the result (verified or not), and the timestamp.
            These logs are retained for audit and billing purposes.
          </p>
          <p className="text-text-body">
            The verification API is jurisdiction-neutral. It validates cryptographic
            hashes without accessing, processing, or transmitting any candidate personal
            data, regardless of the candidate&apos;s location or the jurisdictions
            covered by their disclosures.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">International Data Handling</h2>
          <p className="text-text-body mb-6">
            Credentia One is used by candidates applying for positions in multiple
            jurisdictions. The following outlines how we handle data in compliance with
            applicable privacy and anti-discrimination laws in each supported region.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">United States</h3>
          <p className="text-text-body mb-6">
            Credentia One supports voluntary self-identification fields required by the
            Equal Employment Opportunity Commission (EEOC), including gender,
            race/ethnicity, veteran status, and disability status. These disclosures are
            entered by the candidate in their browser, included in their downloaded
            file, and are never transmitted to or stored by Credentia One. Employers
            receiving these files are responsible for storing EEOC data separately from
            professional credentials as required by federal law.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">Canada</h3>
          <p className="text-text-body mb-6">
            Credentia One supports voluntary self-identification fields under the
            Canadian Employment Equity Act, including Indigenous identity, visible
            minority status, and disability status. All data remains on the
            candidate&apos;s device. Credentia One complies with the Personal Information
            Protection and Electronic Documents Act (PIPEDA) and Quebec&apos;s Act
            respecting the protection of personal information in the private sector
            (Law 25). No personal information is collected or stored by our service.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">United Kingdom</h3>
          <p className="text-text-body mb-6">
            Credentia One supports voluntary equality monitoring fields aligned with
            the UK Equality Act 2010, including ethnicity (using ONS census categories),
            disability, religion, sexual orientation, and age range. This data is
            generated and stored locally on the candidate&apos;s device. Credentia One
            does not act as a data controller for this information under the UK General
            Data Protection Regulation (UK GDPR). Employers who receive and process
            Credentia files containing this data are responsible for their own
            compliance with the UK GDPR and the Data Protection Act 2018.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">European Union / EEA</h3>
          <p className="text-text-body mb-6">
            Credentia One supports GDPR-aligned disclosures including explicit consent
            to process personal data, data retention preferences, gender, and disability
            status. When a candidate checks the GDPR consent box, a timestamp is
            recorded locally in their file. Credentia One does not process, transmit, or
            store any candidate personal data. The cryptographic hash registered with
            our verification service contains no personally identifiable information.
            Candidates may exercise their right to erasure by simply deleting their
            .credentia.json file; there is no data on our servers to delete. Employers
            who process Credentia files are data controllers under the GDPR and are
            responsible for their own compliance, including providing candidates with
            privacy notices and honoring data subject access requests.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">Australia</h3>
          <p className="text-text-body mb-6">
            Credentia One supports voluntary equal opportunity disclosures aligned with
            Australian anti-discrimination legislation, including Indigenous status,
            gender (including the intersex category recognized under Australian law),
            disability, and primary language. All data remains on the candidate&apos;s
            device. Credentia One complies with the Australian Privacy Principles (APPs)
            under the Privacy Act 1988 by not collecting or storing personal
            information.
          </p>

          <h3 className="font-serif text-xl text-text-primary mb-2">New Zealand</h3>
          <p className="text-text-body">
            Credentia One supports voluntary disclosures aligned with New Zealand
            employment practices, including ethnicity (using NZ Census categories),
            gender (including the gender diverse category), disability, and iwi
            affiliation for Maori candidates. All data remains on the candidate&apos;s
            device. Credentia One complies with the Privacy Act 2020 (New Zealand) by
            not collecting or storing personal information.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Cross-Border Applications</h2>
          <p className="text-text-body">
            When a candidate applies for positions in multiple countries, their
            Credentia file may contain disclosure data for several jurisdictions
            simultaneously. Each disclosure section is clearly labeled by country or
            region. Employers are responsible for processing only the disclosures
            relevant to their jurisdiction and applicable laws.
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
