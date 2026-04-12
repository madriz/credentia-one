import { useState } from 'react';
import type { Compliance } from '@/lib/schema';
import CountryMultiSelect from './CountryMultiSelect';

interface Props {
  value: Compliance;
  onChange: (next: Compliance) => void;
}

const RACE_OPTIONS = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African',
  'Native Hawaiian or Other Pacific Islander',
  'White',
  'Two or More Races',
  'Prefer Not to Disclose',
];

const VETERAN_OPTIONS = [
  'I am not a protected veteran',
  'I identify as one or more of the classifications of a protected veteran',
  'Prefer Not to Disclose',
];

const DISABILITY_OPTIONS = [
  'Yes I have a disability (or previously had a disability)',
  'No I do not have a disability',
  'Prefer Not to Disclose',
];

const GENDER_OPTIONS = ['Male', 'Female', 'Non-Binary', 'Prefer Not to Disclose'];

const INDIGENOUS_OPTIONS = [
  'First Nations',
  'Inuit',
  'Metis',
  'Not Applicable',
  'Prefer Not to Disclose',
];

function Radio({
  name,
  value,
  current,
  onChange,
  label,
}: {
  name: string;
  value: string;
  current: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-2 text-sm text-text-body">
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        onChange={() => onChange(value)}
        className="mt-1"
      />
      <span>{label}</span>
    </label>
  );
}

export default function StepCompliance({ value, onChange }: Props) {
  const [usOpen, setUsOpen] = useState(false);
  const [caOpen, setCaOpen] = useState(false);

  const setAuth = <K extends keyof Compliance['workAuthorization']>(
    key: K,
    v: Compliance['workAuthorization'][K],
  ) =>
    onChange({
      ...value,
      workAuthorization: { ...value.workAuthorization, [key]: v },
    });

  const us = value.unitedStatesEeoc ?? {
    gender: '',
    raceEthnicity: [],
    veteranStatus: '',
    disability: '',
  };
  const setUs = <K extends keyof typeof us>(key: K, v: (typeof us)[K]) =>
    onChange({ ...value, unitedStatesEeoc: { ...us, [key]: v } });

  const ca = value.canadaEmploymentEquity ?? {
    indigenousIdentity: '',
    visibleMinority: '',
    personWithDisability: '',
  };
  const setCa = <K extends keyof typeof ca>(key: K, v: (typeof ca)[K]) =>
    onChange({ ...value, canadaEmploymentEquity: { ...ca, [key]: v } });

  const toggleRace = (race: string) => {
    const list = us.raceEthnicity;
    const next = list.includes(race) ? list.filter((r) => r !== race) : [...list, race];
    setUs('raceEthnicity', next);
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-text-primary">Compliance</h2>

      <div
        className="border-l-4 p-4 text-sm"
        style={{ background: '#E0F4FB', borderColor: '#00ACED', color: '#1A1A1A' }}
      >
        The following information is commonly requested by employers for regulatory
        compliance. All responses are voluntary. You may select &quot;Prefer Not to
        Disclose&quot; for any question. Credentia One does not validate or store this
        data.
      </div>

      <section className="space-y-5">
        <h3 className="font-serif text-xl text-text-primary">Work authorization</h3>
        <div>
          <div className="label-base">
            Are you legally authorized to work? <span className="text-error">*</span>
          </div>
          <div className="flex gap-6 mt-2">
            <Radio
              name="auth"
              value="Yes"
              label="Yes"
              current={value.workAuthorization.authorized}
              onChange={(v) => setAuth('authorized', v as 'Yes' | 'No')}
            />
            <Radio
              name="auth"
              value="No"
              label="No"
              current={value.workAuthorization.authorized}
              onChange={(v) => setAuth('authorized', v as 'Yes' | 'No')}
            />
          </div>
        </div>

        <CountryMultiSelect
          label="Countries where you hold authorization"
          value={value.workAuthorization.countries}
          onChange={(countries) => setAuth('countries', countries)}
        />

        <div>
          <div className="label-base">Do you require visa sponsorship?</div>
          <div className="flex gap-6 mt-2">
            <Radio
              name="sponsor"
              value="Yes"
              label="Yes"
              current={value.workAuthorization.requiresSponsorship}
              onChange={(v) => setAuth('requiresSponsorship', v as 'Yes' | 'No')}
            />
            <Radio
              name="sponsor"
              value="No"
              label="No"
              current={value.workAuthorization.requiresSponsorship}
              onChange={(v) => setAuth('requiresSponsorship', v as 'Yes' | 'No')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="visa-status" className="label-base">
            Current visa or immigration status
          </label>
          <input
            id="visa-status"
            type="text"
            className="input-base"
            value={value.workAuthorization.status ?? ''}
            placeholder="e.g. H-1B, TN, PR, Citizen"
            onChange={(e) => setAuth('status', e.target.value)}
          />
        </div>
      </section>

      <section className="border border-border rounded">
        <button
          type="button"
          onClick={() => setUsOpen((o) => !o)}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
          aria-expanded={usOpen}
        >
          <span className="font-serif text-lg text-text-primary">
            United States (EEOC Voluntary Self-Identification)
          </span>
          <span className="text-text-muted text-sm">{usOpen ? 'Hide' : 'Show'}</span>
        </button>
        {usOpen && (
          <div className="px-4 pb-5 space-y-5 border-t border-border pt-5">
            <div>
              <div className="label-base">Gender</div>
              {GENDER_OPTIONS.map((g) => (
                <Radio
                  key={g}
                  name="us-gender"
                  value={g}
                  label={g}
                  current={us.gender}
                  onChange={(v) => setUs('gender', v)}
                />
              ))}
            </div>
            <div>
              <div className="label-base">Race / Ethnicity</div>
              <div className="space-y-1">
                {RACE_OPTIONS.map((r) => (
                  <label key={r} className="flex items-start gap-2 text-sm text-text-body">
                    <input
                      type="checkbox"
                      className="mt-1"
                      checked={us.raceEthnicity.includes(r)}
                      onChange={() => toggleRace(r)}
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="label-base">Veteran status</div>
              {VETERAN_OPTIONS.map((v) => (
                <Radio
                  key={v}
                  name="us-vet"
                  value={v}
                  label={v}
                  current={us.veteranStatus}
                  onChange={(val) => setUs('veteranStatus', val)}
                />
              ))}
            </div>
            <div>
              <div className="label-base">Disability</div>
              {DISABILITY_OPTIONS.map((d) => (
                <Radio
                  key={d}
                  name="us-dis"
                  value={d}
                  label={d}
                  current={us.disability}
                  onChange={(v) => setUs('disability', v)}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="border border-border rounded">
        <button
          type="button"
          onClick={() => setCaOpen((o) => !o)}
          className="w-full flex justify-between items-center px-4 py-3 text-left"
          aria-expanded={caOpen}
        >
          <span className="font-serif text-lg text-text-primary">
            Canada (Employment Equity)
          </span>
          <span className="text-text-muted text-sm">{caOpen ? 'Hide' : 'Show'}</span>
        </button>
        {caOpen && (
          <div className="px-4 pb-5 space-y-5 border-t border-border pt-5">
            <div>
              <div className="label-base">Indigenous identity</div>
              {INDIGENOUS_OPTIONS.map((opt) => (
                <Radio
                  key={opt}
                  name="ca-ind"
                  value={opt}
                  label={opt}
                  current={ca.indigenousIdentity}
                  onChange={(v) => setCa('indigenousIdentity', v)}
                />
              ))}
            </div>
            <div>
              <div className="label-base">Visible minority</div>
              {['Yes', 'No', 'Prefer Not to Disclose'].map((opt) => (
                <Radio
                  key={opt}
                  name="ca-vm"
                  value={opt}
                  label={opt}
                  current={ca.visibleMinority}
                  onChange={(v) => setCa('visibleMinority', v)}
                />
              ))}
            </div>
            <div>
              <div className="label-base">Person with disability</div>
              {['Yes', 'No', 'Prefer Not to Disclose'].map((opt) => (
                <Radio
                  key={opt}
                  name="ca-pwd"
                  value={opt}
                  label={opt}
                  current={ca.personWithDisability}
                  onChange={(v) => setCa('personWithDisability', v)}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
