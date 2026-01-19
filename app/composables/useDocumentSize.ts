/**
 * Composable for tracking full document dimensions
 * Uses native ResizeObserver/MutationObserver with proper SSR handling
 */
export function useDocumentSize() {
  const width = ref(0)
  const height = ref(0)

  const updateDimensions = () => {
    width.value = Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth
    )
    height.value = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    )
  }

  // Only run on client
  if (import.meta.client) {
    let resizeObserver: ResizeObserver | null = null
    let mutationObserver: MutationObserver | null = null

    onMounted(() => {
      // Initial measurement
      updateDimensions()

      // Native ResizeObserver on body
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateDimensions)
      })
      resizeObserver.observe(document.body)

      // Native MutationObserver for DOM changes
      mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(updateDimensions)
      })
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      })
    })

    onUnmounted(() => {
      resizeObserver?.disconnect()
      mutationObserver?.disconnect()
    })
  }

  return { width: readonly(width), height: readonly(height) }
}
