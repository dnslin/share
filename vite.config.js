import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ]
    }
  }
})
