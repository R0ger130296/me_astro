<<<<<<< HEAD
import React, { memo } from 'react';
import type { Certification } from '../../domain/entities';
import { useCertificationsQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton } from '../ui';

interface CertificationsProps {
  initialData?: Certification[];
}

const CertificationsComponent: React.FC<CertificationsProps> = ({ initialData }) => {
  const { data: certifications = [], isLoading, isError } = useCertificationsQuery(initialData);

  if (isLoading && !initialData) {
    return (
      <Section title="Certificaciones">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={120} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Certificaciones">
        <p className="py-6 text-sm text-primary-600">No fue posible cargar las certificaciones.</p>
      </Section>
    );
  }

  return (
    <Section title="Certificaciones">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification) => (
          <article key={certification.id} className="rounded-2xl border border-primary-200 bg-white p-5 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-lg text-secondary-700" aria-hidden="true">
              ✓
            </div>
            <h3 className="mt-4 text-base font-semibold leading-6 text-primary-900">
              {certification.name}
            </h3>
            {certification.issuer && (
              <p className="mt-2 text-sm font-medium text-primary-600">{certification.issuer}</p>
            )}
          </article>
=======
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
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
        ))}
      </div>
    </Section>
  );
};

<<<<<<< HEAD
export const Certifications = memo(CertificationsComponent);
=======
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
