import type { ParsedContent } from "@nuxt/content"

declare global {
  interface Project extends ParsedContent {
    id: string
    title: string
    subtitle: string
    description: string
    tech: string[]
    link?: string
    repo?: string
  }

  interface Skill {
    icon: string
    title: string
    items: string[]
  }
}