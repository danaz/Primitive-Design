// Content in src/content/*.json is edited by the client through Pages CMS.
// These helpers turn it back into the exact shape the site logic expects:
// - image paths: the CMS writes them with a leading slash ("/assets/…"); the site uses "assets/…"
// - empty optional fields (blank text, empty lists, unset numbers) are removed,
//   because the logic treats "missing" and "empty" differently.

const ASSET_PREFIX = /^\/assets\//;

function fixPaths(value) {
  if (typeof value === 'string') return value.replace(ASSET_PREFIX, 'assets/');
  if (Array.isArray(value)) return value.map(fixPaths);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fixPaths(v)]));
  }
  return value;
}

const isEmpty = (v) =>
  v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

/** Drop empty optional keys; required keys keep a safe default. */
function tidy(item, required) {
  const out = {};
  for (const [k, v] of Object.entries(item)) {
    if (k in required) out[k] = isEmpty(v) ? required[k] : v;
    else if (!isEmpty(v)) out[k] = v;
  }
  return out;
}

const PRODUCT_REQUIRED = {
  id: '', brand: '', name: '', designer: '', category: '', images: [], ar: '4 / 5',
  desc: '', use: '', stackable: false, availability: '',
};

export function cleanProduct(raw) {
  const p = tidy(fixPaths(raw), PRODUCT_REQUIRED);
  if (p.price) {
    const price = tidy(p.price, {});
    if (!price.type) delete p.price;
    else p.price = price;
  }
  return p;
}

const BRAND_REQUIRED = { id: '', name: '', country: '', image: null, short: '', long: '' };

export function cleanBrand(raw) {
  return tidy(fixPaths(raw), BRAND_REQUIRED);
}
