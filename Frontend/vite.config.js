import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'assets',
  build: {
    rollupOptions: {
      input: 'src/index.html',
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(woff2?|eot|ttf|otf)$/.test(name)) {
            return 'fonts/[name].[hash][extname]';
          }
          return '[name].[hash][extname]';
        },
      },
    },
  },
});
