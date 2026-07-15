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
        ))}
      </div>
    </Section>
  );
};

export const Languages = memo(LanguagesComponent);
