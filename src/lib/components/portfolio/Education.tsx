<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { useEducation } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Education } from '../../domain/entities';

export const Education: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    setVisible(true);
    useEducation().then(setEducation);
  }, []);

  return (
    <Section title="Educación">
      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="pb-4 sm:pb-6 border-b border-gray-100 last:border-0 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{edu.degree}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-1">{edu.institution}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
              {edu.location && (
                <>
                  <span>{edu.location}</span>
                  <span>•</span>
                </>
              )}
              <span>
                {edu.startDate} - {edu.endDate}
              </span>
            </div>
          </div>
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
        ))}
      </div>
    </Section>
  );
};

<<<<<<< HEAD
export const Education = memo(EducationComponent);
=======
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
