import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://me-astro-alpha.vercel.app',
  output: 'static',
  build: {
    format: 'directory',
  },
});
