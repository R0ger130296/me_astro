import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

/**
 * Astro configuration for the server-rendered portfolio.
 */
export default defineConfig({
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
