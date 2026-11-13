// Fields in the "layout" group control how a piece sits in the site's grid.
// Only the designer can change them (and delete items / create brands); everyone else,
// including the client, sees them read-only. Locked by Sanity user ID rather than role,
// because the free plan only has Administrator and Viewer roles.
export const DESIGNER_IDS = ['gfNJxcLO1'];
export const isDesigner = (currentUser) => DESIGNER_IDS.includes(currentUser?.id);
export const isAdmin = ({ currentUser }) => isDesigner(currentUser);
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
