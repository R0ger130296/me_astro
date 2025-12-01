import React from 'react';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import type { ContactType } from './types';

interface ContactLinkProps {
  type: ContactType;
  value: string;
  href?: string;
  className?: string;
  iconSize?: number;
  children?: React.ReactNode;
}

const iconMap: Record<ContactType, string> = {
  email: 'Mail',
  phone: 'Phone',
  location: 'MapPin',
  linkedin: 'Linkedin',
  github: 'Github',
  website: 'Globe',
};

const defaultHrefs: Record<ContactType, (val: string) => string> = {
  email: (val) => `mailto:${val}`,
  phone: (val) => `tel:${val}`,
  location: () => '#',
  linkedin: (val) => (val.startsWith('http') ? val : `https://linkedin.com/in/${val}`),
  github: (val) => (val.startsWith('http') ? val : `https://github.com/${val}`),
  website: (val) => (val.startsWith('http') ? val : `https://${val}`),
};

export const ContactLink: React.FC<ContactLinkProps> = ({
  type,
  value,
  href,
  className = '',
  iconSize = 20,
  children,
}) => {
  const finalHref = href || defaultHrefs[type](value);
  const isLink = type !== 'location';
  const linkClass = cn('flex items-center gap-2 transition-opacity', isLink ? 'hover:opacity-80' : '', className);

  if (isLink) {
    return (
      <a href={finalHref} className={linkClass} aria-label={type}>
        <Icon name={iconMap[type] as any} size={iconSize} />
        <span>{children || value}</span>
      </a>
    );
  }

  return (
    <div className={linkClass}>
      <Icon name={iconMap[type] as any} size={iconSize} />
      <span>{children || value}</span>
    </div>
  );
};

