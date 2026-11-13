// Products are edited in src/content/products/*.json (one file per product, via Pages CMS).
import { loadOrdered } from './load.js';
import { cleanProduct } from './clean.js';

export const PRODUCTS = loadOrdered(import.meta.glob('../content/products/*.json', { eager: true })).map(cleanProduct);

/* Group shots never act as single-piece covers in the grid. */
export const GROUP_SHOTS = ['assets/gaga-spot-trim.png','assets/gaga-spot.avif','assets/koozo-jerry.jpg','assets/koozo-footstool-pad.png','assets/koozo-footstool.jpg','assets/gaga-zigi-dining-pair-trim.png'];
