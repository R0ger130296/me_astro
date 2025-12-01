import React from 'react';
import { cn } from '../../utils/cn';
import type { ButtonVariant, ButtonSize } from './types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  type = 'button',
  disabled = false,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus-visible:ring-secondary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-gray-900 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:opacity-90 focus-visible:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonClass = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={buttonClass} role="button" tabIndex={0}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

