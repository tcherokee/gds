import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import "dotenv/config";
import svelte from "@astrojs/svelte";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  vite: {
    define: {
      "process.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString())
    }
  },
  image: {
    domains: ["amazonaws.com"],
    remotePatterns: [{
      protocol: "https"
    }]
  },
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});