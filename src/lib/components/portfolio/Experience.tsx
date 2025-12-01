import React, { useState, memo, useMemo } from 'react';
import { useExperiencesQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Icon, Modal, Pagination, Skeleton, SkeletonList } from '../ui';
import { motion, AnimatePresence } from 'framer-motion';
import type { Experience as ExperienceEntity } from '../../domain/entities';

interface ExperienceProps {
  initialData?: ExperienceEntity[];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ initialData }) => {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceEntity | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const { data: experiences = [], isLoading, isError } = useExperiencesQuery(initialData);

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExperiences = useMemo(
    () => experiences.slice(startIndex, endIndex),
    [experiences, startIndex, endIndex]
  );

  const openModal = (experience: ExperienceEntity) => {
    setSelectedExperience(experience);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedExperience(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const section = document.querySelector('[data-section="experience"]');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (isLoading && !initialData) {
    return (
      <Section title="Experiencia Profesional">
        <SkeletonList items={3} />
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Experiencia Profesional">
        <div className="text-center py-8">
          <p className="text-primary-600">Error al cargar las experiencias</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Experiencia Profesional">
      <div data-section="experience" className="space-y-4 sm:space-y-5 lg:space-y-6">
        <AnimatePresence mode="wait">
          {paginatedExperiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group cursor-pointer bg-white border border-primary-200/60 rounded-xl p-5 sm:p-6 hover:border-secondary-300 hover:shadow-lg transition-all duration-300"
              onClick={() => openModal(experience)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openModal(experience)}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-6 mb-4">
                <div className="flex-1 min-w-0">
                  <motion.h3
                    className="text-lg sm:text-xl font-semibold text-primary-800 mb-2 group-hover:text-secondary-600 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {experience.title}
                  </motion.h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium text-primary-700">{experience.company}</span>
                    <span className="w-1 h-1 rounded-full bg-primary-300"></span>
                    <span className="text-primary-500">{experience.location}</span>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-sm text-primary-500 font-medium bg-primary-50 px-3 py-1.5 rounded-lg"
                  whileHover={{ backgroundColor: 'rgb(240 253 250)' }}
                >
                  <Icon name="Calendar" size={14} color="currentColor" />
                  <span>
                    {experience.startDate} - {experience.endDate}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={experiences.length}
            onPageChange={handlePageChange}
          />
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && selectedExperience && (
          <Modal
            isOpen={showModal}
            onClose={closeModal}
            title={selectedExperience.title}
            subtitle={`${selectedExperience.company} • ${selectedExperience.location} • ${selectedExperience.startDate} - ${selectedExperience.endDate}`}
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {selectedExperience.responsibilities.map((resp, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 text-sm text-primary-600"
                >
                  <span className="text-secondary-500 mt-1">
                    <Icon name="ChevronRight" size={14} color="currentColor" />
                  </span>
                  <span>{resp}</span>
                </motion.li>
              ))}
            </motion.ul>
          </Modal>
        )}
      </AnimatePresence>
    </Section>
  );
};

export const Experience = memo(ExperienceComponent);
