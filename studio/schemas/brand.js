import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { designerOnly, groups, photoField } from './shared';

export default {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  groups,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'brand', newItemPosition: 'after' }),
    { name: 'name', title: 'Name', type: 'string', group: 'content', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Brand ID',
      type: 'slug',
      group: 'content',
      options: { source: 'name' },
      readOnly: designerOnly,
      validation: (r) => r.required(),
    },
    { name: 'country', title: 'Country', type: 'string', group: 'content' },
    { name: 'tagline', title: 'Tagline', description: 'A short line.', type: 'string', group: 'content' },
    { name: 'blurb', title: 'Blurb', description: 'Shown on the home grid.', type: 'text', rows: 3, group: 'content' },
    { name: 'short', title: 'Short description', type: 'text', rows: 3, group: 'content' },
    { name: 'long', title: 'Full description', description: 'Brand page.', type: 'text', rows: 8, group: 'content' },
    photoField('image', 'Main image', '', { group: 'media' }),
    photoField('secondaryImage', 'Second image', 'Optional.', { group: 'media' }),
    { name: 'secondaryAr', title: 'Second image ratio', type: 'string', group: 'layout', readOnly: designerOnly },
    { name: 'fit', title: 'Image fit', type: 'string', group: 'layout', readOnly: designerOnly },
  ],
  preview: {
    select: { title: 'name', subtitle: 'country', media: 'image' },
  },
};
