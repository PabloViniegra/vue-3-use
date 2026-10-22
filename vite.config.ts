import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Rutas relativas: GitHub Pages sirve el sitio bajo /vue-3-use/ y así el build funciona igual en `vite preview`
  base: './',
  plugins: [vue()],
})
