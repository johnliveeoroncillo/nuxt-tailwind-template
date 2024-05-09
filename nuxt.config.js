require('dotenv/config');
import pkg from './package.json';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    ],
    script: []
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      { src: '@/assets/scss/transition.scss', lang: 'scss' },
      { src: '@/assets/scss/main.scss', lang: 'scss' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/toast',
    '@/plugins/vuex-persisted',
    '@/plugins/global',
    '@/plugins/jl-modal',
  ],

  purgeCSS: {
      whitelist: ["aos-init", "aos-animate", "data-aos-delay", "data-aos-duration", "fade-up", "zoom-in"],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],


  moment: {
      defaultTimezone: 'Asia/Manila'
  },

  // SET PROXY TO = true
  // IF YOU WISH TO REWRITE YOUR BACKEND API
  // ex. https://myfrontend/api/{request}
  // =====
  // IF FALSE
  // ex. https://mybackend/{request}
  axios: {
      baseUrl: process.env.API_URL,
      proxy: true,
  },
  proxy: {
      '/api/': { 
        changeOrigin: true,
        target: process.env.API_URL,
        pathRewrite: {
           '^/api/': '',
        } 
      }
  },

  auth: {
    strategies: {
      local: {    
        token: {
          // required: false,
          property: 'access_token',
          required: true,
          global: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: true,
        },
        endpoints: {
          login: false,
          // refresh: { url: "/api/auth/refresh-token", method: "post" },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: false,
        },
      },
    },
    redirect: {
        login: '/',
        home: '/dashboard',
        callback: '/',
        logout: '/',
    },
    rewriteRedirects: false,
    // sessionStorage: {
    //   prefix: 'auth-pos.'
    // },
    // cookie: {
    //   prefix: 'auth-pos.',
    //   options: {
    //     path: '/'
    //   }
    // },
    // localStorage: true,
    // cookie: true,
    watchLoggedIn: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  publicRuntimeConfig: {
      API_URL: process.env.API_URL,
      VERSION: process.env.VERSION || pkg.version,
      LIMIT: process.env.LIMIT,
  },

  env: {
      API_URL: process.env.API_URL,
      VERSION: process.env.VERSION || pkg.version,
      LIMIT: process.env.LIMIT,
  },


  router: {
      middleware: ['auth', 'test'],
  },
}
