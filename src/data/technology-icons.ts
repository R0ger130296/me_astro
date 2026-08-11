import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const iconExports = simpleIcons as unknown as Record<string, SimpleIcon>;

const technologyIconKeys: Record<string, string> = {
  React: 'siReact',
  TypeScript: 'siTypescript',
  '.NET': 'siDotnet',
  '.NET 8': 'siDotnet',
  'Node.js': 'siNodedotjs',
  Astro: 'siAstro',
  Azure: 'siMicrosoftazure',
  'SQL Server': 'siMicrosoftsqlserver',
  Firebase: 'siFirebase',
  Docker: 'siDocker',
  Git: 'siGit',
  'Tailwind CSS': 'siTailwindcss',
  GraphQL: 'siGraphql',
  'React Native': 'siReact',
  Expo: 'siExpo',
  Flutter: 'siFlutter',
  Java: 'siOpenjdk',
  Angular: 'siAngular',
  'Spring Boot': 'siSpringboot',
  MongoDB: 'siMongodb',
  Vercel: 'siVercel',
};

export function getTechnologyIcon(name: string): SimpleIcon | undefined {
  const key = technologyIconKeys[name];
  return key ? iconExports[key] : undefined;
}

export const supportedTechnologyIcons = Object.keys(technologyIconKeys);
