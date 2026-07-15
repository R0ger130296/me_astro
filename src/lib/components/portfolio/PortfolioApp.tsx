import React from 'react';
import type {
  Certification,
  Education as EducationEntity,
  Experience as ExperienceEntity,
  Language,
  PersonalInfo,
  Skill,
} from '../../domain/entities';
import type { GitHubRepository } from '../../infrastructure/github/getFeaturedRepositories';
import { QueryProvider } from '../../infrastructure/query/QueryProvider';
import { ScrollToTop } from '../ui/ScrollToTop';
import { About } from './About';
import { Certifications } from './Certifications';
import { Education } from './Education';
import { Experience } from './Experience';
import { GitHubProjects } from './GitHubProjects';
import { Header } from './Header';
import { Hero } from './Hero';
import { Languages } from './Languages';
import { PortfolioControls } from './PortfolioControls';
import { PortfolioStats } from './PortfolioStats';
import { Skills } from './Skills';

interface PortfolioAppProps {
  personalInfo: PersonalInfo;
  experiences: ExperienceEntity[];
  education: EducationEntity[];
  certifications: Certification[];
  skills: Skill[];
  softSkills: Skill[];
  languages: Language[];
  repositories: GitHubRepository[];
}

const navigation = [
  { label: 'Perfil', href: '#perfil' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Educación', href: '#educacion' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Certificaciones', href: '#certificaciones' },
  { label: 'Contacto', href: '#contacto' },
];

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2 dark:ring-offset-primary-950';

export const PortfolioApp: React.FC<PortfolioAppProps> = ({
  personalInfo,
  experiences,
  education,
  certifications,
  skills,
  softSkills,
  languages,
  repositories,
}) => (
  <QueryProvider>
    <div className="min-h-screen bg-white text-primary-800 transition-colors dark:bg-primary-950">
      <a
        href="#contenido"
        className={`sr-only fixed left-4 top-4 z-[60] rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-lg focus:not-sr-only ${focusStyles}`}
      >
        Ir al contenido
      </a>

      <header className="sticky top-0 z-50 border-b border-primary-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 dark:bg-primary-950/95">
        <Header initialData={personalInfo} />
        <nav aria-label="Navegación principal" className="border-t border-primary-100">
          <div className="scrollbar-none mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5 sm:px-6 lg:px-8">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`min-h-10 shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-900 ${focusStyles}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <Hero personalInfo={personalInfo} />

      <PortfolioStats
        experienceCount={experiences.length}
        projectCount={repositories.length}
        certificationCount={certifications.length}
        technologyCount={new Set(skills.map((skill) => skill.name.trim().toLowerCase())).size}
      />

      <main id="contenido" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="space-y-10 sm:space-y-14 lg:space-y-20">
          <div id="perfil" className="scroll-mt-36">
            <About initialData={personalInfo} />
          </div>

          <div id="experiencia" className="scroll-mt-36">
            <Experience initialData={experiences} />
          </div>

          <div id="proyectos" className="scroll-mt-36">
            <GitHubProjects repositories={repositories} />
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

          <section
            id="contacto"
            aria-labelledby="contact-title"
            className="scroll-mt-36 overflow-hidden rounded-3xl bg-primary-900 px-5 py-8 text-white shadow-xl sm:px-8 sm:py-10 lg:px-12 lg:py-12 dark:bg-primary-100 dark:text-primary-900"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-300 dark:text-secondary-700">
                  Contacto
                </p>
                <h2 id="contact-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl dark:text-primary-900">
                  Construyamos una solución útil, rápida y mantenible.
                </h2>
                <p className="mt-4 text-sm leading-6 text-primary-200 sm:text-base sm:leading-7 dark:text-primary-600">
                  Disponible para proyectos web, aplicaciones móviles, APIs, modernización de sistemas y consultoría técnica.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-colors hover:bg-secondary-50 dark:bg-primary-900 dark:text-white ${focusStyles}`}
                >
                  Enviar correo
                </a>
                <a
                  href="https://github.com/R0ger130296"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 dark:border-primary-300 dark:text-primary-800 ${focusStyles}`}
                >
                  Ver GitHub
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-primary-300 sm:flex-row sm:flex-wrap sm:gap-x-6 dark:border-primary-300 dark:text-primary-600">
              <span>{personalInfo.email}</span>
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-primary-200 bg-primary-50/60 py-8 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <p className="text-sm font-semibold text-primary-900">Roger Cedeño</p>
            <p className="mt-1 text-xs text-primary-500">Software engineer · React · .NET · Astro · Azure</p>
          </div>
          <div className="flex flex-col items-center gap-2 sm:items-end">
            <div className="flex gap-4 text-sm">
              <a href={`mailto:${personalInfo.email}`} className={`font-medium text-primary-700 hover:text-secondary-600 ${focusStyles}`}>Email</a>
              <a href="https://github.com/R0ger130296" target="_blank" rel="noreferrer" className={`font-medium text-primary-700 hover:text-secondary-600 ${focusStyles}`}>GitHub</a>
              <a href="#inicio" className={`font-medium text-primary-700 hover:text-secondary-600 ${focusStyles}`}>Inicio</a>
            </div>
            <p className="text-xs text-primary-500">© {new Date().getFullYear()} · Construido con Astro y React.</p>
          </div>
        </div>
      </footer>

      <PortfolioControls email={personalInfo.email} />
      <ScrollToTop />
    </div>
  </QueryProvider>
);
