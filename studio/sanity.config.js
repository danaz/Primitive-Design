import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './schemas';
import { isDesigner } from './schemas/shared';

export const projectId = 'g86o1nq3';
export const dataset = 'production';

export default defineConfig({
  name: 'default',
  title: 'Primitive Design',
  projectId,
  dataset,
  plugins: [
    structureTool({
      // The order drives the home grid, so only the designer gets drag-to-reorder lists.
      structure: (S, context) => {
        const list = (type, title) =>
          isDesigner(context.currentUser)
            ? orderableDocumentListDeskItem({ type, title, S, context })
            : S.listItem()
                .title(title)
                .schemaType(type)
                .child(S.documentTypeList(type).title(title).defaultOrdering([{ field: 'orderRank', direction: 'asc' }]));
        return S.list().title('Content').items([list('product', 'Products'), list('brand', 'Brands')]);
      },
    }),
    // Query playground: only for the designer.
    visionTool(),
  ],
  tools: (prev, { currentUser }) =>
    isDesigner(currentUser) ? prev : prev.filter((t) => t.name !== 'vision'),
  schema: { types: schemaTypes },
  document: {
    // Only the designer can delete or duplicate items and create brands.
    actions: (prev, { currentUser }) =>
      isDesigner(currentUser) ? prev : prev.filter((a) => a.action !== 'delete' && a.action !== 'duplicate'),
    newDocumentOptions: (prev, { currentUser }) =>
      isDesigner(currentUser) ? prev : prev.filter((t) => t.templateId !== 'brand'),
  },
});
