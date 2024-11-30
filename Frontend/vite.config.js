import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // Your existing Vite config
  build: {
    assetsInlineLimit: 4096, // Set the inline limit for fonts if needed
  },
  plugins: [
    VitePWA({
      manifest: {
        name: "Remindify",
        short_name: "Remindify",
        description:
          "Remindify is designed to help you remember topics or concepts that you've previously learned. Whether it's a new coding technique or a complex theory, this tool ensures you never forget what you've mastered.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        strategies: "injectManifest",
        srcDir: "Frontend",
        filename: "sw.js",
        injectRegister: "auto",
        registerType: "autoUpdate",
        icons: [
          {
            src: "./assets/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./assets/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./assets/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400, // stay for 1 day
              },
            },
          },
          {
            urlPattern:
              /\.(?:png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|otf|eot)$/, // Cache image/font files
            handler: "CacheFirst",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
