import React, { useMemo } from 'react';
import { useLanguagesHook } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Language } from '../../domain/entities';

interface LanguagesProps {
  initialData?: Language[];
}

export const Languages: React.FC<LanguagesProps> = ({ initialData }) => {
  const { data: fetchedData } = useLanguagesHook();
  const languages = useMemo(() => initialData || fetchedData || [], [initialData, fetchedData]);

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

  const getLevelPercentage = (level: string): number => {
    const levelMap: Record<string, number> = {
      'Nativo': 100,
      'Avanzado': 85,
      'Intermedio': 70,
      'Básico': 50,
    };
    return levelMap[level] || 50;
  };

  return (
    <Section title="Idiomas">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {languages.map((lang, index) => (
          <div
            key={`${lang.name}-${index}`}
            className="bg-white border border-primary-200 rounded-xl p-4 hover:border-secondary-300 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary-800">{lang.name}</span>
              <span className="text-sm text-primary-500">{lang.level}</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProficiencyColor(lang.level)}`}
                style={{ width: `${getLevelPercentage(lang.level)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

