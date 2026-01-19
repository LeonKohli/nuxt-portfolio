<template>
  <footer
    v-motion="fade"
    class="relative px-4 py-12 overflow-hidden sm:px-6 lg:px-8"
  >
    <!-- Background Elements -->
    <TechIcons aria-hidden="true" />

    <!-- Content -->
    <div class="relative w-10/12 md:w-8/12 mx-auto max-w-[110rem] text-center pointer-events-none">
      <!-- Main Content -->
      <h2
        v-motion="fade"
        class="mb-12 text-3xl font-bold tracking-wide sm:text-4xl md:text-6xl lg:text-7xl font-exo pointer-events-auto"
      >
        Let's
        <span class="relative inline-block group">
          <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
            connect
          </span>
        </span>
      </h2>

      <p
        v-motion="slideUp"
        class="mb-12 text-white/70 max-w-[75ch] mx-auto tracking-wide text-lg pointer-events-auto"
      >
        I am always open to new opportunities and collaborations. Whether you have a question, 
        a project proposal, or just want to say hello, feel free to get in touch.
      </p>

      <!-- Contact Button -->
      <button
        v-motion="withDelay(slideUp, 0.15)"
        class="relative inline-flex h-10 sm:h-12 w-[180px] sm:w-[210px] overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-black group transition-all duration-700 delay-200 pointer-events-auto"
        @click="copyEmail"
        data-umami-event="Copy Email"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        aria-label="Copy email address"
      >
        <span 
          class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0A_0%,#0A0A0A_50%,#166534_100%)]" 
        />
        <span 
          class="inline-flex items-center justify-center w-full h-full px-6 py-2 text-base font-medium text-white transition-all duration-300 bg-black rounded-lg cursor-pointer sm:px-8 sm:text-lg backdrop-blur-3xl group-hover:bg-black/80"
        >
          <div class="relative w-4 h-4 mr-2 sm:w-5 sm:h-5 sm:mr-3">
            <Icon 
              name="lucide:copy"
              class="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out transform sm:w-5 sm:h-5"
              :class="copied ? 'opacity-0 scale-75' : 'opacity-100 group-hover:text-emerald-400'"
              aria-hidden="true"
            />
            <Icon 
              name="lucide:check"
              class="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out transform sm:w-5 sm:h-5 text-emerald-400"
              :class="copied ? 'opacity-100 scale-100' : 'opacity-0 scale-125'"
              aria-hidden="true"
            />
          </div>
          <span class="transition-all duration-300 ease-in-out">
            {{ copied ? 'Copied!' : 'Copy Email' }}
          </span>
        </span>
        <!-- Spotlight effect -->
        <div
          class="absolute transition-opacity duration-300 opacity-0 pointer-events-none -inset-px group-hover:opacity-100"
          :style="spotlightStyle"
          aria-hidden="true"
        >
          <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/20 to-transparent" />
        </div>
      </button>

      <!-- Social Links -->
      <div class="flex justify-center mt-12 gap-6 pointer-events-auto">
        <NuxtLink
          v-for="(link, index) in socialLinks"
          :key="link.name"
          :to="link.url"
          external
          target="_blank"
          rel="noopener noreferrer"
          v-motion="linkMotion(index)"
          class="flex items-center justify-center transition-all duration-300 text-white/70 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 hover:-translate-y-1 p-2"
          :data-umami-event="`Visit ${link.name}`"
          :aria-label="`Visit my ${link.name} profile`"
        >
          <Icon
            :name="link.playfulIcon"
            class="w-8 h-8 transition-all duration-300 sm:w-10 sm:h-10 group-hover:scale-110"
            loading="lazy"
            aria-hidden="true"
          />
          <span class="sr-only">{{ link.name }}</span>
        </NuxtLink>
      </div>

      <!-- Copyright -->
      <div
        v-motion="withDelay(slideUp, 0.3)"
        class="mt-12 text-sm text-white/40"
      >
        © {{ new Date().getFullYear() }} Built with 
        <span class="text-red-400" aria-hidden="true">❤️</span><span class="sr-only">love</span> by Leon Kohlhaussen
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { fade, slideUp, withDelay, staggered } = useAnimationPresets()

const email = 'contact@leonkohli.dev'

// Use VueUse clipboard composable
const { copy, copied } = useClipboard({ legacy: true, copiedDuring: 2000 })
const copyEmail = () => copy(email)

const { spotlightStyle, handleMouseMove, handleMouseLeave } = useSpotlightEffect()

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/leonkohli', playfulIcon: 'ph:github-logo-fill' },
  { name: 'GitLab', url: 'https://gitlab.com/opendata-apps/mantis', playfulIcon: 'ph:gitlab-logo-simple-fill' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/leon-kohlhau%C3%9Fen/', playfulIcon: 'ri:linkedin-fill' },
]

const linkMotion = (index: number) => staggered(index, 'normal', 0.3)
</script>
