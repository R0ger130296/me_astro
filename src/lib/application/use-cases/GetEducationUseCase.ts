/**
 * Use Case: Get Education
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Education } from '../../domain/entities';

export class GetEducationUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Education[]> {
    return await this.repository.getEducation();
  }
}
