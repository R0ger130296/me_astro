import React from 'react';
import type { GitHubRepository } from '../../infrastructure/github/getFeaturedRepositories';
import { Section } from '../ui';

interface GitHubProjectsProps {
  repositories: GitHubRepository[];
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('es-EC', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

export const GitHubProjects: React.FC<GitHubProjectsProps> = ({ repositories }) => {
  if (repositories.length === 0) return null;

  return (
    <Section title="Proyectos destacados">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-primary-600 sm:text-base">
          Proyectos públicos seleccionados automáticamente desde GitHub según actividad y relevancia.
        </p>
        <a
          href="https://github.com/R0ger130296"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-900 hover:bg-primary-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
        >
          Ver perfil de GitHub
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {repositories.map((repository) => (
          <article
            key={repository.id}
            className="flex min-h-52 flex-col rounded-2xl border border-primary-200 bg-white p-5 transition-colors hover:border-primary-400 sm:p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-lg font-semibold text-primary-900">{repository.name}</h3>
                <p className="mt-1 text-xs text-primary-500">
                  Actualizado {formatDate(repository.updatedAt)}
                </p>
              </div>
              {repository.language && (
                <span className="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700">
                  {repository.language}
                </span>
              )}
            </div>

            <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-primary-600">
              {repository.description ?? 'Proyecto de software disponible públicamente en GitHub.'}
            </p>

            {repository.topics.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {repository.topics.slice(0, 3).map((topic) => (
                  <span key={topic} className="rounded-md bg-secondary-50 px-2 py-1 text-xs text-secondary-800">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary-100 pt-4">
              <div className="flex gap-3 text-xs text-primary-500" aria-label="Estadísticas del repositorio">
                <span>★ {repository.stars}</span>
                <span>Forks {repository.forks}</span>
              </div>
              <div className="flex gap-2">
                {repository.homepage && (
                  <a
                    href={repository.homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-secondary-700 hover:bg-secondary-50"
                  >
                    Demo
                  </a>
                )}
                <a
                  href={repository.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100"
                >
                  Código
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};
