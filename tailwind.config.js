const colors = require('tailwindcss/colors');
colors.primary = '#1C4ED8';
colors.secondary = '#031630';
colors.sub_blue = '#031630';
colors.danger = '#FB6363';
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {},
    },
    colors,
  },
  plugins: [
      require('flowbite')
  ],
}
