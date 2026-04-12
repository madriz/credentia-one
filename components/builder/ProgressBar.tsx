interface Props {
  steps: string[];
  current: number;
  onJump?: (index: number) => void;
}

export default function ProgressBar({ steps, current, onJump }: Props) {
  return (
    <ol className="flex flex-wrap gap-2 mb-10" aria-label="Form progress">
      {steps.map((label, idx) => {
        const active = idx === current;
        const done = idx < current;
        const base =
          'flex-1 min-w-[120px] text-xs px-3 py-2 rounded border text-center transition-colors';
        const cls = active
          ? 'border-accent bg-accent text-white'
          : done
            ? 'border-accent text-accent bg-white'
            : 'border-border text-text-muted bg-white';
        return (
          <li key={label} className="flex-1 min-w-[120px]">
            <button
              type="button"
              disabled={!onJump || idx > current}
              onClick={() => onJump && idx <= current && onJump(idx)}
              className={`${base} ${cls} w-full`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="font-medium">{idx + 1}.</span> {label}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
