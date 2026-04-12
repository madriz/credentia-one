import Link from 'next/link';

export default function OpenStandard() {
  return (
    <section className="container-content py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-10">
        Simple, transparent pricing
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl text-text-primary mb-2">Candidates</h3>
            <div className="font-serif text-4xl text-text-primary mb-4">Free</div>
            <p className="text-text-body text-sm">
              Generate and download your Credentia One file at no cost. No account
              required. No data stored. Always free.
            </p>
          </div>
          <Link href="/builder" className="btn-primary text-center mt-6">
            Build Your File
          </Link>
        </div>
        <div className="card flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-xl text-text-primary mb-2">Employers</h3>
            <div className="font-serif text-4xl text-text-primary mb-4">
              Pay per job posting
            </div>
            <p className="text-text-body text-sm">
              Register job postings and verify unlimited candidate files for 90 days
              per posting. No per-candidate fees. No platform subscriptions. Contact us
              for pilot pricing.
            </p>
          </div>
          <Link href="/employer#contact" className="btn-outline text-center mt-6">
            Get in Touch
          </Link>
        </div>
      </div>
      <p className="mt-8 text-sm text-text-muted max-w-3xl">
        The Credentia One schema is open source under Apache 2.0. The candidate tool is
        free. Employers pay for verified job postings.
      </p>
    </section>
  );
}
