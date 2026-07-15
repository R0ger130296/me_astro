export type ProjectVisibility = 'public' | 'private';
export type ProjectStatus = 'production' | 'active' | 'learning';

export interface GitHubRepository {
  id: number;
  name: string;
  displayName: string;
  description: string;
  htmlUrl: string | null;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
  stack: string[];
  visibility: ProjectVisibility;
  status: ProjectStatus;
  featured: boolean;
}

interface GitHubApiRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  disabled: boolean;
}

interface CuratedProject {
  repository?: string;
  id: number;
  displayName: string;
  description: string;
  stack: string[];
  topics: string[];
  visibility: ProjectVisibility;
  status: ProjectStatus;
  homepage?: string;
}

const GITHUB_USER = 'R0ger130296';

/**
 * Editorial selection for the portfolio.
 *
 * Repository metadata is enriched from GitHub when available, while the
 * descriptions remain intentionally controlled so the portfolio explains the
 * professional value of each project instead of exposing raw repository data.
 */
const CURATED_PROJECTS: CuratedProject[] = [
  {
    repository: 'me_astro',
    id: -1,
    displayName: 'Portafolio profesional',
    description:
      'Portafolio mobile-first construido con Astro y React, con SEO técnico, integración con GitHub, pruebas y despliegue automatizado en Vercel.',
    stack: ['Astro', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    topics: ['portfolio', 'seo', 'mobile-first'],
    visibility: 'public',
    status: 'production',
    homepage: 'https://rogercedeno.dev',
  },
  {
    repository: 'HelpDeskFrontEnd',
    id: -2,
    displayName: 'Help Desk Frontend',
    description:
      'Interfaz web para la gestión y seguimiento de solicitudes de soporte, enfocada en flujos claros y organización operativa.',
    stack: ['JavaScript', 'Frontend', 'REST API'],
    topics: ['help-desk', 'frontend'],
    visibility: 'public',
    status: 'active',
  },
  {
    repository: 'reactNative',
    id: -3,
    displayName: 'Aplicación React Native',
    description:
      'Proyecto móvil para explorar componentes, navegación y patrones reutilizables en aplicaciones multiplataforma.',
    stack: ['React Native', 'JavaScript', 'Mobile'],
    topics: ['react-native', 'mobile'],
    visibility: 'public',
    status: 'learning',
  },
  {
    repository: 'Apollo_GrapHql',
    id: -4,
    displayName: 'Apollo GraphQL',
    description:
      'Implementación práctica de consultas y manejo de datos con Apollo y GraphQL para aplicaciones web modernas.',
    stack: ['GraphQL', 'Apollo', 'JavaScript'],
    topics: ['graphql', 'apollo'],
    visibility: 'public',
    status: 'learning',
  },
  {
    id: -5,
    displayName: 'FinanciaApp',
    description:
      'Aplicación privada para administración de finanzas personales, control de cajas, movimientos, reportes y una experiencia responsive orientada a producción.',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    topics: ['fintech', 'personal-finance', 'pwa'],
    visibility: 'private',
    status: 'active',
  },
];

const toFallbackProject = (project: CuratedProject): GitHubRepository => ({
  id: project.id,
  name: project.repository ?? project.displayName,
  displayName: project.displayName,
  description: project.description,
  htmlUrl: project.repository
    ? `https://github.com/${GITHUB_USER}/${project.repository}`
    : null,
  homepage: project.homepage ?? null,
  language: project.stack[0] ?? null,
  stars: 0,
  forks: 0,
  updatedAt: new Date(0).toISOString(),
  topics: project.topics,
  stack: project.stack,
  visibility: project.visibility,
  status: project.status,
  featured: true,
});

export async function getFeaturedRepositories(): Promise<GitHubRepository[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'rogercedeno-portfolio',
  };

  if (import.meta.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      { headers },
    );

    if (!response.ok) {
      console.warn(`GitHub API returned ${response.status}. Using curated project fallback.`);
      return CURATED_PROJECTS.map(toFallbackProject);
    }

    const repositories = (await response.json()) as GitHubApiRepository[];
    const publicRepositories = new Map(
      repositories
        .filter((repository) => !repository.fork && !repository.archived && !repository.disabled)
        .map((repository) => [repository.name.toLowerCase(), repository]),
    );

    return CURATED_PROJECTS.map((project) => {
      const repository = project.repository
        ? publicRepositories.get(project.repository.toLowerCase())
        : undefined;

      if (!repository) return toFallbackProject(project);

      return {
        id: repository.id,
        name: repository.name,
        displayName: project.displayName,
        description: project.description,
        htmlUrl: repository.html_url,
        homepage: project.homepage ?? repository.homepage,
        language: repository.language ?? project.stack[0] ?? null,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        updatedAt: repository.pushed_at,
        topics: Array.from(new Set([...(repository.topics ?? []), ...project.topics])).slice(0, 5),
        stack: project.stack,
        visibility: project.visibility,
        status: project.status,
        featured: true,
      };
    });
  } catch (error) {
    console.warn('GitHub repositories could not be loaded during build. Using curated fallback.', error);
    return CURATED_PROJECTS.map(toFallbackProject);
  }
}
