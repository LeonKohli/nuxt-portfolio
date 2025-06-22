/**
 * Composable for one-time animations that don't re-trigger on scroll
 * Uses VueUse's useIntersectionObserver for better control
 */
export const useAnimateOnce = (options: IntersectionObserverInit = {}) => {
  const target = ref<HTMLElement | null>(null)
  const hasAnimated = ref(false)
  const shouldAnimate = ref(false)
  
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      // Only animate once when element comes into view
      if (isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        shouldAnimate.value = true
        // Stop observing after animation triggers to save resources
        stop()
      }
    },
    {
      threshold: 0.1,
      ...options
    }
  )
  
  return {
    target,
    shouldAnimate,
    hasAnimated
  }
}