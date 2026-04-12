export default function HowItWorks() {
  return (
    <section className="container-content py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-12">
        How it works
      </h2>

      <div className="mb-14">
        <h3 className="font-serif text-xl text-text-primary mb-8">
          For Candidates (always free)
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-serif text-5xl text-accent mb-4">1</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Fill</h4>
            <p className="text-text-body">
              Complete the guided form with your professional history, skills, and
              compliance data.
            </p>
          </div>
          <div>
            <div className="font-serif text-5xl text-accent mb-4">2</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Generate</h4>
            <p className="text-text-body">
              Download your .credentia.json file. A cryptographic token is registered
              to certify your file.
            </p>
          </div>
          <div>
            <div className="font-serif text-5xl text-accent mb-4">3</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Apply</h4>
            <p className="text-text-body">
              Submit your Credentia file to any employer. One file, zero re-typing.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-14">
        <h3 className="font-serif text-xl text-text-primary mb-8">For Employers</h3>
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="font-serif text-5xl text-accent mb-4">1</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Receive</h4>
            <p className="text-text-body">
              Accept .credentia.json files from candidates. Structured data, zero
              parsing errors.
            </p>
          </div>
          <div>
            <div className="font-serif text-5xl text-accent mb-4">2</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Verify</h4>
            <p className="text-text-body">
              Use the Credentia One verification API to confirm file authenticity and
              integrity.
            </p>
          </div>
          <div>
            <div className="font-serif text-5xl text-accent mb-4">3</div>
            <h4 className="font-serif text-2xl text-text-primary mb-3">Process</h4>
            <p className="text-text-body">
              Ingest verified data into your existing ATS, HRIS, or screening
              workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
