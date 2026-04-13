export interface VisaOption {
  value: string;
  label: string;
  group: string;
}

export const VISA_GROUP_UNITED_STATES = 'United States';
export const VISA_GROUP_CANADA = 'Canada';
export const VISA_GROUP_UNITED_KINGDOM = 'United Kingdom';
export const VISA_GROUP_EU_EEA = 'EU / EEA';
export const VISA_GROUP_AUSTRALIA = 'Australia';
export const VISA_GROUP_NEW_ZEALAND = 'New Zealand';
export const VISA_GROUP_OTHER = 'Other';

export const EU_EEA_COUNTRY_CODES = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IS', 'IT', 'LV', 'LI', 'LT', 'LU',
  'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH',
];

export const VISA_STATUSES: VisaOption[] = [
  // United States
  { value: 'US Citizen', label: 'US Citizen', group: VISA_GROUP_UNITED_STATES },
  { value: 'US Permanent Resident (Green Card)', label: 'US Permanent Resident (Green Card)', group: VISA_GROUP_UNITED_STATES },
  { value: 'H-1B (Specialty Occupation)', label: 'H-1B (Specialty Occupation)', group: VISA_GROUP_UNITED_STATES },
  { value: 'H-1B1 (Singapore/Chile)', label: 'H-1B1 (Singapore/Chile)', group: VISA_GROUP_UNITED_STATES },
  { value: 'H-2A (Temporary Agricultural)', label: 'H-2A (Temporary Agricultural)', group: VISA_GROUP_UNITED_STATES },
  { value: 'H-2B (Temporary Non-Agricultural)', label: 'H-2B (Temporary Non-Agricultural)', group: VISA_GROUP_UNITED_STATES },
  { value: 'L-1A (Intracompany Transferee, Manager)', label: 'L-1A (Intracompany Transferee, Manager)', group: VISA_GROUP_UNITED_STATES },
  { value: 'L-1B (Intracompany Transferee, Specialized Knowledge)', label: 'L-1B (Intracompany Transferee, Specialized Knowledge)', group: VISA_GROUP_UNITED_STATES },
  { value: 'O-1 (Extraordinary Ability)', label: 'O-1 (Extraordinary Ability)', group: VISA_GROUP_UNITED_STATES },
  { value: 'TN (USMCA/NAFTA Professional)', label: 'TN (USMCA/NAFTA Professional)', group: VISA_GROUP_UNITED_STATES },
  { value: 'E-1 (Treaty Trader)', label: 'E-1 (Treaty Trader)', group: VISA_GROUP_UNITED_STATES },
  { value: 'E-2 (Treaty Investor)', label: 'E-2 (Treaty Investor)', group: VISA_GROUP_UNITED_STATES },
  { value: 'E-3 (Australian Specialty)', label: 'E-3 (Australian Specialty)', group: VISA_GROUP_UNITED_STATES },
  { value: 'J-1 (Exchange Visitor)', label: 'J-1 (Exchange Visitor)', group: VISA_GROUP_UNITED_STATES },
  { value: 'F-1 OPT (Optional Practical Training)', label: 'F-1 OPT (Optional Practical Training)', group: VISA_GROUP_UNITED_STATES },
  { value: 'F-1 CPT (Curricular Practical Training)', label: 'F-1 CPT (Curricular Practical Training)', group: VISA_GROUP_UNITED_STATES },
  { value: 'R-1 (Religious Worker)', label: 'R-1 (Religious Worker)', group: VISA_GROUP_UNITED_STATES },
  { value: 'EAD (Employment Authorization Document)', label: 'EAD (Employment Authorization Document)', group: VISA_GROUP_UNITED_STATES },
  { value: 'Asylum/Refugee', label: 'Asylum/Refugee', group: VISA_GROUP_UNITED_STATES },
  { value: 'DACA', label: 'DACA', group: VISA_GROUP_UNITED_STATES },
  { value: 'Pending Adjustment of Status', label: 'Pending Adjustment of Status', group: VISA_GROUP_UNITED_STATES },

  // Canada
  { value: 'Canadian Citizen', label: 'Canadian Citizen', group: VISA_GROUP_CANADA },
  { value: 'Canadian Permanent Resident', label: 'Canadian Permanent Resident', group: VISA_GROUP_CANADA },
  { value: 'Post-Graduation Work Permit (PGWP)', label: 'Post-Graduation Work Permit (PGWP)', group: VISA_GROUP_CANADA },
  { value: 'Employer-Specific Work Permit (LMIA)', label: 'Employer-Specific Work Permit (LMIA)', group: VISA_GROUP_CANADA },
  { value: 'Open Work Permit', label: 'Open Work Permit', group: VISA_GROUP_CANADA },
  { value: 'CUSMA/NAFTA Work Permit', label: 'CUSMA/NAFTA Work Permit', group: VISA_GROUP_CANADA },
  { value: 'Intra-Company Transfer (ICT)', label: 'Intra-Company Transfer (ICT)', group: VISA_GROUP_CANADA },
  { value: 'International Experience Canada (IEC)', label: 'International Experience Canada (IEC)', group: VISA_GROUP_CANADA },
  { value: 'Bridging Open Work Permit (BOWP)', label: 'Bridging Open Work Permit (BOWP)', group: VISA_GROUP_CANADA },
  { value: 'Spousal Open Work Permit', label: 'Spousal Open Work Permit', group: VISA_GROUP_CANADA },
  { value: 'Refugee Claimant Work Permit', label: 'Refugee Claimant Work Permit', group: VISA_GROUP_CANADA },
  { value: 'Temporary Resident Permit', label: 'Temporary Resident Permit', group: VISA_GROUP_CANADA },
  { value: 'Implied Status', label: 'Implied Status', group: VISA_GROUP_CANADA },

  // United Kingdom
  { value: 'UK Citizen', label: 'UK Citizen', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'UK Permanent Resident (Indefinite Leave to Remain)', label: 'UK Permanent Resident (Indefinite Leave to Remain)', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'UK Pre-Settled Status (EU Settlement Scheme)', label: 'UK Pre-Settled Status (EU Settlement Scheme)', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'UK Settled Status (EU Settlement Scheme)', label: 'UK Settled Status (EU Settlement Scheme)', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Skilled Worker Visa', label: 'Skilled Worker Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Health and Care Worker Visa', label: 'Health and Care Worker Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Global Talent Visa', label: 'Global Talent Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Scale-Up Visa', label: 'Scale-Up Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'High Potential Individual (HPI) Visa', label: 'High Potential Individual (HPI) Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Graduate Visa', label: 'Graduate Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Youth Mobility Scheme (Tier 5)', label: 'Youth Mobility Scheme (Tier 5)', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Innovator Founder Visa', label: 'Innovator Founder Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'UK Intra-Company Transfer (ICT)', label: 'Intra-Company Transfer (ICT)', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Seasonal Worker Visa', label: 'Seasonal Worker Visa', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'UK Student Visa with Work Rights', label: 'Student Visa with Work Rights', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'Frontier Worker Permit', label: 'Frontier Worker Permit', group: VISA_GROUP_UNITED_KINGDOM },
  { value: 'BN(O) Visa (Hong Kong)', label: 'BN(O) Visa (Hong Kong)', group: VISA_GROUP_UNITED_KINGDOM },

  // EU / EEA
  { value: 'EU/EEA Citizen (Freedom of Movement)', label: 'EU/EEA Citizen (Freedom of Movement)', group: VISA_GROUP_EU_EEA },
  { value: 'EU Blue Card', label: 'EU Blue Card', group: VISA_GROUP_EU_EEA },
  { value: 'EU Long-Term Resident', label: 'EU Long-Term Resident', group: VISA_GROUP_EU_EEA },
  { value: 'National Work Permit', label: 'National Work Permit', group: VISA_GROUP_EU_EEA },
  { value: 'Intra-Corporate Transfer (ICT Directive)', label: 'Intra-Corporate Transfer (ICT Directive)', group: VISA_GROUP_EU_EEA },
  { value: 'Seasonal Worker Permit', label: 'Seasonal Worker Permit', group: VISA_GROUP_EU_EEA },
  { value: 'Job Seeker Visa (Germany)', label: 'Job Seeker Visa (Germany)', group: VISA_GROUP_EU_EEA },
  { value: 'Talent Passport (France)', label: 'Talent Passport (France)', group: VISA_GROUP_EU_EEA },
  { value: 'Highly Skilled Migrant (Netherlands)', label: 'Highly Skilled Migrant (Netherlands)', group: VISA_GROUP_EU_EEA },
  { value: 'Self-Employment Visa', label: 'Self-Employment Visa', group: VISA_GROUP_EU_EEA },
  { value: 'Researcher/Scientist Visa', label: 'Researcher/Scientist Visa', group: VISA_GROUP_EU_EEA },
  { value: 'EU Student Visa with Work Rights', label: 'Student Visa with Work Rights', group: VISA_GROUP_EU_EEA },
  { value: 'Asylum/Refugee Status with Work Rights', label: 'Asylum/Refugee Status with Work Rights', group: VISA_GROUP_EU_EEA },
  { value: 'Pending Residence Application (Implied Status)', label: 'Pending Residence Application (Implied Status)', group: VISA_GROUP_EU_EEA },

  // Australia
  { value: 'Australian Citizen', label: 'Australian Citizen', group: VISA_GROUP_AUSTRALIA },
  { value: 'Australian Permanent Resident', label: 'Australian Permanent Resident', group: VISA_GROUP_AUSTRALIA },
  { value: 'Temporary Skill Shortage Visa (subclass 482)', label: 'Temporary Skill Shortage Visa (subclass 482)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Employer Nomination Scheme (subclass 186)', label: 'Employer Nomination Scheme (subclass 186)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Skilled Independent Visa (subclass 189)', label: 'Skilled Independent Visa (subclass 189)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Skilled Nominated Visa (subclass 190)', label: 'Skilled Nominated Visa (subclass 190)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Skilled Work Regional (subclass 491)', label: 'Skilled Work Regional (subclass 491)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Working Holiday Visa (subclass 417)', label: 'Working Holiday Visa (subclass 417)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Work and Holiday Visa (subclass 462)', label: 'Work and Holiday Visa (subclass 462)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Graduate Visa (subclass 485)', label: 'Graduate Visa (subclass 485)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Temporary Graduate Visa (subclass 485)', label: 'Temporary Graduate Visa (subclass 485)', group: VISA_GROUP_AUSTRALIA },
  { value: 'Partner Visa with Work Rights', label: 'Partner Visa with Work Rights', group: VISA_GROUP_AUSTRALIA },
  { value: 'Bridging Visa with Work Rights', label: 'Bridging Visa with Work Rights', group: VISA_GROUP_AUSTRALIA },
  { value: 'New Zealand Citizen (Special Category Visa)', label: 'New Zealand Citizen (Special Category Visa)', group: VISA_GROUP_AUSTRALIA },

  // New Zealand
  { value: 'New Zealand Citizen', label: 'New Zealand Citizen', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'New Zealand Permanent Resident', label: 'New Zealand Permanent Resident', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Accredited Employer Work Visa (AEWV)', label: 'Accredited Employer Work Visa (AEWV)', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Post-Study Work Visa', label: 'Post-Study Work Visa', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'NZ Working Holiday Visa', label: 'Working Holiday Visa', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Skilled Migrant Category (Residence)', label: 'Skilled Migrant Category (Residence)', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Global Workforce Seasonal Visa (GWSV)', label: 'Global Workforce Seasonal Visa (GWSV)', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Peak Seasonal Visa (PSV)', label: 'Peak Seasonal Visa (PSV)', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Specific Purpose Work Visa', label: 'Specific Purpose Work Visa', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Open Work Visa', label: 'Open Work Visa', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Partner of a Worker Visa', label: 'Partner of a Worker Visa', group: VISA_GROUP_NEW_ZEALAND },
  { value: 'Refugee/Protected Person Work Visa', label: 'Refugee/Protected Person Work Visa', group: VISA_GROUP_NEW_ZEALAND },

  // Other
  { value: 'Other (please specify)', label: 'Other (please specify)', group: VISA_GROUP_OTHER },
  { value: 'Not Applicable', label: 'Not Applicable', group: VISA_GROUP_OTHER },
];

export const VISA_LABELS = VISA_STATUSES.map((v) => v.value);

export function visaGroupsForCountries(countries: string[]): string[] {
  const groups = new Set<string>();
  if (countries.includes('US')) groups.add(VISA_GROUP_UNITED_STATES);
  if (countries.includes('CA')) groups.add(VISA_GROUP_CANADA);
  if (countries.includes('GB')) groups.add(VISA_GROUP_UNITED_KINGDOM);
  if (countries.some((c) => EU_EEA_COUNTRY_CODES.includes(c))) groups.add(VISA_GROUP_EU_EEA);
  if (countries.includes('AU')) groups.add(VISA_GROUP_AUSTRALIA);
  if (countries.includes('NZ')) groups.add(VISA_GROUP_NEW_ZEALAND);
  return Array.from(groups);
}

export function filterVisasByCountries(countries: string[]): VisaOption[] {
  const groups = visaGroupsForCountries(countries);
  if (groups.length === 0) return VISA_STATUSES;
  return VISA_STATUSES.filter(
    (v) => groups.includes(v.group) || v.group === VISA_GROUP_OTHER,
  );
}
