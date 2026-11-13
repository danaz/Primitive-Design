import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './schemas';

export const projectId = 'g86o1nq3';
export const dataset = 'production';

export default defineConfig({
  name: 'default',
  title: 'Primitive Design',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({ type: 'product', title: 'Products', S, context }),
            orderableDocumentListDeskItem({ type: 'brand', title: 'Brands', S, context }),
          ]),
    }),
    // Query playground: only for administrators (the designer), not for editors.
    visionTool(),
  ],
  tools: (prev, { currentUser }) =>
    currentUser?.roles?.some((r) => r.name === 'administrator') ? prev : prev.filter((t) => t.name !== 'vision'),
  schema: { types: schemaTypes },
  document: {
    // Editors can't create brands or delete anything; the designer (administrator) can.
    actions: (prev, { schemaType, currentUser }) => {
      const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator');
      if (isAdmin) return prev;
      return prev.filter((a) => a.action !== 'delete' && a.action !== 'duplicate');
    },
    newDocumentOptions: (prev, { currentUser }) => {
      const isAdmin = currentUser?.roles?.some((r) => r.name === 'administrator');
      return isAdmin ? prev : prev.filter((t) => t.templateId !== 'brand');
    },
  },
});
