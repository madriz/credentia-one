'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/landing/Footer';
import ProgressBar from '@/components/builder/ProgressBar';
import QuickStart from '@/components/builder/QuickStart';
import StepPersonal from '@/components/builder/StepPersonal';
import StepWork from '@/components/builder/StepWork';
import StepEducation from '@/components/builder/StepEducation';
import StepSkills from '@/components/builder/StepSkills';
import StepCompliance from '@/components/builder/StepCompliance';
import StepPreferences from '@/components/builder/StepPreferences';
import StepReview from '@/components/builder/StepReview';
import type { FormState } from '@/lib/schema';
import { emptyForm } from '@/lib/schema';
import { loadDraft, saveDraft, clearDraft, debounce } from '@/lib/storage';
import { validateStep } from '@/lib/validation';

const STEPS = [
  'Personal',
  'Work',
  'Education',
  'Skills',
  'Compliance',
  'Preferences',
  'Review',
];

export default function BuilderPage() {
  const [form, setForm] = useState<FormState>(() => emptyForm());
  const [step, setStep] = useState(-1);
  const [banner, setBanner] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const debouncedSave = useMemo(() => debounce(saveDraft, 500), []);
  const restoredOnce = useRef(false);

  useEffect(() => {
    if (restoredOnce.current) return;
    restoredOnce.current = true;
    const draft = loadDraft();
    if (draft) {
      if (!draft.awards) draft.awards = [];
      if (!draft.compliance.workAuthorization.statuses) {
        draft.compliance.workAuthorization.statuses = [];
      }
      if (!draft.preferences.noticePeriodCustom) {
        draft.preferences.noticePeriodCustom = { amount: '', unit: 'Days' };
      }
      setForm(draft);
      setStep(0);
      setBanner('Draft restored from your last session.');
    }
    document.title = 'Build Your Credentia One File | Credentia One';
  }, []);

  useEffect(() => {
    if (step >= 0) debouncedSave(form);
  }, [form, debouncedSave, step]);

  const handleQuickStart = (incoming: FormState, message?: string) => {
    if (!incoming.awards) incoming.awards = [];
    if (!incoming.compliance.workAuthorization.statuses) {
      incoming.compliance.workAuthorization.statuses = [];
    }
    setForm(incoming);
    setStep(0);
    if (message) setBanner(message);
  };

  const handleNext = () => {
    const stepErrors = validateStep(step + 1, form);
    if (stepErrors.length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors([]);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setErrors([]);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleClearAll = () => {
    if (typeof window === 'undefined') return;
    const ok = window.confirm('This will erase all of your draft data. Continue?');
    if (!ok) return;
    clearDraft();
    setForm(emptyForm());
    setStep(-1);
    setBanner(null);
  };

  return (
    <>
      <Nav />
      <main className="container-content py-12">
        <h1 className="font-serif text-3xl md:text-4xl text-text-primary mb-4">
          Build your Credentia One file
        </h1>
        <p className="text-text-body max-w-3xl mb-10">
          This form generates a .credentia.json file containing your complete
          professional and compliance data. Everything runs in your browser. Nothing is
          sent to any server. When you generate your file, a cryptographic hash is
          registered with the Credentia One verification service. This hash contains no
          personal information. It allows employers to confirm that your file is
          authentic and unmodified.
        </p>

        {step === -1 && <QuickStart onComplete={handleQuickStart} />}

        {step >= 0 && (
          <>
            {banner && (
              <div
                className="border-l-4 p-3 mb-8 text-sm flex items-center justify-between rounded"
                style={{ background: '#E0F4FB', borderColor: '#00ACED' }}
              >
                <span>{banner}</span>
                <button
                  type="button"
                  className="text-accent text-sm underline ml-4"
                  onClick={() => setBanner(null)}
                >
                  Dismiss
                </button>
              </div>
            )}

            <ProgressBar
              steps={STEPS}
              current={step}
              onJump={(i) => {
                if (i <= step) setStep(i);
              }}
            />

            <div className="card">
              {step === 0 && (
                <StepPersonal
                  value={form.basics}
                  onChange={(b) => setForm({ ...form, basics: b })}
                />
              )}
              {step === 1 && (
                <StepWork
                  value={form.work}
                  onChange={(w) => setForm({ ...form, work: w })}
                />
              )}
              {step === 2 && (
                <StepEducation
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e })}
                />
              )}
              {step === 3 && (
                <StepSkills
                  skills={form.skills}
                  certificates={form.certificates}
                  awards={form.awards}
                  languages={form.languages}
                  onSkills={(s) => setForm({ ...form, skills: s })}
                  onCertificates={(c) => setForm({ ...form, certificates: c })}
                  onAwards={(a) => setForm({ ...form, awards: a })}
                  onLanguages={(l) => setForm({ ...form, languages: l })}
                />
              )}
              {step === 4 && (
                <StepCompliance
                  value={form.compliance}
                  onChange={(c) => setForm({ ...form, compliance: c })}
                />
              )}
              {step === 5 && (
                <StepPreferences
                  value={form.preferences}
                  onChange={(p) => setForm({ ...form, preferences: p })}
                />
              )}
              {step === 6 && (
                <StepReview form={form} onReset={handleClearAll} />
              )}
            </div>

            {errors.length > 0 && (
              <div
                className="mt-4 border-l-4 p-3 text-sm rounded"
                style={{ background: '#FDECEC', borderColor: '#DC2626', color: '#7F1D1D' }}
                role="alert"
              >
                <ul className="list-disc pl-5">
                  {errors.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                className="btn-outline"
                onClick={handleBack}
                disabled={step === 0}
                style={step === 0 ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
              >
                Back
              </button>
              {step < STEPS.length - 1 && (
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Next
                </button>
              )}
            </div>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleClearAll}
                className="text-sm text-text-muted hover:text-error underline"
              >
                Clear all data
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
