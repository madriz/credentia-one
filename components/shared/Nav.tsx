import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="border-b border-border">
      <div className="container-content flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-serif text-xl text-text-primary"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Credentia One
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/builder" className="text-text-body hover:text-accent">
            Builder
          </Link>
          <Link href="/verify" className="text-text-body hover:text-accent">
            Verify
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
      </div>
    </nav>
  );
}
