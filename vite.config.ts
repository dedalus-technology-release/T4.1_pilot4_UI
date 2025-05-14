import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_APP_PORT || '3000'),
  },
  base: "/",

})
