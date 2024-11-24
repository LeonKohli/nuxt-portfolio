import type { ParsedContent } from "@nuxt/content"

export interface Project extends ParsedContent {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  link?: string
  repo?: string
}

export interface Skill {
  icon: string
  title: string
  items: string[]
} 