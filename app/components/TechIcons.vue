<template>
  <div 
    class="absolute inset-0 overflow-hidden pointer-events-none"
    :class="[
      fullHeight ? 'h-screen' : 'h-full',
      zIndex ? `-z-${zIndex}` : '',
      { 'mounted': isMounted }
    ]"
  >
    <div 
      v-for="(icon, index) in icons" 
      :key="icon.name"
      class="absolute"
      :class="[
        `float-animation-${index + 1}`,
        { 'visible': isMounted }
      ]"
      :style="{
        fontSize: `${iconSize}px`,
        top: `${icon.position.top}%`,
        left: `${icon.position.left}%`,
      }"
    >
      <Icon 
        :name="icon.name" 
        :class="[
          'transition-transform duration-500 hover:scale-110 hover:rotate-[360deg]',
          iconColorClass
        ]"
        :aria-label="icon.name.split(':')[1]"
        loading="lazy"
        :width="iconSize"
        :height="iconSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechIcon {
  name: string
  position: {
    top: number
    left: number
  }
}

interface Props {
  icons?: TechIcon[]
  iconSize?: number
  startDelay?: number
  delayIncrement?: number
  fullHeight?: boolean
  scrollFade?: boolean
  zIndex?: number
  iconColorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => [
    { name: 'simple-icons:vuedotjs', position: { top: 15, left: 8 } },
    { name: 'simple-icons:nuxtdotjs', position: { top: 28, left: 82 } },
    { name: 'simple-icons:typescript', position: { top: 18, left: 38 } },
    { name: 'simple-icons:tailwindcss', position: { top: 38, left: 58 } },
    { name: 'simple-icons:python', position: { top: 68, left: 12 } },
    { name: 'simple-icons:postgresql', position: { top: 82, left: 78 } },
  ],
  iconSize: 120,
  startDelay: 1000,
  delayIncrement: 150,
  fullHeight: true,
  scrollFade: true,
  zIndex: 1,
  iconColorClass: 'text-[#22c55e]'
})

const scrollY = ref(0)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  
  if (props.scrollFade) {
    const updateScroll = useThrottleFn(() => {
      scrollY.value = window.scrollY
    }, 16) // ~60fps

    window.addEventListener('scroll', updateScroll, { passive: true })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', updateScroll)
    })
  }
})
</script>

<style scoped>
@keyframes fadeScale {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: var(--final-opacity);
    transform: scale(1);
  }
}

/* Base animation classes */
[class*='float-animation-'] {
  --final-opacity: 0.12;
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

/* Individual animations with delays */
.visible.float-animation-1 { animation: fadeScale 1s 0.1s forwards; }
.visible.float-animation-2 { animation: fadeScale 1s 0.4s forwards; }
.visible.float-animation-3 { animation: fadeScale 1s 0.7s forwards; }
.visible.float-animation-4 { animation: fadeScale 1s 1.0s forwards; }
.visible.float-animation-5 { animation: fadeScale 1s 1.3s forwards; }
.visible.float-animation-6 { animation: fadeScale 1s 1.6s forwards; }

/* Hover effect */
[class*='float-animation-']:hover {
  --final-opacity: 0.24;
}

/* Float animations */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -10px); }
}

.visible[class*='float-animation-'] {
  animation: fadeScale 1s forwards, float 3s ease-in-out infinite;
  animation-delay: var(--fade-delay), calc(var(--fade-delay) + 1s);
}

/* Set individual delays */
.float-animation-1 { --fade-delay: 0.1s; }
.float-animation-2 { --fade-delay: 0.4s; }
.float-animation-3 { --fade-delay: 0.7s; }
.float-animation-4 { --fade-delay: 1.0s; }
.float-animation-5 { --fade-delay: 1.3s; }
.float-animation-6 { --fade-delay: 1.6s; }

/* Prevent animation on reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  [class*='float-animation-'] {
    animation: fadeScale 0.8s ease-out forwards !important;
    transform: none !important;
  }
}
</style>