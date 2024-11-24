<template>
  <section 
    class="px-4 py-24 sm:px-6 lg:px-8" 
    id="projects"
    ref="sectionRef"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem]">
      <!-- Section Header -->
      <div class="flex w-full mb-16 space-between">
        <div class="w-full">
          <h2 class="w-full font-bold tracking-tight text-center md:text-left">
            <span class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-['Exo_2']">
              <span class="text-zinc-100">My</span>
              <span class="relative inline-block ml-3 group">
                <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                  Projects
                </span>
              </span>
            </span>
          </h2>
          <p class="max-w-2xl mt-8 text-base sm:text-lg text-white/70 md:text-xl">
            A collection of projects I've worked on, ranging from full-stack applications 
            to security research and open-source contributions.
          </p>
        </div>
      </div>

      <!-- Filter System -->
      <div class="flex flex-wrap gap-2 mb-8">
        <Badge 
          v-for="tech in allTechnologies"
          :key="tech"
          variant="outline"
          class="transition-colors cursor-pointer"
          :class="[
            selectedTech === tech 
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
              : 'border-white/10 hover:border-emerald-500/50'
          ]"
          @click="selectedTech = selectedTech === tech ? null : tech"
        >
          {{ tech }}
        </Badge>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="project in filteredProjects" 
          :key="project.id"
          :ref="(el) => handleRef(el, project)"
          class="relative overflow-hidden transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-500/10 border-white/5"
          :class="{ 'opacity-100 translate-y-0': elementVisibility[project.id], 'opacity-0 translate-y-4': !elementVisibility[project.id] }"
        >
          <CardHeader class="border-b border-white/5">
            <CardTitle class="flex items-start justify-between">
              <span>{{ project.title }}</span>
              <Icon 
                v-if="project.link"
                name="lucide:external-link" 
                class="w-4 h-4 transition-opacity opacity-0 group-hover:opacity-100" 
              />
            </CardTitle>
            <CardDescription class="text-emerald-400">
              {{ project.subtitle }}
            </CardDescription>
          </CardHeader>
          
          <CardContent class="space-y-4">
            <p class="text-white/70">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <Badge 
                v-for="tech in project.tech" 
                :key="tech"
                variant="outline"
                class="border-emerald-500/20 text-emerald-400"
              >
                {{ tech }}
              </Badge>
            </div>
          </CardContent>

          <div 
            class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-emerald-500/10 to-transparent group-hover:opacity-100"
          />
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '@/types/portfolio'

const { projects } = usePortfolioData()
const selectedProject = ref<Project | null>(null)
const selectedTech = ref<string | null>(null)
const elementVisibility = reactive<Record<string, boolean>>({})
const projectRefs: Record<string, HTMLElement> = reactive({})
const titleRef = ref<HTMLElement | null>(null)

// Setup title intersection observer
onMounted(() => {
  if (titleRef.value) {
    const { stop } = useIntersectionObserver(
      titleRef,
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          elementVisibility['title'] = true
          stop()
        }
      },
      { threshold: 0.2 }
    )
  }
})

// Helper function to get HTMLElement from ref
const getHTMLElement = (el: Element | ComponentPublicInstance | null): HTMLElement | null => {
  if (!el) return null
  if (el instanceof HTMLElement) return el
  if ('$el' in el) return el.$el as HTMLElement
  return null
}

// Filter projects
const filteredProjects = computed(() => {
  const tech = selectedTech.value
  if (!tech) return projects.value
  return projects.value.filter(p => p.tech.includes(tech))
})

// Get unique technologies
const allTechnologies = computed(() => {
  const techs = new Set<string>()
  projects.value.forEach(p => p.tech.forEach(t => techs.add(t)))
  return Array.from(techs)
})

// Setup intersection observers
watch(() => Object.entries(projectRefs), (entries) => {
  entries.forEach(([id, element]) => {
    if (!element) return

    const { stop } = useIntersectionObserver(
      element,
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          elementVisibility[id] = true
          stop()
        }
      },
      { threshold: 0.1 }
    )
  })
}, { immediate: true })

// Template ref handler
const handleRef = (el: Element | ComponentPublicInstance | null, project: Project) => {
  const htmlElement = getHTMLElement(el)
  if (htmlElement) {
    projectRefs[project.id] = htmlElement
  }
}

// Keyboard navigation
const handleKeyNav = (e: KeyboardEvent): void => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    const currentFocus = document.activeElement
    const projectElements = document.querySelectorAll('.card')
    const currentIndex = Array.from(projectElements).indexOf(currentFocus as Element)
    
    if (currentIndex === -1) return

    let newIndex: number
    if (e.key === 'ArrowRight') {
      newIndex = (currentIndex + 1) % projectElements.length
    } else {
      newIndex = (currentIndex - 1 + projectElements.length) % projectElements.length
    }
    
    const nextElement = projectElements[newIndex] as HTMLElement
    if (nextElement) {
      nextElement.focus()
    }
  }
}

// Setup keyboard navigation
onMounted(() => {
  window.addEventListener('keydown', handleKeyNav)
  onUnmounted(() => window.removeEventListener('keydown', handleKeyNav))
})

defineEmits<{
  (e: 'select', project: Project): void
}>()
</script>

<style scoped>
.opacity-100 {
  transition: all 0.3s ease-out;
}

.opacity-0 {
  transition: all 0.3s ease-out;
}
</style> 