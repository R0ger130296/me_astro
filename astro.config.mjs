import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
<<<<<<< HEAD
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
=======

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // Ya tenemos nuestros estilos en app.css
      nesting: true,
    }),
  ],
  output: 'static',
  adapter: vercel(),
});

>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
