import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return ({
  plugins: [
    tanstackRouter({
      target:'react',
      autoCodeSplitting:true
    }), //need to place it above vite react plugin to override
    react(),
    tailwindcss(),
    
  ],
  server: {
    allowedHosts: [env.VITE_ALLOWED_HOST]
  }
  }
  )
})
