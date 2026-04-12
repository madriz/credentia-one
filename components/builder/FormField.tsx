import { ReactNode, useId } from 'react';

interface BaseProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children?: ReactNode;
}

interface InputProps extends BaseProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date';
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export function FormField(props: InputProps) {
  const id = useId();
  const describedBy = props.hint || props.error ? `${id}-desc` : undefined;
  return (
    <div>
      <label htmlFor={id} className="label-base">
        {props.label}
        {props.required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        id={id}
        type={props.type ?? 'text'}
        className="input-base"
        value={props.value === undefined || props.value === null ? '' : String(props.value)}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        required={props.required}
        autoComplete={props.autoComplete}
        aria-required={props.required ? 'true' : undefined}
        aria-invalid={props.error ? 'true' : undefined}
        aria-describedby={describedBy}
      />
      {props.hint && !props.error && (
        <p id={describedBy} className="mt-1 text-xs text-text-muted">
          {props.hint}
        </p>
      )}
      {props.error && (
        <p id={describedBy} className="mt-1 text-xs text-error">
          {props.error}
        </p>
      )}
    </div>
  );
}

interface TextAreaProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function TextAreaField(props: TextAreaProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label-base">
        {props.label}
        {props.required && <span className="text-error ml-1">*</span>}
      </label>
      <textarea
        id={id}
        className="input-base"
        rows={props.rows ?? 4}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        aria-required={props.required ? 'true' : undefined}
      />
    </div>
  );
}

interface SelectProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField(props: SelectProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label-base">
        {props.label}
        {props.required && <span className="text-error ml-1">*</span>}
      </label>
      <select
        id={id}
        className="input-base"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        aria-required={props.required ? 'true' : undefined}
      >
        {props.placeholder && <option value="">{props.placeholder}</option>}
        {props.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const MONTHS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
];

const YEARS = (() => {
  const out: { value: string; label: string }[] = [];
  for (let y = 2026; y >= 1970; y--) {
    out.push({ value: String(y), label: String(y) });
  }
  return out;
})();

interface MonthYearProps {
  label: string;
  required?: boolean;
  month: string;
  year: string;
  onChange: (next: { month: string; year: string }) => void;
}

export function MonthYearField(props: MonthYearProps) {
  return (
    <div>
      <div className="label-base">
        {props.label}
        {props.required && <span className="text-error ml-1">*</span>}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select
          className="input-base"
          value={props.month}
          onChange={(e) => props.onChange({ month: e.target.value, year: props.year })}
          aria-label={`${props.label} month`}
        >
          <option value="">Month</option>
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        <select
          className="input-base"
          value={props.year}
          onChange={(e) => props.onChange({ month: props.month, year: e.target.value })}
          aria-label={`${props.label} year`}
        >
          <option value="">Year</option>
          {YEARS.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
