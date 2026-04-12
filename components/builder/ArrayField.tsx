import { ReactNode } from 'react';

interface Props<T> {
  items: T[];
  onChange: (items: T[]) => void;
  empty: () => T;
  addLabel: string;
  minItems?: number;
  renderItem: (item: T, index: number, update: (next: T) => void) => ReactNode;
  itemTitle?: (index: number) => string;
}

export function ArrayField<T>(props: Props<T>) {
  const min = props.minItems ?? 0;
  const update = (index: number, next: T) => {
    const copy = props.items.slice();
    copy[index] = next;
    props.onChange(copy);
  };
  const remove = (index: number) => {
    const copy = props.items.slice();
    copy.splice(index, 1);
    props.onChange(copy);
  };
  const add = () => {
    props.onChange([...props.items, props.empty()]);
  };
  return (
    <div className="space-y-6">
      {props.items.map((item, index) => (
        <div key={index} className="card relative">
          {props.itemTitle && (
            <div className="font-serif text-lg text-text-primary mb-4">
              {props.itemTitle(index)}
            </div>
          )}
          {props.renderItem(item, index, (next) => update(index, next))}
          {props.items.length > min && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-4 text-sm text-error hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={add} className="btn-outline">
        {props.addLabel}
      </button>
    </div>
  );
}
