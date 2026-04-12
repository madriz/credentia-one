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
      // Accept either a full CredentiaDocument or just the form data
      const form: FormState = parsed.$credentia
        ? {
            basics: parsed.basics,
            work: parsed.work,
            education: parsed.education,
            skills: parsed.skills ?? [],
            certificates: parsed.certificates ?? [],
            languages: parsed.languages ?? [],
            compliance: parsed.compliance,
            preferences: parsed.preferences,
          }
        : parsed;
      // Ensure required fields exist with defaults
      const base = emptyForm();
      const merged: FormState = {
        basics: { ...base.basics, ...form.basics },
        work: form.work?.length ? form.work : base.work,
        education: form.education?.length ? form.education : base.education,
        skills: form.skills ?? base.skills,
        certificates: form.certificates ?? base.certificates,
        languages: form.languages?.length ? form.languages : base.languages,
        compliance: {
          ...base.compliance,
          ...form.compliance,
          workAuthorization: {
            ...base.compliance.workAuthorization,
            ...(form.compliance?.workAuthorization ?? {}),
          },
        },
        preferences: { ...base.preferences, ...form.preferences },
      };
      onComplete(merged, 'Previous file loaded. Review your data and make any updates.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to parse JSON.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-6">
      <h2 className="font-serif text-2xl text-text-primary">Quick start</h2>
      <p className="text-text-body text-sm">
        Upload an existing document to pre-fill the form, or start from scratch.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-text-primary">Upload a resume (PDF)</h3>
          <p className="text-xs text-text-muted">
            We will extract basic contact info (name, email, phone, LinkedIn). Work history
            and education require manual entry.
          </p>
          <input
            ref={pdfRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handlePdf(f);
            }}
          />
          <button
            type="button"
            className="btn-outline text-sm w-full"
            disabled={loading}
            onClick={() => pdfRef.current?.click()}
          >
            {loading ? 'Processing, please wait.' : 'Choose PDF'}
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-text-primary">Upload a .credentia.json</h3>
          <p className="text-xs text-text-muted">
            Load a previously generated Credentia One file to continue editing.
          </p>
          <input
            ref={jsonRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleJson(f);
            }}
          />
          <button
            type="button"
            className="btn-outline text-sm w-full"
            disabled={loading}
            onClick={() => jsonRef.current?.click()}
          >
            Choose JSON
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-text-primary">Start from scratch</h3>
          <p className="text-xs text-text-muted">
            Begin with a blank form and fill in every field manually.
          </p>
          <button
            type="button"
            className="btn-primary text-sm w-full"
            onClick={() => onComplete(emptyForm())}
          >
            Start from scratch
          </button>
        </div>
      </div>

      {error && (
        <div className="text-sm text-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
