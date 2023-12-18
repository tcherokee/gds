import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import "dotenv/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  vite: {
    define: {
      "process.env.VITE_BUILD_TIME": JSON.stringify(new Date().toISOString()),
    },
  },
  image: {
    domains: ["amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
});
