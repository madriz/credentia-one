import { sha256 } from 'js-sha256';
import type {
  FormState,
  WorkEntry,
  EducationEntry,
  SkillGroup,
  Certificate,
  Award,
  Language,
  Compliance,
  Preferences,
  DateYM,
} from './schema';
import { formatWorkLocation } from './schema';
import { getSupabase } from './supabase';
import { buildMarkdown } from './markdown';

const VERSION = '1.0.0';
const EXPIRY_DAYS = 90;

export async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const data = new TextEncoder().encode(input);
      const buffer = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    } catch {
      // fall through
    }
  }
  return sha256(input);
}

// Convert DateYM to "YYYY-MM" string, or undefined if empty
function dateToIso(d: DateYM | undefined): string | undefined {
  if (!d || !d.year || !d.month) return undefined;
  return `${d.year}-${d.month}`;
}

function yesNoToBool(val: string): boolean | undefined {
  if (val === 'Yes') return true;
  if (val === 'No') return false;
  return undefined;
}

// Recursively strip undefined values, empty strings, empty arrays, empty objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripEmpty(obj: any): any {
  if (Array.isArray(obj)) {
    const filtered = obj.map(stripEmpty).filter((v) => v !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }
  if (obj !== null && typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      const val = stripEmpty(v);
      if (val !== undefined) cleaned[k] = val;
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  if (typeof obj === 'string') return obj.length > 0 ? obj : undefined;
  return obj;
}

function resolveLocation(entry: WorkEntry): string | undefined {
  if (entry.locationDetail) return formatWorkLocation(entry.locationDetail) || undefined;
  return entry.location?.trim() || undefined;
}

function resolveNoticePeriod(p: Preferences): string | undefined {
  if (!p.noticePeriod) return undefined;
  if (p.noticePeriod === 'Other' && p.noticePeriodCustom) {
    const amt = p.noticePeriodCustom.amount.trim();
    const unit = p.noticePeriodCustom.unit;
    if (amt && unit) return `${amt} ${unit}`;
    return undefined;
  }
  return p.noticePeriod;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildWork(entries: WorkEntry[]): any[] {
  return entries
    .filter((w) => w.company.trim() || w.position.trim())
    .map((w) => {
      const loc = resolveLocation(w);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const out: any = {
        company: w.company.trim(),
        position: w.position.trim(),
        startDate: dateToIso(w.startDate),
        current: w.current || undefined,
      };
      if (loc) out.location = loc;
      if (w.description?.trim()) out.description = w.description.trim();
      if (w.url?.trim()) out.url = w.url.trim();
      if (!w.current) out.endDate = dateToIso(w.endDate);
      if (w.summary?.trim()) out.summary = w.summary.trim();
      const hl = w.highlights.map((h) => h.trim()).filter(Boolean);
      if (hl.length > 0) out.highlights = hl;
      return out;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildEducation(entries: EducationEntry[]): any[] {
  return entries
    .filter((e) => e.institution.trim() || e.area.trim())
    .map((e) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const out: any = {
        institution: e.institution.trim(),
        area: e.area.trim(),
        studyType: e.studyType.trim(),
      };
      if (e.url?.trim()) out.url = e.url.trim();
      out.startDate = dateToIso(e.startDate);
      out.endDate = dateToIso(e.endDate);
      if (e.score?.trim()) out.score = e.score.trim();
      const courses = e.courses.map((c) => c.trim()).filter(Boolean);
      if (courses.length > 0) out.courses = courses;
      return out;
    });
}

function buildSkills(skills: SkillGroup[]): SkillGroup[] {
  return skills
    .filter((s) => s.category.trim() && s.keywords.length > 0)
    .map((s) => ({
      category: s.category.trim(),
      level: s.level,
      keywords: s.keywords,
    }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCertificates(certs: Certificate[]): any[] {
  return certs
    .filter((c) => c.name.trim())
    .map((c) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const out: any = { name: c.name.trim() };
      if (c.issuer?.trim()) out.issuer = c.issuer.trim();
      out.date = dateToIso(c.date);
      out.expires = dateToIso(c.expires);
      if (c.url?.trim()) out.url = c.url.trim();
      return out;
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAwards(awards: Award[]): any[] {
  return awards
    .filter((a) => a.title.trim())
    .map((a) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const out: any = { title: a.title.trim() };
      if (a.issuer?.trim()) out.issuer = a.issuer.trim();
      out.date = dateToIso(a.date);
      if (a.description?.trim()) out.description = a.description.trim();
      return out;
    });
}

function buildLanguages(langs: Language[]): Language[] {
  return langs
    .filter((l) => l.language.trim())
    .map((l) => ({ language: l.language.trim(), fluency: l.fluency }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildCompliance(c: Compliance): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wa: any = {
    authorized: yesNoToBool(c.workAuthorization.authorized),
    requiresSponsorship: yesNoToBool(c.workAuthorization.requiresSponsorship),
  };
  if (c.workAuthorization.countries.length > 0) {
    wa.countries = c.workAuthorization.countries;
  }
  const allStatuses = [...c.workAuthorization.statuses];
  if (c.workAuthorization.customStatus?.trim()) {
    allStatuses.push(c.workAuthorization.customStatus.trim());
  }
  if (allStatuses.length > 0) wa.status = allStatuses;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = { workAuthorization: wa };

  if (c.unitedStatesEeoc) {
    const us = c.unitedStatesEeoc;
    if (us.gender || us.raceEthnicity.length || us.veteranStatus || us.disability) {
      result.eeoc = {
        gender: us.gender || undefined,
        raceEthnicity: us.raceEthnicity.length > 0 ? us.raceEthnicity : undefined,
        veteranStatus: us.veteranStatus || undefined,
        disability: us.disability || undefined,
      };
    }
  }
  if (c.canadaEmploymentEquity) {
    const ca = c.canadaEmploymentEquity;
    if (ca.indigenousIdentity || ca.visibleMinority || ca.personWithDisability) {
      result.canadianEquity = {
        indigenousIdentity: ca.indigenousIdentity || undefined,
        visibleMinority: ca.visibleMinority || undefined,
        personWithDisability: ca.personWithDisability || undefined,
      };
    }
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildPreferences(p: Preferences): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any = {};
  const roles = p.desiredRoles.map((r) => r.trim()).filter(Boolean);
  if (roles.length > 0) out.desiredRoles = roles;
  if (p.salary && (p.salary.min || p.salary.max)) {
    out.salary = p.salary;
  }
  if (p.workArrangement.length > 0) out.workArrangement = p.workArrangement;
  const relocate = yesNoToBool(p.willingToRelocate);
  if (relocate !== undefined) out.willingToRelocate = relocate;
  const avail = dateToIso(p.availableFrom);
  if (avail) out.availableFrom = avail;
  const notice = resolveNoticePeriod(p);
  if (notice) out.noticePeriod = notice;
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildDocument(form: FormState, meta: { generatedAt: string; expiresAt: string }): any {
  const b = form.basics;
  const profiles = b.profiles
    .filter((p) => p.username?.trim() || p.url?.trim())
    .map((p) => ({
      network: p.network,
      username: p.username?.trim() || undefined,
      url: p.url?.trim() || undefined,
    }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loc: any = { city: b.location.city.trim() };
  if (b.location.address?.trim()) loc.address = b.location.address.trim();
  if (b.location.region?.trim()) loc.region = b.location.region.trim();
  if (b.location.postalCode?.trim()) loc.postalCode = b.location.postalCode.trim();
  if (b.location.countryCode.trim()) loc.countryCode = b.location.countryCode.trim();

  const basics = {
    name: {
      first: b.firstName.trim() || undefined,
      middle: b.middleName?.trim() || undefined,
      last: b.lastName.trim() || undefined,
      preferred: b.preferredName?.trim() || undefined,
    },
    email: b.email.trim(),
    phone: b.phone.trim(),
    headline: b.headline?.trim() || undefined,
    url: b.url?.trim() || undefined,
    summary: b.summary?.trim() || undefined,
    location: loc,
    profiles: profiles.length > 0 ? profiles : undefined,
  };

  const doc = {
    $credentia: {
      version: VERSION,
      generatedAt: meta.generatedAt,
      expiresAt: meta.expiresAt,
    },
    basics,
    work: buildWork(form.work),
    education: buildEducation(form.education),
    skills: buildSkills(form.skills),
    certificates: buildCertificates(form.certificates),
    awards: buildAwards(form.awards),
    languages: buildLanguages(form.languages),
    compliance: buildCompliance(form.compliance),
    preferences: buildPreferences(form.preferences),
  };

  return stripEmpty(doc);
}

export interface GenerateResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  document: any;
  json: string;
  markdown: string;
  token: string;
  jsonFilename: string;
  mdFilename: string;
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
      country_code: form.basics.location.countryCode,
    });
    if (!error) registered = true;
  } catch {
    registered = false;
  }

  const json = JSON.stringify(document, null, 2);
  const markdown = buildMarkdown(document);
  const first = (form.basics.firstName || 'credentia').toLowerCase().replace(/\s+/g, '-');
  const last = (form.basics.lastName || 'file').toLowerCase().replace(/\s+/g, '-');
  const jsonFilename = `${first}-${last}.credentia.json`;
  const mdFilename = `${first}-${last}.credentia.md`;
  return {
    document,
    json,
    markdown,
    token,
    jsonFilename,
    mdFilename,
    verifyUrl: document.$credentia.verifyUrl,
    registered,
  };
}

export function downloadFile(filename: string, content: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
