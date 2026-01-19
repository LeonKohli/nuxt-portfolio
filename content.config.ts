import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod/v4'

export default defineContentConfig({
  collections: {
    // Projects collection - markdown files with body content
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        sort: z.number(),
        status: z.string().optional(),
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
        downloads: z.string().optional()
      })
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

    // Other content pages (about, etc.)
    content: defineCollection({
      type: 'page',
      source: {
        include: '*.md',
        exclude: ['tech-stack.md', 'projects/**']
      }
    })
  }
})
