// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
  ],
  nitro: {
    experimental: {
      database: true,
    },
  },
  routeRules: {
    "/": {
      ssr: false,
    },
    "/posts": { swr: 300 },
    "/posts/**": { swr: 300 },
  },
  image: {
    domains: ["picsum.photos", "i.pravatar.cc"],
    alias: {
      picsum: "https://picsum.photos",
      pravatar: "https://i.pravatar.cc",
    },
    quality: 80,
  },
  site: {
    url: "http://localhost:3000",
    name: "Nuxt Blog",
    description: "Welcome to my awesome blog site!",
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
});
