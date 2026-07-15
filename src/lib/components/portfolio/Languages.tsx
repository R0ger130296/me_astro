<<<<<<< HEAD
import React, { memo } from 'react';
import type { Language } from '../../domain/entities';
import { useLanguagesQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton } from '../ui';

interface LanguagesProps {
  initialData?: Language[];
}

const LanguagesComponent: React.FC<LanguagesProps> = ({ initialData }) => {
  const { data: languages = [], isLoading, isError } = useLanguagesQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Idiomas">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={96} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Idiomas">
        <p className="py-6 text-sm text-primary-600">No fue posible cargar los idiomas.</p>
      </Section>
    );
  }

  return (
    <Section title="Idiomas">
      <div className="grid gap-4 sm:grid-cols-2">
        {languages.map((language) => (
          <article key={language.name} className="flex items-center justify-between gap-4 rounded-2xl border border-primary-200 bg-primary-50/40 p-5 sm:p-6">
            <div>
              <h3 className="text-base font-semibold text-primary-900 sm:text-lg">{language.name}</h3>
              <p className="mt-1 text-sm text-primary-500">Comunicación profesional</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-primary-700 shadow-sm">
              {language.level}
            </span>
          </article>
=======
import React, { useState, useEffect } from 'react';
import { useLanguages } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Language } from '../../domain/entities';

export const Languages: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    setVisible(true);
    useLanguages().then(setLanguages);
  }, []);

  const getProficiencyColor = (proficiency: string): string => {
    switch (proficiency.toLowerCase()) {
      case 'nativo':
      case 'avanzado':
        return 'bg-secondary-500';
      case 'intermedio':
        return 'bg-primary-500';
      default:
        return 'bg-primary-400';
    }
  };

  return (
    <Section title="Idiomas">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="bg-white border border-primary-200 rounded-xl p-4 hover:border-secondary-300 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary-800">{lang.name}</span>
              <span className="text-sm text-primary-500">{lang.proficiency}</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProficiencyColor(lang.proficiency)}`}
                style={{ width: `${lang.level}%` }}
              ></div>
            </div>
          </div>
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
        ))}
      </div>
    </Section>
  );
};

<<<<<<< HEAD
export const Languages = memo(LanguagesComponent);
=======
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
