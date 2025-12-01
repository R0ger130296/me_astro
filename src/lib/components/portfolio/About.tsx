import React, { useState, useEffect, useMemo } from 'react';
import { usePersonalInfoHook } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import { ErrorBoundary } from '../../presentation/components/ErrorBoundary';
import type { PersonalInfo } from '../../domain/entities';

interface AboutProps {
  initialData?: PersonalInfo;
}

export const About: React.FC<AboutProps> = ({ initialData }) => {
  const [imageError, setImageError] = useState(false);
  
  // Use server-side data if available, otherwise fetch on client
  const { data: fetchedData, loading, error } = usePersonalInfoHook();
  const personalInfo = useMemo(() => initialData || fetchedData, [initialData, fetchedData]);

  if (error) {
    return (
      <Section title="Sobre Mí">
        <div className="text-center py-8">
          <p className="text-primary-600">Error al cargar la información</p>
        </div>
      </Section>
    );
  }

  if (loading && !initialData) {
    return (
      <Section title="Sobre Mí">
        <div className="text-center py-8">
          <p className="text-primary-600">Cargando...</p>
        </div>
      </Section>
    );
  }

  return (
    <ErrorBoundary>
      <Section title="Sobre Mí">
        {personalInfo && (
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
                    setImageError(true);
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
      </Section>
    </ErrorBoundary>
  );
};

