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
2. Deploy a preview (see below) and have the user check it.
3. After approval: merge to `main`, then deploy live.

## Deploying

The folder is linked to the Netlify site `primitiveanddesign` (primitiveanddesign.com) with the Netlify CLI.

- Preview (does not touch the live site): `netlify deploy --dir site`
- Live, only after the user approves the preview: `netlify deploy --dir site --prod`

Previews are protected; open them while signed in to Netlify.
