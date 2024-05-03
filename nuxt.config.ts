// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@vueuse/nuxt"],
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
});
