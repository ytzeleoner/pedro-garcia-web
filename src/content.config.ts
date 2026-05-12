import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = z.object({
  tags: z.array(z.string()).default([]),
  created: z.coerce.date(),
  updated: z.coerce.date().optional(),
  source: z.string().optional(),
});

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki/proyectos' }),
  schema: baseSchema.extend({
    status: z.enum(['activo', 'completado']).optional(),
    periodo: z.string().optional(),
    cliente: z.string().optional(),
  }),
});

const conceptos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki/conceptos' }),
  schema: baseSchema,
});

const sobreMi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki/sobre-mi' }),
  schema: baseSchema.extend({
    lede: z.string().optional(),
  }),
});

const publicaciones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki/publicaciones' }),
  schema: baseSchema.extend({
    estado: z.enum(['publicado', 'borrador', 'idea']).default('idea'),
    titulo: z.string().optional(),
    extracto: z.string().optional(),
    url: z.string().optional(),
  }),
});

export const collections = { proyectos, conceptos, sobreMi, publicaciones };
