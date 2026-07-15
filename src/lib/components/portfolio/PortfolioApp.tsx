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
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2';

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
    <div className="min-h-screen bg-white text-primary-800">
      <a
        href="#contenido"
        className={`sr-only fixed left-4 top-4 z-[60] rounded-lg bg-primary-900 px-4 py-2 text-sm font-medium text-white shadow-lg focus:not-sr-only ${focusStyles}`}
      >
        Ir al contenido
      </a>

      <header className="sticky top-0 z-50 border-b border-primary-200 bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
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
            className="scroll-mt-36 overflow-hidden rounded-3xl bg-primary-900 px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary-300">
                  Contacto
                </p>
                <h2 id="contact-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                  Construyamos una solución útil, rápida y mantenible.
                </h2>
                <p className="mt-4 text-sm leading-6 text-primary-200 sm:text-base sm:leading-7">
                  Disponible para proyectos web, aplicaciones móviles, APIs, modernización de sistemas y consultoría técnica.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-900 transition-colors hover:bg-secondary-50 ${focusStyles}`}
                >
                  Enviar correo
                </a>
                <a
                  href="https://github.com/R0ger130296"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 ${focusStyles}`}
                >
                  Ver GitHub
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-primary-300 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <span>{personalInfo.email}</span>
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-primary-200 bg-primary-50/60 py-8 sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-sm font-medium text-primary-700">
            © {new Date().getFullYear()} Roger Cedeño
          </p>
          <p className="text-xs text-primary-500">Astro, React y una cantidad razonable de café.</p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  </QueryProvider>
);
