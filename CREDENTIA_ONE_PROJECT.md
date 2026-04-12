# Credentia One -- Project Status

## Overview
Credentia One is an open document standard and transport protocol for professional data. It replaces repetitive job application forms with a single portable .credentia.json file.

Website: https://credentia.one
Repository: https://github.com/madriz/credentia-one
License: Apache 2.0

## Architecture
- Static Next.js 14 site deployed on GitHub Pages
- Custom domain: credentia.one (DNS via GoDaddy, A records to GitHub Pages IPs)
- HTTPS enforced via GitHub Pages Let's Encrypt cert
- Token registry: Supabase (project: credentia-one, org: rodrigo@madriz.ca account)
  - URL: https://mbbpynoshxkvhqonyczd.supabase.co
  - Table: public.tokens (id, token_hash, country_code, created_at)
  - RLS: anonymous insert and select allowed
- Analytics: GA4 tag G-1N55B2TSSX (loaded only with cookie consent)
- Contact form: Web3Forms (access key: 535b11ae-5871-4940-a7ff-3d9882ff32d1)

## Tech Stack
- Next.js 14, TypeScript, Tailwind CSS
- Static export (output: 'export')
- Supabase JS client (anon key, client-side only)
- pdfjs-dist for PDF resume parsing
- js-sha256 as crypto.subtle fallback
- GitHub Actions for CI/CD (peaceiris/actions-gh-pages@v3)

## Design
- Colors: accent #00ACED, bg #FAF9F6, warm bg #F3F1EE, text #1A1A1A/#444444
- Fonts: Newsreader (headings), system sans (body), JetBrains Mono (code)
- Brand: "Credentia" in dark bold, "One" in blue bold

## Schema
- Version: 1.0.0
- Based on JSON Resume, extended with $credentia metadata block and compliance block
- Output format uses ISO 8601 dates (YYYY-MM), nested name object, boolean booleans, and strips empty values
- Compliance covers: US EEOC (gender, race incl. MENA, veteran, disability), Canadian Employment Equity, work authorization with visa status presets for US and CA
- Schema file: public/credentia-one-schema.json

## Pages
- / (landing page)
- /builder (candidate form, 7-step wizard with quick start)
- /verify (token verification)
- /about (project background)
- /employer (employer info + Web3Forms contact form)
- /privacy (privacy policy)
- /roadmap (Chrome extension, mobile app, Word/Docs plugin plans)

## Key Files
- app/ -- Next.js pages and layouts
- components/ -- React components (builder/, landing/, shared/)
- lib/ -- utilities (schema.ts, token.ts, validation.ts, supabase.ts, storage.ts, countries.ts, stateProvinces.ts, skillsList.ts, skillCategories.ts, languagesList.ts, visaStatuses.ts, pdfExtract.ts, markdown.ts)
- public/ -- static assets (CNAME, sitemap.xml, og-image.svg, favicon.svg, canada-flag.svg)
- .github/workflows/deploy.yml -- GitHub Pages deployment

## Repository Secrets (GitHub Actions)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GA4_ID

## Companion Repo
- madriz/credentia-receiver (private) -- Employer portal (not yet built)

## Version History
- v1 (commit acae949): Initial build. Landing page, 7-step builder, verify page, GA4, Supabase tokens.
- v2 (commit c244aff): Resume upload, validation, autocomplete skills/languages, about page, cookie consent, dual JSON+MD export, crypto.subtle fallback.
- v3 (commit 6e0f4ad): Nav restructure, mobile hamburger, privacy policy, employer placeholder, skills UX overhaul, compliance fixes, visa presets, notice period dropdown, schema conformance fixes.
- v4 (this commit): Download page redesign, Canadian flag, employer page with contact form, privacy updates, roadmap page, project status file.

## Open Items / Backlog
- Build the Receiver portal (madriz/credentia-receiver)
- Chrome extension (Manifest V3, ATS field mapping)
- Mobile app (React Native, local storage)
- Word/Google Docs plugin
- Employer onboarding flow
- Schema v1.1: additional compliance blocks for EU (GDPR), UK, Australia, India
- Resume parser improvements (better heuristics for PDF extraction)
- Internationalization (i18n) for the builder UI
