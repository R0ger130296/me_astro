/**
 * Use Case: Get Experiences
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Experience } from '../../domain/entities';

export class GetExperiencesUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Experience[]> {
    return await this.repository.getExperiences();
  }
}
