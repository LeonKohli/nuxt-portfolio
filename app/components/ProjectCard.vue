<template>
  <div 
    class="relative overflow-hidden transition-all duration-300 border rounded-lg bg-black/20 border-white/5 group hover:border-emerald-500/20"
    :class="{ 'opacity-100 translate-y-0': isVisible, 'opacity-0 translate-y-4': !isVisible }"
  >
    <!-- Project Header -->
    <div class="p-6 border-b border-white/5">
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <div class="text-sm font-medium text-emerald-400">
            {{ project.subtitle }}
          </div>
          <h3 class="text-xl font-semibold text-white">
            {{ project.title }}
          </h3>
          <p class="text-sm text-white/70 line-clamp-2">
            {{ project.description }}
          </p>
        </div>
        <a 
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 -m-2 transition-all opacity-0 group-hover:opacity-100 hover:text-emerald-400"
        >
          <Icon name="lucide:external-link" class="w-4 h-4" />
        </a>
      </div>
    </div>
    
    <!-- Project Content -->
    <div class="p-6 space-y-6">
      <!-- Tech Stack Section -->
      <div>
        <h4 class="mb-3 text-xs font-medium uppercase text-white/50">Technologies</h4>
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="tech in project.tech" 
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

      <!-- Links Section -->
      <div v-if="project.repo || project.link" class="flex gap-3 pt-2">
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center px-4 py-2 text-sm transition-colors border rounded-md text-white/70 border-white/10 hover:text-emerald-400 hover:border-emerald-500/20 group/btn"
        >
          <Icon 
            name="lucide:github" 
            class="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" 
          />
          View Source
        </a>
        <a
          v-if="project.link"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center px-4 py-2 text-sm transition-colors border rounded-md text-white/70 border-white/10 hover:text-emerald-400 hover:border-emerald-500/20 group/btn"
        >
          <Icon 
            name="lucide:external-link" 
            class="w-4 h-4 mr-2 transition-transform group-hover/btn:scale-110" 
          />
          Live Demo
        </a>
      </div>
    </div>

    <!-- Hover Effects -->
    <div class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-t from-emerald-500/5 to-transparent group-hover:opacity-100" />
    <div class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-500/5 to-transparent group-hover:opacity-100" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  project: Project
  isVisible: boolean
}>()

// Tech stack icon mapping
const getTechIcon = (tech: string): string => {
  const iconMap: Record<string, string> = {
    'Vue.js': 'simple-icons:vuedotjs',
    'React': 'simple-icons:react',
    'TypeScript': 'simple-icons:typescript',
    'JavaScript': 'simple-icons:javascript',
    'Python': 'simple-icons:python',
    'Node.js': 'simple-icons:nodedotjs',
    'PostgreSQL': 'simple-icons:postgresql',
    'MongoDB': 'simple-icons:mongodb',
    'Firebase': 'simple-icons:firebase',
    'Flask': 'simple-icons:flask',
    'Tailwind CSS': 'simple-icons:tailwindcss',
    'GraphQL': 'simple-icons:graphql',
    'API': 'lucide:code',
    'WebAPI': 'lucide:code',
    'Security': 'lucide:shield',
    'NLP': 'lucide:brain',
  }

  return iconMap[tech] || 'lucide:code'
}
</script> 