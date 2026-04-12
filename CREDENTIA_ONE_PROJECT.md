# Credentia One -- Project Status

## Overview
Credentia One is an open document standard and transport protocol for professional data. It replaces repetitive job application forms with a single portable .credentia.json file.

Website: https://credentia.one
Repository: https://github.com/madriz/credentia-one
License: Apache 2.0

## Business Model
- Candidates: free, always. No account required.
- Employers: pay per job posting. Each posting includes unlimited verifications for 90 days.
- Pilot phase: API keys issued manually. Pricing negotiated directly.
- Future: self-serve signup, Stripe integration, usage dashboard.

## Architecture
- Static Next.js 14 site deployed on GitHub Pages
- Custom domain: credentia.one (DNS via GoDaddy, A records to GitHub Pages IPs)
- HTTPS enforced via GitHub Pages Let's Encrypt cert
- Token registry: Supabase (project: credentia-one, org: rodrigo@madriz.ca account)
  - URL: https://mbbpynoshxkvhqonyczd.supabase.co
  - RLS: anonymous insert and select on tokens; employer API key auth on verify_token RPC
- Verification API: PostgreSQL RPC function (verify_token) called via Supabase REST API. Employers authenticate with API keys stored in the employers table. Verifications logged in verification_log table.
- Analytics: GA4 tag G-1N55B2TSSX (loaded only with cookie consent)
- Contact form: Web3Forms (access key: 535b11ae-5871-4940-a7ff-3d9882ff32d1)

## Supabase Database Schema
- **tokens** (id UUID, token_hash TEXT, country_code TEXT, created_at TIMESTAMPTZ)
- **employers** (id UUID, company_name TEXT, contact_name TEXT, contact_email TEXT, api_key TEXT, plan TEXT, job_postings_limit INT, job_postings_used INT, notes TEXT, active BOOL, created_at TIMESTAMPTZ)
- **job_postings** (id UUID, employer_id UUID FK, title TEXT, location TEXT, active BOOL, created_at TIMESTAMPTZ, expires_at TIMESTAMPTZ)
- **verification_log** (id UUID, employer_id UUID FK, token_hash TEXT, verified BOOL, requested_at TIMESTAMPTZ)
- **RPC function:** verify_token(p_api_key TEXT, p_token_hash TEXT) returns JSON

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

## Credentials and Keys
- Supabase Project URL: https://mbbpynoshxkvhqonyczd.supabase.co
- Supabase Anon Key: stored in GitHub repo secrets as NEXT_PUBLIC_SUPABASE_ANON_KEY
- Supabase Service Role Key: stored securely, used only in server-side contexts
- GA4 Tag: G-1N55B2TSSX
- Web3Forms Access Key: 535b11ae-5871-4940-a7ff-3d9882ff32d1
- Test Employer API Key: 7bb050efbbe1bdc0c4bf3434fa5a83f8af0d9e464342b2b162d5e5ee450475e4 (Test Corp)
- Domain: credentia.one (registered at GoDaddy, DNS pointing to GitHub Pages)
- GitHub Pages: HTTPS enforced, Let's Encrypt cert

## Repository Secrets (GitHub Actions)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_GA4_ID

## Companion Repo
- madriz/credentia-receiver (private) -- Employer portal (not yet built)

## Content and Marketing
- Article drafted: "Stop Writing Sonnets for Calculators" (for Medium, Substack, LinkedIn)
- Key sources: Harvard Business School "Hidden Workers" 2021, EDLIGO 2025, Enhancv/HR.com 2025
- Tagline: "Standardizing how the world moves professional data."
- Secondary tagline: "Free for candidates. Verified by employers."

## Version History
- v1 (commit acae949): Initial build. Landing page, 7-step builder, verify page, GA4, Supabase tokens.
- v2 (commit c244aff): Resume upload, validation, autocomplete skills/languages, about page, cookie consent, dual JSON+MD export, crypto.subtle fallback.
- v3 (commit 6e0f4ad): Nav restructure, mobile hamburger, privacy policy, employer placeholder, skills UX overhaul, compliance fixes, visa presets, notice period dropdown, schema conformance fixes.
- v4 (commit 2167bca): Download page redesign, Canadian flag, employer page with contact form, privacy updates, roadmap page, project status file.
- v5 (commit 4dd0661): Removed public roadmap. Cleaned up backlog.
- v5.1 (commit 15912e2): Apply with Credentia One mockup on employer page.
- v6 (commit 88a538c): Commercial model. Employer verification API (verify_token RPC function). Landing page rewrite with dual-audience messaging and sourced statistics. Employer sales page with API documentation, mockup, and contact form. Pricing section (free for candidates, pay per job posting). Updated About, Privacy, Verify, and Builder pages.

## Open Items / Backlog
- Build the Receiver portal (madriz/credentia-receiver)
- Create Supabase verify_token RPC function, employers table, job_postings table, verification_log table
- Self-serve employer onboarding (signup, payment via Stripe, API key generation)
- Employer usage dashboard
- Billing and invoicing system
- Explore additional delivery channels (browser extension, mobile, office plugins) based on adoption
- Schema v1.1: additional compliance blocks for EU (GDPR), UK, Australia, India
- Resume parser improvements (better heuristics for PDF extraction)
- Internationalization (i18n) for the builder UI
