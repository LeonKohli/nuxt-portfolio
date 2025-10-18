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

## Reusable Patterns and Animations

### Composables Pattern
All reusable logic lives in composables (auto-imported by Nuxt):

```vue
<script setup lang="ts">
// Auto-imported - no import statement needed
const { fade, slideUp, withDelay } = useAnimationPresets()
const { spotlightStyle, handleMouseMove } = useSpotlightEffect()
</script>

<template>
  <div v-motion="fade">Fades in</div>
  <div v-motion="withDelay(slideUp, 0.15)">Delayed slide</div>
</template>
```

**Key principles:**
- Configuration in `app.config.ts` (reactive, type-safe)
- Composables in `app/composables/` (auto-imported)
- One composable = one responsibility
- Return helper functions, not hardcoded variants
- Full TypeScript, zero duplication

**Examples:** `useAnimationPresets()`, `useSpotlightEffect()`, `useWindowSize()`

## Development Workflow & Best Practices

### Research First, Code Second
**ALWAYS use official documentation before implementing:**

1. **Context7 MCP** - Get official library docs
   - Use for ANY library/framework question (Nuxt, Vue, Tailwind, etc.)
   - Returns up-to-date documentation with code examples
   - Example: "Get me the latest @vueuse/motion documentation"

2. **Exa MCP (exa-code)** - Search for real-world code examples
   - Use when you need implementation patterns
   - Shows how other developers solve the same problem
   - Example: "How do people implement staggered animations with @vueuse/motion"

### The 3-Try Rule
If you're stuck after **3 attempts**, you MUST:
1. Use `context7` to get official documentation
2. Use `exa-code` to find real implementation examples
3. Ask the user for clarification

**Don't keep trying the same approach.** Stop being stupid and use the tools.

### Code Quality Principles
- ✅ **Clean & Maintainable** - Code should be obvious, not clever
- ✅ **Follow Official Patterns** - Use framework conventions (Nuxt 4, Vue 3)
- ✅ **DRY Principle** - Zero code duplication
- ✅ **Single Responsibility** - One function/composable = one purpose
- ❌ **No Defensive Coding** - Trust the framework, don't guard against impossible states
- ❌ **No Overcomplication** - Simplest solution wins
- ❌ **No Premature Optimization** - Make it work, then make it fast

### Iterate: Code → Docs → Validate
1. **Write code** following best practices
2. **Update docs** (inline comments, CLAUDE.md updates)
3. **Validate** with typecheck, run tests, verify in browser
4. **Refactor** if duplication or complexity emerges

**Example workflow:**
- Research with context7/exa → Implement → Typecheck → Document → Done