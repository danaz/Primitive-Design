// Products are edited in Sanity (studio/). scripts/fetch-content.mjs downloads them
// before every build into src/content/.generated/products.json, already in order.
import products from '../content/.generated/products.json';
import { cleanProduct } from './clean.js';

export const PRODUCTS = products.map(cleanProduct);

/* Group shots never act as single-piece covers in the grid. */
export const GROUP_SHOTS = ['assets/gaga-spot-trim.png','assets/gaga-spot.avif','assets/koozo-jerry.jpg','assets/koozo-footstool-pad.png','assets/koozo-footstool.jpg','assets/gaga-zigi-dining-pair-trim.png'];
