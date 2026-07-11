import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    permalink: z
      .string()
      .transform((value) => {
        const trimmed = value.replace(/^\/+|\/+$/g, '');
        return trimmed ? `/${trimmed}/` : '/';
      }),
    type: z.enum(['post', 'source']).default('post'),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional(),
    source_url: z.string().url().optional(),
    date_fetched: z.union([z.string(), z.coerce.date()]).optional(),
    sources: z.array(z.string()).default([]),
    layout: z.string().optional(),
  }),
});

export const collections = { docs };
