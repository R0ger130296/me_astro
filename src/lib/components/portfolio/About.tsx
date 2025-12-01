import React, { useState, memo } from 'react';
import { usePersonalInfoQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton, SkeletonAvatar, SkeletonCard } from '../ui';
import { ErrorBoundary } from '../../presentation/components/ErrorBoundary';
import { motion } from 'framer-motion';
import type { PersonalInfo } from '../../domain/entities';

interface AboutProps {
  initialData?: PersonalInfo;
}

const AboutComponent: React.FC<AboutProps> = ({ initialData }) => {
  const [imageError, setImageError] = useState(false);
  
  // Use TanStack Query for better data management
  const { data: personalInfo, isLoading, isError, error } = usePersonalInfoQuery(initialData);

  if (isError) {
    return (
      <Section title="Sobre Mí">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-primary-600 mb-4">Error al cargar la información</p>
          {error && (
            <p className="text-sm text-primary-400">{error.message}</p>
          )}
        </motion.div>
      </Section>
    );
  }

  if (isLoading && !initialData) {
    return (
      <Section title="Sobre Mí">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:items-start">
          <SkeletonAvatar size={224} />
          <div className="flex-1 space-y-4">
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="80%" height={24} />
            <div className="flex gap-4 mt-6">
              <Skeleton variant="rounded" width={150} height={24} />
              <Skeleton variant="rounded" width={150} height={24} />
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (!personalInfo) return null;

  return (
    <ErrorBoundary>
      <Section title="Sobre Mí">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center lg:items-start"
        >
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="shrink-0 w-36 h-36 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto lg:mx-0"
          >
            <div className="relative w-full h-full group cursor-pointer">
              {/* Decorative background with enhanced animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-2xl"
                animate={{ rotate: [3, 6, 3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ rotate: 8, scale: 1.02 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl"
                animate={{ rotate: [-3, -6, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                whileHover={{ rotate: -8, scale: 1.02 }}
              />

              {/* Photo */}
              {!imageError ? (
                <motion.img
                  src="/me/roger.jpg"
                  alt={personalInfo.name || 'Roger Cedeño'}
                  className="relative w-full h-full rounded-2xl shadow-xl object-cover border-4 border-white z-10"
                  loading="eager"
                  decoding="async"
                  onError={() => setImageError(true)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              ) : (
                <motion.div
                  className="relative w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl flex items-center justify-center text-primary-700 font-bold text-2xl z-10 border-4 border-white shadow-xl"
                  whileHover={{ scale: 1.05 }}
                >
                  {personalInfo.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </motion.div>
              )}

              {/* Status indicator with pulse animation */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg z-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-4 h-4 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-full"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="max-w-2xl mx-auto lg:mx-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl leading-relaxed text-primary-600 mb-6"
              >
                {personalInfo.summary}
              </motion.p>

              {/* Quick stats with stagger animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center lg:justify-start gap-4 lg:gap-6"
              >
                {[
                  '+4 años de experiencia',
                  'Full Stack Developer',
                  'Consultor Técnico'
                ].map((stat, index) => (
                  <motion.div
                    key={stat}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm lg:text-base text-primary-500 group"
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-secondary-400"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    />
                    <span className="font-medium group-hover:text-secondary-600 transition-colors">
                      {stat}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Section>
    </ErrorBoundary>
  );
};

export const About = memo(AboutComponent);

