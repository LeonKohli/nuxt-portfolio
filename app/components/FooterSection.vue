<template>
  <footer 
    class="relative px-4 py-12 overflow-hidden sm:px-6 lg:px-8"
    ref="sectionRef"
    :class="{ 'section-visible': isVisible }"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 opacity-15">
      <Icon 
        v-for="(icon, index) in backgroundIcons" 
        :key="index"
        :name="icon.name"
        :class="[
          'absolute text-green-400 w-14 h-14 opacity-0 animate-fade-in',
          icon.position
        ]"
        :style="{ animationDelay: `${200 + (index * 150)}ms` }"
      />
    </div>

    <!-- Content -->
    <div class="relative w-10/12 md:w-8/12 mx-auto max-w-[110rem] text-center">
      <!-- Main Content -->
      <h2 class="mb-12 text-3xl font-bold tracking-wide opacity-0 sm:text-4xl md:text-6xl lg:text-7xl font-exo animate-fade-in" style="animation-delay: 200ms;">
        Let's
        <span class="relative inline-block group">
          <span class="bg-gradient-to-r from-green-700 via-green-500 to-green-400 bg-clip-text text-transparent transition-all duration-300 group-hover:bg-[length:200%_100%] bg-[length:100%_100%] bg-[position:0%] hover:bg-[position:100%]">
            connect
          </span>
        </span>
      </h2>

      <p class="mb-12 text-white/70 max-w-[75ch] mx-auto tracking-wide text-lg opacity-0 animate-fade-in" style="animation-delay: 400ms;">
        I am always open to new opportunities and collaborations. Whether you have a question, 
        a project proposal, or just want to say hello, feel free to get in touch.
      </p>

      <!-- Contact Button -->
      <button 
        class="relative inline-flex h-10 sm:h-12 w-[180px] sm:w-[210px] overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-black group opacity-0 animate-fade-in"
        style="animation-delay: 600ms;"
        @click="copyEmail"
        @mousemove="handleMouseMove($event)"
        @mouseleave="handleMouseLeave"
      >
        <span 
          class="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#0A0A0A_0%,#0A0A0A_50%,#166534_100%)]" 
        />
        <span 
          class="inline-flex items-center justify-center w-full h-full px-6 py-2 text-base font-medium text-white transition-all duration-500 bg-black rounded-lg cursor-pointer sm:px-8 sm:text-lg backdrop-blur-3xl group-hover:bg-black/80"
        >
          <div class="relative w-4 h-4 mr-2 sm:w-5 sm:h-5 sm:mr-3">
            <Icon 
              name="lucide:copy"
              class="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out transform sm:w-5 sm:h-5"
              :class="copied ? 'opacity-0 scale-75' : 'opacity-100 group-hover:text-emerald-400'"
            />
            <Icon 
              name="lucide:check"
              class="absolute inset-0 w-4 h-4 transition-all duration-300 ease-in-out transform sm:w-5 sm:h-5 text-emerald-400"
              :class="copied ? 'opacity-100 scale-100' : 'opacity-0 scale-125'"
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
        >
          <div class="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-500/20 to-transparent" />
        </div>
      </button>

      <!-- Social Links -->
      <div class="flex justify-center mt-12 space-x-6">
        <NuxtLink
          v-for="(link, index) in socialLinks"
          :key="link.name"
          :to="link.url"
          external
          target="_blank"
          class="flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full opacity-0 text-white/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 animate-fade-in hover:-translate-y-1"
          :style="{ animationDelay: `${800 + (index * 100)}ms` }"
        >
          <Icon :name="link.icon" class="w-5 h-5" />
          <span class="sr-only">{{ link.name }}</span>
        </NuxtLink>
      </div>

      <!-- Copyright -->
      <div class="mt-12 text-sm opacity-0 text-white/40 animate-fade-in" style="animation-delay: 1200ms;">
        © {{ new Date().getFullYear() }} Built with 
        <span class="text-red-400">❤️</span> by Leon Kohlhaussen
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const copied = ref(false)
const email = 'contact@leonkohli.dev'

const spotlightStyle = ref({
  background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
  transform: 'translate(0%, 0%)'
})

const handleMouseMove = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const relativeX = ((event.clientX - rect.left) / rect.width) * 100
  const relativeY = ((event.clientY - rect.top) / rect.height) * 100

  spotlightStyle.value = {
    background: `radial-gradient(circle at ${relativeX}% ${relativeY}%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`,
    transform: 'translate(0%, 0%)'
  }
}

const handleMouseLeave = () => {
  spotlightStyle.value = {
    background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
    transform: 'translate(0%, 0%)'
  }
}

const backgroundIcons = [
  { name: 'simple-icons:vuedotjs', position: 'left-10 top-10' },
  { name: 'simple-icons:typescript', position: 'right-20 top-20' }, 
  { name: 'simple-icons:python', position: 'left-1/4 bottom-20' }
]

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/leonkohli', icon: 'simple-icons:github' },
  { name: 'GitLab', url: 'https://gitlab.com/opendata-apps/mantis', icon: 'simple-icons:gitlab' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/leon-kohlhau%C3%9Fen/', icon: 'simple-icons:linkedin' },
]

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

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
  animation: fadeIn 0.6s ease-out forwards;
  will-change: transform, opacity;
}

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.section-visible [class*='animate-fade-in'] {
  animation-play-state: running;
}

[class*='animate-fade-in'] {
  animation-play-state: paused;
}
</style>