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
  },
  image: {
    domains: ["picsum.photos"],
    alias: {
      picsum: "https://picsum.photos",
    },
    quality: 90,
    format: ["avif", "webp"],
  },
});