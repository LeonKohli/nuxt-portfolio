<template>
  <div ref="orbContainer" class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <!-- Simple Grid Pattern -->
    <div class="absolute inset-0 overflow-hidden grid-pattern" />
    
    <!-- Simple Animated Orbs with Parallax -->
    <div class="orb-wrapper" :style="orb1Style">
      <div class="orb orb-1" />
    </div>
    <div class="orb-wrapper" :style="orb2Style">
      <div class="orb orb-2" />
    </div>
    <div class="orb-wrapper" :style="orbCenterStyle">
      <div class="orb orb-center" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Track scroll for orb darkening effect
const { y: scrollY } = useWindowScroll()

// Track visibility to pause animations when not in view
const orbContainer = ref<HTMLElement | null>(null)
const isVisible = useElementVisibility(orbContainer, { threshold: 0 })

// Calculate parallax effects for each orb with maximum movement limits
const orb1Style = computed(() => {
  const darkness = Math.max(0.7, 1 - scrollY.value * 0.0001)
  const opacity = Math.max(0.8, 1 - scrollY.value * 0.00005)
  // Limit movement to max 100px in any direction
  const moveX = Math.min(100, Math.max(-100, scrollY.value * 0.05))
  const moveY = Math.min(100, Math.max(-100, scrollY.value * -0.08))
  return {
    filter: `brightness(${darkness})`,
    opacity,
    transform: `translate(${moveX}px, ${moveY}px)`
  }
})

const orb2Style = computed(() => {
  const darkness = Math.max(0.65, 1 - scrollY.value * 0.0001)
  const opacity = Math.max(0.75, 1 - scrollY.value * 0.00005)
  // Limit movement to max 80px in any direction
  const moveX = Math.min(80, Math.max(-80, scrollY.value * -0.04))
  const moveY = Math.min(80, Math.max(-80, scrollY.value * 0.06))
  return {
    filter: `brightness(${darkness})`,
    opacity,
    transform: `translate(${moveX}px, ${moveY}px)`
  }
})

// Center orb with minimal movement
const orbCenterStyle = computed(() => {
  const darkness = Math.max(0.8, 1 - scrollY.value * 0.00005)
  const opacity = Math.max(0.9, 1 - scrollY.value * 0.00002)
  // Very subtle movement for center orb
  const moveX = Math.min(20, Math.max(-20, scrollY.value * 0.01))
  const moveY = Math.min(20, Math.max(-20, scrollY.value * -0.01))
  return {
    filter: `brightness(${darkness})`,
    opacity,
    transform: `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`
  }
})
</script>

<style scoped>
/* Simple grid pattern */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
  background-size: 10px 10px;
}

/* Simple floating animation */
@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(30px, -50px);
  }
  66% {
    transform: translate(-20px, 20px);
  }
}

/* Wrapper for parallax movement */
.orb-wrapper {
  position: fixed;
  pointer-events: none;
  transition: transform 0.15s ease-out, filter 0.5s ease, opacity 0.5s ease;
}

/* Base orb styles */
.orb {
  position: relative;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(80px);
  will-change: transform;
}

/* Position wrappers - grid pattern is child 1 */
.orb-wrapper:nth-child(2) {
  top: -200px;
  right: -200px;
}

.orb-wrapper:nth-child(3) {
  bottom: -100px;
  left: -100px;
}

.orb-wrapper:nth-child(4) {
  top: 50%;
  left: 50%;
}

/* Orb styles */
.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.3), transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.orb-center {
  width: 500px;
  height: 500px;
  margin-left: -250px;
  margin-top: -250px;
  background: radial-gradient(circle at center, rgba(16, 185, 129, 0.25), transparent 60%);
  animation: float 35s ease-in-out infinite;
  animation-delay: -15s;
  filter: blur(100px);
}

/* Disable animations for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none;
  }
}
</style>