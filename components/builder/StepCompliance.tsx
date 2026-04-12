import { useState, useRef, useEffect } from 'react';
import type { Compliance } from '@/lib/schema';
import CountryMultiSelect from './CountryMultiSelect';
import { VISA_STATUSES } from '@/lib/visaStatuses';

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

function VisaMultiSelect({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
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

  const matches = query.length >= 1
    ? VISA_STATUSES.filter((v) => !value.includes(v.value) && v.label.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : [];

  const add = (val: string) => { if (!value.includes(val)) onChange([...value, val]); setQuery(''); setOpen(false); };
  const remove = (val: string) => onChange(value.filter((v) => v !== val));

  return (
    <div ref={ref} className="relative">
      <div className="label-base">Current visa or immigration status</div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((v) => (
            <span key={v} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-warm text-sm text-text-primary">
              {v}
              <button type="button" aria-label={`Remove ${v}`} className="text-text-muted hover:text-error" onClick={() => remove(v)}>x</button>
            </span>
          ))}
        </div>
      )}
      <input type="text" className="input-base" value={query} placeholder="Type to search statuses"
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
    </div>
  );
}

export default function StepCompliance({ value, onChange }: Props) {
  const [usOpen, setUsOpen] = useState(true);
  const [caOpen, setCaOpen] = useState(true);

  const setAuth = <K extends keyof Compliance['workAuthorization']>(
    key: K, v: Compliance['workAuthorization'][K],
  ) => onChange({ ...value, workAuthorization: { ...value.workAuthorization, [key]: v } });

  const us = value.unitedStatesEeoc ?? { gender: '', raceEthnicity: [], veteranStatus: '', disability: '' };
  const setUs = <K extends keyof typeof us>(key: K, v: (typeof us)[K]) =>
    onChange({ ...value, unitedStatesEeoc: { ...us, [key]: v } });

  const ca = value.canadaEmploymentEquity ?? { indigenousIdentity: '', visibleMinority: '', personWithDisability: '' };
  const setCa = <K extends keyof typeof ca>(key: K, v: (typeof ca)[K]) =>
    onChange({ ...value, canadaEmploymentEquity: { ...ca, [key]: v } });

  const toggleRace = (race: string) => {
    const list = us.raceEthnicity;
    setUs('raceEthnicity', list.includes(race) ? list.filter((r) => r !== race) : [...list, race]);
  };

  const hasOtherVisa = value.workAuthorization.statuses.includes('Other (please specify)');

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
        <VisaMultiSelect value={value.workAuthorization.statuses} onChange={(s) => setAuth('statuses', s)} />
        {hasOtherVisa && (
          <div>
            <label htmlFor="custom-visa" className="label-base">Please specify</label>
            <input id="custom-visa" type="text" className="input-base"
              value={value.workAuthorization.customStatus ?? ''}
              onChange={(e) => setAuth('customStatus', e.target.value)} />
          </div>
        )}
      </section>

      <section className="border border-border rounded">
        <button type="button" onClick={() => setUsOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3 text-left" aria-expanded={usOpen}>
          <span className="font-serif text-lg text-text-primary">United States (EEOC Voluntary Self-Identification)</span>
          <span className="text-text-muted text-sm">{usOpen ? 'Hide' : 'Show'}</span>
        </button>
        {usOpen && (
          <div className="px-4 pb-5 space-y-5 border-t border-border pt-5">
            <p className="text-xs text-text-muted">These responses are voluntary. Selecting &quot;Prefer Not to Disclose&quot; satisfies the requirement.</p>
            <div><div className="label-base">Gender</div>{GENDER_OPTIONS.map((g) => <Radio key={g} name="us-gender" value={g} label={g} current={us.gender} onChange={(v) => setUs('gender', v)} />)}</div>
            <div><div className="label-base">Race / Ethnicity</div><div className="space-y-1">{RACE_OPTIONS.map((r) => <label key={r} className="flex items-start gap-2 text-sm text-text-body"><input type="checkbox" className="mt-1" checked={us.raceEthnicity.includes(r)} onChange={() => toggleRace(r)} /><span>{r}</span></label>)}</div></div>
            <div><div className="label-base">Veteran status</div>{VETERAN_OPTIONS.map((v) => <Radio key={v} name="us-vet" value={v} label={v} current={us.veteranStatus} onChange={(val) => setUs('veteranStatus', val)} />)}</div>
            <div><div className="label-base">Disability</div>{DISABILITY_OPTIONS.map((d) => <Radio key={d} name="us-dis" value={d} label={d} current={us.disability} onChange={(v) => setUs('disability', v)} />)}</div>
          </div>
        )}
      </section>

      <section className="border border-border rounded">
        <button type="button" onClick={() => setCaOpen((o) => !o)} className="w-full flex justify-between items-center px-4 py-3 text-left" aria-expanded={caOpen}>
          <span className="font-serif text-lg text-text-primary">Canada (Employment Equity)</span>
          <span className="text-text-muted text-sm">{caOpen ? 'Hide' : 'Show'}</span>
        </button>
        {caOpen && (
          <div className="px-4 pb-5 space-y-5 border-t border-border pt-5">
            <p className="text-xs text-text-muted">These responses are voluntary. Selecting &quot;Prefer Not to Disclose&quot; satisfies the requirement.</p>
            <div><div className="label-base">Indigenous identity</div>{INDIGENOUS_OPTIONS.map((o) => <Radio key={o} name="ca-ind" value={o} label={o} current={ca.indigenousIdentity} onChange={(v) => setCa('indigenousIdentity', v)} />)}</div>
            <div><div className="label-base">Visible minority</div>{['Yes','No','Prefer Not to Disclose'].map((o) => <Radio key={o} name="ca-vm" value={o} label={o} current={ca.visibleMinority} onChange={(v) => setCa('visibleMinority', v)} />)}</div>
            <div><div className="label-base">Person with disability</div>{['Yes','No','Prefer Not to Disclose'].map((o) => <Radio key={o} name="ca-pwd" value={o} label={o} current={ca.personWithDisability} onChange={(v) => setCa('personWithDisability', v)} />)}</div>
          </div>
        )}
      </section>
    </div>
  );
}
