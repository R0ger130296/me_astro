import React from 'react';
import { cn } from '../../utils/cn';
import type { BadgeVariant } from './types';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';

const variants = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', className = '', children }) => {
  const badgeClass = cn(baseStyles, variants[variant], className);

  return <span className={badgeClass}>{children}</span>;
};

