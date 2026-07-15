import React from 'react';
import type {
  Certification,
  Education as EducationEntity,
  Experience as ExperienceEntity,
  Language,
  PersonalInfo,
  Skill,
} from '../../domain/entities';
import { QueryProvider } from '../../infrastructure/query/QueryProvider';
import { ScrollToTop } from '../ui/ScrollToTop';
import { About } from './About';
import { Certifications } from './Certifications';
import { Education } from './Education';
import { Experience } from './Experience';
import { Header } from './Header';
import { Hero } from './Hero';
import { Languages } from './Languages';
import { Skills } from './Skills';

interface PortfolioAppProps {
  personalInfo: PersonalInfo;
  experiences: ExperienceEntity[];
  education: EducationEntity[];
  certifications: Certification[];
  skills: Skill[];
  softSkills: Skill[];
  languages: Language[];
}

export const PortfolioApp: React.FC<PortfolioAppProps> = ({
  personalInfo,
  experiences,
  education,
  certifications,
  skills,
  softSkills,
  languages,
}) => (
  <QueryProvider>
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/30 to-white">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-primary-200/50 shadow-xs">
        <Header initialData={personalInfo} />
      </nav>

      <Hero />

      <main className="relative">
        <div className="hidden xl:block absolute left-8 2xl:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-secondary-300 via-primary-200 to-transparent" />
        <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pb-16 sm:pb-20 lg:pb-24 space-y-8 sm:space-y-12 lg:space-y-16 xl:space-y-20 pt-16 sm:pt-20 lg:pt-24">
          <About initialData={personalInfo} />
          <div className="divider" />
          <Experience initialData={experiences} />
          <div className="divider" />
          <Education initialData={education} />
          <div className="divider" />
          <Skills initialData={{ skills, softSkills }} />
          <div className="divider" />
          <Certifications initialData={certifications} />
          <div className="divider" />
          <Languages initialData={languages} />
        </div>
      </main>

      <footer className="relative border-t border-primary-200/60 bg-gradient-to-b from-primary-50/50 to-primary-100/30 py-10 sm:py-14 lg:py-16 mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-primary-600 text-sm sm:text-base font-medium">© {new Date().getFullYear()} Roger Cedeño</p>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-primary-300" />
            <p className="text-primary-500 text-sm">Desarrollado con <span className="font-semibold text-primary-700">Astro</span> y <span className="font-semibold text-secondary-600">React</span></p>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  </QueryProvider>
);
