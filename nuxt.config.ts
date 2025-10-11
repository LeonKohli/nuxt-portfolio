import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-11',
  devtools: { enabled: true },

  // Disable prerendering crawler for SSR app (prevents OOM and build hangs)
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: []
    }
  },

  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-security'
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['@/assets/css/tailwind.css'],

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
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        {
          src: 'https://webry.leonkohli.de/api/script.js',
          'data-site-id': '3',
          defer: true
        },
        ...(process.env.NODE_ENV === 'production'
          ? [
              {
                src: process.env.NUXT_PUBLIC_UMAMI_URL,
                defer: true,
                'data-website-id': process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID
              }
            ]
          : [])
      ]
    }
  },
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['python', 'bash', 'json', 'xml'],
    }
  },
  site: {
    url: 'https://leonkohli.dev',
    description: 'Web Developer from Potsdam, Germany with a passion for creating intuitive, performant web experiences.',
    title: 'Leon Kohlhaußen - Full Stack Developer',
    name: 'Leon Kohlhaußen - Full Stack Developer',
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
  },
  
  // Security configuration with CSP disabled
  security: {
    headers: {
      contentSecurityPolicy: false
    }
  }

});
