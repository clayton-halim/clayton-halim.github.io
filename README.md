# claytonhalim.com

Personal website for Clayton Halim — projects, photography, and blogging.
Built with [Astro](https://astro.build) as a fully static site.

## Requirements

Node.js 22 and npm 10 (see `.nvmrc` and `package.json`).

## Commands

From this directory:

```sh
npm ci          # install dependencies
npm run dev     # local dev server
npm run check   # type-check
npm run build   # production build into dist/
npm run preview # preview the production build
```

## Writing a post

Add a Markdown or MDX file in `src/content/blog/`. Front matter:

```yaml
---
title: "Post title"
date: "2021-05-01 10:00:00 -04:00"   # quoted; keep the offset
tags:
  - website
excerpt: "One-line summary shown on the blog index."
legacyPath: /2021/05/01/post-title.html
---
```

`legacyPath` is the source of truth for the post's URL — it must stay stable
so existing links keep working. Tags generate their pages automatically at
build time; there is nothing else to update.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`, which type-checks,
builds, and deploys `dist/` to GitHub Pages. Pull requests run the type-check
and build only. The custom domain is configured via `public/CNAME`.

The `/gallery` link points at the separately hosted `clayton-halim/gallery`
site and is intentionally not part of this codebase.

Analytics is currently disabled. To enable it later, add a reviewed GA4
component gated by a production `PUBLIC_GA_MEASUREMENT_ID` value — do not
reuse the retired Universal Analytics property.
