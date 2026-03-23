<template>
  <section
    class="relative flex items-center justify-center min-h-screen px-4 pb-16 overflow-hidden sm:px-6 lg:px-8 md:pb-0"
    id="hero"
    aria-labelledby="hero-title"
  >
    <div class="w-10/12 md:w-8/12 mx-auto max-w-[110rem]">
      <div class="relative z-10 flex flex-col h-screen">
        <div class="flex items-center justify-center flex-grow">
          <div class="z-10 tracking-wide">
            <!-- Greeting -->
            <p class="hero-fade w-full mb-2 text-sm font-medium tracking-wide text-center text-green-700 uppercase lg:text-base md:pr-4 md:text-left"
               style="--delay: 0ms">
              <span class="relative inline-block group whitespace-nowrap">
                <span class="absolute top-0 left-0 right-0 bottom-[-0.2em] bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-[background-size,background-position] duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
                  Hi there! I am
                </span>
                <span class="invisible">Hi there! I am</span>
              </span>
            </p>

            <!-- Name — mask reveal -->
            <h1 id="hero-title" class="font-bold text-6xl md:text-[9vw] lg:text-[9.8vw] text-zinc-100 leading-none z-50 text-center md:text-left">
              <span class="block overflow-hidden">
                <span class="block font-exo hero-reveal" style="--delay: 80ms">
                  LEON
                </span>
              </span>
              <span class="block overflow-hidden">
                <span class="block font-exo hero-reveal" style="--delay: 180ms">
                  KOHLHAUßEN
                </span>
              </span>
            </h1>

            <!-- Location + Social links — one block -->
            <div class="hero-fade flex flex-col items-center gap-4 mt-6 md:items-start md:flex-row md:justify-between"
                 style="--delay: 350ms">
              <div class="flex items-center gap-3 text-base sm:text-lg group">
                <Icon name="ph:map-pin-fill"
                  class="w-5 h-5 text-emerald-400 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[15deg]"
                  loading="lazy"
                  width="20"
                  height="20"
                  aria-hidden="true" />
                <span class="transition-colors duration-200 text-white/90 group-hover:text-white">Potsdam, Germany</span>
              </div>

              <div class="flex items-center gap-4">
                <NuxtLink
                  v-for="(link, index) in socialLinks"
                  :key="link.name"
                  v-motion="socialLink(index, 0)"
                  :to="link.url"
                  external
                  target="_blank"
                  class="flex items-center justify-center transition-colors duration-300 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 p-3 min-w-[44px] min-h-[44px]"
                  :data-umami-event="`Visit ${link.name}`"
                  :aria-label="link.screenReaderText"
                >
                  <Icon
                    :name="link.playfulIcon"
                    class="w-7 h-7 sm:w-8 sm:h-8"
                    loading="lazy"
                    aria-hidden="true"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Arrow -->
        <div class="absolute flex justify-center w-full -translate-x-1/2 bottom-8 left-1/2">
          <button
            class="hero-fade transition-[opacity,transform] duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            style="--delay: 500ms"
            :class="[
              isScrolled ? 'opacity-0 translate-y-4 pointer-events-none' : ''
            ]"
            @click="scrollToProjects"
            data-umami-event="Scroll to Projects"
            aria-label="Scroll to projects section"
          >
            <div class="flex flex-col items-center gap-2 transition-colors text-white/70 hover:text-white">
              <span class="text-sm font-exo">Scroll</span>
              <Icon name="lucide:chevrons-down" class="w-6 h-6 animate-bounce-soft" aria-hidden="true" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { socialLink } = useAnimationPresets()

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

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 100)

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
/* ── Entrance: fade up ── */
@keyframes hero-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-fade {
  animation: hero-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay);
}

/* ── Entrance: mask reveal (name slides up from behind overflow-hidden) ── */
@keyframes hero-mask-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}

.hero-reveal {
  animation: hero-mask-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--delay);
}

/* ── Scroll arrow bounce ── */
@keyframes bounceSoft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-bounce-soft {
  animation: bounceSoft 2s ease-in-out infinite;
  will-change: transform;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .hero-fade,
  .hero-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .animate-bounce-soft {
    animation: none;
  }
}
</style>
