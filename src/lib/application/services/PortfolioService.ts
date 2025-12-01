/**
 * Portfolio Service
 * Application Layer - Business logic orchestration
 * Implements Service Layer pattern
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
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
import { NotFoundError, RepositoryError } from '../../domain/errors/AppError';

export class PortfolioService {
  constructor(private readonly repository: IPortfolioRepository) {}

  /**
   * Get personal information with error handling
   */
  async getPersonalInfo(): Promise<PersonalInfo> {
    try {
      const info = await this.repository.getPersonalInfo();
      if (!info) {
        throw new NotFoundError('Personal information');
      }
      return info;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new RepositoryError('Failed to fetch personal information', error as Error);
    }
  }

  /**
   * Get all experiences
   */
  async getExperiences(): Promise<Experience[]> {
    try {
      return await this.repository.getExperiences();
    } catch (error) {
      throw new RepositoryError('Failed to fetch experiences', error as Error);
    }
  }

  /**
   * Get education history
   */
  async getEducation(): Promise<Education[]> {
    try {
      return await this.repository.getEducation();
    } catch (error) {
      throw new RepositoryError('Failed to fetch education', error as Error);
    }
  }

  /**
   * Get all certifications
   */
  async getCertifications(): Promise<Certification[]> {
    try {
      return await this.repository.getCertifications();
    } catch (error) {
      throw new RepositoryError('Failed to fetch certifications', error as Error);
    }
  }

  /**
   * Get professional references
   */
  async getReferences(): Promise<Reference[]> {
    try {
      return await this.repository.getReferences();
    } catch (error) {
      throw new RepositoryError('Failed to fetch references', error as Error);
    }
  }

  /**
   * Get technical skills
   */
  async getSkills(): Promise<Skill[]> {
    try {
      return await this.repository.getSkills();
    } catch (error) {
      throw new RepositoryError('Failed to fetch skills', error as Error);
    }
  }

  /**
   * Get soft skills
   */
  async getSoftSkills(): Promise<Skill[]> {
    try {
      return await this.repository.getSoftSkills();
    } catch (error) {
      throw new RepositoryError('Failed to fetch soft skills', error as Error);
    }
  }

  /**
   * Get languages
   */
  async getLanguages(): Promise<Language[]> {
    try {
      return await this.repository.getLanguages();
    } catch (error) {
      throw new RepositoryError('Failed to fetch languages', error as Error);
    }
  }

  /**
   * Get all projects
   */
  async getProjects(): Promise<Project[]> {
    try {
      return await this.repository.getProjects();
    } catch (error) {
      throw new RepositoryError('Failed to fetch projects', error as Error);
    }
  }

  /**
   * Get featured projects only
   */
  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const projects = await this.repository.getProjects();
      return projects.filter((project) => project.featured);
    } catch (error) {
      throw new RepositoryError('Failed to fetch featured projects', error as Error);
    }
  }
}

