import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import vercel from "@astrojs/vercel";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import AstroPWA from '@vite-pwa/astro'

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [
    solid({
      include: "**/solid/*",
    }),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    react(),
    AstroPWA({
      devOptions: { 
        enabled: true
      }
    })
  ],
  output: "static",
  adapter: vercel(),
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
  },
  site: "https://daolanfler.blog",
});
