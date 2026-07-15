/**
 * Use Case: Get Projects
 * Applies SOLID principles:
 * - Single Responsibility: Only retrieves projects
 * - Dependency Inversion: Depends on abstraction (IPortfolioRepository)
 */
<<<<<<< HEAD
import type { IPortfolioRepository } from '../../domain/ports/IPortfolioRepository.port';
import type { Project } from '../../domain/entities';
=======
import type { IPortfolioRepository } from '$lib/domain/ports';
import type { Project } from '$lib/domain/entities';
>>>>>>> e8e945d (Initial commit: Astro portfolio with React components and API endpoints)

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

