/**
 * Repository Implementation
 * Infrastructure Layer - Data access
 * Uses database.json as the single source of truth
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
  type SkillCategory
} from '../../domain/entities';
// Import database from TypeScript module
import { database } from '../../../data/database';
import { projectsData } from '../../data/projects';

export class PortfolioRepository implements IPortfolioRepository {
  async getPersonalInfo(): Promise<PersonalInfo> {
    const data = database.personalInfo;
    return new PersonalInfo(
      data.name,
      data.title,
      data.email,
      data.phone,
      data.location,
      data.summary
    );
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
    
    Object.entries(database.skills).forEach(([category, skillList]) => {
      if (Array.isArray(skillList)) {
        skillList.forEach((skill: any) => {
          const skillName = typeof skill === 'string' ? skill : skill.name;
          skills.push(new Skill(skillName, category as SkillCategory));
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
          project.longDescription,
          project.technologies,
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
