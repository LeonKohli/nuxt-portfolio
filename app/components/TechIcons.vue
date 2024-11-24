<template>
  <div class="absolute inset-0 h-screen pointer-events-none -z-10">
    <div 
      v-for="(icon, index) in techIcons" 
      :key="icon.name"
      class="absolute transition-all duration-300 opacity-0 hover:opacity-30 animate-fade-scale"
      :style="{
        fontSize: '120px',
        top: `${icon.position.top}%`,
        left: `${icon.position.left}%`,
        animationDelay: `${1500 + (index * 200)}ms`,
      }"
    >
      <Icon 
        :name="icon.name" 
        class="text-[#22c55e] [&>*]:!fill-current [&>*]:!stroke-current" 
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
    transform: scale(0.8);
  }
  100% {
    opacity: 0.12;
    transform: scale(1);
  }
}

.animate-fade-scale {
  animation: fadeScale 0.8s ease-out forwards;
  will-change: transform, opacity;
}
</style> 