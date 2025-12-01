import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const baseStyles = 'bg-white rounded-xl lg:rounded-2xl';

const paddings = {
  none: '',
  sm: 'p-4 lg:p-5',
  md: 'p-5 sm:p-6 lg:p-8 xl:p-10',
  lg: 'p-6 sm:p-8 lg:p-10 xl:p-12',
};

const elevations = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

export const Card: React.FC<CardProps> = ({
  className = '',
  padding = 'md',
  elevation = 'md',
  children,
}) => {
  const cardClass = cn(baseStyles, paddings[padding], elevations[elevation], className);

  return <div className={cardClass}>{children}</div>;
};

