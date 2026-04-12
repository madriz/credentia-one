import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';

export default function RoadmapPage() {
  return (
    <>
      <Nav />
      <main className="container-content py-12 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
          What comes next
        </h1>
        <p className="text-text-body mb-12">
          Credentia One launched as a web application. The roadmap includes three
          additional delivery channels, each designed to make the standard more
          accessible.
        </p>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Chrome Extension
          </h2>
          <p className="text-text-body mb-4">
            A browser extension that reads your .credentia.json file and auto-fills
            employer application forms. When you land on a Workday, Greenhouse, or any
            other ATS portal, the extension maps your Credentia data to the form fields
            and fills them in one click.
          </p>
          <div className="text-sm text-text-body space-y-2">
            <p className="font-medium text-text-primary">Development path:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Register a Chrome Web Store developer account ($5 one-time fee)
              </li>
              <li>
                Build a Manifest V3 extension with content scripts that detect ATS
                form fields
              </li>
              <li>
                Implement field-mapping logic for each major ATS platform (Workday,
                Greenhouse, SAP, Oracle, iCIMS)
              </li>
              <li>
                Submit to Chrome Web Store for review (typically 1 to 3 business days)
              </li>
              <li>
                Ongoing: maintain field mappings as ATS platforms update their forms
              </li>
            </ul>
            <p className="text-text-muted mt-3">
              Estimated effort: 4 to 6 weeks for initial version covering 3 ATS
              platforms.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Mobile App (iOS and Android)
          </h2>
          <p className="text-text-body mb-4">
            A native mobile application where candidates store and manage their
            Credentia One file locally on their device. Generate, edit, and share your
            file directly from your phone.
          </p>
          <div className="text-sm text-text-body space-y-2">
            <p className="font-medium text-text-primary">Development path:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Register an Apple Developer Program account ($99/year) and a Google
                Play Developer account ($25 one-time)
              </li>
              <li>
                Build using React Native or a similar cross-platform framework to
                maintain a single codebase
              </li>
              <li>
                All data stored locally on-device using encrypted local storage
              </li>
              <li>
                Token registration via the same Supabase endpoint used by the web app
              </li>
              <li>
                Submit to App Store (review: 1 to 7 days) and Google Play (review:
                typically under 3 days)
              </li>
              <li>
                Comply with Apple App Review Guidelines and Google Play Developer
                Policies
              </li>
            </ul>
            <p className="text-text-muted mt-3">
              Estimated effort: 6 to 10 weeks for initial version on both platforms.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-text-primary mb-4">
            Microsoft Word / Google Docs Plugin
          </h2>
          <p className="text-text-body mb-4">
            A plugin that generates a .credentia.json file directly from a structured
            Word document or Google Doc. Candidates who prefer working in a word
            processor can fill in a Credentia One template and export a valid file with
            cryptographic verification.
          </p>
          <div className="text-sm text-text-body space-y-2">
            <p className="font-medium text-text-primary">
              Development path for Word:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Register a Microsoft 365 developer account (free with Microsoft 365
                Developer Program)
              </li>
              <li>Build an Office Add-in using the Office JavaScript API</li>
              <li>
                Create a Credentia One template (.dotx) with content controls mapped
                to schema fields
              </li>
              <li>
                The add-in reads content controls, assembles the JSON, generates the
                hash, and registers the token
              </li>
              <li>Submit to Microsoft AppSource for review</li>
            </ul>

            <p className="font-medium text-text-primary mt-4">
              Development path for Google Docs:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Build a Google Workspace Add-on using Apps Script or the Workspace
                Add-ons SDK
              </li>
              <li>Create a template Google Doc with named sections</li>
              <li>
                The add-on reads document content, assembles JSON, and registers the
                token via Supabase
              </li>
              <li>Publish via Google Workspace Marketplace</li>
            </ul>
            <p className="text-text-muted mt-3">
              Estimated effort: 3 to 5 weeks per platform.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
