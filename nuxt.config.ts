// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-12-09',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/content'
  ],
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },
  colorMode: {
    classPrefix: '',
    classSuffix: '',
  },
  app: {
    head: {
      script: process.env.NODE_ENV === 'production' ? [
        {
          src: process.env.NUXT_PUBLIC_UMAMI_URL,
          defer: true,
          'data-website-id': process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID
        }
      ] : []
    }
  }
})