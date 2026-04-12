import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container-content py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-serif text-lg text-text-primary mb-2">Credentia One</div>
          <div className="text-text-muted">Copyright 2026</div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/builder" className="text-text-body hover:text-accent">
            Builder
          </Link>
          <Link href="/verify" className="text-text-body hover:text-accent">
            Verify
          </Link>
          <Link href="/about" className="text-text-body hover:text-accent">
            About
          </Link>
          <a
            href="https://github.com/madriz/credentia-one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-body hover:text-accent"
          >
            GitHub
          </a>
        </div>
        <div className="text-text-muted">
          Standardizing how the world moves professional data.
        </div>
      </div>
    </footer>
  );
}
