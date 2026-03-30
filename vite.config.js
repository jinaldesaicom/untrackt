import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from 'rollup-plugin-visualizer'
import istanbul from 'vite-plugin-istanbul'

const isTest = process.env.VITEST || process.env.NODE_ENV === 'test'
const testFolder = process.env.TEST_FOLDER

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    isTest && istanbul({
      include: 'src/**/*',
      exclude: ['node_modules', 'src/tests/**'],
      extension: ['.js', '.jsx'],
      requireEnv: false,
      forceBuildInstrument: true,
    }),
    process.env.ANALYZE
      ? visualizer({
        open: true,
        filename: 'dist/bundle-analysis.html',
        gzipSize: true,
      })
      : null,
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'UnTrackt - Free Browser Tools',
        short_name: 'UnTrackt',
        description: '227+ free tools. Runs in your browser. Zero tracking.',
        theme_color: '#4f46e5',
        background_color: '#f9fafb',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/open\.er-api\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'currency-api',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    testTimeout: 15000,
    include: testFolder
      ? [`src/tests/${testFolder}/**/*.test.*`]
      : ['src/**/*.test.*'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json-summary'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/tests/**', 'src/**/*.test.*'],
      reportsDirectory: './coverage',
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') ||
              id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react-router')) {
            return 'vendor'
          }
          if (id.includes('react-helmet-async')) {
            return 'seo'
          }
          if (id.includes('src/tools/dev/')) {
            return 'tools-dev'
          }
          if (id.includes('src/tools/student/')) {
            return 'tools-student'
          }
          if (id.includes('src/tools/finance/')) {
            return 'tools-finance'
          }
          if (id.includes('src/tools/health/')) {
            return 'tools-health'
          }
          if (id.includes('src/tools/freelance/')) {
            return 'tools-freelance'
          }
          if (id.includes('src/tools/general/')) {
            return 'tools-general'
          }
          if (id.includes('src/tools/seo/')) {
            return 'tools-seo'
          }
          if (id.includes('src/tools/productivity/')) {
            return 'tools-productivity'
          }
          if (id.includes('src/data/tools/')) {
            return 'tools-data'
          }
          if (id.includes('fuse.js') || id.includes('src/search/')) {
            return 'search'
          }
          return undefined
        },
      }
    },
    chunkSizeWarningLimit: 300,
  },
  server: {
    warmup: {
      clientFiles: ['./src/App.jsx']
    }
  }
}))
