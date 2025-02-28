<template>
  <div class="overflow-x-hidden">
    <div class="flex flex-col">
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <TechStackSection />
      <FooterSection />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Leon Kohlhaußen - Full Stack Developer',
  description: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany.',
  ogTitle: 'Leon Kohlhaußen - Full Stack Developer',
  ogDescription: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany',
  ogUrl: 'https://leonkohli.com',
  twitterTitle: 'Leon Kohlhaußen - Full Stack Developer',
  twitterDescription: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany',
  author: 'Leon Kohlhaußen',
  keywords: 'LeonKohli, Full Stack Developer, Web Development, Potsdam, Germany, Software Engineer',
})

defineOgImageComponent('Frame')
</script>