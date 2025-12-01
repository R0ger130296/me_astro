/**
 * Browser detection utility for Astro
 * Replaces SvelteKit's $app/environment
 */
export const browser = typeof window !== 'undefined';

