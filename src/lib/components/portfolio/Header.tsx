<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { usePersonalInfo } from '../../presentation/hooks/usePortfolio';
import { ContactLink } from '../ui';
import type { PersonalInfo } from '../../domain/entities';

export const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    setMounted(true);
    usePersonalInfo().then(setPersonalInfo);
  }, []);

  return (
    <header className="relative bg-transparent py-3 sm:py-4 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-7xl mx-auto">
        {mounted && personalInfo && (
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 animate-fade-in">
            {/* Left: Name & Title */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              {/* Accent dot */}
              <div className="hidden sm:block w-2 h-2 rounded-full bg-gradient-to-br from-secondary-400 to-secondary-600 shrink-0"></div>

              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-primary-800 tracking-tight truncate">
                  {personalInfo.name}
                </h1>
                <span className="hidden md:inline-block w-px h-4 bg-primary-300"></span>
                <p className="hidden md:block text-sm lg:text-base text-primary-500 font-medium truncate">
                  {personalInfo.title}
                </p>
              </div>
            </div>

            {/* Right: Contact Links */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ContactLink
                type="email"
                value={personalInfo.email}
                className="text-primary-600 hover:text-secondary-600 text-xs sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-secondary-50 transition-all duration-200 font-medium"
              />
              <span className="hidden sm:inline-block w-px h-4 bg-primary-200"></span>
              <ContactLink
                type="phone"
                value={personalInfo.phone}
                className="hidden sm:inline-flex text-primary-600 hover:text-secondary-600 text-xs sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-secondary-50 transition-all duration-200 font-medium"
              />
              <span className="hidden lg:inline-block w-px h-4 bg-primary-200"></span>
              <ContactLink
                type="location"
                value={personalInfo.location}
                className="hidden lg:inline-flex text-primary-500 hover:text-secondary-600 text-xs sm:text-sm px-2.5 py-1.5 rounded-lg hover:bg-secondary-50 transition-all duration-200"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
