<template>
  <div class="relative min-h-screen overflow-x-hidden font-mono antialiased text-white bg-black">
    <!-- Animated gradient backgrounds -->
    <div class="fixed inset-0 bg-gradient-radial from-[#22c55e]/10 via-black to-black" />
    
    <!-- Animated orbs -->
    <BackgroundOrbs />

    <!-- Navigation -->
    <TheNavbar />

    <!-- Content -->
    <div class="relative z-10">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 100%);
}
</style>
