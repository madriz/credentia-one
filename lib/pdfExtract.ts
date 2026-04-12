// Client-side PDF text extraction using pdfjs-dist.
// Extracts basic contact info from resume text.

import type { FormState } from './schema';
import { emptyForm } from './schema';

interface ExtractedFields {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
}

export async function extractTextFromPdf(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = '';

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  }).promise;

  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    pages.push(text);
  }
  return pages.join('\n');
}

function extractFields(text: string): ExtractedFields {
  const result: ExtractedFields = {};

  // Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) result.email = emailMatch[0];

  // Phone
  const phoneMatch = text.match(
    /(?:\+?1[-.\s]?)?(?:\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}/,
  );
  if (phoneMatch) result.phone = phoneMatch[0].trim();

  // LinkedIn
  const linkedinMatch = text.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?/,
  );
  if (linkedinMatch) {
    let url = linkedinMatch[0];
    if (!url.startsWith('http')) url = `https://${url}`;
    result.linkedinUrl = url;
  }

  // Name: first non-empty line that looks like a name
  const lines = text.split(/\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const cleaned = line.replace(/[^a-zA-Z\s'-]/g, '').trim();
    const parts = cleaned.split(/\s+/).filter((p) => p.length > 1);
    if (parts.length >= 2 && parts.length <= 4 && parts.every((p) => /^[A-Z]/.test(p))) {
      result.firstName = parts[0];
      result.lastName = parts[parts.length - 1];
      break;
    }
  }

  return result;
}

export async function prefillFromPdf(file: File): Promise<FormState> {
  const text = await extractTextFromPdf(file);
  const fields = extractFields(text);
  const form = emptyForm();

  if (fields.firstName) form.basics.firstName = fields.firstName;
  if (fields.lastName) form.basics.lastName = fields.lastName;
  if (fields.email) form.basics.email = fields.email;
  if (fields.phone) form.basics.phone = fields.phone;
  if (fields.linkedinUrl) {
    form.basics.profiles = [
      { network: 'LinkedIn', username: '', url: fields.linkedinUrl },
    ];
  }

  return form;
}
