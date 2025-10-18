declare module 'nuxt/schema' {
  interface AppConfig {
    animation: {
      duration: {
        fast: number
        normal: number
        moderate: number
        slow: number
      }
      easing: {
        smooth: readonly [number, number, number, number]
        bounce: readonly [number, number, number, number]
      }
      stagger: {
        fast: number
        normal: number
        slow: number
      }
      transform: {
        slideDistance: {
          small: number
          medium: number
          large: number
        }
        scale: {
          subtle: number
          small: number
        }
        rotate: {
          small: number
        }
      }
      parallax: {
        small: number
        medium: number
        large: number
      }
      performance: {
        throttle: number
      }
      colors: {
        spotlight: string
      }
    }
  }
}

export {}
