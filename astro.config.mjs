import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

import db from '@astrojs/db';

/**
 * Astro Configuration
 * Optimized for performance and best practices
 */
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    db()
  ],
  output: 'server', // Cambiado a 'server' para soportar Astro DB
  adapter: vercel(),
});