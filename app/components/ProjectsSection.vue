<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-4 sm:px-6 lg:px-8" 
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
      <div class="relative min-h-[800px]">
        <Transition
          mode="out-in"
          @before-leave="onBeforeLeave"
          @after-leave="onAfterLeave"
          @before-enter="onBeforeEnter"
        >
          <div 
            :key="pagination.currentPage"
            class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <ProjectCard
              v-for="(project, index) in paginatedProjects" 
              :key="project.id"
              :ref="(el: Element | ComponentPublicInstance | null) => handleRef(el, project)"
              :project="project"
              :is-visible="elementVisibility[project.id] ?? false"
              @click="$emit('select', project)"
              class="transition-all duration-300"
              :style="{
                '--index': index,
                'transitionDelay': `${index * 50}ms`
              }"
            />
          </div>
        </Transition>
      </div>

      <!-- Pagination -->
      <div class="sticky flex justify-center px-6 py-4 mx-auto mt-8 space-x-2 rounded-full bottom-8 backdrop-blur-sm bg-black/30 w-fit">
        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.currentPage === 1"
          @click="changePage(pagination.currentPage - 1)"
          class="hover:bg-emerald-500/10 hover:text-emerald-400"
        >
          <Icon name="lucide:chevron-left" class="w-4 h-4" />
        </Button>
        
        <Button
          v-for="page in displayedPages"
          :key="page"
          variant="outline"
          size="sm"
          :class="{ 
            'bg-emerald-500/10 border-emerald-500 text-emerald-400': page === pagination.currentPage,
            'hover:bg-emerald-500/10 hover:text-emerald-400': page !== pagination.currentPage
          }"
          @click="changePage(Number(page))"
        >
          {{ page }}
        </Button>

        <Button
          variant="outline"
          size="sm"
          :disabled="pagination.currentPage === totalPages"
          @click="changePage(pagination.currentPage + 1)"
          class="hover:bg-emerald-500/10 hover:text-emerald-400"
        >
          <Icon name="lucide:chevron-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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

// Pagination state
const pagination = reactive<PaginationState>({
  currentPage: 1,
  itemsPerPage: 6,
  totalItems: 0
})

// Computed properties for pagination
const totalPages = computed(() => 
  Math.ceil((filteredProjects.value?.length || 0) / pagination.itemsPerPage)
)

const paginatedProjects = computed(() => {
  if (!filteredProjects.value) return []
  
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage
  const end = start + pagination.itemsPerPage
  
  return filteredProjects.value.slice(start, end)
})

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
  projects.value.forEach(p => p.tech.forEach(t => techs.add(t)))
  return Array.from(techs)
})

// Computed property for displayed page numbers
const displayedPages = computed(() => {
  const current = pagination.currentPage
  const total = totalPages.value
  const delta = 1 // Number of pages to show on each side of current page

  const range = []
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  if (total > 1) {
    range.unshift(1)
    if (total !== 1) {
      range.push(total)
    }
  }

  return range
})

// Pagination methods
const changePage = (page: number) => {
  if (typeof page !== 'number') return
  pagination.currentPage = page
}

// Watch for filter changes to reset pagination
watch(selectedTech, () => {
  pagination.currentPage = 1
})

// Setup intersection observers
watch(() => Object.entries(projectRefs), (entries) => {
  entries.forEach(([id, element]) => {
    if (!element) return

    const { stop } = useIntersectionObserver(
      element,
      ([entry]) => {
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

// Helper function to get HTMLElement from ref
const getHTMLElement = (el: Element | ComponentPublicInstance | null): HTMLElement | null => {
  if (!el) return null
  if (el instanceof HTMLElement) return el
  if ('$el' in el) return el.$el as HTMLElement
  return null
}

const isLeaving = ref(false)

const onBeforeLeave = (el: Element) => {
  isLeaving.value = true
  const cards = el.querySelectorAll('.transition-all')
  cards.forEach((card, i) => {
    ;(card as HTMLElement).style.opacity = '0'
    ;(card as HTMLElement).style.transform = 'translateX(-30px)'
  })
}

const onAfterLeave = () => {
  isLeaving.value = false
}

const onBeforeEnter = (el: Element) => {
  const cards = el.querySelectorAll('.transition-all')
  cards.forEach((card, i) => {
    ;(card as HTMLElement).style.opacity = '0'
    ;(card as HTMLElement).style.transform = 'translateX(30px)'
    setTimeout(() => {
      ;(card as HTMLElement).style.opacity = '1'
      ;(card as HTMLElement).style.transform = 'translateX(0)'
    }, 50 * i)
  })
}

defineEmits<{
  (e: 'select', project: Project): void
}>()
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Grid layout preservation for different screen sizes */
@media (min-width: 768px) {
  .projects-leave-active {
    width: calc(50% - 1rem);
  }
}

@media (min-width: 1024px) {
  .projects-leave-active {
    width: calc(33.333% - 1.334rem);
  }
}

/* Make pagination buttons more visible on hover */
.button-hover {
  @apply transition-colors duration-200;
}

/* Sticky pagination container */
.sticky {
  position: sticky;
  bottom: 2rem;
  z-index: 10;
}
</style> 