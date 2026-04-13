import { countryLabel } from './countries';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildMarkdown(doc: any): string {
  const b = doc.basics;
  const lines: string[] = [];

  const name = b.name;
  const fullName = [name?.first, name?.middle, name?.last].filter(Boolean).join(' ');
  lines.push(`# ${fullName}`);
  if (b.headline) lines.push(`**${b.headline}**`);

  const contactParts: string[] = [];
  if (b.email) contactParts.push(b.email);
  if (b.phone) contactParts.push(b.phone);
  const loc = [b.location?.city, b.location?.region, b.location?.countryCode]
    .filter(Boolean)
    .join(', ');
  if (loc) contactParts.push(loc);
  if (contactParts.length > 0) lines.push(contactParts.join(' | '));

  if (b.profiles) {
    const profileParts: string[] = [];
    for (const p of b.profiles) {
      if (p.url) profileParts.push(`[${p.network}](${p.url})`);
      else if (p.username) profileParts.push(`${p.network}: ${p.username}`);
    }
    if (profileParts.length > 0) lines.push(profileParts.join(' | '));
  }
  lines.push('');

  if (b.summary) {
    lines.push('## Summary');
    lines.push(b.summary);
    lines.push('');
  }

  if (doc.work?.length > 0) {
    lines.push('## Experience');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const w of doc.work as any[]) {
      lines.push(`### ${w.position}, ${w.company}`);
      const range = [w.startDate, w.current ? 'Present' : w.endDate].filter(Boolean).join(' - ');
      const dateLoc = [range, w.location].filter(Boolean).join(' | ');
      if (dateLoc) lines.push(`*${dateLoc}*`);
      if (w.summary) { lines.push(''); lines.push(w.summary); }
      if (w.highlights?.length > 0) {
        lines.push('');
        for (const h of w.highlights) lines.push(`- ${h}`);
      }
      lines.push('');
    }
  }

  if (doc.education?.length > 0) {
    lines.push('## Education');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const e of doc.education as any[]) {
      lines.push(`### ${e.studyType} in ${e.area}, ${e.institution}`);
      const range = [e.startDate, e.endDate].filter(Boolean).join(' - ');
      const extra = [range, e.score ? `GPA: ${e.score}` : ''].filter(Boolean).join(' | ');
      if (extra) lines.push(`*${extra}*`);
      if (e.courses?.length > 0) { lines.push(''); lines.push(`Courses: ${e.courses.join(', ')}`); }
      lines.push('');
    }
  }

  if (doc.skills?.length > 0) {
    lines.push('## Skills');
    for (const s of doc.skills) {
      lines.push(`**${s.category}** (${s.level}): ${s.keywords.join(', ')}`);
    }
    lines.push('');
  }

  if (doc.languages?.length > 0) {
    lines.push('## Languages');
    for (const l of doc.languages) lines.push(`- ${l.language} (${l.fluency})`);
    lines.push('');
  }

  if (doc.certificates?.length > 0) {
    lines.push('## Certifications');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const c of doc.certificates as any[]) {
      const parts = [c.name];
      if (c.issuer) parts.push(c.issuer);
      if (c.date) parts.push(c.date);
      lines.push(`- ${parts.join(', ')}`);
    }
    lines.push('');
  }

  if (doc.awards?.length > 0) {
    lines.push('## Honours and Awards');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const a of doc.awards as any[]) {
      const parts = [a.title];
      if (a.issuer) parts.push(a.issuer);
      if (a.date) parts.push(a.date);
      lines.push(`- ${parts.join(', ')}`);
      if (a.description) lines.push(`  ${a.description}`);
    }
    lines.push('');
  }

  const wa = doc.compliance?.workAuthorization;
  if (wa && wa.authorized !== undefined) {
    lines.push('## Work Authorization');
    lines.push(`Authorized to work: ${wa.authorized ? 'Yes' : 'No'}`);
    if (wa.countries?.length > 0) {
      lines.push(`Countries: ${wa.countries.map((c: string) => countryLabel(c)).join(', ')}`);
    }
    if (wa.requiresSponsorship !== undefined) {
      lines.push(`Requires sponsorship: ${wa.requiresSponsorship ? 'Yes' : 'No'}`);
    }
    if (wa.status?.length > 0) {
      lines.push(`Visa / immigration status: ${wa.status.join(', ')}`);
    }
    lines.push('');
  }

  const compliance = doc.compliance ?? {};

  if (compliance.eeoc) {
    lines.push('## United States (EEOC Voluntary Self-Identification)');
    const e = compliance.eeoc;
    if (e.gender) lines.push(`Gender: ${e.gender}`);
    if (e.raceEthnicity?.length > 0) lines.push(`Race / Ethnicity: ${e.raceEthnicity.join(', ')}`);
    if (e.veteranStatus) lines.push(`Veteran status: ${e.veteranStatus}`);
    if (e.disability) lines.push(`Disability: ${e.disability}`);
    lines.push('');
  }

  if (compliance.canadianEquity) {
    lines.push('## Canada (Employment Equity)');
    const ca = compliance.canadianEquity;
    if (ca.indigenousIdentity) lines.push(`Indigenous identity: ${ca.indigenousIdentity}`);
    if (ca.visibleMinority) lines.push(`Visible minority: ${ca.visibleMinority}`);
    if (ca.personWithDisability) lines.push(`Person with disability: ${ca.personWithDisability}`);
    lines.push('');
  }

  if (compliance.ukEqualityAct) {
    lines.push('## United Kingdom (Equality Act 2010)');
    const uk = compliance.ukEqualityAct;
    if (uk.gender) lines.push(`Gender: ${uk.gender}`);
    if (uk.ethnicity) lines.push(`Ethnicity: ${uk.ethnicity}`);
    if (uk.disability) lines.push(`Disability: ${uk.disability}`);
    if (uk.religion) lines.push(`Religion or belief: ${uk.religion}`);
    if (uk.sexualOrientation) lines.push(`Sexual orientation: ${uk.sexualOrientation}`);
    if (uk.ageRange) lines.push(`Age range: ${uk.ageRange}`);
    lines.push('');
  }

  if (compliance.euDisclosures) {
    lines.push('## European Union / EEA (GDPR Disclosures)');
    const eu = compliance.euDisclosures;
    if (eu.gdprConsent) {
      lines.push(`GDPR consent: Yes${eu.gdprConsentTimestamp ? ` (${eu.gdprConsentTimestamp})` : ''}`);
    }
    if (eu.dataRetentionPreference) lines.push(`Data retention preference: ${eu.dataRetentionPreference}`);
    if (eu.gender) lines.push(`Gender: ${eu.gender}`);
    if (eu.disability) lines.push(`Disability: ${eu.disability}`);
    lines.push('');
  }

  if (compliance.australianEqualOpportunity) {
    lines.push('## Australia (Equal Opportunity)');
    const au = compliance.australianEqualOpportunity;
    if (au.indigenousStatus) lines.push(`Indigenous status: ${au.indigenousStatus}`);
    if (au.gender) lines.push(`Gender: ${au.gender}`);
    if (au.disability) lines.push(`Disability: ${au.disability}`);
    if (au.languageAtHome) lines.push(`Language at home: ${au.languageAtHome}`);
    lines.push('');
  }

  if (compliance.newZealandDisclosures) {
    lines.push('## New Zealand (Census Disclosures)');
    const nz = compliance.newZealandDisclosures;
    if (nz.ethnicity?.length > 0) lines.push(`Ethnicity: ${nz.ethnicity.join(', ')}`);
    if (nz.gender) lines.push(`Gender: ${nz.gender}`);
    if (nz.disability) lines.push(`Disability: ${nz.disability}`);
    if (nz.iwi) lines.push(`Iwi affiliation: ${nz.iwi}`);
    lines.push('');
  }

  lines.push('---');
  const genDate = new Date(doc.$credentia.generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  lines.push(`*Generated by Credentia One on ${genDate}*`);
  if (doc.$credentia.verifyUrl) {
    lines.push(`*Verification: ${doc.$credentia.verifyUrl}*`);
  }

  return lines.join('\n');
}
