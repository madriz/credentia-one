import { useState, useRef, useEffect, useMemo } from 'react';
import type { Compliance } from '@/lib/schema';
import CountryMultiSelect from './CountryMultiSelect';
import {
  VISA_STATUSES,
  visaGroupsForCountries,
  filterVisasByCountries,
  VISA_GROUP_OTHER,
  EU_EEA_COUNTRY_CODES,
} from '@/lib/visaStatuses';

interface Props {
  value: Compliance;
  onChange: (next: Compliance) => void;
}

const RACE_OPTIONS = [
  'American Indian or Alaska Native', 'Asian', 'Black or African American',
  'Hispanic or Latino', 'Middle Eastern or North African',
  'Native Hawaiian or Other Pacific Islander', 'White', 'Two or More Races',
  'Prefer Not to Disclose',
];
const VETERAN_OPTIONS = [
  'I am not a protected veteran',
  'I identify as one or more of the classifications of a protected veteran',
  'Prefer Not to Disclose',
];
const DISABILITY_OPTIONS = [
  'Yes I have a disability (or previously had a disability)',
  'No I do not have a disability', 'Prefer Not to Disclose',
];
const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Prefer Not to Disclose'];
const INDIGENOUS_OPTIONS = ['First Nations', 'Inuit', 'Metis', 'Not Applicable', 'Prefer Not to Disclose'];

const UK_ETHNICITY_OPTIONS = [
  'White: English, Welsh, Scottish, Northern Irish, or British',
  'White: Irish',
  'White: Gypsy or Irish Traveller',
  'White: Roma',
  'White: Any other White background',
  'Mixed or Multiple: White and Black Caribbean',
  'Mixed or Multiple: White and Black African',
  'Mixed or Multiple: White and Asian',
  'Mixed or Multiple: Any other Mixed or Multiple background',
  'Asian or Asian British: Indian',
  'Asian or Asian British: Pakistani',
  'Asian or Asian British: Bangladeshi',
  'Asian or Asian British: Chinese',
  'Asian or Asian British: Any other Asian background',
  'Black, African, Caribbean or Black British: African',
  'Black, African, Caribbean or Black British: Caribbean',
  'Black, African, Caribbean or Black British: Any other Black, African, or Caribbean background',
  'Other ethnic group: Arab',
  'Other ethnic group: Any other ethnic group',
  'Prefer Not to Disclose',
];
const UK_RELIGION_OPTIONS = [
  'No religion', 'Christian', 'Buddhist', 'Hindu', 'Jewish', 'Muslim', 'Sikh', 'Other', 'Prefer Not to Disclose',
];
const UK_SEXUAL_ORIENTATION_OPTIONS = [
  'Heterosexual', 'Gay/Lesbian', 'Bisexual', 'Other', 'Prefer Not to Disclose',
];
const UK_AGE_RANGES = ['16-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Prefer Not to Disclose'];
const UK_DISABILITY_OPTIONS = ['Yes (Equality Act 2010)', 'No', 'Prefer Not to Disclose'];

const EU_RETENTION_OPTIONS = [
  'Delete after 6 months',
  'Delete after 12 months',
  'Retain until withdrawn',
  'Prefer Not to Disclose',
];
const EU_DISABILITY_OPTIONS = ['Yes', 'No', 'Prefer Not to Disclose'];

const AU_INDIGENOUS_OPTIONS = [
  'Aboriginal',
  'Torres Strait Islander',
  'Both Aboriginal and Torres Strait Islander',
  'Neither',
  'Prefer Not to Disclose',
];
const AU_GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Intersex', 'Prefer Not to Disclose'];
const AU_LANGUAGE_OPTIONS = ['English', 'Other', 'Prefer Not to Disclose'];

const NZ_GENDER_OPTIONS = ['Male', 'Female', 'Gender Diverse', 'Prefer Not to Disclose'];
const NZ_ETHNICITY_OPTIONS = [
  'New Zealand European',
  'Maori',
  'Samoan',
  'Cook Islands Maori',
  'Tongan',
  'Niuean',
  'Chinese',
  'Indian',
  'Filipino',
  'Other (please specify)',
  'Prefer Not to Disclose',
];

function Radio({ name, value, current, onChange, label }: {
  name: string; value: string; current: string; onChange: (v: string) => void; label: string;
}) {
  return (
    <label className="flex items-start gap-2 text-sm text-text-body">
      <input type="radio" name={name} value={value} checked={current === value}
        onChange={() => onChange(value)} className="mt-1" />
      <span>{label}</span>
    </label>
  );
}

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <select className="input-base" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder ?? 'Select an option'}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function VisaMultiSelect({
  value,
  onChange,
  countries,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  countries: string[];
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, []);

  const available = useMemo(() => filterVisasByCountries(countries), [countries]);
  const activeGroups = useMemo(() => visaGroupsForCountries(countries), [countries]);

  const matches = query.length >= 1
    ? available.filter((v) => !value.includes(v.value) && v.label.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : [];

  const add = (val: string) => { if (!value.includes(val)) onChange([...value, val]); setQuery(''); setOpen(false); };
  const remove = (val: string) => onChange(value.filter((v) => v !== val));

  const groupsToShow = activeGroups.length > 0 ? [...activeGroups, VISA_GROUP_OTHER] : [];

  return (
    <div ref={ref} className="relative">
      <div className="label-base">Current visa or immigration status</div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((v) => {
            const meta = VISA_STATUSES.find((s) => s.value === v);
            const label = meta?.label ?? v;
            return (
              <span key={v} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-warm text-sm text-text-primary">
                {label}
                <button type="button" aria-label={`Remove ${label}`} className="text-text-muted hover:text-error" onClick={() => remove(v)}>x</button>
              </span>
            );
          })}
        </div>
      )}
      <input type="text" className="input-base" value={query}
        placeholder={countries.length === 0 ? 'Select authorized countries first, or type to search all statuses' : 'Type to search statuses'}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && matches.length > 0) { e.preventDefault(); add(matches[0].value); }
          else if (e.key === 'Escape') setOpen(false);
        }}
        autoComplete="off" />
      {open && matches.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto border border-border rounded bg-bg-card shadow-md">
          {matches.map((m) => (
            <li key={m.value} className="px-3 py-2 text-sm cursor-pointer text-text-body hover:bg-bg-warm"
              onMouseDown={(e) => { e.preventDefault(); add(m.value); }}>
              <span className="text-text-muted text-xs mr-2">{m.group}</span>{m.label}
            </li>
          ))}
        </ul>
      )}
      {groupsToShow.length > 0 && (
        <p className="text-xs text-text-muted mt-2">
          Showing statuses for: {groupsToShow.join(', ')}
        </p>
      )}
    </div>
  );
}

function Collapsible({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border rounded">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-serif text-lg text-text-primary">{title}</span>
        <span className="text-text-muted text-sm">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <div className="px-4 pb-5 space-y-5 border-t border-border pt-5">
          {children}
        </div>
      )}
    </section>
  );
}

export default function StepCompliance({ value, onChange }: Props) {
  const [usOpen, setUsOpen] = useState(false);
  const [caOpen, setCaOpen] = useState(false);
  const [ukOpen, setUkOpen] = useState(false);
  const [euOpen, setEuOpen] = useState(false);
  const [auOpen, setAuOpen] = useState(false);
  const [nzOpen, setNzOpen] = useState(false);

  const setAuth = <K extends keyof Compliance['workAuthorization']>(
    key: K, v: Compliance['workAuthorization'][K],
  ) => onChange({ ...value, workAuthorization: { ...value.workAuthorization, [key]: v } });

  const us = value.unitedStatesEeoc ?? { gender: '', raceEthnicity: [], veteranStatus: '', disability: '' };
  const setUs = <K extends keyof typeof us>(key: K, v: (typeof us)[K]) =>
    onChange({ ...value, unitedStatesEeoc: { ...us, [key]: v } });

  const ca = value.canadaEmploymentEquity ?? { indigenousIdentity: '', visibleMinority: '', personWithDisability: '' };
  const setCa = <K extends keyof typeof ca>(key: K, v: (typeof ca)[K]) =>
    onChange({ ...value, canadaEmploymentEquity: { ...ca, [key]: v } });

  const uk = value.ukEqualityAct ?? {
    gender: '', ethnicity: '', disability: '', religion: '', sexualOrientation: '', ageRange: '',
  };
  const setUk = <K extends keyof typeof uk>(key: K, v: (typeof uk)[K]) =>
    onChange({ ...value, ukEqualityAct: { ...uk, [key]: v } });

  const eu = value.euDisclosures ?? {
    gdprConsent: false, gdprConsentTimestamp: '', dataRetentionPreference: '', gender: '', disability: '',
  };
  const setEu = <K extends keyof typeof eu>(key: K, v: (typeof eu)[K]) =>
    onChange({ ...value, euDisclosures: { ...eu, [key]: v } });

  const au = value.australianEqualOpportunity ?? {
    indigenousStatus: '', gender: '', disability: '', languageAtHome: '', languageAtHomeOther: '',
  };
  const setAu = <K extends keyof typeof au>(key: K, v: (typeof au)[K]) =>
    onChange({ ...value, australianEqualOpportunity: { ...au, [key]: v } });

  const nz = value.newZealandDisclosures ?? {
    ethnicity: [], ethnicityOther: '', gender: '', disability: '', iwi: '',
  };
  const setNz = <K extends keyof typeof nz>(key: K, v: (typeof nz)[K]) =>
    onChange({ ...value, newZealandDisclosures: { ...nz, [key]: v } });

  const toggleRace = (race: string) => {
    const list = us.raceEthnicity;
    setUs('raceEthnicity', list.includes(race) ? list.filter((r) => r !== race) : [...list, race]);
  };

  const toggleNzEthnicity = (e: string) => {
    const list = nz.ethnicity;
    setNz('ethnicity', list.includes(e) ? list.filter((x) => x !== e) : [...list, e]);
  };

  const hasOtherVisa = value.workAuthorization.statuses.includes('Other (please specify)');

  const countries = value.workAuthorization.countries;
  const showUS = countries.includes('US');
  const showCA = countries.includes('CA');
  const showUK = countries.includes('GB');
  const showEU = countries.some((c) => EU_EEA_COUNTRY_CODES.includes(c));
  const showAU = countries.includes('AU');
  const showNZ = countries.includes('NZ');
  const noCountries = countries.length === 0;

  const disclaimer = (
    <p className="text-xs text-text-muted">
      These responses are voluntary. Selecting &quot;Prefer Not to Disclose&quot; satisfies the requirement.
    </p>
  );

  const handleGdprConsent = (checked: boolean) => {
    setEu('gdprConsent', checked);
    setEu('gdprConsentTimestamp', checked ? new Date().toISOString() : '');
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-text-primary">Compliance</h2>

      <div className="border-l-4 p-4 text-sm" style={{ background: '#E0F4FB', borderColor: '#00ACED', color: '#1A1A1A' }}>
        The following information is commonly requested by employers for regulatory
        compliance. Some responses are voluntary. Credentia One does not validate or
        store any user or Personally Identifiable Data.
      </div>

      <section className="space-y-5">
        <h3 className="font-serif text-xl text-text-primary">Work authorization</h3>
        <div>
          <div className="label-base">Are you legally authorized to work? <span className="text-error">*</span></div>
          <div className="flex gap-6 mt-2">
            <Radio name="auth" value="Yes" label="Yes" current={value.workAuthorization.authorized} onChange={(v) => setAuth('authorized', v as 'Yes' | 'No')} />
            <Radio name="auth" value="No" label="No" current={value.workAuthorization.authorized} onChange={(v) => setAuth('authorized', v as 'Yes' | 'No')} />
          </div>
        </div>
        <CountryMultiSelect label="Countries where you hold authorization" value={value.workAuthorization.countries} onChange={(c) => setAuth('countries', c)} />
        <div>
          <div className="label-base">Do you require visa sponsorship?</div>
          <div className="flex gap-6 mt-2">
            <Radio name="sponsor" value="Yes" label="Yes" current={value.workAuthorization.requiresSponsorship} onChange={(v) => setAuth('requiresSponsorship', v as 'Yes' | 'No')} />
            <Radio name="sponsor" value="No" label="No" current={value.workAuthorization.requiresSponsorship} onChange={(v) => setAuth('requiresSponsorship', v as 'Yes' | 'No')} />
          </div>
        </div>
        <VisaMultiSelect
          value={value.workAuthorization.statuses}
          onChange={(s) => setAuth('statuses', s)}
          countries={countries}
        />
        {hasOtherVisa && (
          <div>
            <label htmlFor="custom-visa" className="label-base">Please specify</label>
            <input id="custom-visa" type="text" className="input-base"
              value={value.workAuthorization.customStatus ?? ''}
              onChange={(e) => setAuth('customStatus', e.target.value)} />
          </div>
        )}
      </section>

      {noCountries && (
        <div className="border border-border rounded p-4 text-sm text-text-muted">
          Select your authorized countries above to see relevant disclosure forms.
        </div>
      )}

      {(noCountries || showUS) && (
        <Collapsible
          title="United States (EEOC Voluntary Self-Identification)"
          open={usOpen}
          onToggle={() => setUsOpen((o) => !o)}
        >
          {disclaimer}
          <div><div className="label-base">Gender</div>{GENDER_OPTIONS.map((g) => <Radio key={g} name="us-gender" value={g} label={g} current={us.gender} onChange={(v) => setUs('gender', v)} />)}</div>
          <div><div className="label-base">Race / Ethnicity</div><div className="space-y-1">{RACE_OPTIONS.map((r) => <label key={r} className="flex items-start gap-2 text-sm text-text-body"><input type="checkbox" className="mt-1" checked={us.raceEthnicity.includes(r)} onChange={() => toggleRace(r)} /><span>{r}</span></label>)}</div></div>
          <div><div className="label-base">Veteran status</div>{VETERAN_OPTIONS.map((v) => <Radio key={v} name="us-vet" value={v} label={v} current={us.veteranStatus} onChange={(val) => setUs('veteranStatus', val)} />)}</div>
          <div><div className="label-base">Disability</div>{DISABILITY_OPTIONS.map((d) => <Radio key={d} name="us-dis" value={d} label={d} current={us.disability} onChange={(v) => setUs('disability', v)} />)}</div>
        </Collapsible>
      )}

      {(noCountries || showCA) && (
        <Collapsible
          title="Canada (Employment Equity)"
          open={caOpen}
          onToggle={() => setCaOpen((o) => !o)}
        >
          {disclaimer}
          <div><div className="label-base">Indigenous identity</div>{INDIGENOUS_OPTIONS.map((o) => <Radio key={o} name="ca-ind" value={o} label={o} current={ca.indigenousIdentity} onChange={(v) => setCa('indigenousIdentity', v)} />)}</div>
          <div><div className="label-base">Visible minority</div>{['Yes','No','Prefer Not to Disclose'].map((o) => <Radio key={o} name="ca-vm" value={o} label={o} current={ca.visibleMinority} onChange={(v) => setCa('visibleMinority', v)} />)}</div>
          <div><div className="label-base">Person with disability</div>{['Yes','No','Prefer Not to Disclose'].map((o) => <Radio key={o} name="ca-pwd" value={o} label={o} current={ca.personWithDisability} onChange={(v) => setCa('personWithDisability', v)} />)}</div>
        </Collapsible>
      )}

      {(noCountries || showUK) && (
        <Collapsible
          title="United Kingdom (Equality Act 2010)"
          open={ukOpen}
          onToggle={() => setUkOpen((o) => !o)}
        >
          {disclaimer}
          <div><div className="label-base">Gender</div>{GENDER_OPTIONS.map((g) => <Radio key={g} name="uk-gender" value={g} label={g} current={uk.gender} onChange={(v) => setUk('gender', v)} />)}</div>
          <div><div className="label-base">Ethnicity (ONS categories)</div>
            <Select value={uk.ethnicity} onChange={(v) => setUk('ethnicity', v)} options={UK_ETHNICITY_OPTIONS} />
          </div>
          <div><div className="label-base">Disability</div>{UK_DISABILITY_OPTIONS.map((d) => <Radio key={d} name="uk-dis" value={d} label={d} current={uk.disability} onChange={(v) => setUk('disability', v)} />)}</div>
          <div><div className="label-base">Religion or belief</div>
            <Select value={uk.religion} onChange={(v) => setUk('religion', v)} options={UK_RELIGION_OPTIONS} />
          </div>
          <div><div className="label-base">Sexual orientation</div>{UK_SEXUAL_ORIENTATION_OPTIONS.map((o) => <Radio key={o} name="uk-so" value={o} label={o} current={uk.sexualOrientation} onChange={(v) => setUk('sexualOrientation', v)} />)}</div>
          <div><div className="label-base">Age range</div>{UK_AGE_RANGES.map((a) => <Radio key={a} name="uk-age" value={a} label={a} current={uk.ageRange} onChange={(v) => setUk('ageRange', v)} />)}</div>
        </Collapsible>
      )}

      {(noCountries || showEU) && (
        <Collapsible
          title="European Union / EEA (GDPR Disclosures)"
          open={euOpen}
          onToggle={() => setEuOpen((o) => !o)}
        >
          <label className="flex items-start gap-2 text-sm text-text-body">
            <input
              type="checkbox"
              className="mt-1"
              checked={eu.gdprConsent}
              onChange={(e) => handleGdprConsent(e.target.checked)}
            />
            <span>
              I consent to the processing of my personal data for the purposes of this job application,
              in accordance with the EU General Data Protection Regulation (GDPR).
              {eu.gdprConsent && eu.gdprConsentTimestamp && (
                <span className="block text-xs text-text-muted mt-1">
                  Consent recorded at {new Date(eu.gdprConsentTimestamp).toLocaleString()}.
                </span>
              )}
            </span>
          </label>
          {disclaimer}
          <div><div className="label-base">Data retention preference</div>
            <Select value={eu.dataRetentionPreference} onChange={(v) => setEu('dataRetentionPreference', v)} options={EU_RETENTION_OPTIONS} />
          </div>
          <div><div className="label-base">Gender</div>{GENDER_OPTIONS.map((g) => <Radio key={g} name="eu-gender" value={g} label={g} current={eu.gender} onChange={(v) => setEu('gender', v)} />)}</div>
          <div><div className="label-base">Disability</div>{EU_DISABILITY_OPTIONS.map((d) => <Radio key={d} name="eu-dis" value={d} label={d} current={eu.disability} onChange={(v) => setEu('disability', v)} />)}</div>
        </Collapsible>
      )}

      {(noCountries || showAU) && (
        <Collapsible
          title="Australia (Equal Opportunity)"
          open={auOpen}
          onToggle={() => setAuOpen((o) => !o)}
        >
          {disclaimer}
          <div><div className="label-base">Indigenous status</div>{AU_INDIGENOUS_OPTIONS.map((o) => <Radio key={o} name="au-ind" value={o} label={o} current={au.indigenousStatus} onChange={(v) => setAu('indigenousStatus', v)} />)}</div>
          <div><div className="label-base">Gender</div>{AU_GENDER_OPTIONS.map((g) => <Radio key={g} name="au-gender" value={g} label={g} current={au.gender} onChange={(v) => setAu('gender', v)} />)}</div>
          <div><div className="label-base">Disability</div>{EU_DISABILITY_OPTIONS.map((d) => <Radio key={d} name="au-dis" value={d} label={d} current={au.disability} onChange={(v) => setAu('disability', v)} />)}</div>
          <div><div className="label-base">Language spoken at home</div>{AU_LANGUAGE_OPTIONS.map((l) => <Radio key={l} name="au-lang" value={l} label={l} current={au.languageAtHome} onChange={(v) => setAu('languageAtHome', v)} />)}</div>
          {au.languageAtHome === 'Other' && (
            <div>
              <label htmlFor="au-lang-other" className="label-base">Specify language</label>
              <input id="au-lang-other" type="text" className="input-base" value={au.languageAtHomeOther}
                onChange={(e) => setAu('languageAtHomeOther', e.target.value)} />
            </div>
          )}
        </Collapsible>
      )}

      {(noCountries || showNZ) && (
        <Collapsible
          title="New Zealand (Census Disclosures)"
          open={nzOpen}
          onToggle={() => setNzOpen((o) => !o)}
        >
          {disclaimer}
          <div>
            <div className="label-base">Ethnicity (multi-select, NZ census)</div>
            <div className="space-y-1">
              {NZ_ETHNICITY_OPTIONS.map((o) => (
                <label key={o} className="flex items-start gap-2 text-sm text-text-body">
                  <input type="checkbox" className="mt-1" checked={nz.ethnicity.includes(o)} onChange={() => toggleNzEthnicity(o)} />
                  <span>{o}</span>
                </label>
              ))}
            </div>
            {nz.ethnicity.includes('Other (please specify)') && (
              <div className="mt-2">
                <label htmlFor="nz-ethnicity-other" className="label-base">Specify ethnicity</label>
                <input id="nz-ethnicity-other" type="text" className="input-base" value={nz.ethnicityOther}
                  onChange={(e) => setNz('ethnicityOther', e.target.value)} />
              </div>
            )}
          </div>
          <div><div className="label-base">Gender</div>{NZ_GENDER_OPTIONS.map((g) => <Radio key={g} name="nz-gender" value={g} label={g} current={nz.gender} onChange={(v) => setNz('gender', v)} />)}</div>
          <div><div className="label-base">Disability</div>{EU_DISABILITY_OPTIONS.map((d) => <Radio key={d} name="nz-dis" value={d} label={d} current={nz.disability} onChange={(v) => setNz('disability', v)} />)}</div>
          <div>
            <label htmlFor="nz-iwi" className="label-base">Iwi affiliation (Maori, optional)</label>
            <input id="nz-iwi" type="text" className="input-base" value={nz.iwi}
              onChange={(e) => setNz('iwi', e.target.value)} />
          </div>
        </Collapsible>
      )}
    </div>
  );
}
