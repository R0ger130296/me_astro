import React, { memo, useState } from 'react';
import { usePersonalInfoQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton, SkeletonAvatar } from '../ui';
import type { PersonalInfo } from '../../domain/entities';

interface AboutProps {
  initialData?: PersonalInfo;
}

const highlights = [
  'Experiencia en productos web y móviles',
  'Código limpio y arquitectura mantenible',
  'Enfoque en rendimiento y experiencia de usuario',
];

const AboutComponent: React.FC<AboutProps> = ({ initialData }) => {
  const [imageError, setImageError] = useState(false);
  const { data: personalInfo, isLoading, isError } = usePersonalInfoQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Sobre mí">
        <div className="grid gap-6 sm:grid-cols-[128px_minmax(0,1fr)] sm:items-start">
          <SkeletonAvatar size={128} />
          <div className="space-y-3">
            <Skeleton variant="text" width="100%" height={22} />
            <Skeleton variant="text" width="90%" height={22} />
            <Skeleton variant="text" width="70%" height={22} />
          </div>
        </div>
      </Section>
    );
  }

  if (isError || !personalInfo) return null;

  return (
    <Section title="Sobre mí">
      <div className="grid gap-7 sm:grid-cols-[144px_minmax(0,1fr)] sm:items-start lg:gap-10">
        <div className="mx-auto sm:mx-0">
          {!imageError ? (
            <img
              src="/me/roger.jpg"
              alt={`Fotografía de ${personalInfo.name}`}
              width={144}
              height={144}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onError={() => setImageError(true)}
              className="aspect-square h-32 w-32 rounded-2xl border border-primary-200 object-cover sm:h-36 sm:w-36"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-primary-200 bg-primary-100 text-2xl font-semibold text-primary-700 sm:h-36 sm:w-36">
              RC
            </div>
          )}
        </div>

        <div>
          <p className="text-pretty text-base leading-7 text-primary-700 sm:text-lg sm:leading-8">
            {personalInfo.summary}
          </p>

          <ul className="mt-6 grid gap-3 text-sm text-primary-600 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-600" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export const About = memo(AboutComponent);
