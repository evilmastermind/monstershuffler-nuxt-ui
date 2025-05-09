// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  devServer: { port: 3001 },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@nuxt/ui",
  ],
  css: ["~/assets/css/main.css"],
  icon: {
    customCollections: [
      {
        prefix: "xxx",
        dir: "./assets/icons",
      },
    ],
  },
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.json",
      },
    ],
    defaultLocale: "en",
    compilation: {
      strictMessage: false,
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  nitro: {
    compressPublicAssets: true,
    devProxy: {
      "/api": {
        target: process.env.API_URL,
        changeOrigin: true,
        prependPath: true,
      },
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },

  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "al-good",
        "al-neutral",
        "al-evil",
        "block",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
});
