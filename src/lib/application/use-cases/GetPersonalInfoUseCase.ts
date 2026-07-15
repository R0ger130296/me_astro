/**
 * Use Case: Get Personal Information
 * Application Layer - Application logic
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
  }
}
