// Brands are edited in Sanity (studio/). scripts/fetch-content.mjs downloads them
// before every build into src/content/.generated/brands.json, already in order.
import brands from '../content/.generated/brands.json';
import { cleanBrand } from './clean.js';

export const BRANDS = Object.fromEntries(brands.map(cleanBrand).map((b) => [b.id, b]));
