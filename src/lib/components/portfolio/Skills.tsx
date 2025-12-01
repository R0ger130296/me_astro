import React, { useMemo } from 'react';
import { useSkillsHook, useSoftSkillsHook } from '../../presentation/hooks/usePortfolio';
import { Section } from '../ui';
import type { Skill } from '../../domain/entities';

interface SkillsProps {
  initialData?: {
    skills?: Skill[];
    softSkills?: Skill[];
  };
}

export const Skills: React.FC<SkillsProps> = ({ initialData }) => {
  const { data: fetchedSkills } = useSkillsHook();
  const { data: fetchedSoftSkills } = useSoftSkillsHook();
  
  const skills = useMemo(() => initialData?.skills || fetchedSkills || [], [initialData?.skills, fetchedSkills]);
  const softSkills = useMemo(() => initialData?.softSkills || fetchedSoftSkills || [], [initialData?.softSkills, fetchedSoftSkills]);

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

  const getSkillLevel = (skill: Skill): number => {
    // Map SkillLevel to number for display
    const levelMap: Record<string, number> = {
      'expert': 90,
      'advanced': 75,
      'intermediate': 60,
      'beginner': 40,
    };
    return skill.level ? levelMap[skill.level] || 50 : 50;
  };

  return (
    <Section title="Habilidades Técnicas">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => {
          const levelNum = getSkillLevel(skill);
          return (
            <div
              key={`${skill.name}-${skill.category}-${index}`}
              className="bg-primary-50/50 border border-primary-100 rounded-xl p-4 hover:bg-white hover:border-primary-200 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary-800">{skill.name}</span>
                <span className="text-xs text-primary-500">{getLevelLabel(levelNum)}</span>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getLevelColor(levelNum)}`}
                  style={{ width: `${levelNum}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

