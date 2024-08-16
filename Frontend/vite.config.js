import { defineConfig } from 'vite';

export default defineConfig({
    // Your existing Vite config
    build: {
        assetsInlineLimit: 4096, // Set the inline limit for fonts if needed
    },
});
