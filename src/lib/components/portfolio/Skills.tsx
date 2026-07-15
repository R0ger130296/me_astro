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
    </Section>
  );
};

export const Skills = memo(SkillsComponent);
