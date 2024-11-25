<template>
  <div>
    <BackgroundOrbs />
    <div class="flex flex-col">
      <HeroSection />
      <ProjectsSection @select="selectedProject = $event" />
      <AboutSection />
      <FooterSection />
    </div>
    <ProjectModal 
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { Project } from '~/types/portfolio'

const selectedProject = ref<Project | null>(null)

useHead({
  title: 'Leon Kohli - Full Stack Developer & Security Enthusiast',
  meta: [{ 
    name: 'description', 
    content: 'Portfolio of Leon Kohli - Full Stack Developer and Security Enthusiast based in Potsdam, Germany' 
  }]
})
</script>

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