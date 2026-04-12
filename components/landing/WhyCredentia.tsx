export default function WhyCredentia() {
  return (
    <section className="container-content py-20">
      <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-12">
        The cost of broken transport
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-serif text-xl text-text-primary mb-4">For candidates</h3>
          <p className="text-text-body">
            The average job seeker submits 32 to 200 applications before receiving a
            single offer. Each takes 15 to 20 minutes of manual data entry. The same
            phone number, the same work history, the same compliance answers, typed into
            different portals built by competing software vendors with no
            interoperability. Only 2.4% of applications result in an interview. The
            median time from application to first offer is 68.5 days.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl text-text-primary mb-4">For employers</h3>
          <p className="text-text-body">
            A typical job opening receives 242 applications. Resumes arrive as
            unstructured PDFs that the ATS has to parse. An analysis of 1,000 rejected
            resumes across Workday, Taleo, and Greenhouse found that 43% of rejections
            were caused by formatting errors, parsing failures, or filter
            misconfigurations, not qualification gaps. Harvard Business School&apos;s
            &quot;Hidden Workers&quot; study found that 88% of executives acknowledged
            their ATS was filtering out qualified candidates who did not exactly match
            the hiring criteria.
          </p>
        </div>
      </div>
      <p className="mt-8 text-xs text-text-muted">
        Sources: EDLIGO 2025, Harvard Business School and Accenture 2021, Novoresume
        2026, ResuTrack 2026
      </p>
    </section>
  );
}
