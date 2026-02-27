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
            :key="project.slug"
            v-motion="[project.slug, cardMotion(index)]"
            class="shrink-0 snap-center w-[min(85vw,380px)] md:w-[384px] md:snap-start
                   first:pl-0 last:pr-4 md:last:pr-0"
          >
            <NuxtLink
              :to="`/projects/${project.slug}`"
              class="block rounded-[24px] h-[24rem] sm:h-[26rem] md:h-[32rem] w-full md:w-[384px]
                     overflow-hidden relative cursor-pointer"
              @mouseenter="handleCardHover(project.slug, true)"
              @mouseleave="handleCardHover(project.slug, false)"
            >
              <!-- Background gradient (static - no animation needed, 5% opacity change was imperceptible) -->
              <div
                class="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/80 to-black/60 opacity-80"
              />

              <!-- Background overlay -->
              <div
                v-motion="`${project.slug}-bg-overlay`"
                :initial="{ opacity: 0 }"
                :variants="bgOverlayVariants"
                class="absolute inset-0 z-30 bg-[#000000]"
              />

              <!-- Shadow overlay (pre-rendered, opacity-only animation for GPU acceleration) -->
              <div
                v-motion="`${project.slug}-shadow`"
                :initial="{ opacity: 0 }"
                :variants="shadowVariants"
                class="absolute inset-0 z-10 pointer-events-none shadow-[0_8px_30px_rgba(16,185,129,0.1)]"
              />

              <!-- Content -->
              <div class="relative z-40 flex flex-col h-full p-6 md:p-8">
                <!-- Title and description area -->
                <header class="flex flex-col flex-grow">
                  <div
                    v-motion="`${project.slug}-title`"
                    :initial="{ y: 0 }"
                    :variants="titleVariants"
                  >
                    <h3 class="text-2xl md:text-3xl font-bold max-w-xs text-left [text-wrap:balance]
                             mb-2 leading-tight tracking-tight text-white font-exo">
                      {{ project.title }}
                    </h3>
                    <p
                      v-motion="`${project.slug}-subtitle`"
                      :initial="{ opacity: 0.8, y: 0 }"
                      :variants="subtitleVariants"
                      class="text-base md:text-lg max-w-xs text-left [text-wrap:balance]
                             tracking-tight leading-[1.6] text-white/80 line-clamp-2"
                    >
                      {{ project.subtitle }}
                    </p>
                  </div>

                  <p
                    v-motion="`${project.slug}-description`"
                    :initial="{ opacity: 0, y: 20 }"
                    :variants="descriptionVariants"
                    class="flex-grow mt-4 text-base md:text-lg max-w-xs text-left [text-wrap:balance]
                           tracking-tight leading-[1.6] text-white/90"
                  >
                    {{ project.description }}
                  </p>
                </header>

                <!-- Footer content -->
                <footer
                  v-motion="`${project.slug}-footer`"
                  :initial="{ y: 16, opacity: 0 }"
                  :variants="footerVariants"
                  class="mt-auto"
                >
                  <!-- Tech Stack -->
                  <ul class="flex flex-wrap gap-2 mb-6">
                    <li
                      v-for="tech in project.tech"
                      :key="tech.name"
                      class="px-3 py-1.5 text-sm rounded-full text-white/90 bg-white/10 backdrop-blur-xl
                             flex items-center gap-1.5"
                    >
                      <Icon
                        v-if="isVisible"
                        :name="tech.icon"
                        class="w-3.5 h-3.5"
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
                      class="flex items-center px-4 py-2 text-sm font-medium rounded-full text-white
                             bg-white/10 transition-colors duration-200 hover:bg-white/20"
                      @click.stop
                      data-umami-event="View Project GitHub"
                      :data-umami-event-project="project.title"
                    >
                      <Icon
                        name="ph:github-logo-fill"
                        class="w-4 h-4 mr-2"
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
                      class="flex items-center px-4 py-2 text-sm font-medium rounded-full text-emerald-400
                             bg-emerald-500/20 transition-colors duration-200 hover:bg-emerald-500/30"
                      @click.stop
                      data-umami-event="View Project Live"
                      :data-umami-event-project="project.title"
                    >
                      <Icon
                        name="lucide:external-link"
                        class="w-4 h-4 mr-2"
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
              <div
                v-motion="`${project.slug}-image`"
                :initial="{ scale: 1.01, filter: 'brightness(0.7)' }"
                :variants="imageVariants"
                class="absolute inset-0 z-10"
              >
                <NuxtImg
                  :src="project.image"
                  :alt="project.title"
                  loading="lazy"
                  width="384"
                  height="512"
                  :placeholder="[100, 133, 75, 5]"
                  class="w-full h-full object-cover"
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
import type { ProjectsCollectionItem } from '@nuxt/content'

const props = defineProps<{
  projects: ProjectsCollectionItem[]
}>()

const emit = defineEmits<{
  scroll: [index: number]
}>()

const cardRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(cardRef)

const scrollContainer = ref<HTMLElement | null>(null)

const isAtStart = ref(true)
const isAtEnd = ref(false)
const showNavigation = ref(false)

const handleScroll = useThrottleFn(() => {
  if (!scrollContainer.value) return
  const container = scrollContainer.value
  const scrollLeft = container.scrollLeft
  const itemWidth = container.clientWidth * 0.85
  const currentIndex = Math.round(scrollLeft / itemWidth)

  emit('scroll', currentIndex)

  updateScrollState()
}, 50)

useEventListener(scrollContainer, 'scroll', handleScroll, { passive: true })

onMounted(() => {
  nextTick(() => {
    updateScrollState()
    const el = scrollContainer.value
    if (el) showNavigation.value = el.scrollWidth > el.clientWidth
  })
})

watch(() => props.projects, () => {
  nextTick(() => {
    if (scrollContainer.value) {
      updateScrollState()
      showNavigation.value =
        scrollContainer.value.scrollWidth > scrollContainer.value.clientWidth

      scrollContainer.value.scrollLeft = 0
      handleScroll()
    }
  })
}, { deep: true })

const updateScrollState = useDebounceFn(() => {
  if (!scrollContainer.value) return

  const container = scrollContainer.value
  isAtStart.value = container.scrollLeft <= 0
  isAtEnd.value = Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) <= 1
}, 100)

// Animation callback for card entrance
const animateCardEntrance = (index: number) => {
  const slug = props.projects[index]?.slug
  if (!slug) return

  const motion = motions[slug]
  if (motion?.apply) {
    // Apply scale down animation
    motion.apply({
      scale: 0.92,
      opacity: 0.6,
    })

    // Spring back to normal with spring physics
    setTimeout(() => {
      motion.apply({
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 25,
        },
      })
    }, 100)
  }
}

// Use scroll animation composable for card visibility tracking
const { scrollLeft, scrollRight, cardScrollDistance } = useCardScrollAnimation({
  scrollContainer,
  projects: computed(() => props.projects),
  onAnimate: animateCardEntrance,
})

const { staggered } = useAnimationPresets()
const { animation } = useAppConfig()

const cardMotion = (index: number) => staggered(index, 'slow')

// Define all animation variants (7 elements - bgGradient removed as 5% opacity change was imperceptible)
const bgOverlayVariants = {
  initial: { opacity: 0 },
  hovered: {
    opacity: 0.4,
    transition: {
      duration: 0.4,
      ease: animation.easing.smooth,
    },
  },
}

const shadowVariants = {
  initial: { opacity: 0 },
  hovered: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: animation.easing.smooth,
    },
  },
}

const titleVariants = {
  initial: { y: 0 },
  hovered: {
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
}

const subtitleVariants = {
  initial: {
    opacity: 0.8,
    y: 0,
  },
  hovered: {
    opacity: 0,
    y: -16,
    transition: {
      opacity: {
        duration: 0.25,
        ease: animation.easing.smooth,
      },
      y: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  },
}

const descriptionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  hovered: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: {
        duration: 0.35,
        delay: 0.1,
        ease: animation.easing.smooth,
      },
      y: {
        type: 'spring',
        stiffness: 350,
        damping: 28,
        delay: 0.1,
      },
    },
  },
}

const footerVariants = {
  initial: { y: 16, opacity: 0 },
  hovered: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 30,
    },
  },
}

const imageVariants = {
  initial: {
    scale: 1.01,
    filter: 'brightness(0.7)',
  },
  hovered: {
    scale: 1.04,
    filter: 'brightness(0.85) blur(2px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
}

// Handle card hover to control all child animations
const motions = useMotions()

const handleCardHover = (slug: string, isHovered: boolean) => {
  const variant = isHovered ? 'hovered' : 'initial'

  // Trigger all child animations for this card (7 elements)
  const elements = [
    `${slug}-bg-overlay`,
    `${slug}-shadow`,
    `${slug}-title`,
    `${slug}-subtitle`,
    `${slug}-description`,
    `${slug}-footer`,
    `${slug}-image`,
  ]

  elements.forEach((elementName) => {
    const motion = motions[elementName]
    if (motion?.variant) {
      motion.variant.value = variant
    }
  })
}
</script>

<style scoped>
/* Hide scrollbar */
.overflow-x-scroll::-webkit-scrollbar {
  display: none;
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
