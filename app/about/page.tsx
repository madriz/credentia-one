import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="container-content py-12 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-10">
          About Credentia One
        </h1>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Why Credentia One exists
          </h2>
          <p className="text-text-body mb-4">
            Every day, millions of job seekers fill out the same forms, answer the same
            questions, and re-enter the same data across dozens of employer portals. The
            average application takes 15 to 20 minutes. For someone submitting 20
            applications a day, that is nearly seven hours of repetitive data entry.
          </p>
          <p className="text-text-body mb-4">
            The employer side is no better. Applicant Tracking Systems ingest resumes as
            unstructured PDFs, attempt to parse them (often badly), and present recruiters
            with mangled, incomplete data. The result is a system where both sides lose
            time.
          </p>
          <p className="text-text-body">
            Credentia One exists to fix the transport layer. Not the hiring decision, not
            the identity verification, not the interview process. Just the way
            professional data moves from one person to another.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">For candidates</h2>
          <p className="text-text-body">
            You fill out one form. You download one file. You use that file everywhere.
            No more re-typing your phone number into Workday for the fourteenth time this
            week. No more copy-pasting your work history into a text box that reformats
            it badly. Your .credentia.json file is your complete professional record in a
            format that any system can read without errors.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">For employers</h2>
          <p className="text-text-body">
            You receive structured, machine-readable candidate data instead of a PDF that
            your ATS has to guess at. Every field is labeled, typed, and validated. Parse
            errors drop to zero. Your existing systems, whether Workday, Greenhouse, SAP,
            or anything else, can ingest a Credentia One file with no ambiguity.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            For the ecosystem
          </h2>
          <p className="text-text-body">
            Credentia One is an open standard under the Apache 2.0 license. It is not
            owned by any company, job board, or ATS vendor. The schema is public. The
            candidate tool is free. The standard belongs to everyone. Our goal is for
            &quot;Upload your Credentia One file&quot; to become as common as &quot;Upload
            your resume.&quot;
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-text-primary mb-4">How it is built</h2>
          <p className="text-text-body">
            Credentia One is a static website. The candidate form runs entirely in your
            browser. No account required. No data stored on our servers. When you generate
            your file, a cryptographic hash is registered with our verification service so
            employers can confirm your file was generated using the Credentia One
            standard. That hash contains no personal information.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
