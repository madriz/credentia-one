import type { WorkEntry } from '@/lib/schema';
import { EMPTY_DATE } from '@/lib/schema';
import { FormField, TextAreaField, MonthYearField } from './FormField';
import { ArrayField } from './ArrayField';

interface Props {
  value: WorkEntry[];
  onChange: (next: WorkEntry[]) => void;
}

export default function StepWork({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-text-primary">Work experience</h2>

      <ArrayField<WorkEntry>
        items={value}
        onChange={onChange}
        empty={() => ({
          company: '',
          position: '',
          location: '',
          description: '',
          url: '',
          startDate: { ...EMPTY_DATE },
          current: false,
          endDate: { ...EMPTY_DATE },
          summary: '',
          highlights: [''],
        })}
        addLabel="Add Work Entry"
        minItems={1}
        itemTitle={(i) => `Position ${i + 1}`}
        renderItem={(entry, _i, update) => (
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Company" required value={entry.company} onChange={(v) => update({ ...entry, company: v })} />
              <FormField label="Position" required value={entry.position} onChange={(v) => update({ ...entry, position: v })} />
              <FormField label="Location" value={entry.location ?? ''} onChange={(v) => update({ ...entry, location: v })} placeholder="City, State or Remote" />
              <FormField label="Company URL" type="url" value={entry.url ?? ''} onChange={(v) => update({ ...entry, url: v })} />
            </div>
            <FormField label="Company description" value={entry.description ?? ''} onChange={(v) => update({ ...entry, description: v })} />
            <div className="grid md:grid-cols-2 gap-5">
              <MonthYearField
                label="Start date"
                required
                month={entry.startDate.month}
                year={entry.startDate.year}
                onChange={(d) => update({ ...entry, startDate: d })}
              />
              {!entry.current && (
                <MonthYearField
                  label="End date"
                  month={entry.endDate?.month ?? ''}
                  year={entry.endDate?.year ?? ''}
                  onChange={(d) => update({ ...entry, endDate: d })}
                />
              )}
            </div>
            <label className="flex items-center gap-2 text-sm text-text-body">
              <input
                type="checkbox"
                checked={entry.current}
                onChange={(e) =>
                  update({
                    ...entry,
                    current: e.target.checked,
                    endDate: e.target.checked ? { ...EMPTY_DATE } : entry.endDate,
                  })
                }
              />
              I currently work here
            </label>
            <TextAreaField
              label="Summary"
              value={entry.summary ?? ''}
              onChange={(v) => update({ ...entry, summary: v })}
              rows={3}
            />
            <div>
              <div className="label-base">Highlights</div>
              <div className="space-y-2">
                {entry.highlights.map((h, hi) => (
                  <div key={hi} className="flex gap-2">
                    <input
                      type="text"
                      className="input-base"
                      value={h}
                      placeholder="e.g. Increased revenue 20% through new pricing model"
                      onChange={(e) => {
                        const copy = entry.highlights.slice();
                        copy[hi] = e.target.value;
                        update({ ...entry, highlights: copy });
                      }}
                    />
                    {entry.highlights.length > 1 && (
                      <button
                        type="button"
                        className="text-error text-sm px-2"
                        onClick={() => {
                          const copy = entry.highlights.slice();
                          copy.splice(hi, 1);
                          update({ ...entry, highlights: copy });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 text-sm text-accent"
                onClick={() => update({ ...entry, highlights: [...entry.highlights, ''] })}
              >
                Add highlight
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
