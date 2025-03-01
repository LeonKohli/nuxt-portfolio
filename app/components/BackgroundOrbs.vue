<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <!-- Grid Pattern -->
    <div 
      class="absolute inset-0 overflow-hidden grid-pattern" 
    />
    
    <!-- Animated Orbs -->
    <div 
      v-for="(orb, index) in orbs" 
      :key="index"
      class="fixed"
      :class="`orb-${index + 1}`"
      :style="{ 
        transform: `translate(${orb.x * scrollY}px, ${orb.y * scrollY}px)`,
        opacity: Math.max(orb.minOpacity, orb.maxOpacity - scrollY * 0.0005)
      }"
    />
  </div>
</template>

<script setup lang="ts">
interface Orb {
  x: number
  y: number
  minOpacity: number
  maxOpacity: number
}

// Define orb configurations
const orbs: Orb[] = [
  { x: 0.02, y: -0.01, minOpacity: 0.5, maxOpacity: 1.0 },
  { x: -0.015, y: 0.02, minOpacity: 0.4, maxOpacity: 0.8 },
  { x: 0.01, y: -0.015, minOpacity: 0.3, maxOpacity: 0.6 }
]

const scrollY = ref(0)

// Use VueUse's useWindowScroll for better scroll handling
const { y } = useWindowScroll()
watch(y, (newY) => {
  scrollY.value = newY
})

// Handle reduced motion preference
const prefersReducedMotion = usePreferredReducedMotion()

// Determine if mobile for responsive grid sizing
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
</script>

<style scoped>
/* Grid Pattern with improved visibility */
.grid-pattern {
  background-image: 
    linear-gradient(rgba(34, 197, 94, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.08) 1px, transparent 1px);
  background-size: v-bind('isMobile ? "6px 6px" : "10px 10px"');
  transition: background-size 0.3s ease;
}

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

.orb-1, .orb-2, .orb-3 {
  position: fixed;
  pointer-events: none;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out;
  border-radius: 50%;
  filter: blur(50px);
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -100px;
  right: -100px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.3), transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -50px;
  left: -50px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.1), transparent 70%);
  animation: float 30s ease-in-out infinite;
  animation-delay: -10s;
}

/* Disable animations when reduced motion is preferred */
@media (prefers-reduced-motion: reduce) {
  .orb-1, .orb-2, .orb-3 {
    animation: none;
    transition: none;
    transform: none !important;
  }
  
  .grid-pattern {
    transition: none;
  }
}
</style>