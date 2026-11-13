## Content rules
- Keep `missing-materials.md` up to date whenever product materials are added or found missing; read it before any "what's missing" scan.
- Never change the main home grid layout/order.
- Hover thumbs: white bg, model 63% of frame, centered (COD is the reference size).
- Never leave a single word alone on the last line of any paragraph (no orphans). Keep `text-wrap:pretty` on all text; if it still happens, shorten or slightly extend the copy.

## Project rules
- The client edits `main` through Pages CMS: always `git pull` before starting work, and never rewrite `main` history.
- Content is one JSON file per item in `src/content/products/` and `src/content/brands/` (`order` field sets the sequence). Keep field names in sync with `.pages.yml`; add new brands to its brand select list. Client uploads go to `public/assets/uploads/`.
- The site is a Vite + React app; see `README.md` for structure. Product/brand content lives in `src/content/` (one file per item) (edited by the client via Pages CMS, `.pages.yml`; loaded through `src/data/`), page sections in `src/views/`, behaviour in `src/logic/SiteLogic.js`, styles in `src/styles/site.css`.
- Raw materials and old design versions live outside the repo in `~/Downloads/Primitive Design - Archive`; look there for original images, PDFs and uploads. Copy only what the site uses into `public/assets/`.
- Keep `cssMinify: false` in `vite.config.js`: the minifier drops unprefixed `backdrop-filter` and the blur disappears.
- `npm run build` first runs `scripts/check-assets.mjs`, which fails on any missing referenced file (protects the live site). Before any deploy, run `npm run build` and check the changed pages in the browser at desktop and mobile widths.
- Work on a branch and open a pull request; never push straight to `main`. Verify visual changes in the browser (desktop and mobile) before asking to merge.
- Pushing to `main` deploys the live site automatically. Work on a branch, preview with `~/.local/bin/netlify deploy --dir dist`, and merge to `main` only after the user approves. GitHub CLI is at `~/.local/bin/gh`.
- The user is not technical: explain steps in plain Hebrew, one step at a time.
