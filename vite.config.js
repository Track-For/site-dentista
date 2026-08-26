import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { sites } from '@openai/sites-vite-plugin'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig(({ command }) => ({
  plugins: [vue(), sites(), ...(command === 'build' ? [cloudflare()] : [])],
  server: {
    host: '0.0.0.0',
  },
}))
