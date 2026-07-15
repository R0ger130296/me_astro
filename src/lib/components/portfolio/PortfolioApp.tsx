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

const navigation = [
  { label: 'Perfil', href: '#perfil' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Certificaciones', href: '#certificaciones' },
];

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
    <div className="min-h-screen bg-white text-primary-800">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[60] rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-lg"
      >
        Ir al contenido
      </a>

      <div className="sticky top-0 z-50 border-b border-primary-200/70 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/85">
        <Header initialData={personalInfo} />

        <nav aria-label="Navegación principal" className="border-t border-primary-100/80">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8 scrollbar-none">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="min-h-10 shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div id="inicio" className="border-b border-primary-100 bg-primary-50/50">
        <Hero />
      </div>

      <main id="contenido" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="space-y-10 sm:space-y-14 lg:space-y-20">
          <div id="perfil" className="scroll-mt-36">
            <About initialData={personalInfo} />
          </div>

          <div id="experiencia" className="scroll-mt-36">
            <Experience initialData={experiences} />
          </div>

          <div id="educacion" className="scroll-mt-36">
            <Education initialData={education} />
          </div>

          <div id="habilidades" className="scroll-mt-36">
            <Skills initialData={{ skills, softSkills }} />
          </div>

          <div id="certificaciones" className="scroll-mt-36">
            <Certifications initialData={certifications} />
          </div>

          <div id="idiomas" className="scroll-mt-36">
            <Languages initialData={languages} />
          </div>
        </div>
      </main>

      <footer className="border-t border-primary-200 bg-primary-50/60 py-8 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-primary-700">
            © {new Date().getFullYear()} Roger Cedeño
          </p>
          <p className="text-xs text-primary-500">Construido con Astro y React.</p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  </QueryProvider>
);
