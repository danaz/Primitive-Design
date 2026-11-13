// Loads one-file-per-item content (src/content/<kind>/*.json), sorted by `order`.
// Items without an order (e.g. newly added in the CMS) go last, alphabetically by id.
export function loadOrdered(modules) {
  return Object.values(modules)
    .map((m) => m.default ?? m)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || String(a.id).localeCompare(String(b.id)))
    .map(({ order, ...item }) => item);
}
