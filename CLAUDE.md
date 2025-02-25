# Portfolio Project Guidelines

## Commands
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun generate` - Generate static site
- `bun preview` - Preview production build

## Code Style
- Use Composition API with TypeScript: `<script setup lang="ts">`
- PascalCase for component files (e.g., `MyComponent.vue`)
- camelCase for other files and functions
- Use Nuxt auto-imports (no need to import `ref`, `useState`, etc.)
- Prefer interfaces over types for better extensibility
- Use TypeScript throughout the project
- Handle errors with `createError` function
- Use `useFetch` for data with SSR benefits, `$fetch` for client-side requests

## UI Guidelines
- Use inline Tailwind CSS classes (no @apply directives)
- Use shadcn-vue components with proper props
- Implement responsive design with Tailwind's mobile-first approach
- Use `<NuxtImg>` for images with explicit width/height
- Use `<Icon>` from @nuxt/icon module for icons
- Use semantic HTML with proper heading hierarchy

## Project Structure
- Follow Nuxt 4 app/ directory structure
- Use composables for reusable logic across components
- Keep configuration in nuxt.config.ts