# Credentia One -- Project Status

## Overview
Credentia One is an open document standard and transport protocol for professional data. It replaces repetitive job application forms with a single portable .credentia.json file.

Website: https://credentia.one
Repository: https://github.com/madriz/credentia-one
License: Apache 2.0

## Business Model
Free for candidates. Employers pay per job posting. Each posting includes unlimited verifications for 90 days. Pilot pricing negotiated directly. No per-candidate or per-verification fees.

## Architecture
- Static Next.js 14 site deployed on GitHub Pages
- Custom domain: credentia.one (DNS via GoDaddy, A records to GitHub Pages IPs)
- HTTPS enforced via GitHub Pages Let's Encrypt cert
- Token registry: Supabase (project: credentia-one, org: rodrigo@madriz.ca account)
  - URL: https://mbbpynoshxkvhqonyczd.supabase.co
  - Tables:
    - public.tokens (id, token_hash, country_code, created_at)
    - public.employers (id, company_name, contact_name, contact_email, api_key, plan, job_postings_limit, job_postings_used, active, created_at)
    - public.job_postings (id, employer_id, title, location, active, created_at, expires_at)
    - public.verification_log (id, employer_id, token_hash, verified, requested_at)
  - RLS: anonymous insert and select on tokens; employer API key auth on verify_token RPC
- Verification API: PostgreSQL RPC function (verify_token) called via Supabase REST API. Employers authenticate with API keys stored in the employers table. Verifications logged in verification_log table.
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
- / (landing page with dual-audience messaging and pricing)
- /builder (candidate form, 7-step wizard with quick start)
- /verify (token verification with employer API upsell)
- /about (project background)
- /employer (employer sales page with API docs, mockup, pricing, and contact form)
- /privacy (privacy policy incl. verification API data handling)

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
- v4 (commit 2167bca): Download page redesign, Canadian flag, employer page with contact form, privacy updates, roadmap page, project status file.
- v5 (commit 4dd0661): Removed public roadmap. Cleaned up backlog.
- v5.1 (commit 15912e2): Apply with Credentia One mockup on employer page.
- v6 (this commit): Commercial model. Employer verification API. Landing page rewrite with dual-audience messaging. Employer sales page with API docs and mockup. Pricing section. Updated About, Privacy, Verify, and Builder pages.

## Open Items / Backlog
- Build the Receiver portal (madriz/credentia-receiver)
- Self-serve employer onboarding (signup, payment via Stripe, API key generation)
- Employer usage dashboard
- Billing and invoicing system
- Create Supabase verify_token RPC function, employers table, job_postings table, verification_log table
- Explore additional delivery channels (browser extension, mobile, office plugins) based on adoption
- Employer onboarding flow
- Schema v1.1: additional compliance blocks for EU (GDPR), UK, Australia, India
- Resume parser improvements (better heuristics for PDF extraction)
- Internationalization (i18n) for the builder UI
