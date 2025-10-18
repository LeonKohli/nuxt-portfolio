export const useAnimateOnce = (options = {}) => {
  const target = ref<HTMLElement | null>(null)
  const hasAnimated = ref(false)
  const shouldAnimate = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        shouldAnimate.value = true
        stop()
      }
    },
    { threshold: 0.1, ...options }
  )

  return { target, shouldAnimate, hasAnimated }
}
