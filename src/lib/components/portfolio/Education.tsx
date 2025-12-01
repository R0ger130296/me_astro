import React, { useState, useEffect } from 'react';
import { useEducation } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Education } from '../../domain/entities';

export const Education: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [education, setEducation] = useState<Education[]>([]);

  useEffect(() => {
    setVisible(true);
    useEducation().then(setEducation);
  }, []);

  return (
    <Section title="Educación">
      <div className="space-y-4 sm:space-y-6">
        {education.map((edu, index) => (
          <div
            key={edu.id}
            className="pb-4 sm:pb-6 border-b border-gray-100 last:border-0 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{edu.degree}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-1">{edu.institution}</p>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
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
          </div>
        ))}
      </div>
    </Section>
  );
};

