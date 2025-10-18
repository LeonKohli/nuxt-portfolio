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
            v-bind="createHandlers(index)"
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
interface NavItem {
  label: string
  href: string
}

const isVisible = ref(false)
const activeSection = ref('')
const navRef = ref<HTMLElement | null>(null)
const route = useRoute()
const isProjectPage = computed(() => route.path.startsWith('/projects/'))

const { spotlightStyles, createHandlers } = useSpotlightEffect(3)

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

const sections = navItems.map(item => item.href.substring(1))

sections.forEach(sectionId => {
  const el = ref(import.meta.client ? document.getElementById(sectionId) : null)
  useIntersectionObserver(el, ([entry]) => {
    if (entry?.isIntersecting) activeSection.value = sectionId
  }, { threshold: 0.3 })
})

if (import.meta.client) {
  const { height } = useWindowSize()
  const { y } = useScroll(window)
  const updateNavVisibility = useThrottleFn(() => {
    isVisible.value = y.value > height.value * 0.5
  }, 100)
  watch(y, updateNavVisibility, { immediate: true })
}

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
