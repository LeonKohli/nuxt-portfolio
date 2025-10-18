import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-10-11',
  devtools: { enabled: true },
    nitro: {
      preset: 'bun',
    },
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
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
  runtimeConfig: {
    public: {
      motion: {
        directives: {
          'section-fade': {
            initial: {
              opacity: 0,
            },
            visibleOnce: {
              opacity: 1,
              transition: {
                duration: 0.45
              }
            }
          },
          'section-fade-up': {
            initial: {
              opacity: 0,
              y: 24
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          },
          'section-fade-up-delay-sm': {
            initial: {
              opacity: 0,
              y: 24
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          },
          'section-fade-up-delay-md': {
            initial: {
              opacity: 0,
              y: 24
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          },
          'section-fade-up-delay-lg': {
            initial: {
              opacity: 0,
              y: 24
            },
            visibleOnce: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.45,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          },
          'section-fade-pop': {
            initial: {
              opacity: 0,
              scale: 0.96
            },
            visibleOnce: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }
        }
      }
    }
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
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['python', 'bash', 'json', 'xml'],
        }
      }
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
  
  // Security configuration with CSP and SRI disabled
  // SRI is incompatible with external scripts (Cloudflare, Umami) that change independently
  security: {
    sri: false,
    headers: {
      contentSecurityPolicy: false
    }
  }

});
