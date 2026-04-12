import { useRef, useState, useEffect } from 'react';
import { COUNTRIES } from '@/lib/countries';

interface Props {
  value: string[];
  onChange: (next: string[]) => void;
  label: string;
}

export default function CountryMultiSelect({ value, onChange, label }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches =
    query.length >= 1
      ? COUNTRIES.filter(
          (c) =>
            !value.includes(c.code) &&
            (c.name.toLowerCase().startsWith(query.toLowerCase()) ||
              c.code.toLowerCase().startsWith(query.toLowerCase())),
        ).slice(0, 12)
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const add = (code: string) => {
    if (!value.includes(code)) {
      onChange([...value, code]);
    }
    setQuery('');
    setOpen(false);
  };

  const remove = (code: string) => {
    onChange(value.filter((c) => c !== code));
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="label-base">{label}</div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {value.map((code) => {
            const c = COUNTRIES.find((cc) => cc.code === code);
            return (
              <span
                key={code}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-warm text-sm text-text-primary"
              >
                {code} - {c?.name ?? code}
                <button
                  type="button"
                  aria-label={`Remove ${code}`}
                  className="text-text-muted hover:text-error"
                  onClick={() => remove(code)}
                >
                  x
                </button>
              </span>
            );
          })}
        </div>
      )}
      <input
        type="text"
        className="input-base"
        value={query}
        placeholder="Type to search countries"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && matches.length > 0) {
            e.preventDefault();
            add(matches[0].code);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
        autoComplete="off"
      />
      {open && matches.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto border border-border rounded bg-bg-card shadow-md">
          {matches.map((c) => (
            <li
              key={c.code}
              className="px-3 py-2 text-sm cursor-pointer text-text-body hover:bg-bg-warm"
              onMouseDown={(e) => {
                e.preventDefault();
                add(c.code);
              }}
            >
              {c.code} - {c.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
