<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-8 sm:px-12 lg:px-16" 
    id="projects"
    ref="sectionRef"
  >
    <div class="w-11/12 md:w-10/12 mx-auto max-w-[1440px]">
      <!-- Section Header -->
      <div class="flex w-full mb-24 space-between">
        <div class="w-full">
          <h2 class="w-full font-bold tracking-tight text-center md:text-left">
            <span class="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-['Exo_2'] leading-[1.2]">
              <span class="text-zinc-100">My</span>
              <span class="relative inline-block ml-3 group">
                <span 
                  class="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 
                         bg-clip-text text-transparent transition-all duration-300 
                         group-hover:bg-[length:200%_100%] bg-[length:100%_100%] 
                         bg-[position:0%] hover:bg-[position:100%]"
                >
                  Projects
                </span>
              </span>
            </span>
          </h2>
          <p class="max-w-[680px] mt-8 text-base sm:text-lg md:text-xl text-white/70 leading-[1.6]">
            Some of my most interesting projects, showcasing my skills and experience in web development.
          </p>
        </div>
      </div>

      <!-- Projects Cards -->
      <ProjectCard 
        :projects="sortedProjects" 
        class="transition-all duration-300"
      />
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