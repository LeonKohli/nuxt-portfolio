import { useEventListener, useRafFn, usePreferredReducedMotion, useWindowScroll, useWindowSize } from '@vueuse/core'

export interface FloatingElement {
  x: number
  y: number
  vx: number
  vy: number
}

export interface FloatingOptions {
  /** Element size for bounds calculation */
  size: number
  /** Friction (0.9-0.99, higher = less friction) */
  friction?: number
  /** Wall bounce factor (0-1) */
  bounce?: number
  /** Document dimensions refs */
  documentWidth: Ref<number>
  documentHeight: Ref<number>
}

/**
 * Simplified floating physics - drag with momentum, wall bounce, collision detection
 * 204 lines vs 417 lines in the original
 */
export function useSimpleFloatingPhysics(
  initialPositions: { x: number; y: number }[],
  options: FloatingOptions
) {
  const { size, friction = 0.96, bounce = 0.7, documentWidth, documentHeight } = options

  const prefersReducedMotion = usePreferredReducedMotion()
  const isInteractive = computed(() => prefersReducedMotion.value !== 'reduce')
  const { width: winW, height: winH } = useWindowSize()
  const { y: scrollY } = useWindowScroll()
  const isMounted = useMounted()

  // Physics state for all elements
  const elements = ref<FloatingElement[]>(
    initialPositions.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }))
  )

  // Dragging state
  const isDragging = ref(false)
  const dragIndex = ref(-1)
  const dragOffset = ref({ x: 0, y: 0 })
  const lastPos = ref({ x: 0, y: 0 })

  // Initialize positions when bounds are ready
  watch([documentWidth, documentHeight, isMounted], () => {
    if (!isMounted.value || !documentWidth.value || !documentHeight.value) return

    initialPositions.forEach((pos, i) => {
      const el = elements.value[i]
      if (el && el.x === 0 && el.y === 0) {
        el.x = (pos.x / 100) * documentWidth.value
        el.y = (pos.y / 100) * documentHeight.value
      }
    })
  }, { immediate: true })

  // Start drag
  function startDrag(index: number, clientX: number, clientY: number) {
    if (!isInteractive.value) return
    const el = elements.value[index]
    if (!el) return

    const docX = clientX + window.scrollX
    const docY = clientY + window.scrollY

    isDragging.value = true
    dragIndex.value = index
    dragOffset.value = { x: docX - el.x, y: docY - el.y }
    lastPos.value = { x: el.x, y: el.y }
    el.vx = 0
    el.vy = 0
  }

  // Handle move
  function onMove(clientX: number, clientY: number) {
    if (!isDragging.value || dragIndex.value < 0) return
    const el = elements.value[dragIndex.value]
    if (!el) return

    const docX = clientX + window.scrollX
    const docY = clientY + window.scrollY

    el.x = docX - dragOffset.value.x
    el.y = docY - dragOffset.value.y
  }

  // End drag - velocity is already tracked in RAF loop, just release
  function onRelease() {
    isDragging.value = false
    dragIndex.value = -1
  }

  // Double-click kick
  function kick(index: number) {
    if (!isInteractive.value) return
    const el = elements.value[index]
    if (!el) return
    const angle = Math.random() * Math.PI * 2
    el.vx = Math.cos(angle) * 40
    el.vy = Math.sin(angle) * 40
  }

  // Global listeners
  useEventListener(window, 'mousemove', (e) => onMove(e.clientX, e.clientY))
  useEventListener(window, 'mouseup', onRelease)
  useEventListener(window, 'touchmove', (e) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: false })
  useEventListener(window, 'touchend', onRelease)

  // Collision detection - the fun part!
  function resolveCollisions() {
    const els = elements.value
    const diameter = size

    for (let i = 0; i < els.length; i++) {
      for (let j = i + 1; j < els.length; j++) {
        const a = els[i]!
        const b = els[j]!

        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < diameter && dist > 0) {
          // Collision normal
          const nx = dx / dist
          const ny = dy / dist

          // Relative velocity along normal
          const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny

          // Only resolve if moving toward each other
          if (dvn > 0) {
            const impulse = dvn * 0.8
            a.vx -= impulse * nx
            a.vy -= impulse * ny
            b.vx += impulse * nx
            b.vy += impulse * ny
          }

          // Push apart
          const overlap = (diameter - dist) / 2 + 1
          a.x -= overlap * nx
          a.y -= overlap * ny
          b.x += overlap * nx
          b.y += overlap * ny
        }
      }
    }
  }

  // Physics loop
  useRafFn(() => {
    if (!isMounted.value || prefersReducedMotion.value === 'reduce') return

    const rightBound = documentWidth.value - size
    const bottomBound = documentHeight.value - size
    const viewTop = scrollY.value - 300
    const viewBottom = scrollY.value + winH.value + 300

    elements.value.forEach((el, i) => {
      // Skip if far from viewport (unless dragging)
      if (i !== dragIndex.value && (el.y + size < viewTop || el.y > viewBottom)) return

      // Track velocity while dragging
      if (i === dragIndex.value && isDragging.value) {
        el.vx = (el.x - lastPos.value.x) * 1.2
        el.vy = (el.y - lastPos.value.y) * 1.2
        lastPos.value = { x: el.x, y: el.y }
        return
      }

      // Apply velocity
      el.x += el.vx
      el.y += el.vy

      // Friction
      el.vx *= friction
      el.vy *= friction

      // Stop tiny movements
      if (Math.abs(el.vx) < 0.1) el.vx = 0
      if (Math.abs(el.vy) < 0.1) el.vy = 0

      // Wall bounce
      if (el.x < 0) { el.x = 0; el.vx *= -bounce }
      else if (el.x > rightBound) { el.x = rightBound; el.vx *= -bounce }

      if (el.y < 0) { el.y = 0; el.vy *= -bounce }
      else if (el.y > bottomBound) { el.y = bottomBound; el.vy *= -bounce }
    })

    // Resolve collisions between icons
    resolveCollisions()
  })

  return { elements, isDragging, isInteractive, startDrag, kick }
}
