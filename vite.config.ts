import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@frontdesk': fileURLToPath(
        new URL('./src/modules/frontdesk', import.meta.url),
      ),
      '@doctor-shared': fileURLToPath(
        new URL('./src/pages/doctor/shared', import.meta.url),
      ),
    }
  }
})