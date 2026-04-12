import Link from 'next/link';

export default function Hero() {
  return (
    <section className="container-content py-20 md:py-28">
      <h1 className="font-serif text-4xl md:text-6xl text-text-primary leading-tight max-w-3xl">
        One file. Any employer. Any country.
      </h1>
      <p className="mt-4 font-serif italic text-lg max-w-2xl" style={{ color: '#666666' }}>
        Standardizing how the world moves professional data.
      </p>
      <p className="mt-8 max-w-2xl text-lg text-text-body">
        Credentia One is an open document standard for job applications. Candidates
        generate a single portable file containing their complete professional record.
        Employers receive structured, verified data that their systems can read without
        parsing errors.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
        <Link href="/builder" className="btn-primary">
          Build Your Credentia One File
        </Link>
        <Link href="/employer" className="btn-outline">
          For Employers
        </Link>
      </div>
    </section>
  );
}
