// One-time import of src/content (products, brands) and their files into Sanity.
// Re-runnable: files already uploaded (matched by their site path) are reused, documents are replaced.
// Usage (from studio/): node migrations/initial-import.mjs
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import { LexoRank } from 'lexorank';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const token = JSON.parse(fs.readFileSync(path.join(os.homedir(), '.config/sanity/config.json'), 'utf8')).authToken;
const client = createClient({ projectId: 'g86o1nq3', dataset: 'production', apiVersion: '2025-02-19', token, useCdn: false });
const SOURCE = 'primitive-site';

const readDir = (kind) =>
  fs.readdirSync(path.join(root, 'src/content', kind))
    .map((f) => JSON.parse(fs.readFileSync(path.join(root, 'src/content', kind, f), 'utf8')))
    .sort((a, b) => a.order - b.order);

const brands = readDir('brands');
const products = readDir('products');

// ---- assets
const existing = new Map(
  (await client.fetch(`*[_type in ["sanity.imageAsset","sanity.fileAsset"] && source.name == $s]{_id, "p": source.id}`, { s: SOURCE }))
    .map((a) => [a.p, a._id])
);
const failures = [];
async function asset(p, kind = 'image') {
  if (!p) return null;
  const rel = p.replace(/^\//, '');
  if (existing.has(rel)) return existing.get(rel);
  const file = path.join(root, 'public', rel);
  if (!fs.existsSync(file)) { failures.push('missing ' + rel); return null; }
  try {
    const doc = await client.assets.upload(kind, fs.createReadStream(file), {
      filename: path.basename(rel),
      source: { name: SOURCE, id: rel },
    });
    existing.set(rel, doc._id);
    return doc._id;
  } catch (e) {
    failures.push(`upload ${rel}: ${e.message}`);
    return null;
  }
}
let k = 0;
const key = () => 'k' + (k++).toString(36).padStart(6, '0');
const img = async (p) => { const id = await asset(p); return id ? { _type: 'image', asset: { _type: 'reference', _ref: id }, sitePath: p.replace(/^\//, '') } : undefined; };
const imgs = async (list) => {
  if (!list || !list.length) return undefined;
  const out = [];
  for (const p of list) { const i = await img(p); if (i) out.push({ ...i, _key: key() }); }
  return out;
};
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== '' && v !== null));

// ---- ranks
let rank = LexoRank.middle();
const nextRank = () => (rank = rank.genNext().genNext()).toString();

const tx = client.transaction();
for (const b of brands) {
  tx.createOrReplace(clean({
    _id: 'brand-' + b.id, _type: 'brand', orderRank: nextRank(),
    name: b.name, slug: { _type: 'slug', current: b.id }, country: b.country, tagline: b.tagline,
    blurb: b.blurb, short: b.short, long: b.long,
    image: await img(b.image), secondaryImage: await img(b.secondaryImage),
    secondaryAr: b.secondaryAr, fit: b.fit,
  }));
}
rank = LexoRank.middle();
let n = 0;
for (const p of products) {
  tx.createOrReplace(clean({
    _id: 'product-' + p.id, _type: 'product', orderRank: nextRank(),
    name: p.name, slug: { _type: 'slug', current: p.id },
    brand: { _type: 'reference', _ref: 'brand-' + p.brand },
    designer: p.designer, year: p.year, category: p.category,
    price: p.price ? clean({ type: p.price.type, amount: p.price.amount, max: p.price.max }) : undefined,
    availability: p.availability, desc: p.desc, dims: p.dims, materials: p.materials, colors: p.colors, use: p.use,
    stackable: p.stackable, pdf: p.pdf, video: p.video,
    images: await imgs(p.images), gallery: await imgs(p.gallery), mood: await img(p.mood),
    ar: p.ar, variants: p.variants, fit: p.fit, shape: p.shape, moodPos: p.moodPos, moodAr: p.moodAr, moodOld: p.moodOld,
    ixPicks: await imgs(p.ixPicks), ixPhoto: p.ixPhoto, ottoman: p.ottoman, lift: p.lift,
  }));
  if (++n % 10 === 0) console.log(`prepared ${n}/${products.length} products, ${existing.size} files uploaded`);
}
await tx.commit();
console.log(`done: ${brands.length} brands, ${products.length} products, ${existing.size} files`);
if (failures.length) { console.log('PROBLEMS:'); failures.forEach((f) => console.log('  ' + f)); process.exitCode = 1; }
