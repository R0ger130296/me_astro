import React from 'react';
import type { PersonalInfo } from '../../domain/entities';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const technologies = ['React', '.NET', 'TypeScript', 'Azure', 'Astro'];

const focusStyles =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export const Hero: React.FC<HeroProps> = ({ personalInfo }) => (
  <section
    id="inicio"
    aria-labelledby="hero-title"
    className="relative isolate overflow-hidden border-b border-white/10 bg-slate-950 pt-28 text-white sm:pt-32"
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_25%,rgba(37,99,235,0.18),transparent_32%),radial-gradient(circle_at_78%_34%,rgba(147,51,234,0.22),transparent_34%),linear-gradient(to_bottom,#020617,#030712)]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
    />

    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-14 sm:px-6 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-16 lg:px-8 lg:pb-24">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
          Disponible para nuevos proyectos
        </div>

        <h1
          id="hero-title"
          className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Construyo soluciones digitales que generan{' '}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            impacto real.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          {personalInfo.title}. Desarrollo aplicaciones web y móviles escalables, centradas en la experiencia de usuario,
          el negocio y una arquitectura mantenible.
        </p>

        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tecnologías principales">
          {technologies.map((technology) => (
            <li
              key={technology}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur sm:text-sm"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#proyectos"
            className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:from-violet-500 hover:to-blue-500 ${focusStyles}`}
          >
            Ver proyectos
            <span aria-hidden="true" className="ml-2">→</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.08] ${focusStyles}`}
          >
            Contactarme
          </a>
          <a
            href="https://github.com/R0ger130296"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir GitHub de Roger Cedeño"
            className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.08] ${focusStyles}`}
          >
            GitHub
          </a>
        </div>
      </div>

      <aside className="relative mx-auto w-full max-w-[420px]" aria-label="Tarjeta profesional de Roger Cedeño">
        <div
          aria-hidden="true"
          className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-fuchsia-500 opacity-70 blur-3xl"
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/25 bg-slate-900/70 p-3 shadow-2xl shadow-violet-950/40 backdrop-blur-xl sm:p-4">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full border-2 border-violet-400/70 shadow-[0_0_50px_rgba(124,58,237,0.55)]"
            />
            <img
              src="/me/roger-profile.svg"
              alt={`Retrato profesional de ${personalInfo.name}`}
              width={360}
              height={360}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative z-10 aspect-square h-auto w-full object-cover object-top"
            />
          </div>

          <div className="relative -mt-10 mx-2 rounded-2xl border border-white/10 bg-slate-950/80 p-5 shadow-xl backdrop-blur-xl sm:mx-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">{personalInfo.name}</p>
                <p className="mt-1 text-sm font-semibold text-violet-300">{personalInfo.title}</p>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                Disponible
              </span>
            </div>

            <dl className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Ubicación</dt>
                <dd className="mt-1 font-medium text-slate-200">{personalInfo.location || 'Ecuador'}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-slate-500">Especialidad</dt>
                <dd className="mt-1 font-medium text-slate-200">Web, móvil y APIs</dd>
              </div>
            </dl>
          </div>
        </div>
      </aside>
    </div>
  </section>
);
