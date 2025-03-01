<!-- Improved Navbar.vue with better accessibility -->
<template>
  <!-- Desktop Navbar (Left Side) -->
  <nav 
    ref="navRef"
    class="fixed z-50 hidden transition-all duration-700 ease-in-out left-6 md:block will-change-transform will-change-opacity"
    :class="[
      isVisible && !isProjectPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      isVisible && !isProjectPage ? 'pointer-events-auto' : 'pointer-events-none'
    ]"
    :style="{ top: '50%', transform: `translateY(-50%) ${isVisible && !isProjectPage ? '' : 'translateY(1rem)'}` }"
    aria-label="Main navigation"
  >
    <!-- Navigation Links -->
    <ul class="flex flex-col items-start gap-3">
      <li v-for="(item, index) in navItems" :key="item.label">
        <a 
          :href="item.href"
          class="relative py-2 pr-4 overflow-hidden text-sm border rounded-full group transition-all duration-300 ease-in-out will-change-transform will-change-[background-color,padding] bg-black/30 backdrop-blur-sm border-white/5"
          :class="[
            activeSection === item.href.substring(1) && !isProjectPage
              ? 'text-white border-white/20 pl-10' 
              : 'text-white/70 pl-8 hover:text-white hover:bg-black/50 hover:border-white/10 hover:pl-10'
          ]"
          :style="{ 
            transitionDelay: `${index * 100}ms`,
            transform: isVisible && !isProjectPage ? 'none' : 'translateX(-1rem)'
          }"
          @click.prevent="scrollToSection(item.href)"
          data-umami-event="Navigation Click"
          :data-umami-event-section="item.label"
          :data-umami-event-active="activeSection === item.href.substring(1) && !isProjectPage"
          :aria-current="activeSection === item.href.substring(1) && !isProjectPage ? 'page' : undefined"
        >
          <span 
            class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none bg-gradient-to-r from-emerald-500/20 to-transparent"
            :class="{ 'opacity-10': activeSection === item.href.substring(1) && !isProjectPage }"
            aria-hidden="true"
          ></span>

          <span 
            class="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-r from-emerald-500/20 to-transparent"
            :style="spotlightStyles[index]"
            @mousemove="handleMouseMove($event, index)"
            @mouseleave="handleMouseLeave(index)"
            aria-hidden="true"
          ></span>

          <span 
            class="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ease-in-out"
            :class="[
              activeSection === item.href.substring(1) && !isProjectPage
                ? 'bg-emerald-400 scale-100'
                : 'bg-white/30 scale-75 group-hover:scale-100 group-hover:bg-emerald-400/50'
            ]"
            aria-hidden="true"
          ></span>

          <span class="relative">{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </nav>

  <!-- Mobile Navbar (Bottom) -->
  <nav 
    v-if="!isProjectPage"
    class="fixed left-0 z-50 w-full transition-all duration-700 ease-in-out bottom-6 md:hidden"
    :class="[
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      isVisible ? 'pointer-events-auto' : 'pointer-events-none'
    ]"
    aria-label="Mobile navigation"
  >
    <ul class="flex justify-center">
      <li class="px-3 py-2 mx-auto border rounded-full bg-black/40 backdrop-blur-md border-white/10">
        <ul class="flex items-center gap-2">
          <li v-for="(item, index) in navItems" :key="item.label">
            <a 
              :href="item.href"
              class="relative px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-in-out rounded-full flex items-center gap-1.5"
              :class="[
                activeSection === item.href.substring(1)
                  ? 'text-emerald-400 bg-white/5' 
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              ]"
              :style="{ transitionDelay: `${index * 100}ms` }"
              @click.prevent="scrollToSection(item.href)"
              data-umami-event="Mobile Navigation Click"
              :data-umami-event-section="item.label"
              :aria-current="activeSection === item.href.substring(1) ? 'page' : undefined"
            >
              <Icon 
                :name="getIconForSection(item.label)" 
                class="w-3.5 h-3.5 transition-transform duration-300"
                :class="{ 'text-emerald-400': activeSection === item.href.substring(1) }"
                aria-hidden="true"
              />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
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
const route = useRoute()
const isProjectPage = computed(() => route.path.startsWith('/projects/'))

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

// Get appropriate icon for each section
const getIconForSection = (label: string): string => {
  switch (label) {
    case 'Projects':
      return 'lucide:layout-grid'
    case 'About':
      return 'lucide:user'
    case 'Tech Stack':
      return 'lucide:code'
    default:
      return 'lucide:hash'
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
  
  // Create an intersection observer to detect which section is in view
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.3 // 30% of the section needs to be visible
  }
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, observerOptions)
  
  // Observe all sections
  sections.forEach(section => {
    const element = document.getElementById(section)
    if (element) {
      sectionObserver.observe(element)
    }
  })
  
  // Throttle scroll events for performance
  const handleScroll = useThrottleFn(() => {
    if (typeof window !== 'undefined') {
      // Show navbar after scrolling past half of the first viewport
      isVisible.value = window.scrollY > window.innerHeight * 0.5
      
      // If no section is detected as active (e.g., at the very top of the page)
      // and we're not on a project page, set the first visible section as active
      if (!activeSection.value && !isProjectPage.value && window.scrollY > 0) {
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
              activeSection.value = section
              break
            }
          }
        }
      }
    }
  }, 100) // Throttle to 100ms for smooth performance

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      // Disconnect the observer when component is unmounted
      sectionObserver.disconnect()
    })
  }
})

// Smooth scroll to section using native smooth scroll behavior
const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    // Provide immediate feedback (<100ms) per design principles
    activeSection.value = href.substring(1)
    
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
/* Respect user preferences for reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    transform: none !important;
  }
}
</style>