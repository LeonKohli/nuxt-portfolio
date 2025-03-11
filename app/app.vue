<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black" role="document">
    <!-- Combined background with all gradient effects -->
    <div 
      class="fixed inset-0 bg-gradient-radial from-emerald-500/20 via-violet-500/10 to-black" 
      aria-hidden="true">
      <div 
        class="absolute inset-0 bg-gradient-conic from-emerald-500/30 via-violet-500/20 to-transparent animate-spin-slow" 
        aria-hidden="true" />
    </div>
    
    <!-- Animated orbs -->
    <BackgroundOrbs aria-hidden="true" />

    <!-- Navigation -->
    <Navbar />

    <!-- Main content -->
    <main id="main-content" class="relative z-10">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: '%s',
})


defineOgImageComponent('Frame')
</script>

<style>
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 40%, var(--tw-gradient-to) 100%);
  background-image: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1), transparent 50%);
  background-blend-mode: overlay;
}

.bg-gradient-conic {
  background: conic-gradient(from 0deg at 50% 50%, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%, var(--tw-gradient-to) 100%);
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
  will-change: transform;
}
</style>
