import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container-content py-20 md:py-28">
      <h1 className="font-serif text-4xl md:text-6xl text-text-primary leading-tight max-w-3xl">
        One file. Any employer. Any country.
      </h1>
      <p className="mt-8 max-w-2xl text-lg text-text-body">
        Credentia One is an open document standard that replaces the 20-minute job
        application with a 10-second file transfer. Fill out your professional data
        once. Use it everywhere.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/builder" className="btn-primary">
          Build Your Credentia One File
        </Link>
        <a
          href="https://github.com/madriz/credentia-one"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent text-sm"
        >
          View the open schema on GitHub
        </a>
      </div>
    </section>
  );
}
