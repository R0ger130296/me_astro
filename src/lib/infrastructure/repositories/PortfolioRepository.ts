/**
 * Repository Implementation
 * Infrastructure Layer - Data access
 * Uses database.json as the single source of truth
 * Implements Repository Pattern and Dependency Inversion Principle
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import {
  Experience,
  Education,
  Certification,
  PersonalInfo,
  Reference,
  Skill,
  Language,
  Project,
  type SkillCategory,
  type SkillLevel
} from '../../domain/entities';
import { LoggerFactory } from '../logger/Logger';
// Import database from TypeScript module
import { database } from '../../../data/database';
import { projectsData } from '../../data/projects';

const logger = LoggerFactory.getLogger();

export class PortfolioRepository implements IPortfolioRepository {
  async getPersonalInfo(): Promise<PersonalInfo> {
    try {
      logger.debug('Fetching personal information');
      const data = database.personalInfo;
      
      if (!data) {
        throw new Error('Personal information not found in database');
      }

      const personalInfo = new PersonalInfo(
        data.name,
        data.title,
        data.email,
        data.phone,
        data.location,
        data.summary
      );

      logger.debug('Personal information fetched successfully');
      return personalInfo;
    } catch (error) {
      logger.error('Error fetching personal information', error as Error);
      throw error;
    }
  }

  async getExperiences(): Promise<Experience[]> {
    return database.experiences.map(
      (exp: any) =>
        new Experience(
          exp.id,
          exp.title,
          exp.company,
          exp.location,
          exp.startDate,
          exp.endDate,
          exp.responsibilities
        )
    );
  }

  async getEducation(): Promise<Education[]> {
    return database.education.map(
      (edu: any) =>
        new Education(
          edu.id,
          edu.degree,
          edu.institution,
          edu.startDate,
          edu.endDate,
          edu.location || undefined
        )
    );
  }

  async getCertifications(): Promise<Certification[]> {
    return database.certifications.map(
      (cert: any) =>
        new Certification(cert.id, cert.name, cert.issuer, cert.image)
    );
  }

  async getReferences(): Promise<Reference[]> {
    return database.references.map(
      (ref: any) =>
        new Reference(
          ref.id,
          ref.name,
          ref.position,
          ref.company,
          ref.email,
          ref.phone,
          ref.testimonial,
          ref.linkedinUrl
        )
    );
  }

  async getSkills(): Promise<Skill[]> {
    const skills: Skill[] = [];
    
    // Helper to convert numeric level to SkillLevel
    const mapLevelToSkillLevel = (level: number): SkillLevel => {
      if (level >= 85) return 'expert';
      if (level >= 70) return 'advanced';
      if (level >= 50) return 'intermediate';
      return 'beginner';
    };
    
    Object.entries(database.skills).forEach(([category, skillList]) => {
      if (Array.isArray(skillList)) {
        skillList.forEach((skill: any) => {
          if (typeof skill === 'string') {
            skills.push(new Skill(skill, category as SkillCategory));
          } else {
            const level = skill.level ? mapLevelToSkillLevel(skill.level) : undefined;
            skills.push(new Skill(skill.name, category as SkillCategory, level));
          }
        });
      }
    });

    return skills;
  }

  async getSoftSkills(): Promise<Skill[]> {
    return database.softSkills.map(
      (skillName: string) => new Skill(skillName, 'soft')
    );
  }

  async getLanguages(): Promise<Language[]> {
    return database.languages.map(
      (lang: any) => new Language(lang.name, lang.level)
    );
  }

  async getProjects(): Promise<Project[]> {
    return projectsData.map(
      (project) =>
        new Project(
          project.id,
          project.name,
          project.description,
          project.technologies,
          project.longDescription,
          project.image,
          project.githubUrl,
          project.liveUrl,
          project.featured,
          project.startDate,
          project.endDate
        )
    );
  }
}
