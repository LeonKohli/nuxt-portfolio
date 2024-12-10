<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-0 overflow-hidden sm:px-6 lg:px-8 relative" 
    id="projects"
    ref="sectionRef"
    :class="{ 'section-visible': isVisible }"
  >
    <!-- Header Container -->
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
      <!-- Section Header -->
      <div class="flex w-full mb-16 space-between">
        <div class="w-full">
          <h2 class="w-full font-bold tracking-tight text-center md:text-left">
            <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-exo">
              <span class="opacity-0 text-zinc-100 animate-fade-in" style="animation-delay: 200ms;">My</span>
              <span class="relative inline-block ml-3 opacity-0 group animate-fade-in" style="animation-delay: 400ms;">
                <span 
                  class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 
                         bg-clip-text text-transparent transition-all duration-300 
                         group-hover:bg-[length:200%_100%] bg-[length:100%_100%] 
                         bg-[position:0%] hover:bg-[position:100%]"
                >
                  Projects
                </span>
              </span>
            </span>
          </h2>
          <p 
            class="max-w-[680px] mt-8 text-lg text-white/70 md:text-xl opacity-0 animate-fade-in" 
            style="animation-delay: 600ms;"
          >
            Some of my most interesting projects, showcasing my skills and experience in web development.
          </p>
        </div>
      </div>
    </div>

    <!-- Full Width Container for ProjectCard -->
    <div class="w-full relative">
      <!-- Scroll Indicators for Mobile -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-50 md:hidden">
        <div 
          v-for="(project, index) in sortedProjects" 
          :key="project._id"
          class="w-1.5 h-1.5 rounded-full transition-all duration-300"
          :class="[
            currentProjectIndex === index ? 'bg-white/80 scale-125' : 'bg-white/20',
          ]"
        />
      </div>

      <!-- Scroll Hint Animation for Mobile -->
      <div 
        v-if="!hasScrolled && sortedProjects.length > 1" 
        class="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/20 to-transparent 
               animate-pulse md:hidden pointer-events-none z-40"
      >
        <Icon 
          name="lucide:chevron-right" 
          class="absolute top-1/2 right-2 w-6 h-6 -translate-y-1/2 text-white/40 animate-scroll-hint"
        />
      </div>

      <div class="md:w-8/12 md:mx-auto md:max-w-[110rem]">
        <ProjectCard 
          :projects="sortedProjects" 
          :is-section-visible="isVisible"
          @scroll="handleProjectScroll"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Fetch projects using Nuxt Content with proper typing
const { data: projects } = await useAsyncData<Project[]>('projects', () => 
  queryContent<Project>('projects')
    .sort({ sort: 1 })
    .find()
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

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.2 })

</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0.001;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollHint {
  0%, 100% {
    transform: translateX(0) translateY(-50%);
    opacity: 0.4;
  }
  50% {
    transform: translateX(-4px) translateY(-50%);
    opacity: 0.8;
  }
}

.animate-scroll-hint {
  animation: scrollHint 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity;
  animation-play-state: paused;
}

/* Control animations when section is visible */
.section-visible .animate-fade-in {
  animation-play-state: running;
}

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .animate-scroll-hint {
    animation: none;
  }
}
</style> 