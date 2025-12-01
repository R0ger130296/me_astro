import React, { memo } from 'react';
import { useLanguagesQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton } from '../ui';
import { motion } from 'framer-motion';
import type { Language } from '../../domain/entities';

interface LanguagesProps {
  initialData?: Language[];
}

const LanguagesComponent: React.FC<LanguagesProps> = ({ initialData }) => {
  const { data: languages = [], isLoading, isError } = useLanguagesQuery(initialData);

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

  if (isLoading && !initialData) {
    return (
      <Section title="Idiomas">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={80} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Idiomas">
        <div className="text-center py-8">
          <p className="text-primary-600">Error al cargar los idiomas</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Idiomas">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {languages.map((lang, index) => {
          const percentage = getLevelPercentage(lang.level);
          return (
            <motion.div
              key={`${lang.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white border border-primary-200 rounded-xl p-4 hover:border-secondary-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-primary-800">{lang.name}</span>
                <span className="text-sm text-primary-500 font-medium">{lang.level}</span>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className={`h-2 rounded-full ${getProficiencyColor(lang.level)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export const Languages = memo(LanguagesComponent);
