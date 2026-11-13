import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { designerOnly, groups, photoField, photoList } from './shared';

const CATEGORIES = ['Sofas', 'Armchairs', 'Chairs', 'Bar stools', 'Tables', 'Storage & shelving', 'Beds', 'Accessories'];

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'product', newItemPosition: 'after' }),
    { name: 'name', title: 'Name', type: 'string', group: 'content', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Product ID',
      description: 'Unique, lowercase with dashes. Click "Generate" after typing the name. Do not change it later.',
      type: 'slug',
      group: 'content',
      options: { source: 'name', maxLength: 80 },
      validation: (r) => r.required(),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{ type: 'brand' }],
      group: 'content',
      options: { disableNew: true },
      validation: (r) => r.required(),
    },
    { name: 'designer', title: 'Designer', description: 'Leave empty to show the brand name.', type: 'string', group: 'content' },
    { name: 'year', title: 'Design year', type: 'string', group: 'content' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: { list: CATEGORIES },
      validation: (r) => r.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'object',
      group: 'content',
      options: { columns: 3 },
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              { title: 'On request (no price shown)', value: 'request' },
              { title: 'Fixed price', value: 'fixed' },
              { title: 'Starting from', value: 'from' },
            ],
            layout: 'radio',
          },
        },
        { name: 'amount', title: 'Amount (₪)', type: 'number', hidden: ({ parent }) => !parent?.type || parent.type === 'request' },
        { name: 'max', title: 'Up to (₪, optional)', type: 'number', hidden: ({ parent }) => parent?.type !== 'from' },
      ],
    },
    { name: 'availability', title: 'Availability', description: 'e.g. In stock · Made to order · 4–8 weeks', type: 'string', group: 'content' },
    { name: 'desc', title: 'Description', type: 'text', rows: 5, group: 'content' },
    { name: 'dims', title: 'Dimensions', description: 'e.g. W 42 · D 50 · H 80 cm · Seat H 46', type: 'string', group: 'content' },
    { name: 'materials', title: 'Materials', type: 'string', group: 'content' },
    { name: 'colors', title: 'Colours / finishes', type: 'string', group: 'content' },
    { name: 'use', title: 'Suitability', description: 'e.g. Indoor · Indoor / Outdoor', type: 'string', group: 'content' },
    { name: 'stackable', title: 'Stackable', type: 'boolean', group: 'content', initialValue: false },
    {
      name: 'pdfFile',
      title: 'Catalogue PDF',
      description: 'Upload a PDF, or use the link field below.',
      type: 'file',
      options: { accept: 'application/pdf' },
      group: 'content',
    },
    { name: 'pdf', title: 'Catalogue link', type: 'string', group: 'content' },
    { name: 'video', title: 'Video link', type: 'url', group: 'content' },

    photoList('images', 'Product photos', 'White background, product centred. The first photo is the cover.', {
      group: 'media',
      validation: (r) => r.required().min(1),
    }),
    photoList('gallery', 'Extra gallery photos', 'Optional.', { group: 'media' }),
    photoField('mood', 'Mood / room photo', 'Optional. Click the crop icon to set the focal point.', { group: 'media' }),

    { name: 'ar', title: 'Photo ratio', type: 'string', group: 'layout', readOnly: designerOnly, initialValue: '4 / 5' },
    { name: 'variants', title: 'Has variants', type: 'boolean', group: 'layout', readOnly: designerOnly },
    { name: 'fit', title: 'Image fit', type: 'string', group: 'layout', readOnly: designerOnly },
    { name: 'shape', title: 'Shape', type: 'string', group: 'layout', readOnly: designerOnly },
    { name: 'moodPos', title: 'Mood position', type: 'string', group: 'layout', readOnly: designerOnly },
    { name: 'moodAr', title: 'Mood ratio', type: 'string', group: 'layout', readOnly: designerOnly },
    { name: 'moodOld', title: 'Previous mood (path)', type: 'string', group: 'layout', readOnly: designerOnly },
    photoList('ixPicks', 'Index picks', '', { group: 'layout', readOnly: designerOnly }),
    { name: 'ixPhoto', title: 'Index photo', type: 'boolean', group: 'layout', readOnly: designerOnly },
    { name: 'ottoman', title: 'Ottoman', type: 'boolean', group: 'layout', readOnly: designerOnly },
    { name: 'lift', title: 'Lift', type: 'boolean', group: 'layout', readOnly: designerOnly },
  ],
  preview: {
    select: { title: 'name', brand: 'brand.name', category: 'category', media: 'images.0' },
    prepare: ({ title, brand, category, media }) => ({ title, subtitle: [brand, category].filter(Boolean).join(' · '), media }),
  },
};
