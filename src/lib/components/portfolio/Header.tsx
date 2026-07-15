import React from 'react';
import { ContactLink } from '../ui';
import type { PersonalInfo } from '../../domain/entities';

interface HeaderProps {
  initialData: PersonalInfo;
}

export const Header: React.FC<HeaderProps> = ({ initialData: personalInfo }) => (
  <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
    <a
      href="#inicio"
      className="flex min-w-0 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 dark:ring-offset-primary-950"
      aria-label="Ir al inicio"
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-black text-white shadow-lg shadow-violet-500/20">
        RC
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-primary-900 sm:text-base">{personalInfo.name}</span>
        <span className="hidden truncate text-xs text-primary-500 sm:block">{personalInfo.title}</span>
      </span>
    </a>

    <div className="flex shrink-0 items-center gap-2">
      <ContactLink
        type="email"
        value={personalInfo.email}
        className="hidden min-h-10 items-center rounded-xl border border-primary-200 px-3 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-900 sm:inline-flex"
      />
      <a
        href={`mailto:${personalInfo.email}`}
        aria-label={`Enviar correo a ${personalInfo.email}`}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary-200 text-lg text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 dark:ring-offset-primary-950 sm:hidden"
      >
        ✉
      </a>
    </div>
  </div>
);