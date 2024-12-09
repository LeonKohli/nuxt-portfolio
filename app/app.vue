<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black" role="document">
    <!-- Animated gradient backgrounds -->
    <div class="fixed inset-0 bg-gradient-radial from-emerald-500/20 via-violet-500/10 to-black" aria-hidden="true">
      <div
        class="absolute inset-0 bg-gradient-conic from-emerald-500/30 via-violet-500/20 to-transparent animate-spin-slow" />
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
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
  htmlAttrs: {
    lang: 'en'
  },
  title: 'Leon Kohlhaußen - Full Stack Developer & Security Enthusiast',
  meta: [
    { name: 'description', content: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany.' }
  ]
})
</script>

<style>
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 40%, var(--tw-gradient-to) 100%);
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
}
</style>
