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
        
        <ClientOnly>
          <article 
            v-for="(project, index) in projects" 
            :key="project.id"
            class="shrink-0 snap-center w-[min(85vw,380px)] md:w-[384px] md:snap-start 
                   first:pl-0 last:pr-4 md:last:pr-0 project-transition"
            :class="getCardClasses(index)"
            :style="getCardStyles(index)"
            @mouseenter="handleProjectHover(project.id, true)"
            @mouseleave="handleProjectHover(project.id, false)"
          >
            <NuxtLink 
              :to="`/projects/${project.id}`"
              class="rounded-[24px] h-[24rem] sm:h-[26rem] md:h-[32rem] w-full md:w-[384px] group 
                     overflow-hidden flex flex-col items-start justify-start relative z-10 
                     cursor-pointer project-transition hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                     hover:shadow-emerald-500/10"
            >
              <!-- Background layers -->
              <div class="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/80 to-black/60 opacity-80 group-hover:opacity-85 project-transition"></div>
              <div class="absolute inset-0 z-30 bg-[#000000] opacity-0 group-hover:opacity-40 project-transition"></div>
              
              <!-- Content -->
              <div class="relative z-40 flex flex-col h-full p-6 md:p-8">
                <!-- Title and description area -->
                <header class="flex flex-col flex-grow">
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

                  <p class="flex-grow mt-4 opacity-0 project-transition group-hover:opacity-100
                           text-base md:text-lg max-w-xs text-left [text-wrap:balance] 
                           tracking-tight leading-[1.6] text-white/90">
                    {{ project.description }}
                  </p>
                </header>
                
                <!-- Footer content -->
                <footer class="mt-auto transform translate-y-4 opacity-0 pointer-events-none project-transition group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                  <!-- Tech Stack -->
                  <ul class="flex flex-wrap gap-2 mb-6">
                    <li 
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
                    </li>
                  </ul>

                  <!-- Links -->
                  <div class="flex gap-3">
                    <a 
                      v-if="project.repo"
                      :href="project.repo" 
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full text-white 
                             bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0 
                             project-hover-transition"
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
                      <span>GitHub</span>
                    </a>
                    <a 
                      v-if="project.link"
                      :href="project.link" 
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full text-emerald-400 
                             bg-emerald-500/20 hover:bg-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 
                             project-hover-transition"
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
                      <span>Live</span>
                    </a>
                  </div>
                </footer>
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
                       group-hover:brightness-[0.85] group-hover:blur-[2px] project-transition project-card-image"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 280px, 384px"
                format="webp"
                quality="80"
                fit="cover"
                :modifiers="{
                  blur: 0.3,
                  background: 'black'
                }"
              />
            </NuxtLink>
          </article>
        </ClientOnly>

        <!-- Final spacer for mobile -->
        <div class="w-4 shrink-0 md:hidden" aria-hidden="true" />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <ClientOnly>
      <div class="hidden md:flex items-center justify-between mt-8">
        <nav class="flex gap-4" aria-label="Project navigation">
          <button 
            v-if="showNavigation"
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer 
                 disabled:opacity-30 bg-white/5 hover:bg-emerald-500/10 hover:-translate-y-1 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0 project-hover-transition
                 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          :disabled="isAtStart"
          @click="scrollLeft"
          aria-label="Scroll to previous projects"
          data-umami-event="Projects Navigation"
          data-umami-event-direction="previous"
        >
          <Icon 
            name="lucide:chevron-left" 
            class="w-6 h-6 text-white/80 group-hover/nav:text-emerald-400 project-hover-transition group-hover/nav:scale-110"
            aria-hidden="true"
          />
        </button>
        <button 
          v-if="showNavigation"
          class="group/nav relative z-40 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer 
                 disabled:opacity-30 bg-white/5 hover:bg-emerald-500/10 hover:-translate-y-1 active:translate-y-0 
                 disabled:hover:scale-100 disabled:hover:translate-y-0 project-hover-transition
                 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          :disabled="isAtEnd"
          @click="scrollRight"
          aria-label="Scroll to next projects"
          data-umami-event="Projects Navigation"
          data-umami-event-direction="next"
        >
          <Icon 
            name="lucide:chevron-right" 
            class="w-6 h-6 text-white/80 group-hover/nav:text-emerald-400 project-hover-transition group-hover/nav:scale-110"
            aria-hidden="true"
          />
        </button>
        </nav>
        
        <!-- More Projects Indicator -->
        <div 
          v-if="showNavigation && !isAtEnd" 
          class="flex items-center gap-2 text-white/60"
        >
          <span class="text-sm">More projects</span>
          <Icon name="lucide:arrow-right" class="w-4 h-4" />
        </div>
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

// Add this near the top of the script section
const hasAnimated = ref(process.server ? true : false)

// Track hover state for each project
const handleProjectHover = (projectId: string, isHovering: boolean) => {
  hoveredProjectId.value = isHovering ? projectId : null
}

// Handle scroll events and emit current index
const handleScroll = useThrottleFn(() => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  const itemWidth = container.clientWidth * 0.85 // 85vw for mobile
  const currentIndex = Math.round(scrollLeft / itemWidth)
  
  // Emit the current index
  emit('scroll', currentIndex)
  
  updateScrollState()
}, 50) // Throttle to 20fps for scroll events

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
      
      // Reset scroll position when projects array changes
      scrollContainer.value.scrollLeft = 0
      handleScroll()
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

// Scroll functions with enhanced smooth easing
const scrollLeft = () => {
  if (!scrollContainer.value) return
  
  // Calculate the card width plus gap for precise scrolling by exact card positions
  const cardWidth = window.innerWidth >= 768 ? 384 : Math.min(window.innerWidth * 0.85, 380)
  const cardGap = window.innerWidth >= 768 ? 24 : 16 // md:gap-6 (24px) or gap-4 (16px)
  
  // Move by exactly one card position
  scrollContainer.value.scrollBy({
    left: -(cardWidth + cardGap),
    behavior: 'smooth'
  })
}

const scrollRight = () => {
  if (!scrollContainer.value) return
  
  // Calculate the card width plus gap for precise scrolling by exact card positions
  const cardWidth = window.innerWidth >= 768 ? 384 : Math.min(window.innerWidth * 0.85, 380)
  const cardGap = window.innerWidth >= 768 ? 24 : 16 // md:gap-6 (24px) or gap-4 (16px)
  
  // Move by exactly one card position
  scrollContainer.value.scrollBy({
    left: cardWidth + cardGap,
    behavior: 'smooth'
  })
}

// Update the getCardClasses function
const getCardClasses = (index: number) => {
  // Only apply animations on client-side
  if (process.client && !hasAnimated.value) {
    return {
      'opacity-0': !props.isSectionVisible,
      'opacity-100 translate-y-0': props.isSectionVisible,
      'translate-y-8': !props.isSectionVisible,
      'transition-all duration-700': true,
    }
  }
  // Return default visible state for server-side rendering or if already animated
  return {
    'opacity-100 translate-y-0': true,
  }
}

// Update the getCardStyles function
const getCardStyles = (index: number) => {
  // Only apply transition delay on client-side
  if (process.client && !hasAnimated.value) {
    // Calculate a staggered delay based on position
    // Cards animate in from left to right with a slight stagger
    const delay = `${(index * 120) + 600}ms`;
    return {
      transitionDelay: delay,
      transitionTimingFunction: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)' // Improved easing
    }
  }
  // Return empty styles for server-side rendering or if already animated
  return {}
}

// Add a watcher for isSectionVisible
watch(() => props.isSectionVisible, (newValue) => {
  if (process.client && newValue && !hasAnimated.value) {
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
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1.0);
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