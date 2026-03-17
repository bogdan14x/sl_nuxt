export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@nuxthub/core'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.postcss',
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '*',
      callback: '*',
    },
  },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap' },
      ],
    },
  },

  compatibilityDate: '2025-02-19',
});
