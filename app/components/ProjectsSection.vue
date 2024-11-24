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
            <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-['Exo_2']">
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
        <button 
          v-for="tech in allTechnologies"
          :key="tech"
          class="px-3 py-1.5 text-sm transition-colors border rounded-md border-white/10 hover:border-emerald-500/50"
          :class="[
            selectedTech === tech 
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
              : 'text-white/70 hover:text-emerald-400'
          ]"
          @click="selectedTech = selectedTech === tech ? null : tech"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in filteredProjects" 
          :key="project.id"
          :ref="(el: Element | ComponentPublicInstance | null) => handleRef(el, project)"
          :project="project"
          :is-visible="elementVisibility[project.id] ?? false"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '@/types/portfolio'

// Fetch projects using Nuxt Content with proper typing
const { data: projects } = await useAsyncData<Project[]>('projects', () => 
  queryContent<Project>('projects')
    .sort({ id: 1 })
    .find()
)

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
  if (!tech || !projects.value) return projects.value
  return projects.value.filter(p => p.tech.includes(tech))
})

// Get unique technologies
const allTechnologies = computed(() => {
  if (!projects.value) return []
  const techs = new Set<string>()
  projects.value.forEach(p => p.tech.forEach((t: string) => techs.add(t)))
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