# Primitive Design

Website for Primitive Design, Tel Aviv: https://primitiveanddesign.com
A React app built with Vite and hosted on Netlify.

## Structure

```
index.html            page shell: <head> meta, fonts, Netlify inquiry form
public/
  assets/             images, videos, PDFs, fonts (served as /assets/...)
  _redirects          redirects from the old site's URLs
src/
  main.jsx            entry point
  config.js           site settings (columns, prices on/off, etc.)
  content/
    products.json     products: names, prices, images, specs (edited by the client)
    brands.json       brands: names, countries, texts, images (edited by the client)
  data/
    products.js       loads products.json (+ group-shot list)
    brands.js         loads brands.json
    clean.js          normalises CMS output for the site logic
    catalog.js        categories and sort options
    mood.js           mood images on the home grid
    intro.js          opening-animation layout
  logic/SiteLogic.js  behaviour: navigation, panels, filters, search, intro
  views/              one file per part of the page (header, home, panels...)
  styles/site.css     all site styles
  lib/                small helpers (Logic base class, React host, css())
```

Typical edits:
- Products and brands: `src/content/*.json`. The client edits these through
  Pages CMS (https://app.pagescms.org, config in `.pages.yml`); see
  `docs/client-editing-guide.md`. Uploaded images land in `public/assets/`.
- Change layout or copy of a section: the matching file in `src/views/`.

Raw materials (uploads, scraps, old design versions) are kept outside the repo in
`~/Downloads/Primitive Design - Archive`.

## Commands

- `npm install`: install dependencies (once)
- `npm run dev`: local dev server
- `npm run build`: build the site into `dist/`

## Workflow

1. Work on a branch, never directly on `main`.
2. Build and deploy a preview, and have it checked.
3. After approval: merge to `main`, then deploy live.

## Client editing (Pages CMS)

The client saves in Pages CMS → a commit on `main` → Netlify builds and publishes
automatically (Netlify is linked to the GitHub repo). Pull before working locally:
`git pull`. When adding a brand, also add it to the brand list in `.pages.yml`.

## Deploying

Netlify builds and publishes automatically on every push to `main` (GitHub webhook
→ Netlify build hook; Netlify reads the repo with a read-only deploy key).

- Preview without touching the live site: `npm run build && netlify deploy --dir dist`
- So: work on a branch, preview, and merge to `main` only after approval.

Previews are protected; open them while signed in to Netlify.
