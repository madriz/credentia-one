import type { FormState, DateYM } from './schema';

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

export function dateToNum(d: DateYM): number {
  const y = parseInt(d.year, 10) || 0;
  const m = parseInt(d.month, 10) || 0;
  return y * 12 + m;
}

export function isDateFilled(d: DateYM | undefined): boolean {
  return !!(d && d.month && d.year);
}

export function isEndDateBeforeStart(start: DateYM, end: DateYM): boolean {
  if (!isDateFilled(start) || !isDateFilled(end)) return false;
  return dateToNum(end) < dateToNum(start);
}

export function isDateInFuture(d: DateYM): boolean {
  if (!isDateFilled(d)) return false;
  const now = new Date();
  const currentNum = (now.getFullYear()) * 12 + (now.getMonth() + 1);
  return dateToNum(d) > currentNum;
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
    for (let i = 0; i < form.work.length; i++) {
      const w = form.work[i];
      if (!w.current && isDateFilled(w.endDate) && isDateFilled(w.startDate)) {
        if (isEndDateBeforeStart(w.startDate, w.endDate!)) {
          errors.push(`Position ${i + 1}: End date must be after start date.`);
        }
        if (isDateInFuture(w.endDate!)) {
          errors.push(`Position ${i + 1}: End date cannot be in the future.`);
        }
      }
    }
  }
  if (step === 3) {
    const hasOne = form.education.some(
      (e) => e.institution.trim() && e.area.trim() && e.studyType.trim(),
    );
    if (!hasOne) {
      errors.push('At least one education entry with institution, field, and degree is required.');
    }
    for (let i = 0; i < form.education.length; i++) {
      const e = form.education[i];
      if (isDateFilled(e.endDate) && isDateFilled(e.startDate)) {
        if (isEndDateBeforeStart(e.startDate!, e.endDate!)) {
          errors.push(`Education ${i + 1}: End date must be after start date.`);
        }
      }
    }
  }
  // Step 4: no required fields (skills, certs, languages are optional)
  if (step === 5) {
    if (!form.compliance.workAuthorization.authorized) {
      errors.push('Work authorization status is required.');
    }
  }
  // Step 6: no required fields
  return errors;
}
