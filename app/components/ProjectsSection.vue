<template>
  <section 
    class="relative flex flex-col justify-center min-h-screen px-0 overflow-hidden sm:px-6 lg:px-8" 
    id="projects"
    ref="sectionRef" 
    :class="{ 'section-visible': shouldAnimate }"
  >
    <!-- Header Container -->
    <header class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4 mb-16">
      <h2 class="font-bold tracking-tight text-center md:text-left">
        <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-exo">
          <span class="text-zinc-100 transition-opacity duration-500"
            :class="shouldAnimate ? 'opacity-100' : 'opacity-0'">My</span>
          <span class="relative inline-block ml-3 group transition-all duration-500 delay-100"
            :class="shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
            <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 
                     bg-clip-text text-transparent transition-all duration-300 
                     group-hover:bg-[length:200%_100%] bg-[length:100%_100%] 
                     bg-[position:0%] hover:bg-[position:100%]">
              Projects
            </span>
          </span>
        </span>
      </h2>
      <p class="max-w-[680px] mt-8 text-lg text-white/70 md:text-xl transition-all duration-700 delay-200"
        :class="shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
        Some of my most interesting projects, showcasing my skills and experience in web development.
      </p>
    </header>

    <!-- Projects Container -->
    <div class="relative w-full">
      <!-- Scroll Indicators for Mobile -->
      <ul class="absolute z-50 flex gap-2 -translate-x-1/2 bottom-4 left-1/2 md:hidden">
        <li
          v-for="(project, index) in sortedProjects"
          :key="project.slug"
          class="w-2 h-2 transition-all duration-500 rounded-full" 
          :class="[
            currentProjectIndex === index
              ? 'bg-emerald-400/80 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
              : 'bg-white/20',
          ]"
          aria-hidden="true"
        ></li>
      </ul>

      <!-- Scroll Hint Animation for Mobile -->
      <div 
        v-if="!hasScrolled && sortedProjects.length > 1"
        class="absolute inset-y-0 right-0 z-40 flex items-center justify-end w-16 pr-3 pointer-events-none bg-gradient-to-l from-black/30 to-transparent md:hidden"
      >
        <span class="p-2 rounded-full bg-emerald-500/10 animate-pulse">
          <Icon name="lucide:chevron-right" class="w-6 h-6 text-emerald-400/80 animate-scroll-hint" aria-hidden="true" />
        </span>
      </div>

      <div class="md:w-8/12 md:mx-auto md:max-w-[110rem] pb-16 md:pb-0">
        <ProjectCard 
          :projects="sortedProjects" 
          :is-section-visible="shouldAnimate" 
          @scroll="handleProjectScroll" 
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Fetch projects using Nuxt Content v3 API with proper schema
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects')
    .order('sort', 'ASC')
    .all()
)

// Computed property for sorted projects with fallback to empty array
const sortedProjects = computed(() => projects.value ?? [])

const currentProjectIndex = ref(0)
const hasScrolled = ref(false)

const handleProjectScroll = (index: number) => {
  currentProjectIndex.value = index
  if (!hasScrolled.value) {
    hasScrolled.value = true
  }
}

// Use one-time animation composable
const { target: sectionRef, shouldAnimate } = useAnimateOnce({ threshold: 0.2 })

</script>

<style scoped>
@keyframes scrollHint {
  0% {
    transform: translateX(0);
    opacity: 0.7;
  }

  50% {
    transform: translateX(-6px);
    opacity: 1;
  }

  100% {
    transform: translateX(0);
    opacity: 0.7;
  }
}

.animate-scroll-hint {
  animation: scrollHint 2s ease-in-out infinite;
}

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-scroll-hint {
    animation: none;
  }
}
</style>