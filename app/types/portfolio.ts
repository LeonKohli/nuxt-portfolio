export interface Project {
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