import React from 'react';
import type { PersonalInfo } from '../../domain/entities';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const technologies = ['React', 'Astro', 'TypeScript', '.NET'];

export const Hero: React.FC<HeroProps> = ({ personalInfo }) => (
  <section
    aria-labelledby="hero-title"
    className="border-b border-primary-200 bg-white pt-28 sm:pt-32"
  >
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 sm:px-6 sm:pb-18 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:gap-16 lg:px-8 lg:pb-24">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-semibold tracking-wide text-secondary-700">
          Software developer · Ecuador
        </p>

        <h1
          id="hero-title"
          className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-primary-900 sm:text-5xl lg:text-6xl"
        >
          Desarrollo productos digitales claros, rápidos y mantenibles.
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-primary-600 sm:text-lg sm:leading-8">
          {personalInfo.title}. Construyo aplicaciones web y móviles enfocadas en experiencia de usuario,
          rendimiento y buenas prácticas de ingeniería.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#experiencia"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
          >
            Ver experiencia
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary-300 bg-white px-5 py-2.5 text-sm font-semibold text-primary-800 transition hover:border-primary-400 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-500 focus-visible:ring-offset-2"
          >
            Contactarme
          </a>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tecnologías principales">
          {technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-600"
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-2xl border border-primary-200 bg-primary-50 p-5 sm:p-6" aria-label="Resumen profesional">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-500">Disponible para</p>
        <p className="mt-3 text-xl font-semibold leading-snug text-primary-900">
          Proyectos web, aplicaciones móviles y consultoría técnica.
        </p>
        <dl className="mt-6 space-y-4 text-sm">
          <div>
            <dt className="text-primary-500">Ubicación</dt>
            <dd className="mt-1 font-medium text-primary-800">{personalInfo.location}</dd>
          </div>
          <div>
            <dt className="text-primary-500">Especialidad</dt>
            <dd className="mt-1 font-medium text-primary-800">React, Astro, TypeScript y .NET</dd>
          </div>
          <div>
            <dt className="text-primary-500">Enfoque</dt>
            <dd className="mt-1 font-medium text-primary-800">UX, rendimiento y código limpio</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
);
