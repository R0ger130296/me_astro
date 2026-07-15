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
  const sectionClass = cn('m-0', className);

  const titleElement = title ? (
    <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
      <h2 className="text-xl font-semibold tracking-tight text-primary-900 sm:text-2xl lg:text-3xl">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-primary-200" />
    </div>
  ) : null;

  if (card) {
    return (
      <section className={sectionClass}>
        <Card
          padding={padding}
          elevation="sm"
          className="transition-colors duration-200 hover:border-primary-300"
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
