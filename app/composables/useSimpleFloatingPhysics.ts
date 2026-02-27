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

const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [contenteditable="true"]'

/**
 * Simplified floating physics - drag with momentum, wall bounce, collision detection.
 * Uses document-level hit-testing so icons can live behind content (low z-index)
 * while remaining interactive in empty areas.
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

  // Cursor state — only reset cursor we set ourselves
  let cursorSetByUs = false

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

  // --- Hit testing helpers ---

  /** Find which icon (if any) is at the given client coordinates */
  function findIconAtPoint(clientX: number, clientY: number): number {
    const docX = clientX + window.scrollX
    const docY = clientY + window.scrollY

    for (let i = 0; i < elements.value.length; i++) {
      const el = elements.value[i]
      if (!el) continue
      if (docX >= el.x && docX <= el.x + size && docY >= el.y && docY <= el.y + size) {
        return i
      }
    }
    return -1
  }

  /** Check if the element (or an ancestor) is interactive content that should take priority */
  function isInteractiveContent(clientX: number, clientY: number): boolean {
    const el = document.elementFromPoint(clientX, clientY)
    if (!el) return false
    return !!el.closest(INTERACTIVE_SELECTOR)
  }

  // --- Drag mechanics ---

  function startDrag(index: number, clientX: number, clientY: number) {
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

    document.documentElement.style.cursor = 'grabbing'
    cursorSetByUs = true
  }

  function onMove(clientX: number, clientY: number) {
    if (!isDragging.value || dragIndex.value < 0) return
    const el = elements.value[dragIndex.value]
    if (!el) return

    const docX = clientX + window.scrollX
    const docY = clientY + window.scrollY

    el.x = docX - dragOffset.value.x
    el.y = docY - dragOffset.value.y
  }

  function onRelease() {
    isDragging.value = false
    dragIndex.value = -1
    document.documentElement.style.cursor = ''
    cursorSetByUs = false
  }

  function kick(index: number) {
    const el = elements.value[index]
    if (!el) return
    const angle = Math.random() * Math.PI * 2
    el.vx = Math.cos(angle) * 40
    el.vy = Math.sin(angle) * 40
  }

  // --- Document-level event listeners (hit-test based) ---

  useEventListener(document, 'mousedown', (e: MouseEvent) => {
    if (!isInteractive.value) return
    const iconIndex = findIconAtPoint(e.clientX, e.clientY)
    if (iconIndex < 0) return
    if (isInteractiveContent(e.clientX, e.clientY)) return

    e.preventDefault()
    startDrag(iconIndex, e.clientX, e.clientY)
  })

  useEventListener(document, 'touchstart', (e: TouchEvent) => {
    if (!isInteractive.value || !e.touches[0]) return
    const touch = e.touches[0]
    const iconIndex = findIconAtPoint(touch.clientX, touch.clientY)
    if (iconIndex < 0) return
    if (isInteractiveContent(touch.clientX, touch.clientY)) return

    e.preventDefault()
    startDrag(iconIndex, touch.clientX, touch.clientY)
  }, { passive: false })

  useEventListener(document, 'dblclick', (e: MouseEvent) => {
    if (!isInteractive.value) return
    const iconIndex = findIconAtPoint(e.clientX, e.clientY)
    if (iconIndex < 0) return
    if (isInteractiveContent(e.clientX, e.clientY)) return

    kick(iconIndex)
  })

  // Combined mousemove: drag tracking + cursor feedback
  useEventListener(window, 'mousemove', (e: MouseEvent) => {
    if (isDragging.value) {
      onMove(e.clientX, e.clientY)
      return
    }

    // Cursor feedback when hovering over an icon in empty space
    if (!isInteractive.value) return
    const iconIndex = findIconAtPoint(e.clientX, e.clientY)
    if (iconIndex >= 0 && !isInteractiveContent(e.clientX, e.clientY)) {
      document.documentElement.style.cursor = 'grab'
      cursorSetByUs = true
    } else if (cursorSetByUs) {
      document.documentElement.style.cursor = ''
      cursorSetByUs = false
    }
  })

  useEventListener(window, 'mouseup', onRelease)
  useEventListener(window, 'touchmove', (e) => {
    if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY)
  }, { passive: false })
  useEventListener(window, 'touchend', onRelease)

  // --- Collision detection ---

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
          const nx = dx / dist
          const ny = dy / dist

          const dvn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny

          if (dvn > 0) {
            const impulse = dvn * 0.8
            a.vx -= impulse * nx
            a.vy -= impulse * ny
            b.vx += impulse * nx
            b.vy += impulse * ny
          }

          const overlap = (diameter - dist) / 2 + 1
          a.x -= overlap * nx
          a.y -= overlap * ny
          b.x += overlap * nx
          b.y += overlap * ny
        }
      }
    }
  }

  // --- Physics loop ---

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

    resolveCollisions()
  })

  return { elements, isDragging, isInteractive, startDrag, kick }
}
