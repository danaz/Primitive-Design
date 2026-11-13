// Brands are edited in src/content/brands/*.json (one file per brand, via Pages CMS).
import { loadOrdered } from './load.js';
import { cleanBrand } from './clean.js';

export const BRANDS = Object.fromEntries(
  loadOrdered(import.meta.glob('../content/brands/*.json', { eager: true })).map(cleanBrand).map((b) => [b.id, b])
);
