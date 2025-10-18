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
   * Smooth card hover animation with lift effect
   * Uses spring physics for natural motion
   */
  const cardHover = {
    initial: {
      y: 0,
      scale: 1,
    },
    hovered: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  }

  /**
   * Subtle scale hover for interactive elements
   */
  const scaleHover = (scaleValue = animation.transform.scale.subtle) => ({
    initial: { scale: 1 },
    hovered: {
      scale: scaleValue,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      },
    },
    tapped: {
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 20,
      },
    },
  })

  /**
   * Button hover with lift and scale
   */
  const buttonHover = {
    initial: {
      y: 0,
      scale: 1,
    },
    hovered: {
      y: -2,
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      },
    },
    tapped: {
      y: 0,
      scale: 0.98,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 20,
      },
    },
  }

  /**
   * Icon hover with rotation and scale
   */
  const iconHover = {
    initial: {
      scale: 1,
      rotate: 0,
    },
    hovered: {
      scale: animation.transform.scale.small,
      rotate: animation.transform.rotate.small,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20,
      },
    },
  }

  /**
   * Fade hover for opacity transitions
   */
  const fadeHover = (
    initialOpacity = 0,
    hoveredOpacity = 1,
    duration = animation.duration.fast / 1000,
  ) => ({
    initial: { opacity: initialOpacity },
    hovered: {
      opacity: hoveredOpacity,
      transition: {
        duration,
        ease: animation.easing.smooth,
      },
    },
  })

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

    // Hover presets
    cardHover,
    scaleHover,
    buttonHover,
    iconHover,
    fadeHover,

    // Utility functions
    withDelay,
    staggered,
  }
}
