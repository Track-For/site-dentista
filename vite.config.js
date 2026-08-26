import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sites } from '@openai/sites-vite-plugin'

export default defineConfig({
  plugins: [vue(), sites()],
  server: {
    host: '0.0.0.0',
  },
})
