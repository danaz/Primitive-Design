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
  content/.generated/ products + brands downloaded from Sanity before each build (not in git)
  data/
    products.js       loads the generated products (+ group-shot list)
    brands.js         loads the generated brands
    clean.js          normalises content for the site logic
scripts/
  fetch-content.mjs   downloads published content from Sanity (runs before build/dev)
  check-assets.mjs    fails the build if a referenced file is missing
studio/               Sanity Studio (the client's editor): https://primitive-design.sanity.studio
    catalog.js        categories and sort options
    mood.js           mood images on the home grid
    intro.js          opening-animation layout
  logic/SiteLogic.js  behaviour: navigation, panels, filters, search, intro
  views/              one file per part of the page (header, home, panels...)
  styles/site.css     all site styles
  lib/                small helpers (Logic base class, React host, css())
```

Typical edits:
- Products and brands: in Sanity Studio (https://primitive-design.sanity.studio).
  Photos imported from the original site keep their `public/assets/` paths; new uploads
  are served from the Sanity CDN. See `docs/client-editing-guide.md`.
- Studio forms: `studio/schemas/`. After changing them: `cd studio && npx sanity deploy`.

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

## Client editing (Sanity)

Sanity project `g86o1nq3`, dataset `production` (public read). The client is invited as
Editor: layout fields are read-only, and they can't delete items or create brands.
Publishing in Sanity triggers a Netlify build (Sanity webhook → Netlify build hook).

## Deploying

Netlify builds and publishes automatically on every push to `main` (GitHub webhook
→ Netlify build hook; Netlify reads the repo with a read-only deploy key).

- Preview without touching the live site: `npm run build && netlify deploy --dir dist`
- So: work on a branch, preview, and merge to `main` only after approval.

Previews are protected; open them while signed in to Netlify.

## Saved decisions

- **Client can't delete products** (designer-only, by user ID in `studio/sanity.config.js`).
  If the client asks to remove products themselves: add a "Show on site" toggle instead of
  opening deletion. Hidden products leave the listings, but products the home grid/intro
  depend on stay, so the home grid never changes. Permanent deletion stays with the designer.
