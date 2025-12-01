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
        ))}
      </div>
    </Section>
  );
};

