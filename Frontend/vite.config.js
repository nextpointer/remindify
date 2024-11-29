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
        description: "Remindify is designed to help you remember topics or concepts that you've previously learned. Whether it's a new coding technique or a complex theory, this tool ensures you never forget what you've mastered.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
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
    }),
  ],
});
