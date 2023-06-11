import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";

import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [solid(), mdx(), tailwind()]
});