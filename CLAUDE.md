## Content rules
- Keep `missing-materials.md` up to date whenever product materials are added or found missing; read it before any "what's missing" scan.
- Never change the main home grid layout/order.
- Hover thumbs: white bg, model 63% of frame, centered (COD is the reference size).
- Never leave a single word alone on the last line of any paragraph (no orphans). Keep `text-wrap:pretty` on all text; if it still happens, shorten or slightly extend the copy.

## Project rules
- The live site is `site/` (Netlify publishes it from `main`). See `README.md` for structure.
- Raw materials and old design versions live outside the repo in `~/Downloads/Primitive Design - Archive`; look there for original images, PDFs and uploads. Copy only what the site uses into `site/assets/`.
- Work on a branch and open a pull request; never push straight to `main`. Verify visual changes in the browser (desktop and mobile) before asking to merge.
- Deploy with the Netlify CLI (`~/.local/bin/netlify`, see README): preview first, `--prod` only after the user approves. GitHub CLI is at `~/.local/bin/gh`.
- The user is not technical: explain steps in plain Hebrew, one step at a time.
