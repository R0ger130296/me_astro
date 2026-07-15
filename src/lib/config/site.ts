export const SITE = {
  name: 'Roger Cedeño',
  title: 'Roger Cedeño | Software Engineer y Full Stack Developer',
  description:
    'Portafolio profesional de Roger Cedeño, desarrollador de software especializado en React, Astro, TypeScript, Node.js y .NET.',
  url: 'https://rogercedeno.dev',
  locale: 'es_EC',
  language: 'es-EC',
  author: 'Roger Cedeño',
  image: '/me/roger.jpg',
  keywords: [
    'Roger Cedeño',
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Astro',
    'TypeScript',
    'Node.js',
    '.NET',
    'Ecuador',
  ],
} as const;

export const absoluteUrl = (path = '/') => new URL(path, SITE.url).toString();
