<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black" role="document">
    <!-- Simplified background gradient -->
    <div 
      class="fixed inset-0 bg-gradient-to-b from-emerald-900/20 via-black to-black" 
      aria-hidden="true">
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
/* Prevent overscroll bounce on mobile */
html, body {
  overscroll-behavior: none;
}

/* Ensure window scrolling works properly */
html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
}

/* Simple, Clean Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(4px);
}

/* Accessibility: Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.15s ease;
  }

  .page-enter-from,
  .page-leave-to {
    filter: none;
  }
}
</style>
