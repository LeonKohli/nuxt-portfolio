<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-0 sm:px-6 lg:px-8 overflow-hidden" 
    id="projects"
    ref="sectionRef"
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
    <div class="w-full">
      <div class="md:w-8/12 md:mx-auto md:max-w-[110rem]">
        <ProjectCard 
          :projects="sortedProjects" 
          class="transition-all duration-300 opacity-0 animate-fade-in"
          style="animation-delay: 800ms;"
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
</script>

<style scoped>
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  will-change: transform, opacity;
}
</style> 