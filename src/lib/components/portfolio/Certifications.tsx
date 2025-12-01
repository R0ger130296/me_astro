import React, { useState, useEffect } from 'react';
import { useCertifications } from '../../presentation/hooks/usePortfolio';
import { Section, Icon } from '../ui';
import type { Certification } from '../../domain/entities';

export const Certifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    setVisible(true);
    useCertifications().then(setCertifications);
  }, []);

  return (
    <Section title="Certificaciones">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white border border-primary-200 rounded-xl p-4 hover:border-secondary-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <Icon name="Award" size={24} color="#14b8a6" />
              <div className="flex-1">
                <h3 className="font-semibold text-primary-800 mb-1">{cert.name}</h3>
                <p className="text-sm text-primary-600 mb-2">{cert.issuer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

