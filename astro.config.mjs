import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

export default defineConfig({
  site: 'https://rogercedeno.dev',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    db(),
  ],
  output: 'server',
  adapter: vercel(),
});
