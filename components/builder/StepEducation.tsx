import type { EducationEntry } from '@/lib/schema';
import { EMPTY_DATE } from '@/lib/schema';
import { FormField, SelectField, MonthYearField } from './FormField';
import { ArrayField } from './ArrayField';

interface Props {
  value: EducationEntry[];
  onChange: (next: EducationEntry[]) => void;
}

const DEGREE_TYPES = [
  { value: 'High School Diploma', label: 'High School Diploma' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Bachelor', label: 'Bachelor' },
  { value: 'Master', label: 'Master' },
  { value: 'MBA', label: 'MBA' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
  { value: 'Professional Degree', label: 'Professional Degree' },
  { value: 'Other', label: 'Other' },
];

export default function StepEducation({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl text-text-primary">Education</h2>

      <ArrayField<EducationEntry>
        items={value}
        onChange={onChange}
        empty={() => ({
          institution: '',
          area: '',
          studyType: '',
          url: '',
          startDate: { ...EMPTY_DATE },
          endDate: { ...EMPTY_DATE },
          score: '',
          courses: [''],
        })}
        addLabel="Add Education"
        minItems={1}
        itemTitle={(i) => `Education ${i + 1}`}
        renderItem={(entry, _i, update) => (
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Institution" required value={entry.institution} onChange={(v) => update({ ...entry, institution: v })} />
              <FormField label="Field of study" required value={entry.area} onChange={(v) => update({ ...entry, area: v })} placeholder="e.g. Computer Science" />
              <SelectField
                label="Degree type"
                required
                value={entry.studyType}
                onChange={(v) => update({ ...entry, studyType: v })}
                placeholder="Select a degree type"
                options={DEGREE_TYPES}
              />
              <FormField label="Institution URL" type="url" value={entry.url ?? ''} onChange={(v) => update({ ...entry, url: v })} />
              <MonthYearField
                label="Start date"
                month={entry.startDate?.month ?? ''}
                year={entry.startDate?.year ?? ''}
                onChange={(d) => update({ ...entry, startDate: d })}
              />
              <MonthYearField
                label="End date"
                month={entry.endDate?.month ?? ''}
                year={entry.endDate?.year ?? ''}
                onChange={(d) => update({ ...entry, endDate: d })}
              />
              <FormField label="GPA / Score" value={entry.score ?? ''} onChange={(v) => update({ ...entry, score: v })} placeholder="e.g. 3.67/4.0" />
            </div>
            <div>
              <div className="label-base">Notable courses</div>
              <div className="space-y-2">
                {entry.courses.map((c, ci) => (
                  <div key={ci} className="flex gap-2">
                    <input
                      type="text"
                      className="input-base"
                      value={c}
                      onChange={(e) => {
                        const copy = entry.courses.slice();
                        copy[ci] = e.target.value;
                        update({ ...entry, courses: copy });
                      }}
                    />
                    {entry.courses.length > 1 && (
                      <button
                        type="button"
                        className="text-error text-sm px-2"
                        onClick={() => {
                          const copy = entry.courses.slice();
                          copy.splice(ci, 1);
                          update({ ...entry, courses: copy });
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
                onClick={() => update({ ...entry, courses: [...entry.courses, ''] })}
              >
                Add course
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
