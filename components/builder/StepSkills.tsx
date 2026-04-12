import { useState } from 'react';
import type { SkillGroup, Certificate, Award, Language } from '@/lib/schema';
import { EMPTY_DATE } from '@/lib/schema';
import { FormField, SelectField, MonthYearField } from './FormField';
import { ArrayField } from './ArrayField';
import AutocompleteInput from './AutocompleteInput';
import { SKILLS_LIST } from '@/lib/skillsList';
import { SKILL_CATEGORIES } from '@/lib/skillCategories';
import { LANGUAGES_LIST } from '@/lib/languagesList';

interface Props {
  skills: SkillGroup[];
  certificates: Certificate[];
  awards: Award[];
  languages: Language[];
  onSkills: (next: SkillGroup[]) => void;
  onCertificates: (next: Certificate[]) => void;
  onAwards: (next: Award[]) => void;
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const commit = (raw: string) => {
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (parts.length === 0) return;
    onChange(Array.from(new Set([...keywords, ...parts])));
  };

  const updateSuggestions = (val: string) => {
    if (val.length >= 2) {
      const lower = val.toLowerCase();
      const matches = SKILLS_LIST.filter(
        (s) => s.toLowerCase().startsWith(lower) && !keywords.includes(s),
      ).slice(0, 10);
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (skill: string) => {
    onChange(Array.from(new Set([...keywords, skill])));
    setDraft('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="label-base">Keywords</div>
      <input
        type="text"
        className="input-base"
        value={draft}
        placeholder="Type to search skills, or comma-separated"
        onChange={(e) => {
          const v = e.target.value;
          if (v.includes(',')) { commit(v); setDraft(''); setShowSuggestions(false); }
          else { setDraft(v); updateSuggestions(v); }
        }}
        onBlur={() => {
          setTimeout(() => setShowSuggestions(false), 150);
          if (draft.trim()) { commit(draft); setDraft(''); }
        }}
        onFocus={() => { if (draft.length >= 2) updateSuggestions(draft); }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestions.length > 0 && showSuggestions) selectSuggestion(suggestions[0]);
            else if (draft.trim()) { commit(draft); setDraft(''); }
          } else if (e.key === 'Escape') setShowSuggestions(false);
        }}
        autoComplete="off"
      />
      <p className="mt-1 text-xs text-text-muted">Type to search common skills or add your own.</p>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto border border-border rounded bg-bg-card shadow-md">
          {suggestions.map((s) => (
            <li key={s} className="px-3 py-2 text-sm cursor-pointer text-text-body hover:bg-bg-warm"
              onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}>{s}</li>
          ))}
        </ul>
      )}
      {keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.map((kw, i) => (
            <span key={`${kw}-${i}`} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-warm text-sm text-text-primary">
              {kw}
              <button type="button" aria-label={`Remove ${kw}`} className="text-text-muted hover:text-error"
                onClick={() => { const copy = keywords.slice(); copy.splice(i, 1); onChange(copy); }}>x</button>
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
      <h2 className="font-serif text-2xl text-text-primary">Skills, certificates, languages, awards</h2>

      <section>
        <h3 className="font-serif text-xl text-text-primary mb-4">Skills</h3>
        <ArrayField<SkillGroup>
          items={props.skills}
          onChange={props.onSkills}
          empty={() => ({ category: '', level: 'Intermediate', keywords: [] })}
          addLabel="Add Skill Group"
          minItems={0}
          renderItem={(group, _i, update) => (
            <div className="space-y-5">
              <AutocompleteInput
                label="Skill Area"
                required
                value={group.category}
                onChange={(v) => update({ ...group, category: v })}
                suggestions={SKILL_CATEGORIES}
                placeholder="e.g. Programming, Project Management, Data Analysis, Marketing, Leadership"
              />
              <KeywordChips
                keywords={group.keywords}
                onChange={(kws) => update({ ...group, keywords: kws })}
              />
              <SelectField
                label="Proficiency"
                value={group.level}
                onChange={(v) => update({ ...group, level: v })}
                options={PROFICIENCY}
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
          empty={() => ({ name: '', issuer: '', date: { ...EMPTY_DATE }, expires: { ...EMPTY_DATE }, url: '' })}
          addLabel="Add Certificate"
          minItems={0}
          renderItem={(cert, _i, update) => (
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Name" required value={cert.name} onChange={(v) => update({ ...cert, name: v })} />
              <FormField label="Issuer" value={cert.issuer ?? ''} onChange={(v) => update({ ...cert, issuer: v })} />
              <MonthYearField label="Date" month={cert.date?.month ?? ''} year={cert.date?.year ?? ''} onChange={(d) => update({ ...cert, date: d })} />
              <MonthYearField label="Expiration" month={cert.expires?.month ?? ''} year={cert.expires?.year ?? ''} onChange={(d) => update({ ...cert, expires: d })} />
              <FormField label="URL" type="url" value={cert.url ?? ''} onChange={(v) => update({ ...cert, url: v })} />
            </div>
          )}
        />
      </section>

      <section>
        <h3 className="font-serif text-xl text-text-primary mb-4">Honours and Awards</h3>
        <ArrayField<Award>
          items={props.awards}
          onChange={props.onAwards}
          empty={() => ({ title: '', issuer: '', date: { ...EMPTY_DATE }, description: '' })}
          addLabel="Add Honour or Award"
          minItems={0}
          renderItem={(award, _i, update) => (
            <div className="grid md:grid-cols-2 gap-5">
              <FormField label="Title" required value={award.title} onChange={(v) => update({ ...award, title: v })} placeholder="e.g. Dean's List, Employee of the Year" />
              <FormField label="Issuer / Organization" value={award.issuer ?? ''} onChange={(v) => update({ ...award, issuer: v })} placeholder="e.g. University of Toronto, Acme Corp" />
              <MonthYearField label="Date" month={award.date?.month ?? ''} year={award.date?.year ?? ''} onChange={(d) => update({ ...award, date: d })} />
              <FormField label="Description" value={award.description ?? ''} onChange={(v) => update({ ...award, description: v })} />
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
          minItems={0}
          renderItem={(lang, _i, update) => (
            <div className="grid md:grid-cols-2 gap-5">
              <AutocompleteInput
                label="Language"
                required
                value={lang.language}
                onChange={(v) => update({ ...lang, language: v })}
                suggestions={LANGUAGES_LIST}
                placeholder="Type to search"
              />
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
