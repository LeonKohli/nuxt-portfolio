<template>
  <div class="relative min-h-screen font-mono antialiased text-white bg-black">
    <!-- Animated gradient backgrounds -->
    <div class="fixed inset-0 bg-gradient-radial from-[#22c55e]/10 via-black to-black" />
    
    <!-- Animated orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="orb-1" />
      <div class="orb-2" />
      <div class="orb-3" />
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <NuxtPage />
    </div>
  </div>
</template>

<style>
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

.orb-1 {
  position: absolute;
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
  position: absolute;
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
  position: absolute;
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

.bg-gradient-radial {
  background: radial-gradient(circle at center, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 30%, var(--tw-gradient-to) 100%);
}
</style>
