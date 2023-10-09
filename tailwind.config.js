/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./public/index.html",
    "./index.html",
    "./src/components/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
