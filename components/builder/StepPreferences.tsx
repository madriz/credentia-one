import type { Preferences } from '@/lib/schema';
import { FormField, SelectField, MonthYearField } from './FormField';

interface Props {
  value: Preferences;
  onChange: (next: Preferences) => void;
}

const CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'AUD', 'CHF', 'JPY'].map((c) => ({ value: c, label: c }));
const PERIODS = ['Annual', 'Monthly', 'Hourly'].map((p) => ({ value: p, label: p }));
const ARRANGEMENTS = ['Remote', 'Hybrid', 'On-Site'];
const MAX_ROLES = 5;

const NOTICE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Immediate (available now)', label: 'Immediate (available now)' },
  { value: '1 week', label: '1 week' },
  { value: '2 weeks', label: '2 weeks' },
  { value: '3 weeks', label: '3 weeks' },
  { value: '1 month', label: '1 month' },
  { value: '6 weeks', label: '6 weeks' },
  { value: '2 months', label: '2 months' },
  { value: '3 months', label: '3 months' },
  { value: 'Other', label: 'Other' },
];

const NOTICE_UNITS = [
  { value: 'Days', label: 'Days' },
  { value: 'Weeks', label: 'Weeks' },
  { value: 'Months', label: 'Months' },
];

export default function StepPreferences({ value, onChange }: Props) {
  const setSalary = <K extends keyof NonNullable<Preferences['salary']>>(
    key: K, v: NonNullable<Preferences['salary']>[K],
  ) => onChange({ ...value, salary: { ...(value.salary ?? { currency: 'USD', period: 'Annual' }), [key]: v } });

  const toggleArrangement = (a: string) => {
    const next = value.workArrangement.includes(a)
      ? value.workArrangement.filter((x) => x !== a)
      : [...value.workArrangement, a];
    onChange({ ...value, workArrangement: next });
  };

  const roles = value.desiredRoles ?? [''];
  const updateRole = (index: number, val: string) => { const c = roles.slice(); c[index] = val; onChange({ ...value, desiredRoles: c }); };
  const addRole = () => { if (roles.length < MAX_ROLES) onChange({ ...value, desiredRoles: [...roles, ''] }); };
  const removeRole = (index: number) => { const c = roles.slice(); c.splice(index, 1); onChange({ ...value, desiredRoles: c.length === 0 ? [''] : c }); };

  const isOther = value.noticePeriod === 'Other';
  const custom = value.noticePeriodCustom ?? { amount: '', unit: 'Days' };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-text-primary">Preferences</h2>

      <div>
        <div className="label-base">Desired roles (up to {MAX_ROLES})</div>
        <div className="space-y-3 mt-2">
          {roles.map((role, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" className="input-base" value={role} placeholder="e.g. VP of Product, Staff Engineer"
                onChange={(e) => updateRole(i, e.target.value)} />
              {roles.length > 1 && <button type="button" className="text-error text-sm px-2" onClick={() => removeRole(i)}>Remove</button>}
            </div>
          ))}
        </div>
        <button type="button" className="mt-3 text-sm text-accent" disabled={roles.length >= MAX_ROLES} onClick={addRole}
          style={roles.length >= MAX_ROLES ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}>Add another role</button>
      </div>

      <div>
        <h3 className="font-serif text-lg text-text-primary mb-3">Salary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <FormField label="Minimum" type="number" value={value.salary?.min ?? ''} onChange={(v) => setSalary('min', v ? Number(v) : undefined)} />
          <FormField label="Maximum" type="number" value={value.salary?.max ?? ''} onChange={(v) => setSalary('max', v ? Number(v) : undefined)} />
          <SelectField label="Currency" value={value.salary?.currency ?? 'USD'} onChange={(v) => setSalary('currency', v)} options={CURRENCIES} />
          <SelectField label="Period" value={value.salary?.period ?? 'Annual'} onChange={(v) => setSalary('period', v)} options={PERIODS} />
        </div>
      </div>

      <div>
        <div className="label-base">Work arrangement</div>
        <div className="flex flex-wrap gap-5 mt-2">
          {ARRANGEMENTS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-text-body">
              <input type="checkbox" checked={value.workArrangement.includes(a)} onChange={() => toggleArrangement(a)} />{a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="label-base">Willing to relocate</div>
        <div className="flex gap-6 mt-2">
          {(['Yes', 'No'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-text-body">
              <input type="radio" name="relocate" checked={value.willingToRelocate === opt}
                onChange={() => onChange({ ...value, willingToRelocate: opt })} />{opt}
            </label>
          ))}
        </div>
      </div>

      <MonthYearField label="Available from" month={value.availableFrom?.month ?? ''} year={value.availableFrom?.year ?? ''}
        onChange={(d) => onChange({ ...value, availableFrom: d })} />

      <div>
        <SelectField label="Notice period" value={value.noticePeriod ?? ''} onChange={(v) => onChange({ ...value, noticePeriod: v })}
          options={NOTICE_OPTIONS} />
        {isOther && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            <FormField label="Amount" type="number" value={custom.amount}
              onChange={(v) => onChange({ ...value, noticePeriodCustom: { ...custom, amount: v } })} />
            <SelectField label="Unit" value={custom.unit}
              onChange={(v) => onChange({ ...value, noticePeriodCustom: { ...custom, unit: v } })}
              options={NOTICE_UNITS} />
          </div>
        )}
      </div>
    </div>
  );
}
