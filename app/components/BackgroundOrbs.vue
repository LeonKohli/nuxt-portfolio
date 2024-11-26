<template>
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-1">
    <!-- Grid Pattern -->
    <div 
      class="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.02)_1px,transparent_1px)] overflow-hidden" 
      style="background-size: 8px 8px;"
    />
    
    <!-- Orbs with improved positioning -->
    <div 
      class="orb-1 fixed" 
      :style="{ 
        transform: `translate(${scrollY * 0.05}px, ${-scrollY * 0.02}px)`,
        opacity: Math.max(0, 1 - scrollY * 0.001)
      }"
    />
    <div 
      class="orb-2 fixed"
      :style="{ 
        transform: `translate(${-scrollY * 0.03}px, ${scrollY * 0.04}px)`,
        opacity: Math.max(0, 1 - scrollY * 0.001)
      }"
    />
    <div 
      class="orb-3 fixed"
      :style="{ 
        transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.03}px)`,
        opacity: Math.max(0, 1 - scrollY * 0.001)
      }"
    />
  </div>
</template>

<script setup lang="ts">
const scrollY = ref(0)

onMounted(() => {
  const updateScroll = () => {
    scrollY.value = window.scrollY
  }
  
  window.addEventListener('scroll', updateScroll, { passive: true })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })
})
</script>

<style scoped>
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
}

.orb-1 {
  width: 600px;
  height: 600px;
  top: -100px;
  right: -100px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.15), transparent 70%);
  animation: float 20s ease-in-out infinite;
  filter: blur(50px);
}

.orb-2 {
  width: 400px;
  height: 400px;
  bottom: -50px;
  left: -50px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.1), transparent 70%);
  animation: float 25s ease-in-out infinite reverse;
  filter: blur(50px);
}

.orb-3 {
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(34, 197, 94, 0.05), transparent 70%);
  animation: float 30s ease-in-out infinite;
  animation-delay: -10s;
  filter: blur(50px);
}
</style> 