<template>
  <div
    class="absolute top-0 left-0 right-0 z-[5] overflow-hidden pointer-events-none"
    :style="{ height: `${documentHeight}px`, minHeight: '100vh' }"
  >
    <div
      v-for="(icon, index) in allIcons"
      :key="icon.id"
      ref="iconRefs"
      class="absolute will-change-transform select-none touch-none pointer-events-none"
      :style="{
        transform: `translate(${elements[index]?.x || 0}px, ${elements[index]?.y || 0}px)`,
        width: `${iconSize}px`,
        height: `${iconSize}px`
      }"
    >
      <div
        v-if="positioned"
        :class="icon.visible ? 'star-appear' : 'opacity-0'"
        :style="{ '--appear-delay': `${icon.appearDelay}ms` }"
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
  </div>
</template>

<script setup lang="ts">
interface TechIcon {
  id: string
  name: string
  icon: string
  initialPos: { x: number; y: number }
  visible: boolean
  appearDelay: number
}

interface Props {
  iconSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  iconSize: 80,
})

const { width: documentWidth, height: documentHeight } = useDocumentSize()

const baseIcons: Omit<TechIcon, 'id' | 'visible' | 'appearDelay'>[] = [
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

// Reactive icon list — starts with base, grows when user clicks tech stack
const allIcons = ref<TechIcon[]>(
  baseIcons.map((icon, i) => ({
    ...icon,
    id: `base-${i}`,
    visible: false,
    appearDelay: ((i * 7 + 3) % baseIcons.length) * 80 + (i % 3) * 30,
  }))
)

const positioned = computed(() => documentWidth.value > 0 && documentHeight.value > 0)

const { elements, isDragging, addElement } = useSimpleFloatingPhysics(
  allIcons.value.map(i => i.initialPos),
  {
    size: props.iconSize,
    documentWidth,
    documentHeight,
    friction: 0.96,
    bounce: 0.7,
  }
)

// Viewport visibility tracking for entrance animation
const iconRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null
let nextSpawnId = 0

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        const idx = iconRefs.value.indexOf(el)
        if (idx !== -1 && !allIcons.value[idx]!.visible) {
          allIcons.value[idx]!.visible = true
          observer!.unobserve(el)
        }
      }
    },
    { rootMargin: '50px' }
  )

  for (const el of iconRefs.value) {
    if (el) observer.observe(el)
  }
})

// Watch for new icon refs (from spawned icons) and observe them
watch(() => iconRefs.value.length, () => {
  if (!observer) return
  for (const el of iconRefs.value) {
    if (el) observer.observe(el)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})

/**
 * Spawn new background icons that burst from a screen position.
 * Called by TechStackSection on click.
 */
function spawnIcons(icon: string, screenX: number, screenY: number, count = 3) {
  const absX = screenX + window.scrollX
  const absY = screenY + window.scrollY

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6
    const speed = 15 + Math.random() * 25

    const id = `spawn-${nextSpawnId++}`
    allIcons.value.push({
      id,
      name: id,
      icon,
      initialPos: { x: 0, y: 0 }, // not used — we set position via addElement
      visible: true, // immediately visible (star-appear plays instantly)
      appearDelay: 0,
    })

    addElement(
      absX - props.iconSize / 2,
      absY - props.iconSize / 2,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
    )
  }
}

// Expose globally via nuxtApp so sibling components can call it
const nuxtApp = useNuxtApp()
nuxtApp.$spawnTechIcons = spawnIcons
</script>

<style scoped>
@keyframes star-appear {
  0% {
    opacity: 0;
    transform: scale(0);
    filter: blur(8px) brightness(2);
  }
  60% {
    opacity: 1;
    transform: scale(1.3);
    filter: blur(0px) brightness(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0px) brightness(1);
  }
}

.star-appear {
  animation: star-appear 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: var(--appear-delay);
}

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

@media (prefers-reduced-motion: reduce) {
  .star-appear {
    animation: none;
    opacity: 1;
  }

  .animate-float {
    animation: none;
  }
}
</style>
