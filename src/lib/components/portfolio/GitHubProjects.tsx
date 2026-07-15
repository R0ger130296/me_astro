import React from 'react';
import type { GitHubRepository, ProjectStatus } from '../../infrastructure/github/getFeaturedRepositories';
import { Section } from '../ui';

interface GitHubProjectsProps {
  repositories: GitHubRepository[];
}

const statusLabels: Record<ProjectStatus, string> = {
  production: 'En producción',
  active: 'En desarrollo',
  learning: 'Proyecto técnico',
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (date.getTime() === 0) return null;

  return new Intl.DateTimeFormat('es-EC', {
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const GitHubProjects: React.FC<GitHubProjectsProps> = ({ repositories }) => {
  if (repositories.length === 0) return null;

  return (
    <Section title="Proyectos destacados">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm leading-6 text-primary-600 sm:text-base">
            Una selección curada de proyectos que representan experiencia web, móvil, arquitectura y
            aprendizaje técnico. Los datos públicos se enriquecen automáticamente desde GitHub.
          </p>
        </div>

        <a
          href="https://github.com/R0ger130296"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-primary-300 px-4 py-2 text-sm font-semibold text-primary-800 transition-colors hover:border-primary-900 hover:bg-primary-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
        >
          Ver GitHub
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {repositories.map((repository) => {
          const updatedAt = formatDate(repository.updatedAt);
          const isPrivate = repository.visibility === 'private';

          return (
            <article
              key={repository.id}
              className="flex min-h-64 flex-col rounded-2xl border border-primary-200 bg-white p-5 transition-colors hover:border-primary-400 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-secondary-50 px-2.5 py-1 text-xs font-semibold text-secondary-800">
                      {statusLabels[repository.status]}
                    </span>
                    <span className="rounded-full bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700">
                      {isPrivate ? 'Proyecto privado' : 'Código público'}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-primary-900 sm:text-xl">
                    {repository.displayName}
                  </h3>

                  {updatedAt && !isPrivate && (
                    <p className="mt-1 text-xs text-primary-500">Actualizado {updatedAt}</p>
                  )}
                </div>
              </div>

              <p className="mb-5 flex-1 text-sm leading-6 text-primary-600 sm:text-[15px]">
                {repository.description}
              </p>

              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Tecnologías
                </p>
                <div className="flex flex-wrap gap-2">
                  {repository.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              {repository.topics.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-2" aria-label="Temas del proyecto">
                  {repository.topics.slice(0, 4).map((topic) => (
                    <span key={topic} className="text-xs text-secondary-700">
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary-100 pt-4">
                {!isPrivate ? (
                  <div className="flex gap-3 text-xs text-primary-500" aria-label="Estadísticas del repositorio">
                    <span>★ {repository.stars}</span>
                    <span>Forks {repository.forks}</span>
                  </div>
                ) : (
                  <span className="text-xs text-primary-500">Código protegido por privacidad</span>
                )}

                <div className="flex flex-wrap gap-2">
                  {repository.homepage && (
                    <a
                      href={repository.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-secondary-700 hover:bg-secondary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                    >
                      Ver sitio
                    </a>
                  )}

                  {repository.htmlUrl && !isPrivate && (
                    <a
                      href={repository.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-primary-800 hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500"
                    >
                      Ver código
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
};
