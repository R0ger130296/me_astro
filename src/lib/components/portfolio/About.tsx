<<<<<<< HEAD
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
              src="/me/roger-profile.svg"
              alt={`Retrato profesional de ${personalInfo.name}`}
              width={144}
              height={144}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onError={() => setImageError(true)}
              className="aspect-square h-32 w-32 rounded-2xl border border-primary-200 object-cover object-top shadow-sm sm:h-36 sm:w-36"
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
=======
import React, { useState, useEffect } from 'react';
import { usePersonalInfo } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { PersonalInfo } from '../../domain/entities';

export const About: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setVisible(true);
    usePersonalInfo().then(setPersonalInfo);
  }, []);

  return (
    <Section title="Sobre Mí">
      {visible && personalInfo && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:items-start animate-fade-in">
          {/* Profile Photo */}
          <div className="shrink-0 w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto lg:mx-0 animate-slide-up">
            <div className="relative w-full h-full group">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500"></div>

              {/* Photo */}
              {!imageError ? (
                <img
                  src="/me/roger.jpg"
                  alt={personalInfo?.name || 'Roger Cedeño'}
                  className="relative w-full h-full rounded-2xl shadow-lg object-cover border-4 border-white z-10"
                  loading="eager"
                  decoding="async"
                  onError={() => {
                    console.error('Error loading image: /me/roger.jpg');
                    setImageError(true);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully');
                  }}
                />
              ) : (
                <div className="relative w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl flex items-center justify-center text-primary-700 font-bold text-2xl z-10 border-4 border-white shadow-lg">
                  {personalInfo?.name
                    ? personalInfo.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                    : 'RC'}
                </div>
              )}

              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                <div className="w-4 h-4 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full animate-pulse-subtle"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left animate-slide-up">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-primary-600 mb-6">
                {personalInfo.summary}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6">
                <div className="flex items-center gap-2 text-sm lg:text-base text-primary-500">
                  <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                  <span className="font-medium">+4 años de experiencia</span>
                </div>
                <div className="flex items-center gap-2 text-sm lg:text-base text-primary-500">
                  <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                  <span className="font-medium">Full Stack Developer</span>
                </div>
                <div className="flex items-center gap-2 text-sm lg:text-base text-primary-500">
                  <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                  <span className="font-medium">Consultor Técnico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
    </Section>
  );
};

<<<<<<< HEAD
export const About = memo(AboutComponent);
=======
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
