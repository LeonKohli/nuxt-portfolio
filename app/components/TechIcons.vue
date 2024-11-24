<template>
  <div class="absolute inset-0 h-screen pointer-events-none -z-10">
    <div 
      v-for="(icon, index) in techIcons" 
      :key="icon.name"
      class="absolute transition-all duration-300 opacity-0 hover:opacity-30"
      :class="`float-animation-${index + 1}`"
      :style="{
        fontSize: '120px',
        top: `${icon.position.top}%`,
        left: `${icon.position.left}%`,
        animationDelay: `${1500 + (index * 200)}ms`,
      }"
    >
      <Icon 
        :name="icon.name" 
        class="text-[#22c55e] [&>*]:!fill-current [&>*]:!stroke-current transition-transform duration-500 hover:scale-110" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TechIcon {
  name: string
  position: {
    top: number
    left: number
  }
}

const techIcons: TechIcon[] = [
  { name: 'simple-icons:vuedotjs', position: { top: 10, left: 5 } },
  { name: 'simple-icons:nuxtdotjs', position: { top: 25, left: 85 } },
  { name: 'simple-icons:typescript', position: { top: 15, left: 35 } },
  { name: 'simple-icons:tailwindcss', position: { top: 35, left: 55 } },
  { name: 'simple-icons:python', position: { top: 70, left: 10 } },
  { name: 'simple-icons:postgresql', position: { top: 85, left: 80 } },
]
</script>

<style scoped>
@keyframes fadeScale {
  0% {
    opacity: 0;
    transform: scale(0.8) translate(0, 0);
  }
  100% {
    opacity: 0.12;
    transform: scale(1) translate(0, 0);
  }
}

/* Create unique floating animations for each icon */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(5deg); }
  50% { transform: translate(-5px, 20px) rotate(-5deg); }
  75% { transform: translate(-15px, -10px) rotate(2deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-15px, -20px) rotate(-3deg); }
  66% { transform: translate(10px, 15px) rotate(3deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-20px, 10px) rotate(-5deg); }
  75% { transform: translate(15px, -15px) rotate(5deg); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(15px, -25px) rotate(3deg); }
  66% { transform: translate(-10px, 10px) rotate(-3deg); }
}

@keyframes float-5 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(-10px, -20px) rotate(-2deg); }
  75% { transform: translate(20px, 10px) rotate(2deg); }
}

@keyframes float-6 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(20px, -10px) rotate(4deg); }
  66% { transform: translate(-15px, -15px) rotate(-4deg); }
}

/* Apply animations to icons */
.float-animation-1 {
  animation: fadeScale 0.8s ease-out forwards, float-1 20s ease-in-out infinite;
}

.float-animation-2 {
  animation: fadeScale 0.8s ease-out forwards, float-2 25s ease-in-out infinite;
}

.float-animation-3 {
  animation: fadeScale 0.8s ease-out forwards, float-3 22s ease-in-out infinite;
}

.float-animation-4 {
  animation: fadeScale 0.8s ease-out forwards, float-4 28s ease-in-out infinite;
}

.float-animation-5 {
  animation: fadeScale 0.8s ease-out forwards, float-5 24s ease-in-out infinite;
}

.float-animation-6 {
  animation: fadeScale 0.8s ease-out forwards, float-6 26s ease-in-out infinite;
}
</style> 