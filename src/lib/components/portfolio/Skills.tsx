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
    </Section>
  );
};

