import { useState } from 'react';
import type { SkillGroup, Certificate, Language } from '@/lib/schema';
import { EMPTY_DATE } from '@/lib/schema';
import { FormField, SelectField, MonthYearField } from './FormField';
import { ArrayField } from './ArrayField';

interface Props {
  skills: SkillGroup[];
  certificates: Certificate[];
  languages: Language[];
  onSkills: (next: SkillGroup[]) => void;
  onCertificates: (next: Certificate[]) => void;
  onLanguages: (next: Language[]) => void;
}

const PROFICIENCY = [
  { value: 'Expert', label: 'Expert' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner', label: 'Beginner' },
];

const FLUENCY = [
  { value: 'Native', label: 'Native' },
  { value: 'Fluent', label: 'Fluent' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Beginner', label: 'Beginner' },
];

function KeywordChips({
  keywords,
  onChange,
}: {
  keywords: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState('');
  const commit = (raw: string) => {
    const parts = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return;
    const next = Array.from(new Set([...keywords, ...parts]));
    onChange(next);
  };
  return (
    <div>
      <div className="label-base">Keywords</div>
      <input
        type="text"
        className="input-base"
        value={draft}
        placeholder="Comma-separated, e.g. Python, JavaScript, SQL"
        onChange={(e) => {
          const v = e.target.value;
          if (v.includes(',')) {
            commit(v);
            setDraft('');
          } else {
            setDraft(v);
          }
        }}
        onBlur={() => {
          if (draft.trim()) {
            commit(draft);
            setDraft('');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (draft.trim()) {
              commit(draft);
              setDraft('');
            }
          }
        }}
      />
      {keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.map((kw, i) => (
            <span
              key={`${kw}-${i}`}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-warm text-sm text-text-primary"
            >
              {kw}
              <button
                type="button"
                aria-label={`Remove ${kw}`}
                className="text-text-muted hover:text-error"
                onClick={() => {
                  const copy = keywords.slice();
                  copy.splice(i, 1);
                  onChange(copy);
                }}
              >
                x
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StepSkills(props: Props) {
  return (
    <div className="space-y-12">
      <h2 className="font-serif text-2xl text-text-primary">Skills, certificates, languages</h2>

      <section>
        <h3 className="font-serif text-xl text-text-primary mb-4">Skills</h3>
        <ArrayField<SkillGroup>
          items={props.skills}
          onChange={props.onSkills}
          empty={() => ({ category: '', level: 'Intermediate', keywords: [] })}
          addLabel="Add Skill Group"
          minItems={1}
          renderItem={(group, _i, update) => (
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  label="Category"
                  required
                  value={group.category}
                  onChange={(v) => update({ ...group, category: v })}
                  placeholder="e.g. Programming Languages"
                />
                <SelectField
                  label="Proficiency"
                  value={group.level}
                  onChange={(v) => update({ ...group, level: v })}
                  options={PROFICIENCY}
                />
              </div>
              <KeywordChips
                keywords={group.keywords}
                onChange={(kws) => update({ ...group, keywords: kws })}
              />
            </div>
          )}
        />
      </section>

      <section>
        <h3 className="font-serif text-xl text-text-primary mb-4">Certificates</h3>
        <ArrayField<Certificate>
          items={props.certificates}
          onChange={props.onCertificates}
          empty={() => ({
            name: '',
            issuer: '',
            date: { ...EMPTY_DATE },
            expires: { ...EMPTY_DATE },
            url: '',
          })}
          addLabel="Add Certificate"
          minItems={0}
          renderItem={(cert, _i, update) => (
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Name" required value={cert.name} onChange={(v) => update({ ...cert, name: v })} />
              <FormField label="Issuer" value={cert.issuer ?? ''} onChange={(v) => update({ ...cert, issuer: v })} />
              <MonthYearField
                label="Date"
                month={cert.date?.month ?? ''}
                year={cert.date?.year ?? ''}
                onChange={(d) => update({ ...cert, date: d })}
              />
              <MonthYearField
                label="Expiration"
                month={cert.expires?.month ?? ''}
                year={cert.expires?.year ?? ''}
                onChange={(d) => update({ ...cert, expires: d })}
              />
              <FormField label="URL" type="url" value={cert.url ?? ''} onChange={(v) => update({ ...cert, url: v })} />
            </div>
          )}
        />
      </section>

      <section>
        <h3 className="font-serif text-xl text-text-primary mb-4">Languages</h3>
        <ArrayField<Language>
          items={props.languages}
          onChange={props.onLanguages}
          empty={() => ({ language: '', fluency: 'Fluent' })}
          addLabel="Add Language"
          minItems={1}
          renderItem={(lang, _i, update) => (
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Language" required value={lang.language} onChange={(v) => update({ ...lang, language: v })} />
              <SelectField
                label="Fluency"
                value={lang.fluency}
                onChange={(v) => update({ ...lang, fluency: v })}
                options={FLUENCY}
              />
            </div>
          )}
        />
      </section>
    </div>
  );
}
