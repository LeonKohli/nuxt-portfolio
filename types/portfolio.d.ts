import type { ParsedContent } from "@nuxt/content"

declare global {
  interface TechStack {
    name: string
    icon: string
  }

  interface Project extends ParsedContent {
    id: string
    title: string
    subtitle: string
    description: string
    problem?: string
    solution?: string
    tech: TechStack[]
    link?: string
    repo?: string
    image: string
    sort: number
  }

  interface Skill {
    icon: string
    title: string
    items: string[]
  }

  interface PaginationState {
    currentPage: number
    itemsPerPage: number
    totalItems: number
  }
}