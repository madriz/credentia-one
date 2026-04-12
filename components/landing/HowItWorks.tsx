const STEPS = [
  {
    n: '1',
    title: 'Fill',
    body: 'Complete the guided form with your professional history, skills, and compliance data. Every field an employer might ask, handled once.',
  },
  {
    n: '2',
    title: 'Generate',
    body: 'Download your .credentia.json file. It is generated entirely in your browser. Your data never touches our servers.',
  },
  {
    n: '3',
    title: 'Apply',
    body: 'Use your Credentia file to apply anywhere. One file replaces hundreds of repetitive forms.',
  },
];

export default function HowItWorks() {
  return (
    <section className="container-content py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-12">
        How it works
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {STEPS.map((s) => (
          <div key={s.n}>
            <div className="font-serif text-5xl text-accent mb-4">{s.n}</div>
            <h3 className="font-serif text-2xl text-text-primary mb-3">{s.title}</h3>
            <p className="text-text-body">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
