import React, { memo } from 'react';
import { useEducationQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton, SkeletonList } from '../ui';
import { motion } from 'framer-motion';
import type { Education as EducationEntity } from '../../domain/entities';

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
        <div className="text-center py-8">
          <p className="text-primary-600">Error al cargar la educación</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Educación">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 sm:space-y-6"
      >
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pb-4 sm:pb-6 border-b border-primary-100 last:border-0 hover:border-primary-200 transition-colors"
          >
            <motion.h3
              className="text-base sm:text-lg font-semibold text-primary-800 mb-1"
              whileHover={{ x: 4 }}
            >
              {edu.degree}
            </motion.h3>
            <p className="text-sm sm:text-base text-primary-600 mb-1">{edu.institution}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-primary-500">
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
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export const Education = memo(EducationComponent);
