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
import AstroPWA from "@vite-pwa/astro";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [
    solid({
      include: "**/solid/*",
    }),
    expressiveCode({
      themeCssSelector: (theme) => `.${theme.type}`,
      themes: ["github-dark", "github-light"],
    }),
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    AstroPWA({
      devOptions: {
        enabled: false, // 开了影响热更新
      },
      workbox: {
        navigateFallback: '/',
        // 排除 sitemap 相关文件
        navigateFallbackDenylist: [/^\/sitemap(-\d+)?\.xml/],
        // 或者使用 globPatterns 来明确指定不需要缓存的文件
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp}',
          // 不包含 xml 文件
        ]
      }
    }),
    sitemap()
  ],
  adapter: vercel(),
  markdown: {
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, autolinkConfig]],
  },
  site: "https://daolanfler.blog",
});
