# claytonhalim.com

This is the Astro migration of Clayton Halim's personal site. It preserves the
published Jekyll post URLs, asset URLs, navigation, and visual selectors.

## Requirements and commands

Use Node.js 22 and npm 10 (see `.nvmrc` and `package.json`). From this
directory:

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Blog entries live in `src/content/blog`. Their `legacyPath` front matter is the
source of truth for generated post URLs; tags and tag pages are generated at
build time. The `/gallery` link remains pointed at the independently hosted
`clayton-halim/gallery` site and its source is intentionally out of scope.

Analytics is intentionally disabled. The legacy Universal Analytics property
is retired and no GA4 measurement ID was supplied. If analytics is approved in
the future, add a reviewed GA4-only component gated by a production
`PUBLIC_GA_MEASUREMENT_ID` value.

GitHub Pages deploys the contents of `dist/` using the workflow in
`.github/workflows/deploy.yml`. The custom domain is retained through
`public/CNAME`.
