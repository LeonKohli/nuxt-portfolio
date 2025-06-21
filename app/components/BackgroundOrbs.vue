<template>
  <div class="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    <!-- Simple Grid Pattern -->
    <div class="absolute inset-0 overflow-hidden grid-pattern" />
    
    <!-- Simple Animated Orbs -->
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />
  </div>
</template>

<script setup lang="ts">
// No complex logic needed
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

/* Base orb styles */
.orb {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(80px);
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -200px;
  right: -200px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.3), transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -100px;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.2), transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.15), transparent 70%);
  animation: float 30s ease-in-out infinite;
  animation-delay: -10s;
}

/* Disable animations for reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none;
  }
}
</style>