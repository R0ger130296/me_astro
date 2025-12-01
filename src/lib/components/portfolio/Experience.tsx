import React, { useState, useEffect } from 'react';
import { useExperiences } from '../../presentation/hooks/usePortfolio';
import { Section, Icon, Modal, Pagination } from '../ui';
import type { Experience } from '../../domain/entities';

export const Experience: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setVisible(true);
    useExperiences().then(setExperiences);
  }, []);

  const totalPages = Math.ceil(experiences.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExperiences = experiences.slice(startIndex, endIndex);

  const openModal = (experience: Experience) => {
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

  return (
    <Section title="Experiencia Profesional">
      <div data-section="experience" className="space-y-4 sm:space-y-5 lg:space-y-6">
        {paginatedExperiences.map((experience, index) => (
          <div
            key={experience.id}
            className="group cursor-pointer bg-white border border-primary-200/60 rounded-xl p-5 sm:p-6 hover:border-secondary-300 hover:shadow-md transition-all"
            onClick={() => openModal(experience)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal(experience)}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-6 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-primary-800 mb-2">
                  {experience.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium text-primary-700">{experience.company}</span>
                  <span className="w-1 h-1 rounded-full bg-primary-300"></span>
                  <span className="text-primary-500">{experience.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-500 font-medium bg-primary-50 px-3 py-1.5 rounded-lg">
                <Icon name="Calendar" size={14} color="currentColor" />
                <span>
                  {experience.startDate} - {experience.endDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={experiences.length}
          onPageChange={handlePageChange}
        />
      )}

      {showModal && selectedExperience && (
        <Modal
          isOpen={showModal}
          onClose={closeModal}
          title={selectedExperience.title}
          subtitle={`${selectedExperience.company} • ${selectedExperience.location} • ${selectedExperience.startDate} - ${selectedExperience.endDate}`}
        >
          <ul className="space-y-2">
            {selectedExperience.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-primary-600">
                <span className="text-secondary-500 mt-1">
                  <Icon name="ChevronRight" size={14} color="currentColor" />
                </span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </Section>
  );
};

