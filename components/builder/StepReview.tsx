import { useMemo, useState } from 'react';
import type { FormState } from '@/lib/schema';
import { checkCompleteness, isComplete } from '@/lib/validation';
import { buildDocument, generateCredentiaFile, downloadJson } from '@/lib/token';

interface Props {
  form: FormState;
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
          if (colon) {
            return `<span style="color:#00ACED">${str}</span>${colon}`;
          }
          return `<span style="color:#16A34A">${str}</span>`;
        }
        if (kw) return `<span style="color:#9CA3AF">${kw}</span>`;
        if (num) return `<span style="color:#EA580C">${num}</span>`;
        return match;
      },
    );
}

export default function StepReview({ form }: Props) {
  const [busy, setBusy] = useState(false);
  const [verifyUrl, setVerifyUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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
      const result = await generateCredentiaFile(form);
      downloadJson(result.filename, result.json);
      setVerifyUrl(result.verifyUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed.');
    } finally {
      setBusy(false);
    }
  };

  const copyUrl = async () => {
    if (!verifyUrl) return;
    try {
      await navigator.clipboard.writeText(verifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable.
    }
  };

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
                  style={{ color: c.ok ? 'var(--color-success)' : 'var(--color-error)' }}
                >
                  {c.ok ? '\u2713' : '\u2715'}
                </span>
                <span className={c.ok ? 'text-text-body' : 'text-error'}>{c.label}</span>
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

      {verifyUrl && (
        <div
          className="border-l-4 p-4 text-sm rounded"
          style={{ background: '#E6F8EE', borderColor: '#16A34A', color: '#1A1A1A' }}
        >
          <div className="font-medium mb-2">Generated and registered.</div>
          <div className="break-all mb-3">{verifyUrl}</div>
          <button type="button" onClick={copyUrl} className="btn-outline">
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>
      )}

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
