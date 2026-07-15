import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rogercedeno.dev',
  output: 'static',
  build: {
    format: 'directory',
  },
});
