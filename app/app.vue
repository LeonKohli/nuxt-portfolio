<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black" role="document">
    <!-- Animated gradient backgrounds -->
    <div class="fixed inset-0 bg-gradient-radial from-[#22c55e]/10 via-black to-black" aria-hidden="true" />
    
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
  htmlAttrs: {
    lang: 'en',
  }
})
</script>

<style>
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 100%);
}
</style>
