<template>
  <section 
    class="flex flex-col justify-center min-h-screen px-4 pt-24 overflow-hidden sm:px-6 lg:px-8 md:pt-0" 
    id="about"
    ref="sectionRef"
    :class="{ 'section-visible': isVisible }"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem] px-4">
      <!-- Section Header -->
      <div class="flex flex-col items-center mb-10 text-center md:items-start md:text-left">
        <h2 class="font-bold tracking-tight">
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

      <!-- Content -->
      <div class="relative">
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <!-- Left Column: Bio -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 600ms;">
            <p class="mb-6 text-xl md:text-2xl text-white/90 leading-relaxed [text-wrap:balance]">
              Hi, I'm 
              <span class="relative inline-block font-medium text-emerald-400">Leon</span>, 
              a Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.
            </p>
            
            <!-- Snake Game -->
            <div class="mt-6">
              <SnakeGame />
            </div>
          </div>

          <!-- Right Column: Beyond Coding -->
          <div class="opacity-0 animate-fade-in" style="animation-delay: 700ms;">
            <BeyondCoding />
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute rounded-full -z-10 blur-3xl opacity-20 bg-gradient-to-br from-emerald-500/30 via-emerald-500/5 to-transparent w-96 h-96 -top-12 -right-12" />
        <div class="absolute rounded-full -z-10 blur-3xl opacity-10 bg-gradient-to-tl from-emerald-500/20 via-emerald-500/5 to-transparent w-80 h-80 -bottom-12 -left-12" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Use VueUse's useElementVisibility for intersection observer functionality
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.2 })
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity;
  animation-play-state: paused;
}

.section-visible .animate-fade-in {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>