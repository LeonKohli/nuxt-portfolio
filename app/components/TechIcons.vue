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
      class="absolute transition-transform"
      :class="[
        `float-animation-${index + 1}`,
        { 'visible': isMounted }
      ]"
      :style="{
        top: `${icon.position.top}%`,
        left: `${icon.position.left}%`,
        fontSize: `${iconSize}px`
      }"
    >
      <Icon 
        :name="icon.name" 
        :class="[
          'transform transition-all duration-500 hover:scale-110 hover:rotate-[360deg]',
          iconColorClass
        ]"
        :aria-label="icon.name.split(':')[1]"
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
  fullHeight?: boolean
  zIndex?: number
  iconColorClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => [
    { name: 'simple-icons:vuedotjs', position: { top: 10, left: 5 } },
    { name: 'simple-icons:nuxtdotjs', position: { top: 25, left: 85 } },
    { name: 'simple-icons:typescript', position: { top: 15, left: 35 } },
    { name: 'simple-icons:tailwindcss', position: { top: 35, left: 60 } },
    { name: 'simple-icons:python', position: { top: 65, left: 15 } },
    { name: 'simple-icons:postgresql', position: { top: 80, left: 75 } },
  ],
  iconSize: 120,
  fullHeight: true,
  zIndex: 1,
  iconColorClass: 'text-[#22c55e]'
})

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<style scoped>
@keyframes fadeScale {
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: var(--final-opacity);
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -15px); }
}

[class*='float-animation-'] {
  --final-opacity: 0.15;
  opacity: 0;
  will-change: transform, opacity;
}

.visible[class*='float-animation-'] {
  animation: 
    fadeScale 1s var(--fade-delay) forwards,
    float 3s ease-in-out calc(var(--fade-delay) + 1s) infinite;
}

[class*='float-animation-']:hover {
  --final-opacity: 0.3;
}

.float-animation-1 { --fade-delay: 0.1s; }
.float-animation-2 { --fade-delay: 0.4s; }
.float-animation-3 { --fade-delay: 0.7s; }
.float-animation-4 { --fade-delay: 1.0s; }
.float-animation-5 { --fade-delay: 1.3s; }
.float-animation-6 { --fade-delay: 1.6s; }

@media (prefers-reduced-motion: reduce) {
  .visible[class*='float-animation-'] {
    animation: fadeScale 0.8s ease-out forwards !important;
    transform: none !important;
  }
}
</style>