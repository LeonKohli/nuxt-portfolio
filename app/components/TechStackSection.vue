<template>
    <section id="tech-stack" class="flex flex-col justify-center min-h-screen px-4 pt-24 overflow-hidden sm:px-6 lg:px-8 md:pt-0" ref="sectionRef" :class="{ 'section-visible': shouldAnimate }">
        <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
            <!-- Section Header -->
            <header class="flex flex-col items-center mb-16 text-center md:items-start md:text-left">
                <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl font-exo">
                    <span class="text-zinc-100 transition-opacity duration-500"
                      :class="shouldAnimate ? 'opacity-100' : 'opacity-0'">My</span>
                    <span class="relative inline-block ml-3 transition-all duration-500 delay-100"
                      :class="shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'">
                        <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                            Tech Stack
                        </span>
                    </span>
                </h2>
                <p class="max-w-[680px] mt-6 text-lg text-white/70 md:text-xl transition-all duration-700 delay-200"
                  :class="shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'">
                    These are the technologies I have experience with.
                </p>
            </header>

            <!-- Tech Grid - Fixed 3 rows max -->
            <ul class="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                <li v-for="(tech, index) in techStack?.technologies" :key="tech.name">
                    <a :href="tech.url" target="_blank" rel="noopener noreferrer" 
                       class="group flex p-4 transition-all duration-500 rounded-xl border border-white/10 
                              hover:border-emerald-500/20 bg-white/[0.02] hover:bg-emerald-500/[0.02] hover:-translate-y-1.5
                              focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                       :class="shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
                       :style="{ transitionDelay: hasAnimated ? '0ms' : `${100 + (index * 50)}ms` }"
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
                            <Icon v-if="shouldAnimate" 
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
                        <Icon v-if="shouldAnimate" 
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
// Use the spotlight effect composable - allocate enough for tech stack items
const { spotlightStyles, handleMouseMove, handleMouseLeave } = useSpotlightEffect(20)

const { data: techStack } = await useAsyncData('tech-stack', () => queryContent('tech-stack').findOne())

if (!techStack.value) {
    throw createError({
        statusCode: 500,
        statusMessage: 'Failed to load tech stack data'
    })
}

// Use one-time animation composable
const { target: sectionRef, shouldAnimate, hasAnimated } = useAnimateOnce({ threshold: 0.2 })

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
/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>