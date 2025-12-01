/**
 * Use Case: Get References
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Reference } from '../../domain/entities';

export class GetReferencesUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Reference[]> {
    return await this.repository.getReferences();
  }
}
