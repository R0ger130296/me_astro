export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  topics: string[];
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

const GITHUB_USER = 'R0ger130296';
const MAX_PROJECTS = 6;

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
      console.warn(`GitHub API returned ${response.status}. Projects section will use no remote data.`);
      return [];
    }

    const repositories = (await response.json()) as GitHubApiRepository[];

    return repositories
      .filter((repository) => !repository.fork && !repository.archived && !repository.disabled)
      .sort((left, right) => {
        const popularityDifference =
          right.stargazers_count + right.forks_count - (left.stargazers_count + left.forks_count);

        if (popularityDifference !== 0) return popularityDifference;
        return Date.parse(right.pushed_at) - Date.parse(left.pushed_at);
      })
      .slice(0, MAX_PROJECTS)
      .map((repository) => ({
        id: repository.id,
        name: repository.name,
        description: repository.description,
        htmlUrl: repository.html_url,
        homepage: repository.homepage,
        language: repository.language,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        updatedAt: repository.pushed_at,
        topics: repository.topics ?? [],
      }));
  } catch (error) {
    console.warn('GitHub repositories could not be loaded during build.', error);
    return [];
  }
}
