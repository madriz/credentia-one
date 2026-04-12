import type {
  CredentiaDocument,
  FormState,
  WorkEntry,
  EducationEntry,
  SkillGroup,
  Certificate,
  Language,
  Compliance,
  Preferences,
} from './schema';
import { getSupabase } from './supabase';

const VERSION = '1.0.0';
const EXPIRY_DAYS = 90;

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function trimWork(entries: WorkEntry[]): WorkEntry[] {
  return entries
    .filter((w) => w.company.trim() || w.position.trim())
    .map((w) => {
      const cleaned: WorkEntry = {
        company: w.company.trim(),
        position: w.position.trim(),
        startDate: w.startDate,
        current: w.current,
        highlights: w.highlights.map((h) => h.trim()).filter(Boolean),
      };
      if (w.location?.trim()) cleaned.location = w.location.trim();
      if (w.description?.trim()) cleaned.description = w.description.trim();
      if (w.url?.trim()) cleaned.url = w.url.trim();
      if (!w.current && w.endDate && (w.endDate.month || w.endDate.year)) {
        cleaned.endDate = w.endDate;
      }
      if (w.summary?.trim()) cleaned.summary = w.summary.trim();
      return cleaned;
    });
}

function trimEducation(entries: EducationEntry[]): EducationEntry[] {
  return entries
    .filter((e) => e.institution.trim() || e.area.trim())
    .map((e) => {
      const cleaned: EducationEntry = {
        institution: e.institution.trim(),
        area: e.area.trim(),
        studyType: e.studyType.trim(),
        courses: e.courses.map((c) => c.trim()).filter(Boolean),
      };
      if (e.url?.trim()) cleaned.url = e.url.trim();
      if (e.startDate && (e.startDate.month || e.startDate.year)) {
        cleaned.startDate = e.startDate;
      }
      if (e.endDate && (e.endDate.month || e.endDate.year)) {
        cleaned.endDate = e.endDate;
      }
      if (e.score?.trim()) cleaned.score = e.score.trim();
      return cleaned;
    });
}

function trimSkills(skills: SkillGroup[]): SkillGroup[] {
  return skills
    .filter((s) => s.category.trim() && s.keywords.length > 0)
    .map((s) => ({
      category: s.category.trim(),
      level: s.level,
      keywords: s.keywords,
    }));
}

function trimCertificates(certs: Certificate[]): Certificate[] {
  return certs
    .filter((c) => c.name.trim())
    .map((c) => {
      const cleaned: Certificate = { name: c.name.trim() };
      if (c.issuer?.trim()) cleaned.issuer = c.issuer.trim();
      if (c.date && (c.date.month || c.date.year)) cleaned.date = c.date;
      if (c.expires && (c.expires.month || c.expires.year)) cleaned.expires = c.expires;
      if (c.url?.trim()) cleaned.url = c.url.trim();
      return cleaned;
    });
}

function trimLanguages(langs: Language[]): Language[] {
  return langs
    .filter((l) => l.language.trim())
    .map((l) => ({ language: l.language.trim(), fluency: l.fluency }));
}

function trimCompliance(c: Compliance): Compliance {
  const result: Compliance = {
    workAuthorization: {
      authorized: c.workAuthorization.authorized,
      countries: c.workAuthorization.countries,
      requiresSponsorship: c.workAuthorization.requiresSponsorship,
    },
  };
  if (c.workAuthorization.status?.trim()) {
    result.workAuthorization.status = c.workAuthorization.status.trim();
  }
  if (c.unitedStatesEeoc) {
    const us = c.unitedStatesEeoc;
    if (us.gender || us.raceEthnicity.length || us.veteranStatus || us.disability) {
      result.unitedStatesEeoc = us;
    }
  }
  if (c.canadaEmploymentEquity) {
    const ca = c.canadaEmploymentEquity;
    if (ca.indigenousIdentity || ca.visibleMinority || ca.personWithDisability) {
      result.canadaEmploymentEquity = ca;
    }
  }
  return result;
}

function trimPreferences(p: Preferences): Preferences {
  const result: Preferences = {
    workArrangement: p.workArrangement,
    willingToRelocate: p.willingToRelocate,
  };
  if (p.desiredRole?.trim()) result.desiredRole = p.desiredRole.trim();
  if (p.salary && (p.salary.min !== undefined || p.salary.max !== undefined)) {
    result.salary = p.salary;
  }
  if (p.availableFrom && (p.availableFrom.month || p.availableFrom.year)) {
    result.availableFrom = p.availableFrom;
  }
  if (p.noticePeriod?.trim()) result.noticePeriod = p.noticePeriod.trim();
  return result;
}

export function buildDocument(
  form: FormState,
  meta: { generatedAt: string; expiresAt: string },
): CredentiaDocument {
  const basics = {
    ...form.basics,
    firstName: form.basics.firstName.trim(),
    lastName: form.basics.lastName.trim(),
    email: form.basics.email.trim(),
    phone: form.basics.phone.trim(),
    profiles: form.basics.profiles
      .filter((p) => p.username?.trim() || p.url?.trim())
      .map((p) => ({
        network: p.network,
        username: p.username?.trim() || undefined,
        url: p.url?.trim() || undefined,
      })),
  };
  return {
    $credentia: {
      version: VERSION,
      generatedAt: meta.generatedAt,
      expiresAt: meta.expiresAt,
    },
    basics,
    work: trimWork(form.work),
    education: trimEducation(form.education),
    skills: trimSkills(form.skills),
    certificates: trimCertificates(form.certificates),
    languages: trimLanguages(form.languages),
    compliance: trimCompliance(form.compliance),
    preferences: trimPreferences(form.preferences),
  };
}

export interface GenerateResult {
  document: CredentiaDocument;
  json: string;
  token: string;
  filename: string;
  verifyUrl: string;
  registered: boolean;
}

export async function generateCredentiaFile(form: FormState): Promise<GenerateResult> {
  const now = new Date();
  const expires = new Date(now.getTime() + EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  const document = buildDocument(form, {
    generatedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  });
  const firstPass = JSON.stringify(document);
  const token = await sha256Hex(firstPass);
  document.$credentia.token = token;
  document.$credentia.verifyUrl = `https://credentia.one/verify?token=${token}`;

  let registered = false;
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('tokens').insert({
      token_hash: token,
      country_code: document.basics.location.countryCode,
    });
    if (!error) registered = true;
  } catch {
    registered = false;
  }

  const json = JSON.stringify(document, null, 2);
  const first = (document.basics.firstName || 'credentia').toLowerCase().replace(/\s+/g, '-');
  const last = (document.basics.lastName || 'file').toLowerCase().replace(/\s+/g, '-');
  const filename = `${first}-${last}.credentia.json`;
  return {
    document,
    json,
    token,
    filename,
    verifyUrl: document.$credentia.verifyUrl,
    registered,
  };
}

export function downloadJson(filename: string, json: string): void {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
