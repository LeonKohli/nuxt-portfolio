import type { CSSProperties, ComputedRef, Ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'

type SpotlightStyle = CSSProperties & {
  background: string
  transform: string
}

interface SpotlightHandlers {
  onMousemove: (event: MouseEvent) => void
  onMouseleave: () => void
}

interface SingleSpotlightReturn {
  spotlightStyle: ComputedRef<SpotlightStyle>
  handleMouseMove: (event: MouseEvent) => void
  handleMouseLeave: () => void
}

interface MultiSpotlightReturn {
  spotlightStyles: Ref<SpotlightStyle[]>
  createHandlers: (index: number) => SpotlightHandlers
}

/**
 * Creates spotlight effect that follows mouse position
 * @param count - Number of spotlights (default: 1)
 */
export function useSpotlightEffect(): SingleSpotlightReturn
export function useSpotlightEffect(count: number): MultiSpotlightReturn
export function useSpotlightEffect(count: number = 1): SingleSpotlightReturn | MultiSpotlightReturn {
  const { animation } = useAppConfig()
  const color = animation.colors.spotlight
  const throttle = animation.performance.throttle

  const spotlightStyles = ref<SpotlightStyle[]>(
    Array.from({ length: count }, () => ({
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
      transform: 'translate(0%, 0%)',
    })),
  )

  const createHandlers = (index: number): SpotlightHandlers => {
    const onMousemove = useThrottleFn((event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      spotlightStyles.value[index] = {
        background: `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent 60%)`,
        transform: 'translate(0%, 0%)',
      }
    }, throttle)

    const onMouseleave = () => {
      spotlightStyles.value[index] = {
        background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
        transform: 'translate(0%, 0%)',
      }
    }

    return { onMousemove, onMouseleave }
  }

  if (count === 1) {
    const { onMousemove, onMouseleave } = createHandlers(0)
    return {
      spotlightStyle: computed(() => spotlightStyles.value[0] as SpotlightStyle),
      handleMouseMove: onMousemove,
      handleMouseLeave: onMouseleave,
    }
  }

  return { spotlightStyles, createHandlers }
}
