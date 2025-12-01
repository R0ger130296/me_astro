/**
 * Use Case: Get Projects
 * Applies SOLID principles:
 * - Single Responsibility: Only retrieves projects
 * - Dependency Inversion: Depends on abstraction (IPortfolioRepository)
 */
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Project } from '../../domain/entities';

export class GetProjectsUseCase {
  constructor(private readonly repository: IPortfolioRepository) {}

  async execute(): Promise<Project[]> {
    return await this.repository.getProjects();
  }

  async executeFeatured(): Promise<Project[]> {
    const projects = await this.repository.getProjects();
    return projects.filter((project) => project.featured);
  }
}

