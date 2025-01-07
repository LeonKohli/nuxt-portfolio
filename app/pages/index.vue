<template>
  <div class="overflow-x-hidden">
    <BackgroundOrbs />
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
  description: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany.',
  ogTitle: 'Leon Kohlhaußen - Full Stack Developer & Security Enthusiast',
  ogDescription: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany',
  ogUrl: 'https://leonkohli.com',
  twitterTitle: 'Leon Kohlhaußen - Full Stack Developer & Security Enthusiast',
  twitterDescription: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany',
  robots: 'index, follow',
  author: 'Leon Kohlhaußen',
  keywords: 'LeonKohli, Full Stack Developer, Web Development, Potsdam, Germany, Software Engineer',
})
</script>