# Credentia One

Credentia One is an open document standard that replaces repetitive job applications with a single portable file. This repository contains the public-facing website at [credentia.one](https://credentia.one), including the candidate file builder and the token verification page.

## What is in here

- Marketing landing page that explains the standard.
- Multi-step builder that produces a `.credentia.json` file in the browser.
- Token verification page that checks files against the public registry.
- The Credentia One JSON schema as TypeScript types.

The builder runs entirely in the browser. Personal data is never sent to any server. When a candidate clicks Generate, only a SHA-256 hash of the document is registered, alongside a country code, so that employers can later verify authenticity.

## Tech stack

- Next.js 14 (App Router)
- TypeScript with strict mode
- Tailwind CSS
- Supabase JS client (used directly from the browser with the public anon key)
- Static export to GitHub Pages with custom domain

## Local development

```
npm install
npm run dev
```

Open `http://localhost:3000` in a browser. Copy `.env.example` to `.env.local` and provide your own Supabase project values.

## Production build

```
npm run build
```

The static export is written to the `out/` directory.

## Deployment

Deployment is automated. Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Installs dependencies with `npm ci`.
2. Runs `npm run build` to produce the static export in `out/`.
3. Adds `out/CNAME` containing `credentia.one` and an empty `out/.nojekyll`.
4. Publishes `out/` to the `gh-pages` branch using `peaceiris/actions-gh-pages@v3`.

The custom domain `credentia.one` is configured in the GitHub Pages settings for this repository.

The required GitHub Actions secrets are:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GA4_ID`

## License

Apache 2.0. See [LICENSE](./LICENSE).
