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
        name: "Chenzhuo's Blog",
        short_name: '博客',
        description: 'Chenzhuo的个人博客',
        lang: 'zh-CN',
        dir: 'ltr',
        theme_color: '#0C0F16',
        background_color: '#FFFFFF',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'any',
        scope: '/',
        start_url: '/',
        categories: ['blog', 'news', 'books'],
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: '全部文章', short_name: '文章', url: '/posts' },
          { name: '读书', short_name: '读书', url: '/reading' },
          { name: '画廊', short_name: '画廊', url: '/gallery' },
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
