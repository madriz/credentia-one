import type { Preferences } from '@/lib/schema';
import { FormField, SelectField, MonthYearField } from './FormField';

interface Props {
  value: Preferences;
  onChange: (next: Preferences) => void;
}

const CURRENCIES = ['USD', 'CAD', 'EUR', 'GBP', 'AUD', 'CHF', 'JPY'].map((c) => ({
  value: c,
  label: c,
}));
const PERIODS = ['Annual', 'Monthly', 'Hourly'].map((p) => ({ value: p, label: p }));
const ARRANGEMENTS = ['Remote', 'Hybrid', 'On-Site'];

export default function StepPreferences({ value, onChange }: Props) {
  const setSalary = <K extends keyof NonNullable<Preferences['salary']>>(
    key: K,
    v: NonNullable<Preferences['salary']>[K],
  ) =>
    onChange({
      ...value,
      salary: { ...(value.salary ?? { currency: 'USD', period: 'Annual' }), [key]: v },
    });

  const toggleArrangement = (a: string) => {
    const next = value.workArrangement.includes(a)
      ? value.workArrangement.filter((x) => x !== a)
      : [...value.workArrangement, a];
    onChange({ ...value, workArrangement: next });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-text-primary">Preferences</h2>

      <FormField
        label="Desired role"
        value={value.desiredRole ?? ''}
        onChange={(v) => onChange({ ...value, desiredRole: v })}
        placeholder="e.g. VP of Product, Staff Engineer"
      />

      <div>
        <h3 className="font-serif text-lg text-text-primary mb-3">Salary</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <FormField
            label="Minimum"
            type="number"
            value={value.salary?.min ?? ''}
            onChange={(v) => setSalary('min', v ? Number(v) : undefined)}
          />
          <FormField
            label="Maximum"
            type="number"
            value={value.salary?.max ?? ''}
            onChange={(v) => setSalary('max', v ? Number(v) : undefined)}
          />
          <SelectField
            label="Currency"
            value={value.salary?.currency ?? 'USD'}
            onChange={(v) => setSalary('currency', v)}
            options={CURRENCIES}
          />
          <SelectField
            label="Period"
            value={value.salary?.period ?? 'Annual'}
            onChange={(v) => setSalary('period', v)}
            options={PERIODS}
          />
        </div>
      </div>

      <div>
        <div className="label-base">Work arrangement</div>
        <div className="flex flex-wrap gap-5 mt-2">
          {ARRANGEMENTS.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm text-text-body">
              <input
                type="checkbox"
                checked={value.workArrangement.includes(a)}
                onChange={() => toggleArrangement(a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="label-base">Willing to relocate</div>
        <div className="flex gap-6 mt-2">
          {(['Yes', 'No'] as const).map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm text-text-body">
              <input
                type="radio"
                name="relocate"
                checked={value.willingToRelocate === opt}
                onChange={() => onChange({ ...value, willingToRelocate: opt })}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <MonthYearField
        label="Available from"
        month={value.availableFrom?.month ?? ''}
        year={value.availableFrom?.year ?? ''}
        onChange={(d) => onChange({ ...value, availableFrom: d })}
      />

      <FormField
        label="Notice period"
        value={value.noticePeriod ?? ''}
        onChange={(v) => onChange({ ...value, noticePeriod: v })}
        placeholder="e.g. 2 weeks, Immediate"
      />
    </div>
  );
}
