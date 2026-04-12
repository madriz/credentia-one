'use client';

import { useState } from 'react';
import Link from 'next/link';

function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold" style={{ color: '#1A1A1A' }}>Credentia</span>{' '}
      <span className="font-bold" style={{ color: '#00ACED' }}>One</span>
    </span>
  );
}

const NAV_LINKS = [
  { href: '/builder', label: 'Applicant' },
  { href: '/employer', label: 'Employer' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-border">
      <div className="container-content flex items-center justify-between py-5">
        <Link href="/" className="font-serif text-xl" style={{ textDecoration: 'none' }}>
          <BrandLogo />
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-text-body hover:text-accent">
              {l.label}
            </Link>
          ))}
          <a
            href="https://github.com/madriz/credentia-one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-body hover:text-accent"
          >
            GitHub
          </a>
        </div>
        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 h-0.5 bg-text-primary" />
          <span className="block w-5 h-0.5 bg-text-primary" />
          <span className="block w-5 h-0.5 bg-text-primary" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border">
          <div className="container-content py-4 flex flex-col gap-3 text-sm">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-text-body hover:text-accent py-1"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://github.com/madriz/credentia-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-body hover:text-accent py-1"
              onClick={() => setOpen(false)}
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
