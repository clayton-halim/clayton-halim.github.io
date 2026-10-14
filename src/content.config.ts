import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}(?: [+-]\d{2}:\d{2})?$/),
    tags: z.array(z.string()).min(1),
    excerpt: z.string().optional(),
    legacyPath: z.string().regex(/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+\.html$/),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
