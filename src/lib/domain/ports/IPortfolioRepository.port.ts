/**
 * Domain Port (Interface)
 * Defines the contract to access portfolio data
 * The concrete implementation will be in the infrastructure layer
 */
import type {
  Experience,
  Education,
  Certification,
  PersonalInfo,
  Reference,
  Skill,
  Language,
  Project
} from '../entities';

export interface IPortfolioRepository {
  getPersonalInfo(): Promise<PersonalInfo>;
  getExperiences(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  getCertifications(): Promise<Certification[]>;
  getReferences(): Promise<Reference[]>;
  getSkills(): Promise<Skill[]>;
  getSoftSkills(): Promise<Skill[]>;
  getLanguages(): Promise<Language[]>;
  getProjects(): Promise<Project[]>;
}
