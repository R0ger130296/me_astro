/**
 * Use Case: Get Personal Information
 * Application Layer - Application logic
<<<<<<< HEAD
 * Implements Single Responsibility Principle
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { PersonalInfo } from '../../domain/entities';
import { PortfolioService } from '../services/PortfolioService';

export class GetPersonalInfoUseCase {
  private readonly service: PortfolioService;

  constructor(repository: IPortfolioRepository) {
    this.service = new PortfolioService(repository);
  }

  async execute(): Promise<PersonalInfo> {
    return await this.service.getPersonalInfo();
=======
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { PersonalInfo } from '../../domain/entities';

export class GetPersonalInfoUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<PersonalInfo> {
    return await this.repository.getPersonalInfo();
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)
  }
}
