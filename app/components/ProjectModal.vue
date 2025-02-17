<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  open: boolean
  project: Project | null
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// Format date to readable string
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="border sm:max-w-3xl border-white/10 bg-black/90 backdrop-blur-2xl">
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden rounded-lg">
        <!-- Grid Pattern -->
        <div 
          class="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.015)_1px,transparent_1px)] 
                 opacity-75"
          style="background-size: 8px 8px"
        />
        
        <!-- Gradient Overlays -->
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-transparent" />
        <div class="absolute inset-0 opacity-25 bg-gradient-to-tl from-emerald-500/10 via-transparent to-transparent animate-gradient" />
      </div>
      
      <DialogHeader class="space-y-6">
        <!-- Project Image -->
        <div class="relative w-full h-48 sm:h-72 overflow-hidden rounded-[24px] group">
          <NuxtImg 
            :src="project?.image"
            :alt="project?.title"
            class="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 brightness-[0.7]"
            loading="lazy"
            width="896"
            height="384"
            :placeholder="[100, 133, 75, 5]"
            sizes="(max-width: 640px) 90vw, 896px"
            format="webp"
            quality="90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 opacity-80" />
          
          <!-- Project Status Badge -->
          <div v-if="project?.status" class="absolute top-4 right-4">
            <div class="px-3 py-1.5 rounded-full text-sm font-medium 
                      bg-emerald-500/20 text-emerald-400 backdrop-blur-xl border border-emerald-500/20
                      hover:bg-emerald-500/30 hover:border-emerald-500/30 transition-all duration-300
                      hover:-translate-y-0.5 active:translate-y-0">
              {{ project.status }}
            </div>
          </div>
        </div>

        <!-- Title and Subtitle -->
        <div class="relative space-y-2">
          <DialogTitle class="text-3xl font-bold sm:text-4xl font-exo group">
            <span class="text-transparent transition-all duration-300 bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text
                       bg-[length:100%_100%] group-hover:bg-[length:200%_100%] bg-[position:0%] group-hover:bg-[position:100%]">
              {{ project?.title }}
            </span>
          </DialogTitle>
          <DialogDescription class="text-lg transition-colors duration-300 sm:text-xl text-white/80 group-hover:text-white/90">
            {{ project?.subtitle }}
          </DialogDescription>
        </div>
      </DialogHeader>
      
      <!-- Content -->
      <div class="relative mt-8 space-y-8">
        <!-- Description -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white/90 font-exo">About the Project</h3>
          <p class="text-base leading-relaxed sm:text-lg text-white/70">
            {{ project?.description }}
          </p>
        </div>

        <!-- Tech Stack -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white/90 font-exo">Technologies Used</h3>
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="tech in project?.tech" 
              :key="tech.name"
              class="px-3 py-1.5 text-sm rounded-full text-white/90 bg-white/10 backdrop-blur-xl 
                     hover:bg-white/20 flex items-center gap-1.5 group/tech project-hover-transition"
            >
              <Icon 
                :name="tech.icon" 
                class="w-3.5 h-3.5 project-hover-transition 
                       group-hover/tech:scale-110 group-hover/tech:rotate-[8deg]"
                loading="lazy"
                width="14"
                height="14"
                aria-hidden="true"
              />
              {{ tech.name }}
            </div>
          </div>
        </div>

        <!-- Key Features -->
        <div v-if="project?.features?.length" class="space-y-4">
          <h3 class="text-lg font-semibold text-white/90 font-exo">Key Features</h3>
          <ul class="grid gap-3 sm:grid-cols-2">
            <li 
              v-for="feature in project.features" 
              :key="feature"
              class="flex items-start gap-3 p-2 rounded-lg group/feature project-hover-transition hover:bg-white/5"
            >
              <Icon 
                name="lucide:check-circle" 
                class="w-5 h-5 mt-0.5 text-emerald-400 project-hover-transition
                       group-hover/feature:scale-110 group-hover/feature:rotate-[8deg]"
                aria-hidden="true"
              />
              <span class="transition-colors duration-300 text-white/70 group-hover:text-white/90">
                {{ feature }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Actions -->
      <DialogFooter class="mt-8">
        <div class="flex flex-wrap items-center gap-4">
          <Button
            v-if="project?.repo"
            :href="project.repo"
            target="_blank"
            variant="outline"
            class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full 
                   text-white bg-white/10 hover:bg-white/20 hover:-translate-y-0.5 
                   active:translate-y-0 relative overflow-hidden project-hover-transition"
          >
            <Icon 
              name="ph:github-logo-fill" 
              class="w-4 h-4 mr-2 project-hover-transition 
                     group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]"
            />
            <span class="relative z-10">View Code</span>
          </Button>
          <Button
            v-if="project?.link"
            :href="project.link"
            target="_blank"
            class="group/btn flex items-center px-4 py-2 text-sm font-medium rounded-full 
                   text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30 
                   hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden 
                   project-hover-transition"
          >
            <Icon 
              name="lucide:external-link" 
              class="w-4 h-4 mr-2 project-hover-transition 
                     group-hover/btn:scale-110 group-hover/btn:rotate-[8deg]"
            />
            <span class="relative z-10">Visit Project</span>
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
@keyframes subtleGradient {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.2;
  }
}

.animate-gradient {
  animation: subtleGradient 8s ease-in-out infinite;
  will-change: opacity;
}

/* Smooth scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.project-hover-transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-duration: 300ms;
  will-change: transform, opacity, background-color;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
