export type GitHubRepo = {
  name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

const fallbackRepos: GitHubRepo[] = [
  {
    name: 'financiaApp',
    html_url: 'https://github.com/R0ger130296/financiaApp',
    homepage: null,
    description: 'Aplicación web para gestión de finanzas personales.',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-01T00:00:00.000Z',
  },
  {
    name: 'me_astro',
    html_url: 'https://github.com/R0ger130296/me_astro',
    homepage: 'https://rogercedeno.dev',
    description: 'Portafolio profesional desarrollado con Astro y TypeScript.',
    language: 'Astro',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-01T00:00:00.000Z',
  },
];

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('https://api.github.com/users/R0ger130296/repos?per_page=100&sort=updated', {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'roger-cedeno-portfolio',
        ...(import.meta.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}` }
          : {}),
      },
      signal: AbortSignal.timeout(3500),
    });

    if (!response.ok) return fallbackRepos;
    const repos = (await response.json()) as GitHubRepo[];
    return repos.length > 0 ? repos : fallbackRepos;
  } catch {
    return fallbackRepos;
  }
}

export function getRepositoryMap(repositories: GitHubRepo[]) {
  return new Map(repositories.map((repository) => [repository.name.toLowerCase(), repository]));
}
