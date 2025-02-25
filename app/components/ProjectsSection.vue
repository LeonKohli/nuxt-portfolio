<template>
  <section 
    class="relative flex flex-col justify-center min-h-screen px-0 overflow-hidden sm:px-6 lg:px-8" 
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
              <span class="relative inline-block ml-3 opacity-0 group animate-fade-in" style="animation-delay: 350ms;">
                <span 
                  class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 
                         bg-clip-text text-transparent transition-all duration-300 
                         group-hover:bg-[length:200%_100%] bg-[length:100%_100%] 
                         bg-[position:0%] hover:bg-[position:100%]"
                >
                  Projects
                </span>
                <!-- Decorative dot -->
                <span class="absolute -right-5 -top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 opacity-0 animate-fade-in" 
                      style="animation-delay: 800ms; box-shadow: 0 0 10px rgba(52,211,153,0.7);"></span>
              </span>
            </span>
          </h2>
          <p 
            class="max-w-[680px] mt-8 text-lg text-white/70 md:text-xl opacity-0 animate-fade-in" 
            style="animation-delay: 500ms;"
          >
            Some of my most interesting projects, showcasing my skills and experience in web development.
          </p>
        </div>
      </div>
    </div>

    <!-- Full Width Container for ProjectCard -->
    <div class="relative w-full">
      <!-- Scroll Indicators for Mobile -->
      <div class="absolute z-50 flex gap-2 -translate-x-1/2 bottom-4 left-1/2 md:hidden">
        <div 
          v-for="(project, index) in sortedProjects" 
          :key="project._id"
          class="w-2 h-2 transition-all duration-500 rounded-full"
          :class="[
            currentProjectIndex === index 
              ? 'bg-emerald-400/80 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.5)]' 
              : 'bg-white/20',
          ]"
        />
      </div>

      <!-- Scroll Hint Animation for Mobile -->
      <div 
        v-if="!hasScrolled && sortedProjects.length > 1" 
        class="absolute inset-y-0 right-0 z-40 flex items-center justify-end w-16 pr-3 pointer-events-none bg-gradient-to-l from-black/30 to-transparent md:hidden"
      >
        <div class="p-2 rounded-full bg-emerald-500/10 animate-pulse">
          <Icon 
            name="lucide:chevron-right" 
            class="w-6 h-6 text-emerald-400/80 animate-scroll-hint"
            aria-hidden="true"
          />
        </div>
      </div>

      <div class="md:w-8/12 md:mx-auto md:max-w-[110rem] pb-16 md:pb-0">
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
    transform: translateY(15px);
    filter: blur(2px);
  }
  70% {
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

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

.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity, filter;
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