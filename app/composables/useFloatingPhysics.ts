import { useWindowSize, useRafFn, useEventListener, usePreferredReducedMotion, useElementVisibility } from '@vueuse/core'
import type { Ref } from 'vue'

export interface PhysicsElement {
  x: number
  y: number
  vx: number
  vy: number
}

export interface InitialPosition {
  x: number // percentage 0-100
  y: number // percentage 0-100
}

export interface PhysicsOptions {
  /** Element radius for collision detection */
  radius: number
  /** Friction coefficient (0-1, higher = more friction) */
  friction?: number
  /** Maximum velocity */
  maxVelocity?: number
  /** Bounce dampening on wall collision (0-1) */
  wallBounce?: number
  /** Bounce dampening on element collision (0-1) */
  collisionBounce?: number
  /** Throw velocity multiplier for drag release */
  throwMultiplier?: number
  /** Enable ambient drift when elements are nearly stationary */
  ambientDrift?: boolean
  /** Container element ref for visibility detection */
  containerRef?: Ref<HTMLElement | null>
}

interface DraggingState {
  index: number
  offsetX: number
  offsetY: number
  lastX: number
  lastY: number
}

const DEFAULT_OPTIONS: Required<Omit<PhysicsOptions, 'containerRef'>> = {
  radius: 50,
  friction: 0.98,
  maxVelocity: 60,
  wallBounce: 0.8,
  collisionBounce: 0.9,
  throwMultiplier: 1.5,
  ambientDrift: true,
}

/**
 * Composable for floating physics simulation with collision detection
 * Handles wall bouncing, element-to-element collisions, and drag interactions
 */
export function useFloatingPhysics(
  initialPositions: InitialPosition[],
  options: PhysicsOptions
) {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  // Accessibility
  const prefersReducedMotion = usePreferredReducedMotion()
  const isInteractive = computed(() => prefersReducedMotion.value !== 'reduce')

  // Viewport
  const { width: winW, height: winH } = useWindowSize()
  const isMounted = useMounted()

  // Visibility (for performance - pause when off-screen)
  const isVisible = options.containerRef
    ? useElementVisibility(options.containerRef)
    : ref(true)

  // Physics state
  const elements = ref<PhysicsElement[]>(
    initialPositions.map(() => ({
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }))
  )

  // Dragging state
  const isDragging = ref(false)
  const draggingState = ref<DraggingState | null>(null)

  // Initialize positions based on viewport
  watch([winW, winH, isMounted], () => {
    if (!isMounted.value) return

    initialPositions.forEach((pos, i) => {
      const el = elements.value[i]
      if (!el) return

      // Only reset if at origin (initial state)
      if (Math.abs(el.x) < 1 && Math.abs(el.y) < 1) {
        el.x = (pos.x / 100) * winW.value
        el.y = (pos.y / 100) * winH.value
      }
    })
  }, { immediate: true })

  // --- Collision Detection ---

  function detectAndResolveCollisions() {
    const count = elements.value.length
    const diameter = opts.radius * 2

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = elements.value[i]!
        const b = elements.value[j]!

        // Calculate distance between centers
        const dx = b.x - a.x
        const dy = b.y - a.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Check collision (using center-to-center distance vs combined radii)
        if (distance < diameter && distance > 0) {
          // Collision normal (direction from a to b)
          const nx = dx / distance
          const ny = dy / distance

          // Relative velocity
          const dvx = a.vx - b.vx
          const dvy = a.vy - b.vy

          // Relative velocity along collision normal
          const dvn = dvx * nx + dvy * ny

          // Only resolve if objects are moving toward each other
          if (dvn > 0) {
            // Impulse scalar (assuming equal mass)
            const impulse = dvn * opts.collisionBounce

            // Apply impulse to velocities
            a.vx -= impulse * nx
            a.vy -= impulse * ny
            b.vx += impulse * nx
            b.vy += impulse * ny
          }

          // Separate overlapping elements (push apart)
          const overlap = diameter - distance
          const separationX = (overlap / 2 + 1) * nx
          const separationY = (overlap / 2 + 1) * ny

          a.x -= separationX
          a.y -= separationY
          b.x += separationX
          b.y += separationY
        }
      }
    }
  }

  // --- Interactions ---

  function startDrag(index: number, clientX: number, clientY: number) {
    if (!isInteractive.value) return

    const el = elements.value[index]
    if (!el) return

    isDragging.value = true
    draggingState.value = {
      index,
      offsetX: clientX - el.x,
      offsetY: clientY - el.y,
      lastX: el.x,
      lastY: el.y,
    }

    // Stop physics movement while dragging
    el.vx = 0
    el.vy = 0
  }

  function onMove(clientX: number, clientY: number) {
    if (!isDragging.value || !draggingState.value) return

    const { index, offsetX, offsetY } = draggingState.value
    const el = elements.value[index]

    if (el) {
      el.x = clientX - offsetX
      el.y = clientY - offsetY
    }
  }

  function onRelease() {
    isDragging.value = false
    draggingState.value = null
  }

  function kick(index: number) {
    if (!isInteractive.value) return

    const el = elements.value[index]
    if (!el) return

    // Random high velocity in a random direction
    const angle = Math.random() * Math.PI * 2
    const force = opts.maxVelocity * 1.5

    el.vx = Math.cos(angle) * force
    el.vy = Math.sin(angle) * force
  }

  // Global event listeners for drag
  useEventListener(window, 'mousemove', (e) => onMove(e.clientX, e.clientY))
  useEventListener(window, 'mouseup', onRelease)
  useEventListener(window, 'touchmove', (e) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: false })
  useEventListener(window, 'touchend', onRelease)

  // --- Physics Loop ---

  useRafFn(() => {
    // Skip when: not mounted, reduced motion, or not visible
    if (!isMounted.value || prefersReducedMotion.value === 'reduce' || !isVisible.value) {
      return
    }

    const rightBound = winW.value - opts.radius * 2
    const bottomBound = winH.value - opts.radius * 2

    elements.value.forEach((el, i) => {
      // Handle dragging element
      if (isDragging.value && draggingState.value?.index === i) {
        // Calculate instantaneous velocity for throw
        el.vx = (el.x - draggingState.value.lastX) * opts.throwMultiplier
        el.vy = (el.y - draggingState.value.lastY) * opts.throwMultiplier

        // Update last position
        draggingState.value.lastX = el.x
        draggingState.value.lastY = el.y
        return
      }

      // Physics integration
      el.x += el.vx
      el.y += el.vy

      // Friction
      el.vx *= opts.friction
      el.vy *= opts.friction

      // Velocity cap
      el.vx = Math.max(Math.min(el.vx, opts.maxVelocity), -opts.maxVelocity)
      el.vy = Math.max(Math.min(el.vy, opts.maxVelocity), -opts.maxVelocity)

      // Wall bouncing
      if (el.x < 0) {
        el.x = 0
        el.vx *= -opts.wallBounce
      } else if (el.x > rightBound) {
        el.x = rightBound
        el.vx *= -opts.wallBounce
      }

      if (el.y < 0) {
        el.y = 0
        el.vy *= -opts.wallBounce
      } else if (el.y > bottomBound) {
        el.y = bottomBound
        el.vy *= -opts.wallBounce
      }

      // Ambient drift (subtle movement when nearly stationary)
      if (opts.ambientDrift && Math.abs(el.vx) < 0.1 && Math.abs(el.vy) < 0.1) {
        el.vx += (Math.random() - 0.5) * 0.02
        el.vy += (Math.random() - 0.5) * 0.02
      }
    })

    // Detect and resolve collisions between elements
    detectAndResolveCollisions()
  })

  return {
    elements,
    isDragging,
    isInteractive,
    startDrag,
    kick,
  }
}
