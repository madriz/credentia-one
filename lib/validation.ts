import type { FormState } from './schema';

export interface RequirementCheck {
  label: string;
  ok: boolean;
}

export function checkCompleteness(form: FormState): RequirementCheck[] {
  const b = form.basics;
  const checks: RequirementCheck[] = [
    { label: 'First name', ok: b.firstName.trim().length > 0 },
    { label: 'Last name', ok: b.lastName.trim().length > 0 },
    { label: 'Email', ok: isValidEmail(b.email) },
    { label: 'Phone', ok: b.phone.trim().length > 0 },
    { label: 'City', ok: b.location.city.trim().length > 0 },
    { label: 'Country', ok: b.location.countryCode.trim().length > 0 },
    {
      label: 'At least one work entry with company, position, start date',
      ok: form.work.some(
        (w) =>
          w.company.trim().length > 0 &&
          w.position.trim().length > 0 &&
          w.startDate.month.length > 0 &&
          w.startDate.year.length > 0,
      ),
    },
    {
      label: 'At least one education entry with institution, field, degree',
      ok: form.education.some(
        (e) =>
          e.institution.trim().length > 0 &&
          e.area.trim().length > 0 &&
          e.studyType.trim().length > 0,
      ),
    },
    {
      label: 'At least one skill group with category and keywords',
      ok: form.skills.some(
        (s) => s.category.trim().length > 0 && s.keywords.length > 0,
      ),
    },
    {
      label: 'Work authorization answered',
      ok: form.compliance.workAuthorization.authorized.length > 0,
    },
  ];
  return checks;
}

export function isComplete(form: FormState): boolean {
  return checkCompleteness(form).every((c) => c.ok);
}

export function isValidEmail(value: string): boolean {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidUrl(value: string): boolean {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function validateStep(step: number, form: FormState): string[] {
  const errors: string[] = [];
  if (step === 1) {
    if (!form.basics.firstName.trim()) errors.push('First name is required.');
    if (!form.basics.lastName.trim()) errors.push('Last name is required.');
    if (!isValidEmail(form.basics.email)) errors.push('A valid email is required.');
    if (!form.basics.phone.trim()) errors.push('Phone is required.');
    if (!form.basics.location.city.trim()) errors.push('City is required.');
    if (!form.basics.location.countryCode.trim()) errors.push('Country is required.');
  }
  if (step === 2) {
    const hasOne = form.work.some(
      (w) =>
        w.company.trim() &&
        w.position.trim() &&
        w.startDate.month &&
        w.startDate.year,
    );
    if (!hasOne) {
      errors.push('At least one work entry with company, position, and start date is required.');
    }
  }
  if (step === 3) {
    const hasOne = form.education.some(
      (e) => e.institution.trim() && e.area.trim() && e.studyType.trim(),
    );
    if (!hasOne) {
      errors.push('At least one education entry with institution, field, and degree is required.');
    }
  }
  if (step === 4) {
    const hasOne = form.skills.some(
      (s) => s.category.trim() && s.keywords.length > 0,
    );
    if (!hasOne) {
      errors.push('At least one skill group with category and keywords is required.');
    }
  }
  if (step === 5) {
    if (!form.compliance.workAuthorization.authorized) {
      errors.push('Work authorization status is required.');
    }
  }
  return errors;
}
