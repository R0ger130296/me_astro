import { projects as localProjects, type Project } from '../data/portfolio';

let snapshot: Promise<Project[]> | undefined;

/** One public snapshot per build. Configured API failures must not publish stale content. */
export function getProjects(): Promise<Project[]> {
  if (!snapshot) snapshot = loadProjects();
  return snapshot;
}

async function loadProjects(): Promise<Project[]> {
  const base = import.meta.env.PORTFOLIO_API_URL;
  if (!base) return localProjects;
  const response = await fetch(`${base.replace(/\/$/, '')}/projects`, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`Portfolio API returned ${response.status}`);
  const projects: unknown = await response.json();
  if (!Array.isArray(projects)) throw new Error('Invalid portfolio response');
  return projects as Project[];
}
