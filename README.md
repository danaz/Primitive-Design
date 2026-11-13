# Primitive Design

Website for Primitive Design, Tel Aviv. Hosted on Netlify, deployed automatically from the `main` branch.

## Structure

- `site/`: the live website, published as-is by Netlify
  - `index.html`: the whole site (originally exported from Claude Design)
  - `support.js`: runtime the page needs (generated, do not edit)
  - `assets/`: images and PDFs used by the site
  - `_redirects`: redirects from the old site's URLs
- `docs/`: product data checklists
- `missing-materials.md`: what product materials are still missing
- `CLAUDE.md`: working rules for Claude Code

Raw materials (uploads, scraps, old design versions) are kept outside the repo in
`~/Downloads/Primitive Design - Archive`.

## Workflow

1. Work on a branch, never directly on `main`.
2. Netlify builds a preview link for each pull request; check it.
3. Merge to `main` → the live site updates.
