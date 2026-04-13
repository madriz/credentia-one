// TypeScript interfaces for the Credentia One form state and output document.

export interface SocialProfile {
  network: string;
  username?: string;
  url?: string;
}

export interface Location {
  address?: string;
  city: string;
  region?: string;
  postalCode?: string;
  countryCode: string;
}

export interface Basics {
  firstName: string;
  middleName?: string;
  lastName: string;
  preferredName?: string;
  email: string;
  phone: string;
  headline?: string;
  url?: string;
  summary?: string;
  location: Location;
  profiles: SocialProfile[];
}

export interface DateYM {
  month: string;
  year: string;
}

export interface WorkLocationDetail {
  city: string;
  region: string;
  countryCode: string;
  remote: boolean;
}

export interface WorkEntry {
  company: string;
  position: string;
  location?: string;
  locationDetail: WorkLocationDetail;
  description?: string;
  url?: string;
  startDate: DateYM;
  current: boolean;
  endDate?: DateYM;
  summary?: string;
  highlights: string[];
}

export interface EducationEntry {
  institution: string;
  area: string;
  studyType: string;
  url?: string;
  startDate?: DateYM;
  endDate?: DateYM;
  score?: string;
  courses: string[];
}

export interface SkillGroup {
  category: string;
  level: string;
  keywords: string[];
}

export interface Certificate {
  name: string;
  issuer?: string;
  date?: DateYM;
  expires?: DateYM;
  url?: string;
}

export interface Award {
  title: string;
  issuer?: string;
  date?: DateYM;
  description?: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface WorkAuthorization {
  authorized: 'Yes' | 'No' | '';
  countries: string[];
  requiresSponsorship: 'Yes' | 'No' | '';
  statuses: string[];
  customStatus?: string;
}

export interface UsEeoc {
  gender: string;
  raceEthnicity: string[];
  veteranStatus: string;
  disability: string;
}

export interface CanadaEquity {
  indigenousIdentity: string;
  visibleMinority: string;
  personWithDisability: string;
}

export interface UKEqualityAct {
  gender: string;
  ethnicity: string;
  disability: string;
  religion: string;
  sexualOrientation: string;
  ageRange: string;
}

export interface EUDisclosures {
  gdprConsent: boolean;
  gdprConsentTimestamp: string;
  dataRetentionPreference: string;
  gender: string;
  disability: string;
}

export interface AustralianEqualOpportunity {
  indigenousStatus: string;
  gender: string;
  disability: string;
  languageAtHome: string;
  languageAtHomeOther: string;
}

export interface NewZealandDisclosures {
  ethnicity: string[];
  ethnicityOther: string;
  gender: string;
  disability: string;
  iwi: string;
}

export interface Compliance {
  workAuthorization: WorkAuthorization;
  unitedStatesEeoc?: UsEeoc;
  canadaEmploymentEquity?: CanadaEquity;
  ukEqualityAct?: UKEqualityAct;
  euDisclosures?: EUDisclosures;
  australianEqualOpportunity?: AustralianEqualOpportunity;
  newZealandDisclosures?: NewZealandDisclosures;
}

export interface SalaryRange {
  min?: number;
  max?: number;
  currency: string;
  period: string;
}

export interface Preferences {
  desiredRoles: string[];
  salary?: SalaryRange;
  workArrangement: string[];
  willingToRelocate: 'Yes' | 'No' | '';
  availableFrom?: DateYM;
  noticePeriod?: string;
  noticePeriodCustom?: { amount: string; unit: string };
}

// FormState is the shape used by the React form
export interface FormState {
  basics: Basics;
  work: WorkEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  certificates: Certificate[];
  awards: Award[];
  languages: Language[];
  compliance: Compliance;
  preferences: Preferences;
}

export const EMPTY_DATE: DateYM = { month: '', year: '' };

export function emptyWorkLocation(): WorkLocationDetail {
  return { city: '', region: '', countryCode: '', remote: false };
}

export function formatWorkLocation(detail: WorkLocationDetail): string {
  if (detail.remote) return 'Remote';
  const parts = [detail.city, detail.region, detail.countryCode].filter(Boolean);
  return parts.join(', ');
}

export function emptyForm(): FormState {
  return {
    basics: {
      firstName: '',
      middleName: '',
      lastName: '',
      preferredName: '',
      email: '',
      phone: '',
      headline: '',
      url: '',
      summary: '',
      location: {
        address: '',
        city: '',
        region: '',
        postalCode: '',
        countryCode: '',
      },
      profiles: [{ network: 'LinkedIn', username: '', url: '' }],
    },
    work: [
      {
        company: '',
        position: '',
        locationDetail: emptyWorkLocation(),
        description: '',
        url: '',
        startDate: { ...EMPTY_DATE },
        current: false,
        endDate: { ...EMPTY_DATE },
        summary: '',
        highlights: [''],
      },
    ],
    education: [
      {
        institution: '',
        area: '',
        studyType: '',
        url: '',
        startDate: { ...EMPTY_DATE },
        endDate: { ...EMPTY_DATE },
        score: '',
        courses: [''],
      },
    ],
    skills: [],
    certificates: [],
    awards: [],
    languages: [{ language: '', fluency: 'Fluent' }],
    compliance: {
      workAuthorization: {
        authorized: '',
        countries: [],
        requiresSponsorship: '',
        statuses: [],
        customStatus: '',
      },
      unitedStatesEeoc: {
        gender: '',
        raceEthnicity: [],
        veteranStatus: '',
        disability: '',
      },
      canadaEmploymentEquity: {
        indigenousIdentity: '',
        visibleMinority: '',
        personWithDisability: '',
      },
      ukEqualityAct: {
        gender: '',
        ethnicity: '',
        disability: '',
        religion: '',
        sexualOrientation: '',
        ageRange: '',
      },
      euDisclosures: {
        gdprConsent: false,
        gdprConsentTimestamp: '',
        dataRetentionPreference: '',
        gender: '',
        disability: '',
      },
      australianEqualOpportunity: {
        indigenousStatus: '',
        gender: '',
        disability: '',
        languageAtHome: '',
        languageAtHomeOther: '',
      },
      newZealandDisclosures: {
        ethnicity: [],
        ethnicityOther: '',
        gender: '',
        disability: '',
        iwi: '',
      },
    },
    preferences: {
      desiredRoles: [''],
      salary: { min: undefined, max: undefined, currency: 'USD', period: 'Annual' },
      workArrangement: [],
      willingToRelocate: '',
      availableFrom: { ...EMPTY_DATE },
      noticePeriod: '',
      noticePeriodCustom: { amount: '', unit: 'Days' },
    },
  };
}
