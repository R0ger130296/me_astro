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
<<<<<<< HEAD
  const sectionClass = cn('m-0', className);

  const titleElement = title ? (
    <div className="mb-5 flex items-center justify-between gap-4 sm:mb-7">
      <h2 className="text-xl font-semibold tracking-tight text-primary-900 sm:text-2xl lg:text-3xl">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-primary-200" />
=======
  const sectionClass = cn('mb-8 lg:mb-12', className);

  const titleElement = title ? (
    <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-primary-100">
      <div className="w-1 h-6 sm:h-7 rounded-full bg-gradient-to-b from-secondary-400 to-secondary-600"></div>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary-800 tracking-tight">
        {title}
      </h2>
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
    </div>
  ) : null;

  if (card) {
    return (
      <section className={sectionClass}>
        <Card
          padding={padding}
<<<<<<< HEAD
          elevation="sm"
          className="transition-colors duration-200 hover:border-primary-300"
=======
          className="border border-primary-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary-300/60 transition-all duration-300"
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
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
<<<<<<< HEAD
=======

>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
