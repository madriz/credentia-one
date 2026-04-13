# Credentia One -- Localization Rules

## Core Rule
Any change affecting user-facing text in any language must be applied to ALL supported languages wherever applicable. No UI change ships in one language only.

## Supported Languages
English (en), French (fr), Spanish (es), Italian (it), German (de), Polish (pl), Dutch (nl), Bulgarian (bg), Croatian (hr), Greek (el), Czech (cs), Danish (da), Estonian (et), Finnish (fi), Swedish (sv), Hungarian (hu), Latvian (lv), Lithuanian (lt), Maltese (mt), Portuguese (pt), Romanian (ro), Slovak (sk), Slovenian (sl)

## Architecture (to be implemented)
- All user-facing strings must be extracted into translation files, one per language.
- Translation files will be stored in /locales/{lang}.json (e.g. /locales/en.json, /locales/fr.json).
- Components must reference string keys, never hardcoded text.
- The i18n framework (next-intl or similar) will handle language detection, routing, and fallback.
- Default language: English (en). Fallback: English.
- Language selection: detected from browser settings, overridable by user via a language selector in the nav.

## What Gets Translated
- All page headings, body text, section titles
- Form labels, placeholders, help text, validation error messages
- Button text and link text
- Legal text (privacy policy, cookie consent, disclaimers)
- Navigation labels
- Footer text
- About page content
- Employer page content (including API documentation prose)

## What Does NOT Get Translated
- The .credentia.json file output (always in English, the schema is language-neutral)
- The .credentia.md file output (always in English)
- JSON field names and schema keys
- API endpoint documentation (code examples stay in English)
- GitHub README and technical documentation
- Verification token hashes and URLs
- Country names in ISO codes (the display names may be localized, but the codes remain standard)

## Translation Process
- English is the source language. All new text is written in English first.
- Translations are produced for all supported languages before a text change ships.
- Machine translation (via Claude or similar) is acceptable for initial drafts but must be reviewed for legal and compliance text.
- Privacy policy and cookie consent text must be reviewed by a native speaker or legal professional for each jurisdiction.

## Compliance Text Rules
- US EEOC disclosure text: English only (federal form language is standardized)
- Canadian Employment Equity: English and French (both official languages)
- UK Equality Act: English only
- EU GDPR disclosures: localized to the candidate's selected language
- Australian Equal Opportunity: English only
- New Zealand disclosures: English only (with te reo Maori terms for iwi/ethnicity retained as-is)

## Development Workflow
1. Developer writes or modifies UI text in English
2. English string is added to /locales/en.json with a descriptive key
3. All other locale files are updated with translations for the same key
4. PR cannot merge if any locale file is missing the new key
5. CI/CD validates that all locale files have identical key sets
