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
  data/
    brands.js         brands: names, countries, texts, images
    products.js       products: names, designers, prices, images, specs
    catalog.js        categories and sort options
    mood.js           mood images on the home grid
    intro.js          opening-animation layout
  logic/SiteLogic.js  behaviour: navigation, panels, filters, search, intro
  views/              one file per part of the page (header, home, panels...)
  styles/site.css     all site styles
  lib/                small helpers (Logic base class, React host, css())
```

Typical edits:
- Add or change a product: `src/data/products.js` (images go in `public/assets/`).
- Change brand text: `src/data/brands.js`.
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

## Deploying

The folder is linked to the Netlify site `primitiveanddesign` with the Netlify CLI.

- Preview (does not touch the live site): `npm run build && netlify deploy --dir dist`
- Live, only after approval: `npm run build && netlify deploy --dir dist --prod`

Previews are protected; open them while signed in to Netlify.
