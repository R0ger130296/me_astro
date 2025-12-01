/**
 * Use Case: Get Certifications
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Certification } from '../../domain/entities';

export class GetCertificationsUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Certification[]> {
    return await this.repository.getCertifications();
  }
}
