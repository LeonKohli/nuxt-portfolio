<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-4 overflow-hidden sm:px-6 lg:px-8" 
    id="about"
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
              <span class="opacity-0 text-zinc-100 animate-fade-in" style="animation-delay: 200ms;">About</span>
              <span class="relative inline-block ml-3 opacity-0 group animate-fade-in" style="animation-delay: 400ms;">
                <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                  Me
                </span>
              </span>
            </span>
          </h2>
        </div>
      </div>

      <!-- Content -->
      <div class="relative">
        <!-- Introduction and Cards Container -->
        <div 
          class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <!-- Text Content -->
          <div class="space-y-6">
            <p class="text-xl md:text-2xl text-white/90 leading-relaxed [text-wrap:balance] opacity-0 animate-fade-in" style="animation-delay: 600ms;">
              Hi, I'm 
              <span class="relative inline-block font-medium text-emerald-400">Leon</span>, 
              a Web Developer from Potsdam, Germany. For the past 2 years, I've been crafting web applications with a focus on solving problems and exploring new technologies.
            </p>
          </div>

          <!-- Interest Cards -->
          <div class="space-y-6">
            <!-- What I Love Title -->
            <h3 class="font-bold tracking-tight opacity-0 animate-fade-in" style="animation-delay: 800ms;">
              <span class="text-2xl sm:text-3xl font-exo">
                <span class="text-zinc-100">What I</span>
                <span class="relative inline-block ml-2 group">
                  <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                    Love
                  </span>
                </span>
              </span>
            </h3>
            
            <!-- Cards Grid -->
            <div class="grid gap-4">
              <div 
                v-for="(item, index) in whatILove" 
                :key="index"
                class="group relative p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 
                       transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20
                       hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.1)] overflow-hidden
                       opacity-0 animate-fade-in"
                :style="{ animationDelay: `${1000 + (index * 200)}ms` }"
                @mousemove="handleMouseMove($event, index)"
                @mouseleave="handleMouseLeave(index)"
              >
                <div class="relative z-10 flex items-start space-x-4">
                  <div class="shrink-0">
                    <div class="relative flex items-center justify-center w-12 h-12 transition-colors duration-300 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 group-hover:from-emerald-500/20 group-hover:to-emerald-500/10">
                      <div class="absolute inset-0 transition-opacity duration-300 rounded-lg opacity-50 bg-emerald-500/10 blur-sm group-hover:opacity-100" />
                      <Icon 
                        :name="item.icon" 
                        class="relative w-6 h-6 transition-all duration-300 text-emerald-400 group-hover:scale-110 group-hover:rotate-3" 
                      />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base font-semibold transition-colors duration-300 text-white/90 group-hover:text-white">
                      {{ item.title }}
                    </h3>
                    <p class="text-sm leading-relaxed transition-colors duration-300 text-white/60 group-hover:text-white/70">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
                <!-- Mouse-based spotlight effect -->
                <div 
                  class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
                  :style="spotlightStyles[index]"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Decorative Element -->
        <div class="absolute rounded-full -z-10 blur-3xl opacity-20 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent w-96 h-96 -top-12 -right-12" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SpotlightStyle {
  background: string;
  transform: string;
}

const spotlightStyles = ref<SpotlightStyle[]>([
  {
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  },
  {
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  },
  {
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  }
])

const handleMouseMove = (event: MouseEvent, index: number) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const relativeX = ((event.clientX - rect.left) / rect.width) * 100
  const relativeY = ((event.clientY - rect.top) / rect.height) * 100

  spotlightStyles.value[index] = {
    background: `radial-gradient(circle at ${relativeX}% ${relativeY}%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`,
    transform: 'translate(0%, 0%)'
  }
}

const handleMouseLeave = (index: number) => {
  spotlightStyles.value[index] = {
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  }
}

const whatILove = [
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

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  sectionRef,
  (entries) => {
    const [entry] = entries
    if (entry?.isIntersecting && !isVisible.value) {
      isVisible.value = true
    }
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  }
)
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
}
</style>