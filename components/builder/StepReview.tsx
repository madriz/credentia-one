import { useMemo, useState } from 'react';
import type { FormState } from '@/lib/schema';
import { checkCompleteness, isComplete } from '@/lib/validation';
import { buildDocument, generateCredentiaFile, downloadFile } from '@/lib/token';
import type { GenerateResult } from '@/lib/token';

interface Props {
  form: FormState;
  onReset?: () => void;
}

function highlightJson(json: string): string {
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g,
      (match, str, colon, kw, num) => {
        if (str) {
          if (colon) return `<span style="color:#00ACED">${str}</span>${colon}`;
          return `<span style="color:#16A34A">${str}</span>`;
        }
        if (kw) return `<span style="color:#9CA3AF">${kw}</span>`;
        if (num) return `<span style="color:#EA580C">${num}</span>`;
        return match;
      },
    );
}

function DownloadSection({
  result,
  onReset,
}: {
  result: GenerateResult;
  onReset?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(result.verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable.
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-text-primary mb-3">
          Your Credentia One files are ready
        </h2>
        <p className="text-text-body text-sm">
          Two files have been generated. Both contain your professional data. The JSON
          file is the machine-readable standard used by employers. The Markdown file is
          a human-friendly version you can read and share.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-accent font-medium mb-2">JSON</div>
            <div className="text-sm font-medium text-text-primary mb-1">
              {result.jsonFilename}
            </div>
            <p className="text-xs text-text-muted mb-4">
              The Credentia One standard file. This is the file employers will use to
              process your application.
            </p>
          </div>
          <button
            type="button"
            className="btn-primary text-sm w-full text-center"
            onClick={() =>
              downloadFile(result.jsonFilename, result.json, 'application/json')
            }
          >
            Download .credentia.json
          </button>
        </div>

        <div className="card flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-accent font-medium mb-2">
              Markdown
            </div>
            <div className="text-sm font-medium text-text-primary mb-1">
              {result.mdFilename}
            </div>
            <p className="text-xs text-text-muted mb-4">
              A readable version of your professional record. You can open this in any
              text editor or Markdown viewer.
            </p>
          </div>
          <button
            type="button"
            className="btn-outline text-sm w-full text-center"
            onClick={() =>
              downloadFile(result.mdFilename, result.markdown, 'text/markdown')
            }
          >
            Download .credentia.md
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="font-serif text-lg text-text-primary mb-3">
          Verification Token
        </h3>
        <p className="text-xs text-text-muted mb-4">
          A unique cryptographic fingerprint of your file has been registered with
          Credentia One. When you submit this file to an employer, they can use the
          Credentia One verification API to confirm it was generated using the standard
          and has not been tampered with. This adds a layer of trust to your application
          without exposing any of your personal data.
        </p>
        <div className="font-mono text-xs p-3 rounded border border-border bg-bg-warm break-all mb-4">
          {result.token}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-sm text-text-body break-all">{result.verifyUrl}</div>
          <button type="button" onClick={copyUrl} className="btn-outline text-sm shrink-0">
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>
      </div>

      {onReset && (
        <div className="text-center">
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-text-muted hover:text-accent underline"
          >
            Start a new file
          </button>
        </div>
      )}
    </div>
  );
}

export default function StepReview({ form, onReset }: Props) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checks = useMemo(() => checkCompleteness(form), [form]);
  const ready = isComplete(form);

  const previewJson = useMemo(() => {
    const now = new Date();
    const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    const doc = buildDocument(form, {
      generatedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    });
    return JSON.stringify(doc, null, 2);
  }, [form]);

  const sizeKb = useMemo(() => {
    const bytes = new TextEncoder().encode(previewJson).length;
    return (bytes / 1024).toFixed(2);
  }, [previewJson]);

  const handleGenerate = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await generateCredentiaFile(form);
      setResult(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed.');
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return <DownloadSection result={result} onReset={onReset} />;
  }

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-text-primary">Review and generate</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-serif text-lg text-text-primary mb-4">Completeness</h3>
          <ul className="space-y-2">
            {checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className="inline-block w-5 text-center"
                  style={{
                    color: c.ok ? 'var(--color-success)' : 'var(--color-error)',
                  }}
                >
                  {c.ok ? '\u2713' : '\u2715'}
                </span>
                <span className={c.ok ? 'text-text-body' : 'text-error'}>
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-text-primary mb-4">JSON preview</h3>
          <pre
            className="font-mono text-xs p-4 rounded border border-border bg-bg-warm overflow-auto"
            style={{ maxHeight: 500 }}
            dangerouslySetInnerHTML={{ __html: highlightJson(previewJson) }}
          />
          <p className="mt-2 text-xs text-text-muted">{sizeKb} KB</p>
        </div>
      </div>

      {error && (
        <div className="text-sm text-error" role="alert">
          {error}
        </div>
      )}

      <button
        type="button"
        className="btn-primary w-full text-center"
        disabled={!ready || busy}
        onClick={handleGenerate}
      >
        {busy
          ? 'Generating, please wait.'
          : ready
            ? 'Generate and Download'
            : 'Complete all required fields first'}
      </button>
    </div>
  );
}
