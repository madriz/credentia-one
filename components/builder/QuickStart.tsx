'use client';

import { useState, useRef } from 'react';
import type {
  FormState,
  DateYM,
  WorkLocationDetail,
  WorkEntry,
  EducationEntry,
  Certificate,
  Award,
  Language,
  SkillGroup,
} from '@/lib/schema';
import { emptyForm, emptyWorkLocation, EMPTY_DATE } from '@/lib/schema';

interface Props {
  onComplete: (form: FormState, message?: string) => void;
}

function parseDate(s: unknown): DateYM {
  if (typeof s !== 'string') return { ...EMPTY_DATE };
  const m = /^(\d{4})-(\d{2})$/.exec(s);
  if (!m) return { ...EMPTY_DATE };
  return { year: m[1], month: m[2] };
}

function parseLocation(s: unknown): WorkLocationDetail {
  if (typeof s !== 'string' || !s.trim()) return emptyWorkLocation();
  if (s.trim() === 'Remote') return { city: '', region: '', countryCode: '', remote: true };
  const parts = s.split(',').map((p) => p.trim()).filter(Boolean);
  return {
    city: parts[0] ?? '',
    region: parts[1] ?? '',
    countryCode: parts[2] ?? '',
    remote: false,
  };
}

function boolToYesNo(v: unknown): 'Yes' | 'No' | '' {
  if (v === true) return 'Yes';
  if (v === false) return 'No';
  return '';
}

const NOTICE_PRESETS = [
  'Immediate (available now)',
  '1 week', '2 weeks', '3 weeks',
  '1 month', '6 weeks', '2 months', '3 months',
];

function parseNoticePeriod(s: unknown): {
  noticePeriod: string;
  noticePeriodCustom: { amount: string; unit: string };
} {
  if (typeof s !== 'string' || !s) {
    return { noticePeriod: '', noticePeriodCustom: { amount: '', unit: 'Days' } };
  }
  if (NOTICE_PRESETS.includes(s)) {
    return { noticePeriod: s, noticePeriodCustom: { amount: '', unit: 'Days' } };
  }
  const m = /^(\d+)\s+(Days|Weeks|Months)$/i.exec(s);
  if (m) {
    const unit = m[2][0].toUpperCase() + m[2].slice(1).toLowerCase();
    return { noticePeriod: 'Other', noticePeriodCustom: { amount: m[1], unit } };
  }
  return { noticePeriod: s, noticePeriodCustom: { amount: '', unit: 'Days' } };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCredentiaJson(parsed: any): FormState {
  const base = emptyForm();

  const basics = { ...base.basics };
  if (parsed.basics) {
    const pb = parsed.basics;
    if (pb.name) {
      basics.firstName = pb.name.first ?? '';
      basics.lastName = pb.name.last ?? '';
      basics.middleName = pb.name.middle ?? '';
      basics.preferredName = pb.name.preferred ?? '';
    } else {
      basics.firstName = pb.firstName ?? basics.firstName;
      basics.lastName = pb.lastName ?? basics.lastName;
      basics.middleName = pb.middleName ?? basics.middleName;
      basics.preferredName = pb.preferredName ?? basics.preferredName;
    }
    basics.email = pb.email ?? '';
    basics.phone = pb.phone ?? '';
    basics.headline = pb.headline ?? '';
    basics.url = pb.url ?? '';
    basics.summary = pb.summary ?? '';
    if (pb.location) {
      basics.location = {
        address: pb.location.address ?? '',
        city: pb.location.city ?? '',
        region: pb.location.region ?? '',
        postalCode: pb.location.postalCode ?? '',
        countryCode: pb.location.countryCode ?? '',
      };
    }
    if (Array.isArray(pb.profiles) && pb.profiles.length > 0) {
      basics.profiles = pb.profiles.map((p: { network?: string; username?: string; url?: string }) => ({
        network: p.network ?? 'LinkedIn',
        username: p.username ?? '',
        url: p.url ?? '',
      }));
    }
  }

  const work: WorkEntry[] =
    Array.isArray(parsed.work) && parsed.work.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? parsed.work.map((w: any) => ({
          company: w.company ?? '',
          position: w.position ?? '',
          locationDetail: parseLocation(w.location),
          description: w.description ?? '',
          url: w.url ?? '',
          startDate: parseDate(w.startDate),
          current: w.current === true,
          endDate: parseDate(w.endDate),
          summary: w.summary ?? '',
          highlights: Array.isArray(w.highlights) && w.highlights.length > 0 ? w.highlights : [''],
        }))
      : base.work;

  const education: EducationEntry[] =
    Array.isArray(parsed.education) && parsed.education.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? parsed.education.map((e: any) => ({
          institution: e.institution ?? '',
          area: e.area ?? '',
          studyType: e.studyType ?? '',
          url: e.url ?? '',
          startDate: parseDate(e.startDate),
          endDate: parseDate(e.endDate),
          score: e.score ?? '',
          courses: Array.isArray(e.courses) && e.courses.length > 0 ? e.courses : [''],
        }))
      : base.education;

  const skills: SkillGroup[] = Array.isArray(parsed.skills)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? parsed.skills.map((s: any) => ({
        category: s.category ?? '',
        level: s.level ?? 'Intermediate',
        keywords: Array.isArray(s.keywords) ? s.keywords : [],
      }))
    : base.skills;

  const certificates: Certificate[] = Array.isArray(parsed.certificates)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? parsed.certificates.map((c: any) => ({
        name: c.name ?? '',
        issuer: c.issuer ?? '',
        date: parseDate(c.date),
        expires: parseDate(c.expires),
        url: c.url ?? '',
      }))
    : base.certificates;

  const awards: Award[] = Array.isArray(parsed.awards)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? parsed.awards.map((a: any) => ({
        title: a.title ?? '',
        issuer: a.issuer ?? '',
        date: parseDate(a.date),
        description: a.description ?? '',
      }))
    : base.awards;

  const languages: Language[] =
    Array.isArray(parsed.languages) && parsed.languages.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? parsed.languages.map((l: any) => ({
          language: l.language ?? '',
          fluency: l.fluency ?? 'Fluent',
        }))
      : base.languages;

  const compliance = { ...base.compliance };
  if (parsed.compliance) {
    const pc = parsed.compliance;
    if (pc.workAuthorization) {
      const wa = pc.workAuthorization;
      // status array may include the custom string; separate any unrecognized one into customStatus.
      const statusArr: string[] = Array.isArray(wa.status) ? wa.status : [];
      compliance.workAuthorization = {
        authorized: boolToYesNo(wa.authorized),
        requiresSponsorship: boolToYesNo(wa.requiresSponsorship),
        countries: Array.isArray(wa.countries) ? wa.countries : [],
        statuses: statusArr,
        customStatus: '',
      };
    }
    // eeoc -> unitedStatesEeoc
    const eeoc = pc.eeoc ?? pc.unitedStatesEeoc;
    if (eeoc) {
      compliance.unitedStatesEeoc = {
        gender: eeoc.gender ?? '',
        raceEthnicity: Array.isArray(eeoc.raceEthnicity) ? eeoc.raceEthnicity : [],
        veteranStatus: eeoc.veteranStatus ?? '',
        disability: eeoc.disability ?? '',
      };
    }
    // canadianEquity -> canadaEmploymentEquity
    const ca = pc.canadianEquity ?? pc.canadaEmploymentEquity;
    if (ca) {
      compliance.canadaEmploymentEquity = {
        indigenousIdentity: ca.indigenousIdentity ?? '',
        visibleMinority: ca.visibleMinority ?? '',
        personWithDisability: ca.personWithDisability ?? '',
      };
    }
    if (pc.ukEqualityAct) {
      compliance.ukEqualityAct = {
        gender: pc.ukEqualityAct.gender ?? '',
        ethnicity: pc.ukEqualityAct.ethnicity ?? '',
        disability: pc.ukEqualityAct.disability ?? '',
        religion: pc.ukEqualityAct.religion ?? '',
        sexualOrientation: pc.ukEqualityAct.sexualOrientation ?? '',
        ageRange: pc.ukEqualityAct.ageRange ?? '',
      };
    }
    if (pc.euDisclosures) {
      compliance.euDisclosures = {
        gdprConsent: pc.euDisclosures.gdprConsent === true,
        gdprConsentTimestamp: pc.euDisclosures.gdprConsentTimestamp ?? '',
        dataRetentionPreference: pc.euDisclosures.dataRetentionPreference ?? '',
        gender: pc.euDisclosures.gender ?? '',
        disability: pc.euDisclosures.disability ?? '',
      };
    }
    if (pc.australianEqualOpportunity) {
      compliance.australianEqualOpportunity = {
        indigenousStatus: pc.australianEqualOpportunity.indigenousStatus ?? '',
        gender: pc.australianEqualOpportunity.gender ?? '',
        disability: pc.australianEqualOpportunity.disability ?? '',
        languageAtHome: pc.australianEqualOpportunity.languageAtHome ?? '',
        languageAtHomeOther: '',
      };
    }
    if (pc.newZealandDisclosures) {
      compliance.newZealandDisclosures = {
        ethnicity: Array.isArray(pc.newZealandDisclosures.ethnicity) ? pc.newZealandDisclosures.ethnicity : [],
        ethnicityOther: '',
        gender: pc.newZealandDisclosures.gender ?? '',
        disability: pc.newZealandDisclosures.disability ?? '',
        iwi: pc.newZealandDisclosures.iwi ?? '',
      };
    }
  }

  const preferences = { ...base.preferences };
  if (parsed.preferences) {
    const pp = parsed.preferences;
    preferences.desiredRoles =
      Array.isArray(pp.desiredRoles) && pp.desiredRoles.length > 0 ? pp.desiredRoles : [''];
    preferences.salary = {
      min: typeof pp.salary?.min === 'number' ? pp.salary.min : undefined,
      max: typeof pp.salary?.max === 'number' ? pp.salary.max : undefined,
      currency: pp.salary?.currency ?? 'USD',
      period: pp.salary?.period ?? 'Annual',
    };
    preferences.workArrangement = Array.isArray(pp.workArrangement) ? pp.workArrangement : [];
    preferences.willingToRelocate = boolToYesNo(pp.willingToRelocate);
    preferences.availableFrom = parseDate(pp.availableFrom);
    const notice = parseNoticePeriod(pp.noticePeriod);
    preferences.noticePeriod = notice.noticePeriod;
    preferences.noticePeriodCustom = notice.noticePeriodCustom;
  }

  return {
    basics,
    work,
    education,
    skills,
    certificates,
    awards,
    languages,
    compliance,
    preferences,
  };
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
      const merged = parseCredentiaJson(parsed);
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
