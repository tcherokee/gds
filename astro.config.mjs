import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import * as dotenv from "dotenv";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  vite: {
    plugins: [
      Icons({
        compiler: "svelte",
        customCollections: {
          "kensho-icons": FileSystemIconLoader("./src/icons", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
        },
      }),
      Icons({
        compiler: "astro",
        customCollections: {
          "kensho-icons": FileSystemIconLoader("./src/icons", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
        },
      }),
    ],
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
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
