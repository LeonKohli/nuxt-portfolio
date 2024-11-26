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
            Some of my most interesting projects.
          </p>
        </div>
      </div>

      <!-- Projects Carousel -->
      <div class="relative w-full">
        <div class="flex w-full overflow-x-scroll overscroll-x-auto py-4 scroll-smooth [scrollbar-width:none] -mx-4 px-4" ref="scrollContainer">
          <!-- Gradient Overlay -->
          <div class="absolute right-0 z-[1000] h-full w-[5%] overflow-hidden bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          
          <!-- Projects Container -->
          <div class="flex flex-row justify-start gap-4 max-w-7xl">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              :style="{
                opacity: elementVisibility[project.id] ? 1 : 0,
                transform: elementVisibility[project.id] ? 'none' : 'translateY(20px)',
                transition: 'all 0.5s ease-out',
              }"
            >
              <a 
                :href="project.link" 
                target="_blank" 
                class="rounded-3xl h-[20rem] w-56 md:h-[32rem] md:w-96 group overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer"
              >
                <!-- Overlay -->
                <div class="absolute inset-x-0 top-0 z-30 h-full transition-all duration-300 pointer-events-none group-hover:bg-black/80 bg-black/65"></div>
                
                <!-- Content -->
                <div class="relative z-40 p-6 md:p-8">
                  <p class="gap-2 text-foreground text-2xl md:text-3xl font-bold max-w-xs text-left [text-wrap:balance] my-1 leading-tight tracking-tight">
                    {{ project.title }}
                  </p>
                  <p class="text-foreground md:text-xl max-w-xs text-left [text-wrap:balance] my-1 tracking-tight leading-tight font-medium">
                    {{ project.description }}
                  </p>
                  
                  <!-- GitHub Link -->
                  <div v-if="project.github" class="my-2 transition-all duration-300 -translate-x-2 lg:group-hover:opacity-100 lg:opacity-0 group-hover:translate-x-0">
                    <a 
                      :href="project.github" 
                      target="_blank"
                      class="px-2 py-1 my-1 font-medium border rounded-full text-neutral-50 backdrop-blur-xl border-foreground/15 bg-neutral-500/50"
                    >
                      Github
                    </a>
                  </div>
                </div>

                <!-- Project Image -->
                <NuxtImg 
                  :src="project.image"
                  :alt="project.title"
                  loading="lazy"
                  width="384"
                  height="512"
                  placeholder
                  class="transition duration-300 blur-0 object-cover absolute z-10 inset-0"
                  sizes="sm:224px md:384px"
                  format="webp"
                  quality="90"
                  provider="ipx"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="justify-start hidden gap-2 mt-4 md:flex">
          <button 
            class="relative z-40 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 hover:bg-foreground/10"
            :disabled="isAtStart"
            @click="scrollLeft"
          >
            <Icon name="mdi:arrow-left" class="w-6 h-6 text-foreground" />
          </button>
          <button 
            class="relative z-40 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 hover:bg-foreground/10"
            :disabled="isAtEnd"
            @click="scrollRight"
          >
            <Icon name="mdi:arrow-right" class="w-6 h-6 text-foreground" />
          </button>
        </div>
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

const selectedTech = ref<string | null>(null)
const elementVisibility = reactive<Record<string, boolean>>({})
const scrollContainer = ref<HTMLElement | null>(null)

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

// Scroll state
const isAtStart = ref(true)
const isAtEnd = ref(false)

// Scroll functions
const scrollLeft = () => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({
    left: -400,
    behavior: 'smooth'
  })
}

const scrollRight = () => {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({
    left: 400,
    behavior: 'smooth'
  })
}

// Update scroll buttons state
const updateScrollState = () => {
  if (!scrollContainer.value) return
  
  isAtStart.value = scrollContainer.value.scrollLeft <= 0
  isAtEnd.value = 
    scrollContainer.value.scrollLeft + scrollContainer.value.clientWidth >= 
    scrollContainer.value.scrollWidth
}

// Watch for scroll events
onMounted(() => {
  if (!scrollContainer.value) return
  
  scrollContainer.value.addEventListener('scroll', updateScrollState)
  updateScrollState()

  // Set initial visibility
  if (projects.value) {
    projects.value.forEach(project => {
      elementVisibility[project.id] = true
    })
  }
})

onUnmounted(() => {
  if (!scrollContainer.value) return
  scrollContainer.value.removeEventListener('scroll', updateScrollState)
})
</script>

<style scoped>
/* Hide scrollbar */
.overflow-x-scroll::-webkit-scrollbar {
  display: none;
}

/* Smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Hover effects */
.group:hover img {
  transform: scale(1.05);
}
</style> 