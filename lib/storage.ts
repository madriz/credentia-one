import type { FormState } from './schema';

const KEY = 'credentia_draft';

export function loadDraft(): FormState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as FormState;
  } catch {
    return null;
  }
}

export function saveDraft(form: FormState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(form));
  } catch {
    // localStorage may be full or disabled. Silently ignore.
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // Ignore.
  }
}

type DebouncedFn<A extends unknown[]> = (...args: A) => void;

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  ms: number,
): DebouncedFn<A> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
