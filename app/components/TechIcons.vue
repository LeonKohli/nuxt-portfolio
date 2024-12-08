<template>
  <div 
    class="absolute inset-0 overflow-hidden pointer-events-none"
    :class="[
      fullHeight ? 'h-screen' : 'h-full',
      zIndex ? `-z-${zIndex}` : ''
    ]"
  >
    <div 
      v-for="(icon, index) in icons" 
      :key="icon.name"
      class="absolute transition-all duration-300"
      :class="[
        `float-animation-${index + 1}`,
        'opacity-[0.12] hover:opacity-[0.24]'
      ]"
      :style="{
        fontSize: `${iconSize}px`,
        top: `${icon.position.top}%`,
        left: `${icon.position.left}%`,
        animationDelay: `${startDelay + (index * delayIncrement)}ms`,
        opacity: scrollFade ? Math.max(0, 0.12 - scrollY * 0.001) : 0.12
      }"
    >
      <Icon 
        :name="icon.name" 
        :class="[
          'transition-transform duration-500 hover:scale-110 hover:rotate-[360deg]',
          iconColorClass
        ]"
        :aria-label="icon.name.split(':')[1]"
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

onMounted(() => {
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
    transform: scale(0.8) translate(0, 0);
  }
  100% {
    opacity: 0.12;
    transform: scale(1) translate(0, 0);
  }
}

/* Improved floating animations with smoother transitions */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(12px, -18px) rotate(6deg); }
  50% { transform: translate(-6px, 22px) rotate(-6deg); }
  75% { transform: translate(-18px, -12px) rotate(3deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-18px, -22px) rotate(-4deg); }
  66% { transform: translate(12px, 18px) rotate(4deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-22px, 12px) rotate(-6deg); }
  75% { transform: translate(18px, -18px) rotate(6deg); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(18px, -28px) rotate(4deg); }
  66% { transform: translate(-12px, 12px) rotate(-4deg); }
}

@keyframes float-5 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-12px, -22px) rotate(-3deg); }
  75% { transform: translate(22px, 12px) rotate(3deg); }
}

@keyframes float-6 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(22px, -12px) rotate(5deg); }
  66% { transform: translate(-18px, -18px) rotate(-5deg); }
}

/* Optimized animations with will-change */
.float-animation-1 {
  animation: fadeScale 0.8s ease-out forwards, float-1 20s ease-in-out infinite;
  will-change: transform, opacity;
}

.float-animation-2 {
  animation: fadeScale 0.8s ease-out forwards, float-2 25s ease-in-out infinite;
  will-change: transform, opacity;
}

.float-animation-3 {
  animation: fadeScale 0.8s ease-out forwards, float-3 22s ease-in-out infinite;
  will-change: transform, opacity;
}

.float-animation-4 {
  animation: fadeScale 0.8s ease-out forwards, float-4 28s ease-in-out infinite;
  will-change: transform, opacity;
}

.float-animation-5 {
  animation: fadeScale 0.8s ease-out forwards, float-5 24s ease-in-out infinite;
  will-change: transform, opacity;
}

.float-animation-6 {
  animation: fadeScale 0.8s ease-out forwards, float-6 26s ease-in-out infinite;
  will-change: transform, opacity;
}
</style>