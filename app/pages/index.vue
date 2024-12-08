<template>
  <div class="overflow-x-hidden">
    <BackgroundOrbs />
    <div class="flex flex-col">
      <HeroSection />
      <ProjectsSection @select="selectedProject = $event" />
      <AboutSection />
      <TechStackSection />
      <FooterSection />
    </div>
    <ProjectModal 
      :project="selectedProject"
      @close="selectedProject = null"
    />
  </div>
</template>

<script setup lang="ts">
const selectedProject = ref<Project | null>(null)

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Leon Kohli - Full Stack Developer & Security Enthusiast',
})

useSeoMeta({
  description: 'Portfolio of Leon - Full Stack Developer and Security Enthusiast based in Potsdam, Germany. Specializing in full-stack development, cybersecurity, and modern web technologies.',
  ogTitle: 'Leon - Full Stack Developer & Security Enthusiast',
  ogDescription: 'Portfolio of Leon - Full Stack Developer and Security Enthusiast based in Potsdam, Germany',
  ogUrl: 'https://leonkohli.com',
  twitterTitle: 'Leon - Full Stack Developer & Security Enthusiast',
  twitterDescription: 'Portfolio of Leon - Full Stack Developer and Security Enthusiast based in Potsdam, Germany',
  robots: 'index, follow',
  author: 'Leon',
  keywords: 'Leon, Full Stack Developer, Security Enthusiast, Web Development, Cybersecurity, Potsdam, Germany, Software Engineer',
})
</script>