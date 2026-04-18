import type { Basics, SocialProfile } from '@/lib/schema';
import { COUNTRIES } from '@/lib/countries';
import { getStatesForCountry } from '@/lib/stateProvinces';
import { FormField, TextAreaField, SelectField } from './FormField';
import { ArrayField } from './ArrayField';
import AutocompleteInput from './AutocompleteInput';

interface Props {
  value: Basics;
  onChange: (next: Basics) => void;
}

const NETWORK_OPTIONS = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'GitHub', label: 'GitHub' },
  { value: 'X', label: 'X' },
  { value: 'Portfolio', label: 'Portfolio' },
  { value: 'Other', label: 'Other' },
];

export default function StepPersonal({ value, onChange }: Props) {
  const set = <K extends keyof Basics>(key: K, v: Basics[K]) =>
    onChange({ ...value, [key]: v });
  const setLoc = <K extends keyof Basics['location']>(key: K, v: Basics['location'][K]) =>
    onChange({ ...value, location: { ...value.location, [key]: v } });

  const states = getStatesForCountry(value.location.countryCode);
  const stateOptions = states
    ? states.map((s) => `${s.name} (${s.code})`)
    : null;

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-text-primary">Personal information</h2>

      <div className="grid md:grid-cols-2 gap-5">
        <FormField label="First name" required value={value.firstName} onChange={(v) => set('firstName', v)} autoComplete="given-name" />
        <FormField label="Middle name" value={value.middleName ?? ''} onChange={(v) => set('middleName', v)} />
        <FormField label="Last name" required value={value.lastName} onChange={(v) => set('lastName', v)} autoComplete="family-name" />
        <FormField label="Preferred name" value={value.preferredName ?? ''} onChange={(v) => set('preferredName', v)} placeholder="How you prefer to be addressed" />
        <FormField label="Email" required type="email" value={value.email} onChange={(v) => set('email', v)} autoComplete="email" />
        <FormField label="Phone" required type="tel" value={value.phone} onChange={(v) => set('phone', v)} placeholder="+1-416-555-0199" autoComplete="tel" />
        <FormField label="Professional headline" value={value.headline ?? ''} onChange={(v) => set('headline', v)} placeholder="e.g. Senior Product Manager" />
        <FormField label="Website URL" type="url" value={value.url ?? ''} onChange={(v) => set('url', v)} />
      </div>

      <TextAreaField
        label="Summary"
        value={value.summary ?? ''}
        onChange={(v) => set('summary', v)}
        placeholder="Two to four sentences about your professional background."
        rows={4}
      />

      <div>
        <h3 className="font-serif text-xl text-text-primary mb-4">Location</h3>
        <div className="grid md:grid-cols-2 gap-5">
          <FormField label="Street address" value={value.location.address ?? ''} onChange={(v) => setLoc('address', v)} />
          <FormField label="City" required value={value.location.city} onChange={(v) => setLoc('city', v)} />
          {stateOptions ? (
            <AutocompleteInput
              label="State / Province"
              value={value.location.region ?? ''}
              onChange={(v) => setLoc('region', v)}
              suggestions={stateOptions}
              placeholder="Type to search"
            />
          ) : (
            <FormField label="State / Province / Region" value={value.location.region ?? ''} onChange={(v) => setLoc('region', v)} />
          )}
          <FormField label="Postal / ZIP Code" value={value.location.postalCode ?? ''} onChange={(v) => setLoc('postalCode', v)} />
          <SelectField
            label="Country"
            required
            value={value.location.countryCode}
            onChange={(v) => {
              const prev = value.location.countryCode;
              onChange({
                ...value,
                location: {
                  ...value.location,
                  countryCode: v,
                  region: v !== prev ? '' : value.location.region,
                },
              });
            }}
            placeholder="Select a country"
            options={COUNTRIES.map((c) => ({ value: c.code, label: `${c.code} - ${c.name}` }))}
          />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-xl text-text-primary mb-4">Social profiles</h3>
        <ArrayField<SocialProfile>
          items={value.profiles}
          onChange={(items) => set('profiles', items)}
          empty={() => ({ network: 'LinkedIn', username: '', url: '' })}
          addLabel="Add Profile"
          minItems={0}
          renderItem={(profile, _i, update) => (
            <div className="grid md:grid-cols-3 gap-5">
              <SelectField
                label="Network"
                value={profile.network}
                onChange={(v) => update({ ...profile, network: v })}
                options={NETWORK_OPTIONS}
              />
              <FormField label="Username" value={profile.username ?? ''} onChange={(v) => update({ ...profile, username: v })} />
              <FormField label="Profile URL" type="url" value={profile.url ?? ''} onChange={(v) => update({ ...profile, url: v })} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
