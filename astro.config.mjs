import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import * as dotenv from "dotenv";
import svelte from "@astrojs/svelte";
import node from "@astrojs/node";
import Icons from "unplugin-icons/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import sitemap from "@astrojs/sitemap";

dotenv.config();

console.log("enabled", process.env.IS_PROD === "true", process.env.IS_PROD);

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_FULL_URL,
  integrations: [tailwind(), svelte(), sitemap()],
  base: process.env.PUBLIC_SITE_ID === "gds" ? "/it" : "",
  trailingSlash: "always",
  vite: {
    plugins: [
      Icons({
        compiler: "svelte",
        customCollections: {
          "kensho-icons": FileSystemIconLoader("./src/icons", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
          "kensho-dashboard-icons": FileSystemIconLoader(
            "./src/icons/dashboard",
            (svg) => svg.replace(/^<svg /, '<svg fill="currentColor" ')
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
  server: {
    port: process.env.PORT ? process.env.PORT : 4231,
  },
  adapter: node({
    mode: "standalone",
  }),
});
