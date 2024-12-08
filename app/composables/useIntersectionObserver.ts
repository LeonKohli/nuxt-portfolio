export const useIntersectionObserver = (
  elementRef: Ref<HTMLElement | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverOptions = {}
) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1
  } = options

  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        callback(entries)
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    observer
  }
}

interface IntersectionObserverOptions {
  root?: HTMLElement | null
  rootMargin?: string
  threshold?: number | number[]
} 