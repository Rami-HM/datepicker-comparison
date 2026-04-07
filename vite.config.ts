/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-mui': ['@mui/x-date-pickers', '@mui/x-date-pickers-pro', '@emotion/react', '@emotion/styled'],
          'vendor-antd': ['antd'],
          'vendor-rcal': ['react-calendar', 'react-time-picker'],
          'vendor-shadcn': ['@radix-ui/react-popover', 'react-day-picker', 'date-fns'],
          'vendor-aria': ['react-aria-components', '@internationalized/date'],
          'vendor-misc': ['dayjs', 'react-syntax-highlighter'],
        },
      },
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
