<<<<<<< HEAD
import React, { memo, useMemo } from 'react';
import type { Skill } from '../../domain/entities';
import { useSkillsQuery, useSoftSkillsQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton } from '../ui';

interface SkillsProps {
  initialData?: {
    skills?: Skill[];
    softSkills?: Skill[];
  };
}

const levelLabels: Record<string, string> = {
  expert: 'Experto',
  advanced: 'Avanzado',
  intermediate: 'Intermedio',
  beginner: 'En aprendizaje',
};

const SkillsComponent: React.FC<SkillsProps> = ({ initialData }) => {
  const { data: skills = [], isLoading: isLoadingSkills } = useSkillsQuery(initialData?.skills);
  const { data: softSkills = [] } = useSoftSkillsQuery(initialData?.softSkills);

  const groupedSkills = useMemo(
    () =>
      skills.reduce<Record<string, Skill[]>>((groups, skill) => {
        const category = skill.category || 'Tecnologías';
        groups[category] = [...(groups[category] ?? []), skill];
        return groups;
      }, {}),
    [skills]
  );

  if (isLoadingSkills && !initialData) {
    return (
      <Section title="Habilidades">
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} variant="rounded" height={140} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Habilidades">
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <article key={category} className="rounded-2xl border border-primary-200 bg-white p-5 sm:p-6">
            <h3 className="text-base font-semibold text-primary-900 sm:text-lg">{category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {categorySkills.map((skill) => (
                <span
                  key={`${category}-${skill.name}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-sm text-primary-700"
                >
                  <span>{skill.name}</span>
                  {skill.level && (
                    <span className="text-xs font-medium text-primary-500">
                      {levelLabels[skill.level] ?? skill.level}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {softSkills.length > 0 && (
        <div className="mt-6 rounded-2xl bg-primary-900 p-5 text-white sm:p-6">
          <h3 className="text-base font-semibold text-white sm:text-lg">Fortalezas profesionales</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {softSkills.map((skill) => (
              <span key={skill.name} className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-primary-100">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
=======
import React, { useState, useEffect } from 'react';
import { useSkills, useSoftSkills } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Skill } from '../../domain/entities';

export const Skills: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [softSkills, setSoftSkills] = useState<Skill[]>([]);

  useEffect(() => {
    setVisible(true);
    useSkills().then(setSkills);
    useSoftSkills().then(setSoftSkills);
  }, []);

  const getLevelColor = (level: number): string => {
    if (level >= 85) return 'bg-gradient-to-r from-secondary-500 to-secondary-600';
    if (level >= 70) return 'bg-gradient-to-r from-primary-500 to-primary-600';
    if (level >= 50) return 'bg-gradient-to-r from-primary-400 to-primary-500';
    return 'bg-gradient-to-r from-primary-300 to-primary-400';
  };

  const getLevelLabel = (level: number): string => {
    if (level >= 85) return 'Experto';
    if (level >= 70) return 'Avanzado';
    if (level >= 50) return 'Intermedio';
    return 'En progreso';
  };

  return (
    <Section title="Habilidades Técnicas">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-primary-50/50 border border-primary-100 rounded-xl p-4 hover:bg-white hover:border-primary-200 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-primary-800">{skill.name}</span>
              <span className="text-xs text-primary-500">{getLevelLabel(skill.level)}</span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getLevelColor(skill.level)}`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
    </Section>
  );
};

<<<<<<< HEAD
export const Skills = memo(SkillsComponent);
=======
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
