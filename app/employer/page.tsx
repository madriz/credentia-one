import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';

export default function EmployerPage() {
  return (
    <>
      <Nav />
      <main className="container-content py-12 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
          The employer portal is coming soon.
        </h1>
        <p className="text-text-body text-lg mb-6">
          The Credentia One employer portal will allow you to receive, verify, and
          process .credentia.json files from candidates. Structured data, zero parsing
          errors, instant verification.
        </p>
        <p className="text-text-body">
          If you are an employer interested in early access, contact{' '}
          <a href="mailto:rodrigo@madriz.ca" className="text-accent">
            rodrigo@madriz.ca
          </a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
