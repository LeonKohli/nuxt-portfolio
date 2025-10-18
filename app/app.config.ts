export default defineAppConfig({
  animation: {
    duration: {
      fast: 200,
      normal: 400,
      moderate: 600,
      slow: 800,
    },
    easing: {
      smooth: [0.22, 1, 0.36, 1] as const,
      bounce: [0.2, 0.8, 0.2, 1] as const,
    },
    stagger: {
      fast: 0.05,
      normal: 0.08,
      slow: 0.12,
    },
    transform: {
      slideDistance: {
        small: 16,
        medium: 24,
        large: 32,
      },
      scale: {
        subtle: 1.05,
        small: 1.1,
      },
      rotate: {
        small: 8,
      },
    },
    parallax: {
      small: 50,
      medium: 80,
      large: 100,
    },
    performance: {
      throttle: 16,
    },
    colors: {
      spotlight: 'rgba(16, 185, 129, 0.15)',
    },
  },
})

