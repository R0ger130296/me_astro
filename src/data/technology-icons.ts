import * as simpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

const iconExports = simpleIcons as unknown as Record<string, SimpleIcon>;

const technologyIconKeys: Record<string, string> = {
  React: 'siReact',
  'React Native': 'siReact',
  TypeScript: 'siTypescript',
  JavaScript: 'siJavascript',
  '.NET': 'siDotnet',
  '.NET 8': 'siDotnet',
  'C#': 'siSharp',
  'Node.js': 'siNodedotjs',
  Astro: 'siAstro',
  Azure: 'siMicrosoftazure',
  'SQL Server': 'siMicrosoftsqlserver',
  Firebase: 'siFirebase',
  Docker: 'siDocker',
  Git: 'siGit',
  'Tailwind CSS': 'siTailwindcss',
  GraphQL: 'siGraphql',
  Expo: 'siExpo',
  Flutter: 'siFlutter',
  Dart: 'siDart',
  Java: 'siOpenjdk',
  Angular: 'siAngular',
  'Spring Boot': 'siSpringboot',
  MongoDB: 'siMongodb',
  Vercel: 'siVercel',
};

export function getTechnologyIcon(name: string): SimpleIcon | undefined {
  const key = technologyIconKeys[name];
  const icon = key ? iconExports[key] : undefined;
  return icon && typeof icon.path === 'string' ? icon : undefined;
}

export const supportedTechnologyIcons = Object.keys(technologyIconKeys);
