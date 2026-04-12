import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container-content py-12 flex flex-col items-center gap-6 text-sm">
        <div className="text-center">
          <div className="font-serif text-lg">
            <span className="font-bold" style={{ color: '#1A1A1A' }}>Credentia</span>{' '}
            <span className="font-bold" style={{ color: '#00ACED' }}>One</span>
          </div>
          <div className="text-text-muted mt-1">
            Standardizing how the world moves professional data.
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-text-body">
          <Link href="/about" className="hover:text-accent">About</Link>
          <span className="text-border">|</span>
          <Link href="/builder" className="hover:text-accent">Applicant</Link>
          <span className="text-border">|</span>
          <Link href="/employer" className="hover:text-accent">Employer</Link>
          <span className="text-border">|</span>
          <Link href="/privacy" className="hover:text-accent">Privacy</Link>
          <span className="text-border">|</span>
          <Link href="/roadmap" className="hover:text-accent">Roadmap</Link>
          <span className="text-border">|</span>
          <a
            href="https://github.com/madriz/credentia-one"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            GitHub
          </a>
        </div>
        <div className="text-text-muted text-xs">
          Copyright 2026 Credentia One. Apache 2.0 License.
        </div>
      </div>
    </footer>
  );
}
