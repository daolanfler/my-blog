import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./styles/**/*.css,scss",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        lxgw: ["LXGW WenKai"],
        sans: ["PT Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
