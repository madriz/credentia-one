'use client';

import { useState } from 'react';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';

const FORM_URL = 'https://api.web3forms.com/submit';
const ACCESS_KEY = '535b11ae-5871-4940-a7ff-3d9882ff32d1';

export default function EmployerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setFormError(null);
    const data = new FormData(e.currentTarget);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', 'Credentia One Employer Inquiry');
    try {
      const res = await fetch(FORM_URL, { method: 'POST', body: data });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Nav />
      <main className="container-content py-12">
        <div className="max-w-3xl">
          <h1 className="font-serif text-3xl md:text-5xl text-text-primary mb-6 leading-tight">
            Receive structured candidate data. Zero parsing errors.
          </h1>
        </div>

        <section className="max-w-3xl mb-16 mt-10">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            What changes for you
          </h2>
          <p className="text-text-body mb-4">
            Credentia One does not replace your existing systems. It standardizes the
            input. Instead of receiving a PDF that your ATS has to parse (often
            incorrectly), you receive a .credentia.json file: structured, typed, and
            validated data that your systems can read without guessing.
          </p>
          <p className="text-text-body">
            Your Applicant Tracking System, your background check vendor, your
            scheduling tools, your internal workflows: none of them need to change.
            Credentia One sits upstream. It is the format candidates use to deliver
            their data to you. What you do with it after that is your business.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-2xl text-text-primary mb-8">
            How it works for employers
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-serif text-xl text-text-primary mb-3">Receive</h3>
              <p className="text-text-body text-sm">
                Candidates submit a .credentia.json file instead of (or alongside) a
                traditional resume. The file contains structured professional data,
                compliance disclosures, and work authorization details in a standardized
                format.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-text-primary mb-3">Verify</h3>
              <p className="text-text-body text-sm">
                Each Credentia One file includes a cryptographic token registered at the
                time of generation. You can verify the authenticity of any file at
                credentia.one/verify. The token confirms the file was generated using
                the standard and has not been modified.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-text-primary mb-3">Process</h3>
              <p className="text-text-body text-sm">
                Ingest the structured data into your existing ATS, HRIS, or screening
                workflows. Because the data is typed and labeled, parsing errors drop to
                zero. No more guessing whether &quot;2019&quot; is a graduation year or
                a phone extension.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="max-w-3xl">
            <h2 className="font-serif text-2xl text-text-primary mb-4">
              One-click apply
            </h2>
            <p className="text-text-body mb-10">
              This is what the future of job applications looks like. A single button
              on your careers page. No forms, no file uploads, no 20-minute portals.
              The candidate clicks once, their Credentia One file is submitted, and
              your systems receive structured, verified data instantly.
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div
              className="w-full rounded-lg border bg-white"
              style={{
                maxWidth: 480,
                borderColor: '#E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div className="p-6">
                <div className="text-sm text-text-muted mb-1">Acme Corporation</div>
                <div className="text-xl font-bold text-text-primary mb-1">
                  Senior Product Manager
                </div>
                <div className="text-sm text-text-muted">Toronto, ON | Hybrid</div>
              </div>
              <div className="border-t" style={{ borderColor: '#E5E7EB' }} />
              <div className="p-6 flex gap-3">
                <button
                  type="button"
                  disabled
                  className="flex-1 py-2.5 px-4 rounded-md border text-sm font-medium"
                  style={{
                    borderColor: '#D1D5DB',
                    color: '#9CA3AF',
                    cursor: 'default',
                    background: 'transparent',
                  }}
                >
                  Upload Resume
                </button>
                <button
                  type="button"
                  disabled
                  className="flex-1 py-2.5 px-4 rounded-md text-sm font-medium text-white"
                  style={{
                    background: '#00ACED',
                    cursor: 'default',
                  }}
                >
                  Apply with Credentia One
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted italic">
            Mockup. Illustrating the candidate experience when employers accept
            Credentia One files.
          </p>
        </section>

        <section className="max-w-3xl mb-16">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Security and simplicity
          </h2>
          <p className="text-text-body mb-4">
            Credentia One is a document standard, not a platform. There is no vendor
            lock-in, no API dependency, no data stored on our servers. The
            .credentia.json file is a plain text file that follows a published open
            schema. Your security team can audit every field.
          </p>
          <p className="text-text-body">
            The architecture is intentionally simple: candidates generate files in their
            browser, a cryptographic hash is registered for verification, and employers
            receive the file through their existing channels (email, upload portal, job
            board). No middleware, no integration required.
          </p>
        </section>

        <section className="max-w-3xl mb-16">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Works with your existing stack
          </h2>
          <p className="text-text-body mb-4">
            Credentia One files can be ingested by any system that reads JSON. This
            includes direct integration with major platforms:
          </p>
          <ul className="list-disc pl-6 text-text-body text-sm space-y-2 mb-4">
            <li>
              Applicant Tracking Systems (Workday, Greenhouse, SAP SuccessFactors,
              Oracle, iCIMS, Lever)
            </li>
            <li>Background check providers (Checkr, Certn, Mintz, Sterling)</li>
            <li>HRIS platforms (Dayforce, BambooHR, Rippling)</li>
            <li>Custom internal tools and data pipelines</li>
          </ul>
          <p className="text-text-body">
            No proprietary connector is required. If your system can read a JSON file,
            it can read a Credentia One file.
          </p>
        </section>

        <section className="max-w-xl mb-16" id="contact">
          <h2 className="font-serif text-2xl text-text-primary mb-4">Get in touch</h2>
          <p className="text-text-body mb-6">
            Interested in accepting Credentia One files? Have questions about
            integration? Contact us.
          </p>

          {submitted ? (
            <div
              className="border-l-4 p-5 rounded"
              style={{ background: '#E6F8EE', borderColor: '#16A34A' }}
            >
              <p className="text-text-primary font-medium">
                Thank you. We will be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="checkbox" name="botcheck" className="hidden" />
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emp-first" className="label-base">
                    First Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="emp-first"
                    name="first_name"
                    type="text"
                    required
                    className="input-base"
                  />
                </div>
                <div>
                  <label htmlFor="emp-last" className="label-base">
                    Last Name <span className="text-error">*</span>
                  </label>
                  <input
                    id="emp-last"
                    name="last_name"
                    type="text"
                    required
                    className="input-base"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="emp-company" className="label-base">
                  Institution / Company <span className="text-error">*</span>
                </label>
                <input
                  id="emp-company"
                  name="company"
                  type="text"
                  required
                  className="input-base"
                />
              </div>
              <div>
                <label htmlFor="emp-email" className="label-base">
                  Email Address <span className="text-error">*</span>
                </label>
                <input
                  id="emp-email"
                  name="email"
                  type="email"
                  required
                  className="input-base"
                />
              </div>
              <div>
                <label htmlFor="emp-message" className="label-base">
                  Message
                </label>
                <textarea
                  id="emp-message"
                  name="message"
                  rows={4}
                  className="input-base"
                />
              </div>
              {formError && (
                <p className="text-sm text-error" role="alert">
                  {formError}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary"
                disabled={sending}
              >
                {sending ? 'Sending, please wait.' : 'Send'}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
