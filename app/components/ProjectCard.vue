<template>
  <div class="relative w-full touch-pan-x" ref="cardRef">
    <div 
      class="flex w-full overflow-x-scroll overscroll-x-contain py-8 scroll-smooth 
             [scrollbar-width:none] snap-x snap-mandatory touch-pan-x" 
      ref="scrollContainer"
      @scroll="handleScroll"
    >
      <!-- Projects Container -->
      <div class="flex flex-row justify-start min-w-full gap-4 md:gap-6">
        <!-- Initial spacer for mobile -->
        <div class="w-4 shrink-0 md:hidden" aria-hidden="true" />
        
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="shrink-0 snap-center w-[min(85vw,380px)] md:w-[384px] md:snap-start 
                 first:pl-0 last:pr-4 md:last:pr-0 project-transition"
          :class="getCardClasses(index)"
          :style="getCardStyles(index)"
          @mouseenter="handleProjectHover(project.id, true)"
          @mouseleave="handleProjectHover(project.id, false)"
          data-umami-event="View Project Details"
          :data-umami-event-project="project.title"
        >
          <div 
            class="rounded-[24px] h-[24rem] sm:h-[26rem] md:h-[32rem] w-full md:w-[384px] group 
                   overflow-hidden flex flex-col items-start justify-start relative z-10 
                   cursor-pointer project-transition"
          >
            <!-- Dark Gradient Overlay -->
            <div 
              class="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/80 to-black/60 opacity-80 group-hover:opacity-90 project-transition"
            />
            
            <!-- Hover Overlay -->
            <div 
              class="absolute inset-0 z-30 bg-[#000000] opacity-0 group-hover:opacity-75 project-transition"
            />
            
            <!-- Content -->
            <div class="relative z-40 flex flex-col h-full p-6 md:p-8">
              <!-- Initial Content Container -->
              <div class="flex flex-col flex-grow">
                <!-- Title and Subtitle -->
                <div class="transform project-transition group-hover:-translate-y-1">
                  <h3 class="text-2xl md:text-3xl font-bold max-w-xs text-left [text-wrap:balance] 
                           mb-2 leading-tight tracking-tight text-white font-exo">
                    {{ project.title }}
                  </h3>
                  <p class="text-base md:text-lg max-w-xs text-left [text-wrap:balance] 
                           tracking-tight leading-[1.6] text-white/80 project-transition 
                           group-hover:opacity-0 line-clamp-2">
                    {{ project.subtitle }}
                  </p>
                </div>

                <!-- Description -->
                <div class="flex-grow mt-4 opacity-0 project-transition group-hover:opacity-100">
                  <p class="text-base md:text-lg max-w-xs text-left [text-wrap:balance] 
                           tracking-tight leading-[1.6] text-white/90">
                    {{ project.description }}
                  </p>
                </div>
              </div>
              
              <!-- Bottom Content -->
              <div class="mt-auto transform translate-y-4 opacity-0 pointer-events-none project-transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                <!-- Tech Stack -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <div 
                    v-for="tech in project.tech" 
                    :key="tech.name"
                    class="px-3 py-1.5 text-sm rounded-full text-white/90 bg-white/10 backdrop-blur-xl 
                           hover:bg-white/20 flex items-center gap-1.5 group/tech project-hover-transition"
                  >
                    <Icon 
                      v-if="isVisible"
                      :name="tech.icon" 
                      class="w-3.5 h-3.5 project-hover-transition group-hover/tech:scale-110 group-hover/tech:rotate-[8deg]" 
                      loading="lazy"
                      width="14"
                      height="14"
                      aria-hidden="true"
                    />
                    <span class="text-sm">{{ tech.name }}</span>
                  </div>
                </div>

                <!-- Links -->
                <div class="flex gap-3">
                  <a 
                    v-if="project.repo"
                    :href="project.repo" 
                    target="_blank"
                    class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full text-white 
                           bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 
                           relative overflow-hidden project-hover-transition"
                    @click.stop
                    data-umami-event="View Project GitHub"
                    :data-umami-event-project="project.title"
                  >
                    <Icon 
                      name="ph:github-logo-fill" 
                      class="w-4 h-4 mr-2 project-hover-transition group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]" 
                      loading="lazy"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    />
                    <span class="relative z-10">GitHub</span>
                  </a>
                  <a 
                    v-if="project.link"
                    :href="project.link" 
                    target="_blank"
                    class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full text-emerald-400 
                           bg-emerald-500/20 hover:bg-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 
                           relative overflow-hidden project-hover-transition"
                    @click.stop
                    data-umami-event="View Project Live"
                    :data-umami-event-project="project.title"
                  >
                    <Icon 
                      name="lucide:external-link" 
                      class="w-4 h-4 mr-2 project-hover-transition group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]" 
                      loading="lazy"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    />
                    <span class="relative z-10">Live</span>
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
              :placeholder="[100, 133, 75, 5]"
              class="absolute inset-0 z-10 object-cover scale-[1.01] brightness-[0.7] group-hover:scale-[1.02] 
                     group-hover:brightness-[0.8] group-hover:blur-[2px] project-transition project-card-image"
              sizes="(max-width: 640px) 85vw, (max-width: 768px) 280px, 384px"
              format="webp"
              quality="80"
              fit="cover"
              :modifiers="{
                blur: 0.3,
                background: 'black'
              }"
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
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer 
                 disabled:opacity-50 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0 project-hover-transition"
          :disabled="isAtStart"
          @click="scrollLeft"
          aria-label="Scroll to previous projects"
          data-umami-event="Projects Navigation"
          data-umami-event-direction="previous"
        >
          <Icon 
            name="lucide:chevron-left" 
            class="w-6 h-6 text-white project-hover-transition group-hover/nav:scale-110"
            aria-hidden="true"
          />
        </button>
        <button 
          v-if="showNavigation"
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer 
                 disabled:opacity-50 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0 project-hover-transition"
          :disabled="isAtEnd"
          @click="scrollRight"
          aria-label="Scroll to next projects"
          data-umami-event="Projects Navigation"
          data-umami-event-direction="next"
        >
          <Icon 
            name="lucide:chevron-right" 
            class="w-6 h-6 text-white project-hover-transition group-hover/nav:scale-110"
            aria-hidden="true"
          />
        </button>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  projects: Project[]
  isSectionVisible: boolean
}>()

// Define emits
const emit = defineEmits<{
  scroll: [index: number]
}>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(cardRef)

const scrollContainer = ref<HTMLElement | null>(null)
const elementVisibility = reactive<Record<string, boolean>>({})
const hoveredProjectId = ref<string | null>(null)

// Initialize scroll state with default values
const isAtStart = ref(true)
const isAtEnd = ref(false)
const showNavigation = ref(false)

// Track hover state for each project
const handleProjectHover = (projectId: string, isHovering: boolean) => {
  hoveredProjectId.value = isHovering ? projectId : null
}

// Handle scroll events and emit current index
const handleScroll = () => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  const itemWidth = container.clientWidth * 0.85 // 85vw for mobile
  const currentIndex = Math.round(scrollLeft / itemWidth)
  
  // Emit the current index
  emit('scroll', currentIndex)
  
  updateScrollState()
}

// Initialize visibility and scroll state
onMounted(() => {
  // Set initial visibility
  props.projects.forEach(project => {
    elementVisibility[project.id] = true
  })
  
  // Initialize scroll container and state
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', handleScroll, { passive: true })
    
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
    scrollContainer.value.removeEventListener('scroll', handleScroll)
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

// Add this near the top of the script section
const hasAnimated = ref(false)

// Update the getCardClasses function
const getCardClasses = (index: number) => {
  // Only apply animations if we haven't animated before
  if (!hasAnimated.value) {
    return {
      'opacity-0': !props.isSectionVisible,
      'opacity-100 translate-y-0': props.isSectionVisible,
      'translate-y-4': !props.isSectionVisible,
      'transition-all duration-500': true,
    }
  }
  // Return default visible state if already animated
  return {
    'opacity-100 translate-y-0': true,
  }
}

// Update the getCardStyles function
const getCardStyles = (index: number) => {
  // Only apply transition delay if we haven't animated before
  if (!hasAnimated.value) {
    return {
      transitionDelay: `${(index * 200) + 800}ms`,
      transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
    }
  }
  // Return empty styles if already animated
  return {}
}

// Add a watcher for isSectionVisible
watch(() => props.isSectionVisible, (newValue) => {
  if (newValue && !hasAnimated.value) {
    // Set hasAnimated to true after the animation duration + maximum delay
    const maxDelay = (props.projects.length * 200) + 800 + 500 // animation delays + duration
    setTimeout(() => {
      hasAnimated.value = true
    }, maxDelay)
  }
}, { immediate: true })
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

/* Base transitions */
.project-transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-duration: 500ms;
  will-change: transform, opacity;
}

.project-hover-transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-duration: 300ms;
  will-change: transform, opacity, background-color;
}

/* Prevent animations on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .project-transition,
  .project-hover-transition {
    transition: none;
    transform: none !important;
  }

  .project-card-image {
    transform: none !important;
    filter: brightness(0.7) !important;
  }
}
</style> 