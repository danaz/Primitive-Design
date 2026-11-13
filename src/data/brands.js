// Brands are edited in src/content/brands.json (via Pages CMS).
import brands from '../content/brands.json';
import { cleanBrand } from './clean.js';

export const BRANDS = Object.fromEntries(brands.map(cleanBrand).map((b) => [b.id, b]));
