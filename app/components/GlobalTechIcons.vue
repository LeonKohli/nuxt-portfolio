<template>
  <div
    class="absolute top-0 left-0 right-0 z-[5] overflow-hidden pointer-events-none"
    :style="{ height: `${documentHeight}px`, minHeight: '100vh' }"
  >
    <div
      v-for="(icon, index) in icons"
      :key="icon.name"
      class="absolute will-change-transform select-none touch-none pointer-events-none"
      :class="{ 'opacity-100': isMounted, 'opacity-0': !isMounted }"
      :style="{
        transform: `translate(${elements[index]?.x || 0}px, ${elements[index]?.y || 0}px)`,
        transition: isDragging ? 'none' : 'opacity 0.5s ease-out',
        width: `${iconSize}px`,
        height: `${iconSize}px`
      }"
    >
      <div
        class="flex items-center justify-center w-full h-full"
        :class="!isDragging ? 'animate-float' : ''"
        :style="{ animationDelay: `${index * -0.8}s` }"
      >
        <Icon
          :name="icon.icon"
          class="w-full h-full pointer-events-none text-emerald-500/15 mix-blend-screen"
          :aria-label="icon.name"
          :size="`${iconSize}px`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechIcon {
  name: string
  icon: string
  initialPos: { x: number; y: number }
}

interface Props {
  iconSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 80,
})

// Get document dimensions
const { width: documentWidth, height: documentHeight } = useDocumentSize()
const isMounted = useMounted()

// All 12 tech stack icons with positions (percentages 0-100)
const icons: TechIcon[] = [
  { name: 'TypeScript', icon: 'simple-icons:typescript', initialPos: { x: 8, y: 3 } },
  { name: 'Vue.js', icon: 'simple-icons:vuedotjs', initialPos: { x: 85, y: 5 } },
  { name: 'Nuxt.js', icon: 'simple-icons:nuxtdotjs', initialPos: { x: 45, y: 8 } },
  { name: 'Python', icon: 'simple-icons:python', initialPos: { x: 12, y: 18 } },
  { name: 'Tailwind', icon: 'simple-icons:tailwindcss', initialPos: { x: 75, y: 22 } },
  { name: 'FastAPI', icon: 'simple-icons:fastapi', initialPos: { x: 5, y: 40 } },
  { name: 'PostgreSQL', icon: 'simple-icons:postgresql', initialPos: { x: 88, y: 45 } },
  { name: 'Docker', icon: 'simple-icons:docker', initialPos: { x: 15, y: 60 } },
  { name: 'Git', icon: 'simple-icons:git', initialPos: { x: 80, y: 65 } },
  { name: 'Linux', icon: 'simple-icons:linux', initialPos: { x: 10, y: 82 } },
  { name: 'Bash', icon: 'simple-icons:gnubash', initialPos: { x: 70, y: 88 } },
  { name: 'Flask', icon: 'simple-icons:flask', initialPos: { x: 40, y: 92 } },
]

const { elements, isDragging } = useSimpleFloatingPhysics(
  icons.map(i => i.initialPos),
  {
    size: props.iconSize,
    documentWidth,
    documentHeight,
    friction: 0.96,
    bounce: 0.7,
  }
)
</script>

<style scoped>
/* Subtle floating animation - very gentle up/down wobble */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-float {
    animation: none;
  }
}
</style>
