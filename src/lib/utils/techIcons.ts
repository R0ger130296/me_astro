/**
 * Technology to icon name mapping
 * Icons should be in /static/icons/tech/{iconName}.svg
 * You can download them from: https://simpleicons.org/
 */
export const techIconMap: Record<string, string> = {
  // Frontend frameworks & libraries
  'React': 'react',
  'Next.js': 'nextdotjs',
  'Angular': 'angular',
  'Angular CLI': 'angular',
  'React Native': 'react',
  'Expo': 'expo',
  'Tailwind CSS': 'tailwindcss',
  'HTML5': 'html5',
  'CSS': 'css3',
  'Micro-Frontend': 'micro-frontend',
  
  // Backend frameworks
  'NestJS': 'nestjs',
  'Spring Framework': 'spring',
  'Python': 'python',
  
  // Mobile development
  'Flutter': 'flutter',
  
  // Development tools
  'Git': 'git',
  'GitHub': 'github',
  'Bitbucket': 'bitbucket',
  'GitFlow': 'git',
  'Jira': 'jira',
  'Swagger': 'swagger',
  'Visual Studio': 'visualstudiocode',
  'Windows': 'windows',
  'Discord': 'discord',
  
  // Methodologies (use generic or custom icons)
  'SCRUM': 'scrum',
  'PMP': 'pmp',
  'Principios SOLID': 'solid'
};

/**
 * Gets the icon path for a technology
 * First tries to use the local icon, if it doesn't exist uses CDN
 * @param techName Technology name
 * @returns Icon path (local or CDN) or null if it doesn't exist
 */
export function getTechIconPath(techName: string): string | null {
  const iconName = techIconMap[techName];
  if (!iconName) return null;
  
  // First try to use the local icon
  const localPath = `/icons/tech/${iconName}.svg`;
  
  // If the icon doesn't exist locally, use CDN as fallback
  // The component will verify if the local icon exists before using the CDN
  return localPath;
}

/**
 * Gets the CDN URL for an icon
 * @param techName Technology name
 * @returns CDN URL or null if it doesn't exist
 */
export function getTechIconCDN(techName: string): string | null {
  const iconName = techIconMap[techName];
  if (!iconName) return null;
  return `https://cdn.simpleicons.org/${iconName}`;
}

/**
 * Gets the icon name for a technology
 * @param techName Technology name
 * @returns Icon name or null if it doesn't exist
 */
export function getTechIconName(techName: string): string | null {
  return techIconMap[techName] || null;
}

