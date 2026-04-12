const ITEMS = [
  {
    title: 'Not an ATS.',
    body: 'Employers keep their preferred system. We standardize the input, not the processing.',
  },
  {
    title: 'Not an identity validator.',
    body: 'We verify that your data is complete and properly structured. Background checks and identity verification remain the employer\u2019s responsibility.',
  },
  {
    title: 'Not a resume database.',
    body: 'Your data lives in your browser and on your device. We store a cryptographic hash to certify authenticity. Nothing else.',
  },
];

export default function WhyCredentia() {
  return (
    <section className="container-content py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-12">
        What this is not
      </h2>
      <div className="grid md:grid-cols-3 gap-10">
        {ITEMS.map((item) => (
          <div key={item.title}>
            <h3 className="font-serif text-xl text-text-primary mb-3">{item.title}</h3>
            <p className="text-text-body">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
