import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const baseStyles = 'rounded-2xl border border-primary-200/80 bg-white';

const paddings = {
  none: '',
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-7 lg:p-9',
  lg: 'p-6 sm:p-8 lg:p-10',
};

const elevations = {
  none: '',
  sm: 'shadow-[0_1px_2px_rgba(15,23,42,0.03)]',
  md: 'shadow-[0_8px_30px_rgba(15,23,42,0.05)]',
  lg: 'shadow-[0_16px_45px_rgba(15,23,42,0.07)]',
};

export const Card: React.FC<CardProps> = ({
  className = '',
  padding = 'md',
  elevation = 'sm',
  children,
}) => {
  const cardClass = cn(baseStyles, paddings[padding], elevations[elevation], className);

  return <div className={cardClass}>{children}</div>;
};
