<!-- Start of Selection -->
<template>
  <section 
    ref="sectionRef"
    class="relative flex items-center justify-center min-h-screen px-4 overflow-hidden sm:px-6 lg:px-8"
    :class="{ 'section-visible': isVisible }"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem]">
      <div class="absolute inset-0">
        <TechIcons :z-index="10" />
      </div>
      <!-- Main content container with proper height and positioning -->
      <div class="relative z-10 flex flex-col h-screen">
        <!-- Content wrapper with centered positioning -->
        <div class="flex items-center justify-center flex-grow">
          <div class="z-10 inline-block tracking-wide">
            <!-- Greeting -->
            <div class="flex w-full mb-2 space-between">
              <p
                class="w-full text-sm font-bold tracking-widest text-center text-green-700 uppercase lg:text-3xl md:pr-4 md:text-left">
                <span class="relative inline-block opacity-0 animate-fade-in group whitespace-nowrap"
                  style="animation-delay: 200ms;">
                  <span
                    class="absolute top-0 left-0 right-0 bottom-[-0.2em] bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                    Hi there! I am
                  </span>
                  <span class="invisible">Hi there! I am</span>
                </span>
              </p>
            </div>

            <!-- Name and Info Container -->
            <div class="z-20 flex flex-col items-end justify-center md:flex-row md:space-x-8">
              <div class="w-full space-y-6">
                <!-- Name -->
                <h1
                  class="font-bold text-6xl md:text-[9vw] lg:text-[9.8vw] text-zinc-100 leading-none z-50 text-center md:text-left">
                  <span class="block transition-colors duration-300 opacity-0 animate-fade-in "
                    style="animation-delay: 400ms;">
                    <span class="font-exo">LEON</span>
                  </span>
                  <span class="block transition-colors duration-300 opacity-0 animate-fade-in "
                    style="animation-delay: 600ms;">
                    <span class="font-exo">KOHLHAUßEN</span>
                  </span>
                </h1>

                <!-- Location and Social Links -->
                <div class="flex flex-col items-center gap-4 md:items-start md:flex-row md:justify-between">
                  <div class="flex items-center gap-2 text-base opacity-0 sm:text-lg animate-fade-in group"
                    style="animation-delay: 800ms;">
                    <Icon name="ph:map-pin-fill"
                      class="w-5 h-5 text-emerald-400 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-[15deg]"
                      loading="lazy"
                      width="20"
                      height="20"
                      aria-hidden="true" />
                    <span class="transition-colors duration-300 text-white/70 group-hover:text-white/90">Potsdam,
                      Germany</span>
                  </div>
                  <div class="flex items-center gap-4 opacity-0 animate-fade-in" style="animation-delay: 1000ms;">
                    <NuxtLink
                      v-for="link in socialLinks"
                      :key="link.name"
                      :to="link.url"
                      external
                      target="_blank"
                      class="flex items-center justify-center transition-all duration-300 text-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:-translate-y-1"
                      :data-umami-event="`Visit ${link.name}`"
                    >
                      <Icon 
                        :name="link.playfulIcon"
                        class="w-5 h-5 transition-all duration-300 sm:w-6 sm:h-6 group-hover:scale-110"
                        loading="lazy"
                        width="20"
                        height="20"
                        aria-hidden="true"
                      />
                      <span class="sr-only">{{ link.screenReaderText }}</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Arrow - Now properly centered and positioned -->
        <div class="absolute flex justify-center w-full -translate-x-1/2 bottom-8 left-1/2">
          <button class="transition-all duration-300 opacity-0 animate-fade-in hover:-translate-y-1"
            :class="{ 'opacity-0 translate-y-4': isScrolled }" style="animation-delay: 1500ms;"
            @click="scrollToProjects"
            data-umami-event="Scroll to Projects"
          >
            <div class="flex flex-col items-center gap-2 transition-colors text-white/50 hover:text-white/80">
              <span class="text-sm font-exo">Scroll</span>
              <Icon name="lucide:chevrons-down" class="w-6 h-6 animate-bounce-soft" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template><!-- End of Selection -->

<script setup lang="ts">
const socialLinks = [
  { 
    name: 'email',
    url: 'mailto:contact@leonkohli.dev',
    playfulIcon: 'lucide:mail-plus',
    screenReaderText: 'Send me an email at contact@leonkohli.dev'
  },
  { 
    name: 'GitLab',
    url: 'https://gitlab.com/opendata-apps/mantis',
    playfulIcon: 'ph:gitlab-logo-simple-fill',
    screenReaderText: 'View my GitLab projects'
  },
  { 
    name: 'GitHub',
    url: 'https://github.com/leonkohli',
    playfulIcon: 'ph:github-logo-fill',
    screenReaderText: 'Check out my GitHub repositories'
  },
  { 
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/leon-kohlhau%C3%9Fen/',
    playfulIcon: 'ri:linkedin-fill',
    screenReaderText: 'Connect with me on LinkedIn'
  }
]

const isScrolled = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(sectionRef, { threshold: 0.2 })

// Update scroll state
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 100
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

// Smooth scroll to projects section
const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
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

@keyframes nameReveal {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-name-reveal {
  animation: nameReveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: opacity;
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  will-change: transform, opacity;
  animation-play-state: paused;
}

.animate-bounce-soft {
  animation: bounceSoft 2s ease-in-out infinite;
  will-change: transform;
}

/* Control animations when section is visible */
.section-visible .animate-fade-in {
  animation-play-state: running;
}

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-name-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  .animate-bounce-soft {
    animation: none;
  }
}
</style>