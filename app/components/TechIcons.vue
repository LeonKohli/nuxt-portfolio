<template>
  <div
    ref="containerRef"
    class="absolute inset-0 h-full overflow-hidden pointer-events-none"
  >
    <div
      v-for="(icon, index) in icons"
      :key="icon.name"
      class="absolute will-change-transform flex items-center justify-center select-none touch-none"
      :class="[
        { 'opacity-100': isMounted, 'opacity-0': !isMounted },
        isInteractive ? 'cursor-grab active:cursor-grabbing pointer-events-auto' : 'pointer-events-none'
      ]"
      :style="{
        transform: `translate(${elements[index]?.x || 0}px, ${elements[index]?.y || 0}px)`,
        transition: isDragging ? 'none' : 'opacity 0.5s ease-out',
        width: `${iconSize}px`,
        height: `${iconSize}px`
      }"
      @mousedown.stop="(e) => startDrag(index, e.clientX, e.clientY)"
      @touchstart.stop.prevent="(e) => e.touches[0] && startDrag(index, e.touches[0].clientX, e.touches[0].clientY)"
      @dblclick.stop="kick(index)"
    >
      <Icon
        :name="icon.name"
        :class="[
          'transition-colors duration-300 w-full h-full pointer-events-none',
          iconColorClass
        ]"
        :aria-label="icon.name.split(':')[1]"
        :size="`${iconSize}px`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InitialPosition } from '~/composables/useFloatingPhysics'

interface TechIcon {
  name: string
  initialPos: InitialPosition
}

interface Props {
  icons?: TechIcon[]
  iconSize?: number
  iconColorClass?: string
  /** Use container bounds instead of window (for smaller containers like footer) */
  useContainerBounds?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icons: () => [
    { name: 'simple-icons:vuedotjs', initialPos: { x: 5, y: 10 } },
    { name: 'simple-icons:nuxtdotjs', initialPos: { x: 85, y: 25 } },
    { name: 'simple-icons:typescript', initialPos: { x: 35, y: 15 } },
    { name: 'simple-icons:tailwindcss', initialPos: { x: 60, y: 35 } },
    { name: 'simple-icons:python', initialPos: { x: 15, y: 65 } },
    { name: 'simple-icons:postgresql', initialPos: { x: 75, y: 80 } },
    { name: 'simple-icons:docker', initialPos: { x: 90, y: 55 } },
    { name: 'simple-icons:linux', initialPos: { x: 45, y: 85 } },
  ],
  iconSize: 100,
  iconColorClass: 'text-[#22c55e]/20',
  useContainerBounds: false,
})

const isMounted = useMounted()
const containerRef = ref<HTMLElement | null>(null)

// Extract initial positions from icons
const initialPositions = computed(() =>
  props.icons.map(icon => icon.initialPos)
)

// Use the physics composable
const { elements, isDragging, isInteractive, startDrag, kick } = useFloatingPhysics(
  initialPositions.value,
  {
    radius: props.iconSize / 2,
    containerRef,
    useContainerBounds: props.useContainerBounds,
    friction: 0.98,
    maxVelocity: 60,
    wallBounce: 0.8,
    collisionBounce: 0.85,
    throwMultiplier: 1.5,
    ambientDrift: true,
  }
)
</script>
