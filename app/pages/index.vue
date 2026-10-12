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
  ogUrl: 'https://leonkohli.dev',
  twitterTitle: 'Leon Kohlhaußen - Full Stack Developer',
  twitterDescription: 'Portfolio of Leon Kohlhaußen - Full Stack Developer based in Potsdam, Germany',
  author: 'Leon Kohlhaußen',
})

// useSeoMeta no longer accepts keywords, so the tag goes through useHead.
useHead({
  meta: [{ name: 'keywords', content: 'LeonKohli, Full Stack Developer, Web Development, Potsdam, Germany, Software Engineer' }],
})
</script>
