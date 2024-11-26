<template>
  <div class="relative w-full touch-pan-x">
    <div 
      class="flex w-full overflow-x-scroll overscroll-x-contain py-8 scroll-smooth 
             [scrollbar-width:none] snap-x snap-mandatory touch-pan-x" 
      ref="scrollContainer"
    >
      <!-- Projects Container -->
      <div class="flex flex-row justify-start min-w-full gap-4 md:gap-6">
        <!-- Initial spacer for mobile -->
        <div class="w-4 shrink-0 md:hidden" aria-hidden="true" />
        
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="shrink-0 snap-center w-[min(85vw,380px)] md:w-[384px] md:snap-start 
                 first:pl-0 last:pr-4 md:last:pr-0"
          :style="{
            opacity: elementVisibility[project.id] ? 1 : 0,
            transform: elementVisibility[project.id] ? 'none' : 'translateY(20px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }"
        >
          <div 
            class="rounded-[24px] h-[20rem] md:h-[32rem] w-full md:w-[384px] group 
                   overflow-hidden flex flex-col items-start justify-start relative z-10 
                   cursor-pointer transition-all duration-500 ease-out hover:shadow-lg"
          >
            <!-- Dark Gradient Overlay (Always Present) -->
            <div 
              class="absolute inset-0 z-20 transition-opacity duration-500 ease-out bg-gradient-to-t from-black via-black/80 to-black/60 opacity-80 group-hover:opacity-90"
            />
            
            <!-- Hover Overlay -->
            <div 
              class="absolute inset-0 z-30 transition-opacity duration-500 ease-out 
                     bg-[#000000] opacity-0 group-hover:opacity-75"
            />
            
            <!-- Content -->
            <div class="relative z-40 flex flex-col h-full p-6 md:p-8">
              <!-- Initial Content Container -->
              <div class="flex flex-col flex-grow">
                <!-- Title and Subtitle (Always Visible) -->
                <div class="transition-all duration-500 ease-out transform group-hover:-translate-y-1">
                  <h3 
                    class="text-2xl md:text-3xl font-bold max-w-xs text-left [text-wrap:balance] 
                           mb-2 leading-tight tracking-tight text-white font-exo"
                  >
                    {{ project.title }}
                  </h3>
                  <p 
                    class="text-base md:text-lg max-w-xs text-left [text-wrap:balance] 
                           tracking-tight leading-[1.6] text-white/80 transition-all 
                           duration-500 ease-out group-hover:opacity-0 line-clamp-2"
                  >
                    {{ project.subtitle }}
                  </p>
                </div>

                <!-- Description (Appears on Hover) -->
                <div 
                  class="flex-grow mt-4 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100"
                >
                  <p 
                    class="text-base md:text-lg max-w-xs text-left [text-wrap:balance] 
                           tracking-tight leading-[1.6] text-white/90"
                  >
                    {{ project.description }}
                  </p>
                </div>
              </div>
              
              <!-- Bottom Content (Tech Stack and Links) -->
              <div 
                class="mt-auto transition-all duration-500 ease-out transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              >
                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <div 
                    v-for="tech in project.tech" 
                    :key="tech.name"
                    class="px-3 py-1.5 text-sm transition-all duration-200 rounded-full 
                           text-white/90 bg-white/10 backdrop-blur-xl hover:bg-white/20
                           flex items-center gap-1.5 group/tech"
                  >
                    <Icon 
                      :name="tech.icon" 
                      class="w-3.5 h-3.5 transition-transform duration-300
                             group-hover/tech:scale-110 group-hover/tech:rotate-[8deg]" 
                    />
                    {{ tech.name }}
                  </div>
                </div>

                <!-- Links -->
                <div class="flex gap-3">
                  <a 
                    v-if="project.repo"
                    :href="project.repo" 
                    target="_blank"
                    class="group/btn flex items-center px-4 py-2 text-sm font-medium 
                           transition-all duration-300 rounded-full text-white bg-white/10 
                           hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0
                           relative overflow-hidden"
                  >
                    <Icon 
                      name="ph:github-logo-fill" 
                      class="w-4 h-4 mr-2 transition-transform duration-300
                             group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]" 
                    />
                    <span class="relative z-10">GitHub</span>
                  </a>
                  <a 
                    v-if="project.link"
                    :href="project.link" 
                    target="_blank"
                    class="group/btn flex items-center px-4 py-2 text-sm font-medium 
                           transition-all duration-300 rounded-full text-emerald-400 
                           bg-emerald-500/20 hover:bg-emerald-500/30 hover:-translate-y-0.5 
                           active:translate-y-0 relative overflow-hidden"
                  >
                    <Icon 
                      name="lucide:external-link" 
                      class="w-4 h-4 mr-2 transition-transform duration-300
                             group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]" 
                    />
                    <span class="relative z-10">Live Demo</span>
                  </a>
                </div>
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
              class="absolute inset-0 z-10 object-cover transition-all duration-500 
                     ease-out scale-[1.01] brightness-[0.7] group-hover:scale-[1.02] 
                     group-hover:brightness-[0.8] group-hover:blur-[2px]"
              sizes="sm:280px md:384px"
              format="webp"
              quality="90"
            />
          </div>
        </div>

        <!-- Final spacer for mobile -->
        <div class="w-4 shrink-0 md:hidden" aria-hidden="true" />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <ClientOnly>
      <div class="justify-start hidden gap-3 mt-8 md:flex">
        <button 
          v-if="showNavigation"
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 
                 transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 
                 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0"
          :disabled="isAtStart"
          @click="scrollLeft"
        >
          <Icon 
            name="lucide:chevron-left" 
            class="w-6 h-6 text-white transition-transform duration-300 group-hover/nav:scale-110" 
          />
        </button>
        <button 
          v-if="showNavigation"
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 
                 transition-all duration-300 rounded-full cursor-pointer disabled:opacity-50 
                 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0"
          :disabled="isAtEnd"
          @click="scrollRight"
        >
          <Icon 
            name="lucide:chevron-right" 
            class="w-6 h-6 text-white transition-transform duration-300 group-hover/nav:scale-110" 
          />
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  projects: Project[]
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const elementVisibility = reactive<Record<string, boolean>>({})

// Initialize scroll state with default values
const isAtStart = ref(true)
const isAtEnd = ref(false)
const showNavigation = ref(false)

// Initialize visibility and scroll state
onMounted(() => {
  // Set initial visibility
  props.projects.forEach(project => {
    elementVisibility[project.id] = true
  })
  
  // Initialize scroll container and state
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateScrollState, { passive: true })
    
    // Wait for next tick to ensure DOM is ready
    nextTick(() => {
      updateScrollState()
      // Only show navigation if content is scrollable
      showNavigation.value = 
        scrollContainer.value!.scrollWidth > scrollContainer.value!.clientWidth
    })
  }
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateScrollState)
  }
})

// Watch for changes in projects array
watch(() => props.projects, () => {
  nextTick(() => {
    if (scrollContainer.value) {
      updateScrollState()
      showNavigation.value = 
        scrollContainer.value.scrollWidth > scrollContainer.value.clientWidth
    }
  })
}, { deep: true })

// Update scroll buttons state with debounce
const updateScrollState = useDebounceFn(() => {
  if (!scrollContainer.value) return
  
  const container = scrollContainer.value
  const atStart = container.scrollLeft <= 0
  const atEnd = 
    Math.abs(
      container.scrollLeft + container.clientWidth - 
      container.scrollWidth
    ) <= 1 // Account for rounding errors

  isAtStart.value = atStart
  isAtEnd.value = atEnd
}, 100)

// Scroll functions with smooth easing
const scrollLeft = () => {
  if (!scrollContainer.value) return
  const scrollAmount = window.innerWidth >= 768 ? 400 : scrollContainer.value.clientWidth
  scrollContainer.value.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  })
}

const scrollRight = () => {
  if (!scrollContainer.value) return
  const scrollAmount = window.innerWidth >= 768 ? 400 : scrollContainer.value.clientWidth
  scrollContainer.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}
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
  transition-duration: 500ms;
}

/* Smooth scrolling for Safari */
@supports (-webkit-touch-callout: none) {
  .snap-x {
    -webkit-overflow-scrolling: touch;
  }
}

/* Prevent vertical scroll bleed */
.touch-pan-x {
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
}
</style> 