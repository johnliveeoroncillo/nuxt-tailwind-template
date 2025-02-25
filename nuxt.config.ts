// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/favicon.ico',
        },
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1 user-scalable=no',
        },
      ],
    },
  },
  css: ['@/assets/css/custom.scss'],
  ssr: process.env.SSR == 'true',
  runtimeConfig: {
    public: {
        APP_NAME: process.env.APP_NAME,
        SECRET_KEY: process.env.SECRET_KEY,
        SSR: (process.env?.SSR ?? 'true') == 'true',
        SOCKET_URL: process.env?.SOCKET_URL ?? '',
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
      '@nuxtjs/tailwindcss',
      'shadcn-nuxt',
      '@vite-pwa/nuxt',
      '@samk-dev/nuxt-vcalendar',
      '@nuxtjs/color-mode',
      // '@prisma/nuxt',
  ],
  shadcn: {
      prefix: '',
      componentDir: './components/ui'
  },
  colorMode: {
      preference: "dark", // Use 'light' or 'dark' as default
      fallback: "light", // Default mode if no preference is found
      classSuffix: "", // Important for Tailwind's 'dark:' classes
  },
  nitro: {
      experimental: {
          websocket: true
      }
  },
  // vite: {
  //   server: {
  //     proxy: {
  //       '/api': { // This is the prefix you'll use in your fetch calls
  //         target: process.env.API_URL, // Your local API server
  //         changeOrigin: true, // Required for localhost
  //         rewrite: (path: string) => path.replace(/^\/api/, ''), // Remove the /api prefix when forwarding the request
  //       },
  //     },
  //   },
  // },
  // pwa: {
  //   registerType: 'autoUpdate', // or 'prompt'
  //   injectRegister: 'auto',
  //   client: {
  //       installPrompt: true,
  //       registerPlugin: true,
  //   },
  //   workbox: {
  //     globPatterns: ['**/*.{js,json,css,html,png,jpg,svg,ico,webmanifest}'],
  //     runtimeCaching: [
  //       // {
  //       //   urlPattern: '/api/**', // Cache API requests
  //       //   handler: 'StaleWhileRevalidate', // Or 'NetworkFirst', 'CacheFirst', etc.
  //       //   options: {
  //       //     cacheName: 'api-cache',
  //       //     expiration: {
  //       //       maxEntries: 30, // Adjust as needed
  //       //       maxAgeSeconds: 3600, // 1 hour (adjust as needed)
  //       //     },
  //       //   },
  //       // },
  //       // {
  //       //     urlPattern: /^https:\/\/images\.unsplash\.com\/.*/, // Example for external images
  //       //     handler: 'CacheFirst',
  //       //     options: {
  //       //       cacheName: 'image-cache',
  //       //       expiration: {
  //       //         maxEntries: 10,
  //       //         maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
  //       //       },
  //       //     }
  //       // },
  //     ],
  //   },
  //   manifest: {
  //     name: 'Cloudcare Labs - Portal',
  //     short_name: 'Sandbox Portal',
  //     description: 'Cloudcare Labs - Sandbox Portal',
  //     theme_color: '#2564eb', // Example color
  //     background_color: '#ffffff',
  //     display: 'standalone', // or 'fullscreen' or 'minimal-ui'
  //     start_url: '/', // Or a specific start URL
  //     icons: [
  //       {
  //           src: '/icons/android-36x36.png',
  //           sizes: '36x36',
  //           type: 'image/png',
  //       },
  //       {
  //           src: '/icons/android-48x48.png',
  //           sizes: '48x48',
  //           type: 'image/png',
  //       },
  //       {
  //           src: '/icons/android-72x72.png',
  //           sizes: '72x72',
  //           type: 'image/png',
  //       },
  //       {
  //           src: '/icons/android-96x96.png',
  //           sizes: '96x96',
  //           type: 'image/png',
  //       },
  //       {
  //           src: '/icons/android-144x144.png',
  //           sizes: '144x144',
  //           type: 'image/png',
  //       },
  //       {
  //           src: '/icons/android-192x192.png',
  //           sizes: '192x192',
  //           type: 'image/png',
  //       }
  //     ],
  //   },
  // },
})