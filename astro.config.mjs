import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import db from '@astrojs/db';

const site = process.env.SITE_URL ?? 'https://rogercedeno.dev';

export default defineConfig({
  site,
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
      nesting: true