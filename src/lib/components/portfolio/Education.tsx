import React, { memo } from 'react';
import type { Education as EducationEntity } from '../../domain/entities';
import { useEducationQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, SkeletonList } from '../ui';

interface EducationProps {
  initialData?: EducationEntity[];
}

const EducationComponent: React.FC<EducationProps> = ({ initialData }) => {
  const { data: education = [], isLoading, isError } = useEducationQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Educación">
        <SkeletonList items={3} />
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Educación">
        <p className="py-6 text-sm text-primary-600">No fue posible cargar la educación.</p>
      </Section>
    );
  }

  return (
    <Section title="Educación">
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((item) => (
          <article key={item.id} className="rounded-2xl border border-primary-200 bg-primary-50/40 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-700">
              {item.startDate} – {item.endDate}
            </p>
            <h3 className="mt-3 text-base font-semibold leading-6 text-primary-900 sm:text-lg">
              {item.degree}
            </h3>
            <p className="mt-2 text-sm font-medium text-primary-700">{item.institution}</p>
            {item.location && <p className="mt-1 text-sm text-primary-500">{item.location}</p>}
          </article>
        ))}
      </div>
    </Section>
  );
};

export const Education = memo(EducationComponent);
