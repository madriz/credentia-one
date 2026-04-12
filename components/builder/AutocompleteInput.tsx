import { useRef, useState, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  label: string;
  required?: boolean;
  minChars?: number;
}

export default function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder,
  label,
  required,
  minChars = 2,
}: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches =
    value.length >= minChars
      ? suggestions
          .filter((s) => s.toLowerCase().startsWith(value.toLowerCase()))
          .slice(0, 12)
      : [];

  const showDropdown = open && matches.length > 0;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const select = (val: string) => {
    onChange(val);
    setOpen(false);
    setHighlighted(-1);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="label-base">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        ref={inputRef}
        type="text"
        className="input-base"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHighlighted(-1);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (!showDropdown) return;
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlighted((h) => Math.min(h + 1, matches.length - 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlighted((h) => Math.max(h - 1, 0));
          } else if (e.key === 'Enter' && highlighted >= 0) {
            e.preventDefault();
            select(matches[highlighted]);
          } else if (e.key === 'Escape') {
            setOpen(false);
          }
        }}
        aria-required={required ? 'true' : undefined}
        autoComplete="off"
      />
      {showDropdown && (
        <ul
          className="absolute z-20 left-0 right-0 mt-1 max-h-48 overflow-auto border border-border rounded bg-bg-card shadow-md"
          role="listbox"
        >
          {matches.map((m, i) => (
            <li
              key={m}
              role="option"
              aria-selected={i === highlighted}
              className={`px-3 py-2 text-sm cursor-pointer ${
                i === highlighted ? 'bg-accent text-white' : 'text-text-body hover:bg-bg-warm'
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                select(m);
              }}
              onMouseEnter={() => setHighlighted(i)}
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
