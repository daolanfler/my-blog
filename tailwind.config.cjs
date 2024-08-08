module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}", "./styles/**/*.css,scss"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        lxgw: ["LXGW WenKai"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
