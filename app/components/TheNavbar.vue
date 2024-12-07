<template>
  <nav 
    class="fixed z-50 hidden transition-all duration-500 left-6 md:block"
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
        class="relative py-2 pl-8 pr-4 overflow-hidden text-sm transition-all duration-300 border rounded-full group hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm border-white/5 hover:border-white/10 hover:pl-10"
        :class="[
          activeSection === item.href.substring(1) 
            ? 'text-white border-white/20 pl-10' 
            : 'text-white/50'
        ]"
        :style="{ 
          transitionDelay: `${index * 50}ms`,
          transform: isVisible ? 'none' : 'translateX(-1rem)'
        }"
        @click.prevent="scrollToSection(item.href)"
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
          class="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300"
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
  background: string;
  transform: string;
}

const isVisible = ref(false)
const activeSection = ref('')

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

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
]

// Show/hide navbar and update active section based on scroll
onMounted(() => {
  const sections = navItems.map(item => item.href.substring(1))
  
  const handleScroll = () => {
    // Show/hide nav
    isVisible.value = window.scrollY > window.innerHeight * 0.5

    // Update active section
    const scrollPosition = window.scrollY + window.innerHeight / 2

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { top, bottom } = element.getBoundingClientRect()
        const elementTop = top + window.scrollY
        const elementBottom = bottom + window.scrollY

        if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
          activeSection.value = section
          break
        }
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
  
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

// Smooth scroll to section
const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    // Update active section immediately for better UX
    activeSection.value = href.substring(1)
  }
}
</script> 