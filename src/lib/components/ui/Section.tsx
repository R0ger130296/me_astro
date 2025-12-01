import React from 'react';
import { cn } from '../../utils/cn';
import { Card } from './Card';

interface SectionProps {
  title?: string;
  className?: string;
  card?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  className = '',
  card = true,
  padding = 'md',
  children,
}) => {
  const sectionClass = cn('mb-8 lg:mb-12', className);

  const titleElement = title ? (
    <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-primary-100">
      <div className="w-1 h-6 sm:h-7 rounded-full bg-gradient-to-b from-secondary-400 to-secondary-600"></div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-800 tracking-tight">
        {title}
      </h2>
    </div>
  ) : null;

  if (card) {
    return (
      <section className={sectionClass}>
        <Card
          padding={padding}
          className="border border-primary-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary-300/60 transition-all duration-300"
        >
          {titleElement}
          {children}
        </Card>
      </section>
    );
  }

  return (
    <section className={sectionClass}>
      {titleElement}
      {children}
    </section>
  );
};

