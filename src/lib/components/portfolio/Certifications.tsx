import React, { memo } from 'react';
import { useCertificationsQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Icon, Skeleton } from '../ui';
import { motion } from 'framer-motion';
import type { Certification } from '../../domain/entities';

interface CertificationsProps {
  initialData?: Certification[];
}

const CertificationsComponent: React.FC<CertificationsProps> = ({ initialData }) => {
  const { data: certifications = [], isLoading, isError } = useCertificationsQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Certificaciones">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={100} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Certificaciones">
        <div className="text-center py-8">
          <p className="text-primary-600">Error al cargar las certificaciones</p>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Certificaciones">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white border border-primary-200 rounded-xl p-4 hover:border-secondary-300 hover:shadow-lg transition-all cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon name="Award" size={24} color="#14b8a6" />
              </motion.div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary-800 mb-1">{cert.name}</h3>
                {cert.issuer && (
                  <p className="text-sm text-primary-600">{cert.issuer}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export const Certifications = memo(CertificationsComponent);
