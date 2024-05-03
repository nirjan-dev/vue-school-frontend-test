import { defineConfig } from "unlighthouse";

export default defineConfig({
  site: "http://localhost:3000",
  debug: true,
  cache: false,
  scanner: {
    samples: 3,
    maxRoutes: 10,
    dynamicSampling: 3,
    exclude: ["/"],
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
});
