/**
 * Data Transfer Objects (DTOs)
 * Application Layer - Data structures for data transfer
 * Separates domain entities from data transfer concerns
 */
import type {
  PersonalInfo,
  Experience,
  Education,
  Certification,
  Reference,
  Skill,
  Language,
  Project
} from '../../domain/entities';

/**
 * Portfolio DTO - Complete portfolio data
 */
export interface PortfolioDTO {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  references: Reference[];
  skills: Skill[];
  softSkills: Skill[];
  languages: Language[];
  projects: Project[];
}

/**
 * Portfolio Summary DTO - Lightweight version
 */
export interface PortfolioSummaryDTO {
  personalInfo: PersonalInfo;
  experienceCount: number;
  certificationCount: number;
  skillCount: number;
  featuredProjects: Project[];
}

