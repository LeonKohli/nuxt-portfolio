<template>
  <section class="px-4 h-screen flex flex-col justify-center sm:px-6 lg:px-8" id="about">
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] overflow-y-auto">
      <!-- Section Header -->
      <div class="flex w-full mb-16 space-between">
        <div class="w-full">
          <h2 class="w-full font-bold tracking-tight text-center md:text-left">
            <span class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-['Exo_2']">
              <span class="text-zinc-100">About</span>
              <span class="relative inline-block ml-3 group">
                <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                  Me
                </span>
              </span>
            </span>
          </h2>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid gap-16 lg:grid-cols-2">
        <!-- Left Column: Introduction -->
        <div class="space-y-6">
          <p class="text-lg text-white/70 md:text-xl">{{ about?.description }}</p>
          
          <!-- Location -->
          <div class="flex items-center gap-2 text-white/70">
            <Icon name="ph:map-pin-fill" class="w-5 h-5 text-emerald-400" />
            <span>{{ about?.location }}</span>
          </div>

          <!-- Education -->
          <div class="space-y-4 pt-6">
            <h3 class="text-xs font-medium uppercase text-white/50">Education</h3>
            <div class="space-y-4">
              <div 
                v-for="edu in about?.education" 
                :key="edu.year"
                class="space-y-1"
              >
                <div class="font-medium text-white">{{ edu.degree }}</div>
                <div class="text-sm text-white/70">
                  {{ edu.school }} • {{ edu.year }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Expertise -->
        <div class="space-y-8">
          <div 
            v-for="exp in about?.expertise" 
            :key="exp.title"
            class="space-y-4"
          >
            <h3 class="text-lg font-medium text-white">{{ exp.title }}</h3>
            <p class="text-white/70">{{ exp.description }}</p>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="tech in exp.technologies" 
                :key="tech"
                class="flex items-center px-2 py-1 text-sm transition-colors border rounded-md text-white/70 border-white/10 hover:text-emerald-400 hover:border-emerald-500/20"
              >
                <Icon 
                  :name="getTechIcon(tech)" 
                  class="w-3.5 h-3.5 mr-1.5"
                />
                {{ tech }}
              </div>
            </div>
          </div>

          <!-- Interests -->
          <div class="pt-6">
            <h3 class="mb-4 text-xs font-medium uppercase text-white/50">Interests</h3>
            <div class="flex flex-wrap gap-2">
              <div 
                v-for="interest in about?.interests" 
                :key="interest"
                class="px-3 py-1 text-sm transition-colors border rounded-md text-white/70 border-white/10"
              >
                {{ interest }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Fetch about data
const { data: about } = await useAsyncData('about', () => 
  queryContent('about').findOne()
)

// Tech stack icon mapping
const getTechIcon = (tech: string): string => {
  const iconMap: Record<string, string> = {
    'Vue.js': 'simple-icons:vuedotjs',
    'TypeScript': 'simple-icons:typescript',
    'Python': 'simple-icons:python',
    'Node.js': 'simple-icons:nodedotjs',
    'PostgreSQL': 'simple-icons:postgresql',
    'Nuxt.js': 'simple-icons:nuxtdotjs',
    'Tailwind CSS': 'simple-icons:tailwindcss',
    'RESTful APIs': 'lucide:code',
    'Web Security': 'lucide:shield',
    'Authentication': 'lucide:lock',
    'API Security': 'lucide:shield-check',
    'Penetration Testing': 'lucide:bug',
  }

  return iconMap[tech] || 'lucide:code'
}
</script> 