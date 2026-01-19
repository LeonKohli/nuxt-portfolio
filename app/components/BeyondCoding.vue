<template>
  <div>
    <h3 class="mb-6 text-xl font-bold text-white/90 font-exo">
      <span class="relative inline-block">
        <span class="absolute left-0 w-full h-px -bottom-1 bg-gradient-to-r from-emerald-500/50 to-transparent"></span>
        Beyond Coding
      </span>
    </h3>
    
    <div class="space-y-5">
      <div 
        v-for="(item, index) in hobbies" 
        :key="index"
        class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl
               transition-all duration-300 hover:bg-white/[0.07] hover:border-emerald-500/20
               hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.15)] hover:-translate-y-1 will-change-transform pointer-events-auto"
        v-bind="createHandlers(index)"
      >
        <div class="relative z-10 p-4">
          <div class="flex items-start">
            <div class="flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 shrink-0">
              <Icon 
                :name="item.icon" 
                class="w-6 h-6 transition-all duration-300 text-emerald-400 group-hover:scale-110 group-hover:rotate-3" 
                loading="lazy"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 class="mb-1 text-base font-semibold transition-colors duration-300 text-white/90 group-hover:text-white font-exo">
                {{ item.title }}
              </h3>
              <p class="text-sm transition-colors duration-300 text-white/60 group-hover:text-white/70">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
        <!-- Spotlight effect -->
        <div 
          class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          :style="spotlightStyles[index]"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Hobby {
  icon: string;
  title: string;
  description: string;
}

// Hobbies and interests data
const hobbies: Hobby[] = [
  {
    icon: 'ph:bicycle-bold',
    title: 'Bicycle Touring',
    description: 'Exploring the world on two wheels and enjoying outdoor adventures.'
  },
  {
    icon: 'ph:house-bold',
    title: 'Smart Home',
    description: 'Building and tinkering with home automation and IoT solutions.'
  },
  {
    icon: 'ph:git-branch-bold',
    title: 'Open Source',
    description: 'Contributing to and supporting open source projects and communities.'
  }
]

const { spotlightStyles, createHandlers } = useSpotlightEffect(hobbies.length)
</script>