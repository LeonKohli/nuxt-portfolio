<template>
    <section id="tech-stack" class="flex flex-col justify-center min-h-screen px-4 pt-24 overflow-hidden sm:px-6 lg:px-8 md:pt-0" ref="sectionRef" :class="{ 'section-visible': isVisible }">
        <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
            <!-- Section Header -->
            <header class="flex flex-col items-center mb-16 text-center md:items-start md:text-left">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl font-exo">
                    <span class="opacity-0 text-zinc-100 animate-fade-in" style="animation-delay: 200ms;">My</span>
                    <span class="relative inline-block ml-3 opacity-0 animate-fade-in" style="animation-delay: 400ms;">
                        <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                            Tech Stack
                        </span>
                    </span>
                </h2>
                <p class="max-w-[680px] mt-6 text-lg opacity-0 text-white/70 animate-fade-in md:text-xl" style="animation-delay: 600ms;">
                    These are the technologies I have experience with.
                </p>
            </header>

            <!-- Tech Grid - Fixed 3 rows max -->
            <ul class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                <li v-for="(tech, index) in techStack?.technologies" :key="tech.name">
                    <a :href="tech.url" target="_blank" rel="noopener noreferrer" 
                       class="group flex p-4 transition-all duration-500 rounded-xl border border-white/10 
                              hover:border-emerald-500/20 bg-white/[0.02] hover:bg-emerald-500/[0.02] hover:-translate-y-1.5
                              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 opacity-0 animate-slide-up"
                       :style="{ animationDelay: `${800 + (index * 100)}ms` }"
                       @mousemove="handleMouseMove($event, index)"
                       @mouseleave="handleMouseLeave(index)">
                        
                        <!-- Spotlight Effect (simplified) -->
                        <span class="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100 rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent"
                              :style="spotlightStyles[index]"></span>

                        <!-- Icon Container -->
                        <span class="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 transition-all duration-500
                                     shadow-[0_0_0_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_0_1.5px_rgba(16,185,129,0.2)]
                                     group-hover:scale-110" 
                              :class="getIconBackgroundClass(tech.color)">
                            <Icon v-if="isVisible" 
                                  :name="tech.icon"
                                  class="w-6 h-6 transition-all duration-500 group-hover:scale-110"
                                  :style="{ color: tech.color }" 
                                  loading="lazy"
                                  width="24"
                                  height="24"
                                  aria-hidden="true" />
                        </span>
                        
                        <!-- Text Content -->
                        <span class="flex-1 min-w-0 ml-4">
                            <h3 class="text-sm font-medium truncate transition-colors duration-300 text-white/90 group-hover:text-white font-exo">
                                {{ tech.name }}
                            </h3>
                            <p class="text-xs truncate transition-colors duration-300 text-white/60 group-hover:text-emerald-400/80">
                                {{ tech.category }}
                            </p>
                        </span>
                        
                        <!-- External Link Icon -->
                        <Icon v-if="isVisible" 
                              name="lucide:external-link" 
                              class="w-4 h-4 ml-auto text-white/30 opacity-0 transition-all duration-300 
                                     group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-emerald-400"
                              loading="lazy"
                              width="16"
                              height="16"
                              aria-hidden="true" />
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup lang="ts">
interface SpotlightStyle {
    background: string;
    transform: string;
}

const spotlightStyles = ref<SpotlightStyle[]>(
    Array(12).fill({
        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
        transform: 'translate(0%, 0%)'
    })
)

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

const { data: techStack } = await useAsyncData('tech-stack', () => queryContent('tech-stack').findOne())

if (!techStack.value) {
    throw createError({
        statusCode: 500,
        statusMessage: 'Failed to load tech stack data'
    })
}

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.2 })

// Convert hex color to tailwind-compatible background classes to avoid hydration mismatch
function getIconBackgroundClass(hexColor: string): string {
  // Map common colors to tailwind classes to avoid inline styles
  const colorMap: Record<string, string> = {
    '#3178C6': 'bg-[#3178C615]', // TypeScript
    '#3776AB': 'bg-[#3776AB15]', // Python
    '#42b883': 'bg-[#42b88315]', // Vue.js
    '#00DC82': 'bg-[#00DC8215]', // Nuxt.js
    '#009688': 'bg-[#00968815]', // FastAPI
    '#FFFFFF': 'bg-[#FFFFFF15]', // Flask
    '#38BDF8': 'bg-[#38BDF815]', // Tailwind
    '#F05032': 'bg-[#F0503215]', // Git
    '#4169E1': 'bg-[#4169E115]', // PostgreSQL
    '#2496ED': 'bg-[#2496ED15]', // Docker
    '#FCC624': 'bg-[#FCC62415]', // Linux
    '#4EAA25': 'bg-[#4EAA2515]', // Bash
  }
  
  return colorMap[hexColor] || 'bg-white/5' // Fallback for any colors not in the map
}

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

@keyframes slideUp {
    0% {
        opacity: 0.001;
        transform: translateY(20px);
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

.animate-slide-up {
    animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    will-change: transform, opacity;
    animation-play-state: paused;
}

/* Control animations when section is visible */
.section-visible .animate-fade-in,
.section-visible .animate-slide-up {
    animation-play-state: running;
}

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    .animate-slide-up {
        animation: none;
        opacity: 1;
        transform: none;
    }
}
</style>