/* eslint-disable @next/next/no-img-element */

export default function MadeInCanada() {
  return (
    <section className="container-content py-10">
      <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
        <img
          src="/canada-flag.svg"
          alt="Canadian flag"
          width={30}
          height={20}
          style={{ height: 20, width: 'auto' }}
        />
        <span>A 100% made-in-Canada initiative</span>
      </div>
    </section>
  );
}
