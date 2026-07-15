import React, { memo } from 'react';
import type { Experience as ExperienceEntity } from '../../domain/entities';
import { useExperiencesQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, SkeletonList } from '../ui';

interface ExperienceProps {
  initialData?: ExperienceEntity[];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ initialData }) => {
  const { data: experiences = [], isLoading, isError } = useExperiencesQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Experiencia profesional">
        <SkeletonList items={3} />
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Experiencia profesional">
        <p className="py-6 text-sm text-primary-600">No fue posible cargar la experiencia.</p>
      </Section>
    );
  }

  return (
    <Section title="Experiencia profesional">
      <div className="divide-y divide-primary-100">
        {experiences.map((experience) => (
          <article key={experience.id} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-primary-900 sm:text-xl">{experience.title}</h3>
                <p className="mt-1 text-sm font-medium text-secondary-700 sm:text-base">
                  {experience.company}
                </p>
                {experience.location && (
                  <p className="mt-1 text-sm text-primary-500">{experience.location}</p>
                )}
              </div>

              <span className="w-fit shrink-0 rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700">
                {experience.startDate} – {experience.endDate}
              </span>
            </div>

            {experience.responsibilities.length > 0 && (
              <ul className="mt-5 space-y-3">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex gap-3 text-sm leading-6 text-primary-600 sm:text-base">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
};

export const Experience = memo(ExperienceComponent);
