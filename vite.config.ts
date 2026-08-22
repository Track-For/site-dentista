import { sites } from '@openai/sites-vite-plugin'
import { cloudflare } from '@cloudflare/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  // O worker da Cloudflare só participa do build de produção. No modo dev,
  // o Vue roda no Vite puro para manter o HMR estável e evitar processos de
  // inspeção concorrentes no Windows.
  plugins: [vue(), sites(), ...(command === 'build' ? [cloudflare()] : [])],
  server: {
    host: '127.0.0.1',
  },
}))
