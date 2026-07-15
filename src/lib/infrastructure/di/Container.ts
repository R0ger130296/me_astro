/**
 * Dependency Injection Container
 * Infrastructure Layer - Dependency injection
 * Implements Singleton Pattern and Dependency Injection
 */
import { PortfolioRepository } from '../repositories/PortfolioRepository';
import {
  GetPersonalInfoUseCase,
  GetExperiencesUseCase,
  GetCertificationsUseCase,
  GetEducationUseCase,
  GetSkillsUseCase,
  GetLanguagesUseCase,
  GetReferencesUseCase,
  GetProjectsUseCase
} from '../../application/use-cases';
import { LoggerFactory } from '../logger/Logger';

const logger = LoggerFactory.getLogger();

/**
 * Singleton container to manage dependencies
 */
class Container {
  private static instance: Container;
  private repository: PortfolioRepository;
  
  // Use cases
  private getPersonalInfoUseCase: GetPersonalInfoUseCase;
  private getExperiencesUseCase: GetExperiencesUseCase;
  private getCertificationsUseCase: GetCertificationsUseCase;
  private getEducationUseCase: GetEducationUseCase;
  private getSkillsUseCase: GetSkillsUseCase;
  private getLanguagesUseCase: GetLanguagesUseCase;
  private getReferencesUseCase: GetReferencesUseCase;
  private getProjectsUseCase: GetProjectsUseCase;

  private constructor() {
    logger.debug('Initializing DI Container');
    
    // Initialize repository
    this.repository = new PortfolioRepository();

    // Initialize use cases with their dependencies
    // Dependency Injection: Use cases receive repository through constructor
    this.getPersonalInfoUseCase = new GetPersonalInfoUseCase(this.repository);
    this.getExperiencesUseCase = new GetExperiencesUseCase(this.repository);
    this.getCertificationsUseCase = new GetCertificationsUseCase(this.repository);
    this.getEducationUseCase = new GetEducationUseCase(this.repository);
    this.getSkillsUseCase = new GetSkillsUseCase(this.repository);
    this.getLanguagesUseCase = new GetLanguagesUseCase(this.repository);
    this.getReferencesUseCase = new GetReferencesUseCase(this.repository);
    this.getProjectsUseCase = new GetProjectsUseCase(this.repository);
    
    logger.debug('DI Container initialized successfully');
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  // Use case getters
  public getGetPersonalInfoUseCase(): GetPersonalInfoUseCase {
    return this.getPersonalInfoUseCase;
  }

  public getGetExperiencesUseCase(): GetExperiencesUseCase {
    return this.getExperiencesUseCase;
  }

  public getGetCertificationsUseCase(): GetCertificationsUseCase {
    return this.getCertificationsUseCase;
  }

  public getGetEducationUseCase(): GetEducationUseCase {
    return this.getEducationUseCase;
  }

  public getGetSkillsUseCase(): GetSkillsUseCase {
    return this.getSkillsUseCase;
  }

  public getGetLanguagesUseCase(): GetLanguagesUseCase {
    return this.getLanguagesUseCase;
  }

  public getGetReferencesUseCase(): GetReferencesUseCase {
    return this.getReferencesUseCase;
  }

  public getGetProjectsUseCase(): GetProjectsUseCase {
    return this.getProjectsUseCase;
  }
}

// Export singleton instance
export const container = Container.getInstance();
