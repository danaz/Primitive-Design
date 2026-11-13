// Downloads published products and brands from Sanity and writes them to
// src/content/.generated/*.json, in the shape the site logic expects.
// Runs before every build and dev start. If Sanity can't be reached, the build fails
// and Netlify keeps the current live version.
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PROJECT = 'g86o1nq3';
const DATASET = 'production';
const API = `https://${PROJECT}.api.sanity.io/v2025-02-19/data/query/${DATASET}`;
const SITE_SOURCE = 'primitive-site'; // files imported from the original site keep their site path

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/content/.generated');

const IMG = `{ "asset": asset->{ url, sha1hash, "src": source.name, "path": source.id }, hotspot, sitePath }`;

const QUERY = `{
  "brands": *[_type == "brand"] | order(orderRank) {
    "id": slug.current, name, country, tagline, blurb, short, long,
    "image": image${IMG}, "secondaryImage": secondaryImage${IMG}, secondaryAr, fit
  },
  "products": *[_type == "product"] | order(orderRank) {
    "id": slug.current, "brand": brand->slug.current, name, designer, year, category, price,
    availability, desc, dims, materials, colors, use, stackable,
    "pdf": coalesce(pdfFile.asset->url, pdf), video,
    "images": images[]${IMG}, "gallery": gallery[]${IMG}, "mood": mood${IMG},
    ar, variants, fit, shape, moodPos, moodAr, moodOld, "ixPicks": ixPicks[]${IMG}, ixPhoto, ottoman, lift
  }
}`;

const sha1 = (rel) => {
  const file = path.join(root, 'public', rel);
  return fs.existsSync(file) ? crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex') : null;
};

/** Site path for files imported from the original site; Sanity CDN URL for new uploads. */
function src(image) {
  const a = image?.asset;
  if (!a) return undefined;
  if (a.src === SITE_SOURCE && a.path) {
    // keep the photo's own original file name if it is still the same picture
    if (image.sitePath && image.sitePath !== a.path && sha1(image.sitePath) === a.sha1hash) return image.sitePath;
    return a.path;
  }
  return `${a.url}?w=2400&fit=max&auto=format`;
}
const srcs = (list) => (list || []).map(src).filter(Boolean);
const pos = (h) => (h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : undefined);

const res = await fetch(`${API}?query=${encodeURIComponent(QUERY)}&perspective=published`);
if (!res.ok) {
  console.error(`fetch-content: Sanity returned ${res.status}`);
  process.exit(1);
}
const { result } = await res.json();
if (!result?.products?.length || !result?.brands?.length) {
  console.error('fetch-content: no products or brands returned; refusing to build an empty site');
  process.exit(1);
}

const brands = result.brands.map((b) => ({ ...b, image: src(b.image) ?? null, secondaryImage: src(b.secondaryImage) }));
const products = result.products.map((p) => ({
  ...p,
  images: srcs(p.images),
  gallery: srcs(p.gallery),
  ixPicks: srcs(p.ixPicks),
  mood: src(p.mood),
  // a focal point set in Sanity positions the mood photo, unless the designer fixed one
  moodPos: p.moodPos ?? (p.mood?.asset?.src !== SITE_SOURCE ? pos(p.mood?.hotspot) : undefined),
}));

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'brands.json'), JSON.stringify(brands, null, 2));
fs.writeFileSync(path.join(outDir, 'products.json'), JSON.stringify(products, null, 2));
console.log(`fetch-content: ${products.length} products, ${brands.length} brands`);
