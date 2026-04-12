export interface VisaOption {
  value: string;
  label: string;
  group: string;
}

export const VISA_STATUSES: VisaOption[] = [
  // United States
  { value: 'US Citizen', label: 'US Citizen', group: 'United States' },
  { value: 'US Permanent Resident (Green Card)', label: 'US Permanent Resident (Green Card)', group: 'United States' },
  { value: 'H-1B (Specialty Occupation)', label: 'H-1B (Specialty Occupation)', group: 'United States' },
  { value: 'H-1B1 (Singapore/Chile)', label: 'H-1B1 (Singapore/Chile)', group: 'United States' },
  { value: 'H-2A (Temporary Agricultural)', label: 'H-2A (Temporary Agricultural)', group: 'United States' },
  { value: 'H-2B (Temporary Non-Agricultural)', label: 'H-2B (Temporary Non-Agricultural)', group: 'United States' },
  { value: 'L-1A (Intracompany Transferee, Manager)', label: 'L-1A (Intracompany Transferee, Manager)', group: 'United States' },
  { value: 'L-1B (Intracompany Transferee, Specialized Knowledge)', label: 'L-1B (Intracompany Transferee, Specialized Knowledge)', group: 'United States' },
  { value: 'O-1 (Extraordinary Ability)', label: 'O-1 (Extraordinary Ability)', group: 'United States' },
  { value: 'TN (USMCA/NAFTA Professional)', label: 'TN (USMCA/NAFTA Professional)', group: 'United States' },
  { value: 'E-1 (Treaty Trader)', label: 'E-1 (Treaty Trader)', group: 'United States' },
  { value: 'E-2 (Treaty Investor)', label: 'E-2 (Treaty Investor)', group: 'United States' },
  { value: 'E-3 (Australian Specialty)', label: 'E-3 (Australian Specialty)', group: 'United States' },
  { value: 'J-1 (Exchange Visitor)', label: 'J-1 (Exchange Visitor)', group: 'United States' },
  { value: 'F-1 OPT (Optional Practical Training)', label: 'F-1 OPT (Optional Practical Training)', group: 'United States' },
  { value: 'F-1 CPT (Curricular Practical Training)', label: 'F-1 CPT (Curricular Practical Training)', group: 'United States' },
  { value: 'R-1 (Religious Worker)', label: 'R-1 (Religious Worker)', group: 'United States' },
  { value: 'EAD (Employment Authorization Document)', label: 'EAD (Employment Authorization Document)', group: 'United States' },
  { value: 'Asylum/Refugee', label: 'Asylum/Refugee', group: 'United States' },
  { value: 'DACA', label: 'DACA', group: 'United States' },
  { value: 'Pending Adjustment of Status', label: 'Pending Adjustment of Status', group: 'United States' },

  // Canada
  { value: 'Canadian Citizen', label: 'Canadian Citizen', group: 'Canada' },
  { value: 'Canadian Permanent Resident', label: 'Canadian Permanent Resident', group: 'Canada' },
  { value: 'Post-Graduation Work Permit (PGWP)', label: 'Post-Graduation Work Permit (PGWP)', group: 'Canada' },
  { value: 'Employer-Specific Work Permit (LMIA)', label: 'Employer-Specific Work Permit (LMIA)', group: 'Canada' },
  { value: 'Open Work Permit', label: 'Open Work Permit', group: 'Canada' },
  { value: 'CUSMA/NAFTA Work Permit', label: 'CUSMA/NAFTA Work Permit', group: 'Canada' },
  { value: 'Intra-Company Transfer (ICT)', label: 'Intra-Company Transfer (ICT)', group: 'Canada' },
  { value: 'International Experience Canada (IEC)', label: 'International Experience Canada (IEC)', group: 'Canada' },
  { value: 'Bridging Open Work Permit (BOWP)', label: 'Bridging Open Work Permit (BOWP)', group: 'Canada' },
  { value: 'Spousal Open Work Permit', label: 'Spousal Open Work Permit', group: 'Canada' },
  { value: 'Refugee Claimant Work Permit', label: 'Refugee Claimant Work Permit', group: 'Canada' },
  { value: 'Temporary Resident Permit', label: 'Temporary Resident Permit', group: 'Canada' },
  { value: 'Implied Status', label: 'Implied Status', group: 'Canada' },

  // Other
  { value: 'Other (please specify)', label: 'Other (please specify)', group: 'Other' },
  { value: 'Not Applicable', label: 'Not Applicable', group: 'Other' },
];

export const VISA_LABELS = VISA_STATUSES.map((v) => v.value);
