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
    '@nuxt/content',
    '@nuxtjs/seo',
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
  },
  site: {
    url: 'https://leonkohli.dev',
    description: 'Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.',
  },
  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Leon Kohlhaußen',
      description: 'Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.',
      url: 'https://leonkohli.dev',
      jobTitle: 'Web Developer',
      sameAs: [
        'https://github.com/leonkohli',
        'https://www.linkedin.com/in/leonkohlhaussen/',
        'https://x.com/leonkohli',
      ],
      knowsAbout: [
        'Web Development',
        'Home Automation',
        'IoT',
        'Open Source',
        'Bicycle Touring'
      ]
    }
  }
})