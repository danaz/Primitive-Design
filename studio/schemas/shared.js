// Fields in the "layout" group control how a piece sits in the site's grid.
// Only administrators (the designer) can change them; editors (the client) see them read-only.
export const isAdmin = ({ currentUser }) => currentUser?.roles?.some((r) => r.name === 'administrator');
export const designerOnly = (ctx) => !isAdmin(ctx);

export const groups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'media', title: 'Photos' },
  { name: 'layout', title: 'Layout (designer)' },
];

// Hidden: the original file name on the site, for photos imported from it.
// (Identical files share one Sanity asset, so the asset alone can't tell them apart.)
const sitePath = { name: 'sitePath', type: 'string', hidden: true };

export const photoField = (name, title, description, extra = {}) => ({
  name,
  title,
  description,
  type: 'image',
  options: { hotspot: true },
  fields: [sitePath],
  ...extra,
});

export const photoList = (name, title, description, extra = {}) => ({
  name,
  title,
  description,
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true }, fields: [sitePath] }],
  options: { layout: 'grid' },
  ...extra,
});
