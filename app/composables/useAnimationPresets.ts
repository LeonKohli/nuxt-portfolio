/**
 * Animation presets for @vueuse/motion
 * Provides reusable animation variants throughout the app
 */
export function useAnimationPresets() {
  const { animation } = useAppConfig()

  // Base animations
  const fade = {
    initial: { opacity: 0 },
    visibleOnce: {
      opacity: 1,
      transition: {
        duration: animation.duration.moderate / 1000,
        ease: animation.easing.smooth,
      },
    },
  }

  const slideUp = {
    initial: {
      opacity: 0,
      y: animation.transform.slideDistance.medium,
    },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animation.duration.moderate / 1000,
        ease: animation.easing.smooth,
      },
    },
  }

  const pop = {
    initial: { opacity: 0, scale: 0.9 },
    visibleOnce: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: animation.duration.moderate / 1000,
        ease: animation.easing.bounce,
      },
    },
  }

  /**
   * Add delay to any animation variant
   * @param variant - Base variant object
   * @param delay - Delay in seconds
   */
  const withDelay = (variant: any, delay: number) => ({
    ...variant,
    visibleOnce: {
      ...variant.visibleOnce,
      transition: {
        ...variant.visibleOnce.transition,
        delay,
      },
    },
  })

  /**
   * Creates staggered animation for lists
   * @param index - Item index
   * @param stagger - Stagger speed ('fast' | 'normal' | 'slow')
   * @param baseDelay - Base delay in seconds
   */
  const staggered = (
    index: number,
    stagger: 'fast' | 'normal' | 'slow' = 'normal',
    baseDelay = 0.2,
  ) => ({
    initial: { opacity: 0, y: animation.transform.slideDistance.large },
    visibleOnce: {
      opacity: 1,
      y: 0,
      transition: {
        delay: baseDelay + index * animation.stagger[stagger],
        duration: animation.duration.moderate / 1000,
        ease: animation.easing.smooth,
      },
    },
  })

  return {
    // Base presets
    fade,
    slideUp,
    pop,

    // Utility functions
    withDelay,
    staggered,
  }
}
