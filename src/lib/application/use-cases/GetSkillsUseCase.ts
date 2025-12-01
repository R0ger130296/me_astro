/**
 * Use Case: Get Skills
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Skill } from '../../domain/entities';

export class GetSkillsUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Skill[]> {
    return await this.repository.getSkills();
  }

  async executeSoftSkills(): Promise<Skill[]> {
    return await this.repository.getSoftSkills();
  }
}
