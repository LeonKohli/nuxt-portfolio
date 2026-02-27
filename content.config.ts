import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Projects collection - markdown files with body content
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        sort: z.number(),
        status: z.enum(['active', 'in-progress', 'completed', 'archived']).optional(),
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        problem: z.string().optional(),
        solution: z.string().optional(),
        tech: z.array(z.object({
          name: z.string(),
          icon: z.string()
        })),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        link: z.string().url().optional(),
        repo: z.string().url().optional(),
        image: z.string(),
        featured: z.boolean().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        complexity: z.number().optional(),
        downloads: z.string().optional(),
        // Extra fields used by specific projects — prevents Zod from silently stripping them
        browsers: z.array(z.string()).optional(),
        features: z.array(z.string()).optional(),
      }),
      indexes: [
        { columns: ['slug'], unique: true },
        { columns: ['sort'] }
      ]
    }),

    // Tech stack collection - single data file
    techStack: defineCollection({
      type: 'data',
      source: 'tech-stack.md',
      schema: z.object({
        technologies: z.array(z.object({
          name: z.string(),
          icon: z.string(),
          category: z.string(),
          color: z.string(),
          url: z.string().url()
        }))
      })
    }),
  }
})
