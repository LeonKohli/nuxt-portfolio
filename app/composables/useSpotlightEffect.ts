import { useThrottleFn } from '@vueuse/core'

export function useSpotlightEffect(): {
  spotlightStyle: ComputedRef<{ background: string; transform: string }>
  handleMouseMove: (event: MouseEvent) => void
  handleMouseLeave: () => void
}

export function useSpotlightEffect(count: number): {
  spotlightStyles: Ref<Array<{ background: string; transform: string }>>
  createHandlers: (index: number) => {
    onMousemove: (event: MouseEvent) => void
    onMouseleave: () => void
  }
}

export function useSpotlightEffect(count: number = 1): any {
  const spotlightStyles = ref(
    Array.from({ length: count }, () => ({
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
      transform: 'translate(0%, 0%)'
    }))
  )

  const createHandlers = (index: number) => {
    const onMousemove = useThrottleFn((event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      spotlightStyles.value[index] = {
        background: `radial-gradient(circle at ${x}% ${y}%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`,
        transform: 'translate(0%, 0%)'
      }
    }, 16)

    const onMouseleave = () => {
      spotlightStyles.value[index] = {
        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
        transform: 'translate(0%, 0%)'
      }
    }

    return { onMousemove, onMouseleave }
  }

  if (count === 1) {
    const { onMousemove, onMouseleave } = createHandlers(0)
    return {
      spotlightStyle: computed(() => spotlightStyles.value[0]),
      handleMouseMove: onMousemove,
      handleMouseLeave: onMouseleave
    }
  }

  return { spotlightStyles, createHandlers }
}
