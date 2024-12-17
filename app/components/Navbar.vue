<template>
  <nav 
    ref="navRef"
    class="fixed z-50 hidden transition-all duration-500 ease-in-out left-6 md:block will-change-transform will-change-opacity"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      isVisible ? 'pointer-events-auto' : 'pointer-events-none'
    ]"
    :style="{ top: '50%', transform: `translateY(-50%) ${isVisible ? '' : 'translateY(1rem)'}` }"
  >
    <!-- Navigation Links -->
    <div class="flex flex-col items-start gap-3">
      <a 
        v-for="(item, index) in navItems" 
        :key="item.label"
        :href="item.href"
        class="relative py-2 pr-4 overflow-hidden text-sm border rounded-full group transition-all duration-300 ease-in-out will-change-transform will-change-[background-color,padding] bg-black/30 backdrop-blur-sm border-white/5"
        :class="[
          activeSection === item.href.substring(1) 
            ? 'text-white border-white/20 pl-10' 
            : 'text-white/50 pl-8 hover:text-white hover:bg-black/50 hover:border-white/10 hover:pl-10'
        ]"
        :style="{ 
          transitionDelay: `${index * 50}ms`,
          transform: isVisible ? 'none' : 'translateX(-1rem)'
        }"
        @click.prevent="scrollToSection(item.href)"
        data-umami-event="Navigation Click"
        :data-umami-event-section="item.label"
        :data-umami-event-active="activeSection === item.href.substring(1)"
      >
        <!-- Active Section Indicator -->
        <div 
          class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none"
          :class="{ 'opacity-10': activeSection === item.href.substring(1) }"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        </div>

        <!-- Hover Spotlight Effect -->
        <div 
          class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100"
          :style="spotlightStyles[index]"
          @mousemove="handleMouseMove($event, index)"
          @mouseleave="handleMouseLeave(index)"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
        </div>

        <!-- Dot Indicator -->
        <span 
          class="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ease-in-out"
          :class="[
            activeSection === item.href.substring(1)
              ? 'bg-emerald-400 scale-100'
              : 'bg-white/30 scale-75 group-hover:scale-100 group-hover:bg-emerald-400/50'
          ]"
        />

        <!-- Label -->
        <span class="relative">{{ item.label }}</span>
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface SpotlightStyle {
  background: string
  transform: string
}

interface NavItem {
  label: string
  href: string
}

const isVisible = ref(false)
const activeSection = ref('')
const navRef = ref<HTMLElement | null>(null)

const spotlightStyles = ref<SpotlightStyle[]>(
  Array(3).fill({
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

const navItems: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
]

// Show/hide navbar and update active section based on scroll
onMounted(() => {
  const sections = navItems.map(item => item.href.substring(1))
  
  sections.forEach(section => {
    const element = document.getElementById(section)
    if (element) {
      const isElementVisible = useElementVisibility(element, { threshold: 0.5 })
      watch(isElementVisible, (visible) => {
        if (visible) {
          activeSection.value = section
        }
      })
    }
  })

  const handleScroll = useThrottleFn(() => {
    isVisible.value = window.scrollY > window.innerHeight * 0.5
  }, 100)

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Smooth scroll to section using native smooth scroll behavior
const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    activeSection.value = href.substring(1)
  }
}
</script>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    transform: none !important;
  }
}
</style>