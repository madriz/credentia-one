'use client';

import { useState, useRef } from 'react';
import type { FormState } from '@/lib/schema';
import { emptyForm } from '@/lib/schema';

interface Props {
  onComplete: (form: FormState, message?: string) => void;
}

export default function QuickStart({ onComplete }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const jsonRef = useRef<HTMLInputElement>(null);

  const handlePdf = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const { prefillFromPdf } = await import('@/lib/pdfExtract');
      const form = await prefillFromPdf(file);
      onComplete(form, 'We extracted what we could. Please review and complete all fields.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to read PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleJson = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const base = emptyForm();
      // Handle both old-format (firstName/lastName) and new-format (name.first/last)
      let basics = base.basics;
      if (parsed.basics) {
        basics = { ...base.basics, ...parsed.basics };
        if (parsed.basics.name) {
          basics.firstName = parsed.basics.name.first ?? '';
          basics.lastName = parsed.basics.name.last ?? '';
          basics.middleName = parsed.basics.name.middle ?? '';
          basics.preferredName = parsed.basics.name.preferred ?? '';
        }
      }
      const merged: FormState = {
        basics,
        work: parsed.work?.length ? parsed.work : base.work,
        education: parsed.education?.length ? parsed.education : base.education,
        skills: parsed.skills ?? base.skills,
        certificates: parsed.certificates ?? base.certificates,
        awards: parsed.awards ?? base.awards,
        languages: parsed.languages?.length ? parsed.languages : base.languages,
        compliance: {
          ...base.compliance,
          ...parsed.compliance,
          workAuthorization: {
            ...base.compliance.workAuthorization,
            ...(parsed.compliance?.workAuthorization ?? {}),
          },
        },
        preferences: { ...base.preferences, ...parsed.preferences },
      };
      onComplete(merged, 'Previous file loaded. Review your data and make any updates.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse JSON.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="font-serif text-2xl text-text-primary mb-2">Quick start</h2>
      <p className="text-text-body text-sm mb-6">
        Upload an existing document to pre-fill the form, or start from scratch.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex flex-col justify-between card" style={{ minHeight: 200 }}>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Upload a resume (PDF)</h3>
            <p className="text-xs text-text-muted">
              We will extract basic contact info (name, email, phone, LinkedIn). Work history
              and education require manual entry.
            </p>
          </div>
          <div className="mt-4">
            <input ref={pdfRef} type="file" accept=".pdf" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePdf(f); }} />
            <button type="button" className="btn-outline text-sm w-full" disabled={loading}
              onClick={() => pdfRef.current?.click()}>
              {loading ? 'Processing, please wait.' : 'Choose PDF'}
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between card" style={{ minHeight: 200 }}>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Upload a .credentia.json</h3>
            <p className="text-xs text-text-muted">
              Load a previously generated Credentia One file to continue editing.
            </p>
          </div>
          <div className="mt-4">
            <input ref={jsonRef} type="file" accept=".json" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleJson(f); }} />
            <button type="button" className="btn-outline text-sm w-full" disabled={loading}
              onClick={() => jsonRef.current?.click()}>
              Choose JSON
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between card" style={{ minHeight: 200 }}>
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Start from scratch</h3>
            <p className="text-xs text-text-muted">
              Begin with a blank form and fill in every field manually.
            </p>
          </div>
          <div className="mt-4">
            <button type="button" className="btn-primary text-sm w-full"
              onClick={() => onComplete(emptyForm())}>
              Start from scratch
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-error" role="alert">{error}</div>
      )}
    </div>
  );
}
