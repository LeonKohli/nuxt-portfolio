import { useThrottleFn } from '@vueuse/core'

interface SpotlightStyle {
  background: string;
  transform: string;
}

export const useSpotlightEffect = (count: number = 1, throttleMs: number = 16) => {
  const spotlightStyles = ref<SpotlightStyle[]>(
    Array(count).fill({
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
      transform: 'translate(0%, 0%)'
    })
  )

  const updateSpotlight = (event: MouseEvent, index: number = 0) => {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const relativeX = ((event.clientX - rect.left) / rect.width) * 100
    const relativeY = ((event.clientY - rect.top) / rect.height) * 100

    spotlightStyles.value[index] = {
      background: `radial-gradient(circle at ${relativeX}% ${relativeY}%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`,
      transform: 'translate(0%, 0%)'
    }
  }

  // Throttle to 60fps (16ms) by default for smooth performance
  const handleMouseMove = useThrottleFn(updateSpotlight, throttleMs)

  const handleMouseLeave = (index: number = 0) => {
    spotlightStyles.value[index] = {
      background: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 60%)',
      transform: 'translate(0%, 0%)'
    }
  }

  return {
    spotlightStyles: count === 1 ? computed(() => spotlightStyles.value[0]) : spotlightStyles,
    handleMouseMove,
    handleMouseLeave
  }
}