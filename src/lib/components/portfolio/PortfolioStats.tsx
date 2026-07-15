import React from 'react';

interface PortfolioStatsProps {
  experienceCount: number;
  projectCount: number;
  certificationCount: number;
  technologyCount: number;
}

export const PortfolioStats: React.FC<PortfolioStatsProps> = ({
  experienceCount,
  projectCount,
  certificationCount,
  technologyCount,
}) => {
  const stats = [
    { value: experienceCount, label: 'Experiencias' },
    { value: projectCount, label: 'Proyectos' },
    { value: certificationCount, label: 'Certificaciones' },
    { value: technologyCount, label: 'Tecnologías' },
  ];

  return (
    <section aria-label="Resumen profesional" className="border-y border-primary-100 bg-primary-50/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`px-3 py-5 text-center sm:py-6 ${index % 2 === 0 ? 'border-r border-primary-100 lg:border-r' : ''} ${index === 1 ? 'lg:border-r' : ''}`}
          >
            <strong className="block text-2xl font-semibold tracking-tight text-primary-900 sm:text-3xl">
              {stat.value}
            </strong>
            <span className="mt-1 block text-xs font-medium uppercase tracking-[0.12em] text-primary-500 sm:text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
