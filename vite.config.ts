import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true },
    }),
    VitePWA({
      // 不再静默换新：发现新版本时提示用户，避免阅读中途被刷新
      registerType: 'prompt',
      injectRegister: false,
      manifest: {
        id: '/',
        name: 'ChenzhuoJi',
        short_name: 'ChenzhuoJi',
        description: 'ChenzhuoJi：文章与照片。',
        lang: 'zh-CN',
        dir: 'ltr',
        theme_color: '#F7EDE8',
        background_color: '#F7EDE8',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        scope: '/',
        start_url: '/',
        categories: ['blog', 'books', 'photo'],
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: '记 · 全部文章', short_name: '记', url: '/posts' },
          { name: '影 · 照片和画', short_name: '影', url: '/gallery' },
          { name: '读 · 读书笔记', short_name: '读', url: '/reading' },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // 注意：public/images 下的 jpg 不匹配此 glob，图片走下面的运行时缓存
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        // 图片交给运行时缓存，避免把上百 MB 图片塞进预缓存
        globIgnores: ['images/**'],
        // SPA 深层链接：路由交给前端，离线时也能直接打开文章页
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          /^\/rss\.xml$/,
          /^\/manifest\.webmanifest$/,
          /^\/404\.html$/,
          /^\/images\//,
          /^\/fonts\//,
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            // 文章配图与画廊：首次看过后离线可读（原图较大，限制条目数避免占满配额）
            urlPattern: /\/images\/.*\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?.*)?$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 60 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^\/rss\.xml$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'rss-cache',
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
    }),
  ],
})
