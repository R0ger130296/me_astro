import React, { memo } from 'react';
import { useSkillsQuery, useSoftSkillsQuery } from '../../presentation/hooks/usePortfolioQuery';
import { Section, Skeleton } from '../ui';
import { motion } from 'framer-motion';
import type { Skill } from '../../domain/entities';

interface SkillsProps {
  initialData?: {
    skills?: Skill[];
    softSkills?: Skill[];
  };
}

const SkillsComponent: React.FC<SkillsProps> = ({ initialData }) => {
  const { data: skills = [], isLoading: isLoadingSkills } = useSkillsQuery(initialData?.skills);
  const { data: softSkills = [], isLoading: isLoadingSoftSkills } = useSoftSkillsQuery(initialData?.softSkills);

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
    const levelMap: Record<string, number> = {
      'expert': 90,
      'advanced': 75,
      'intermediate': 60,
      'beginner': 40,
    };
    return skill.level ? levelMap[skill.level] || 50 : 50;
  };

  if (isLoadingSkills && !initialData) {
    return (
      <Section title="Habilidades Técnicas">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={80} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Habilidades Técnicas">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {skills.map((skill, index) => {
          const levelNum = getSkillLevel(skill);
          return (
            <motion.div
              key={`${skill.name}-${skill.category}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-primary-50/50 border border-primary-100 rounded-xl p-4 hover:bg-white hover:border-secondary-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary-800">{skill.name}</span>
                <span className="text-xs text-primary-500 font-medium">{getLevelLabel(levelNum)}</span>
              </div>
              <div className="w-full bg-primary-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelNum}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05, ease: 'easeOut' }}
                  className={`h-2 rounded-full ${getLevelColor(levelNum)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
};

export const Skills = memo(SkillsComponent);
