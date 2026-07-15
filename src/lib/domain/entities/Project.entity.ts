/**
 * Domain Entity: Project
 * Applies SOLID principles:
 * - Single Responsibility: Represents only one project
 * - Open/Closed: Extensible through inheritance or composition
 */
export class Project {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly technologies: string[],
    public readonly longDescription?: string,
    public readonly image?: string,
    public readonly githubUrl?: string,
    public readonly liveUrl?: string,
    public readonly featured: boolean = false,
    public readonly startDate?: string,
    public readonly endDate?: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Project name is required');
    }
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Project description is required');
    }
    if (this.technologies.length === 0) {
      throw new Error('Project must have at least one technology');
    }
  }

  get isLive(): boolean {
    return !!this.liveUrl;
  }

  get hasCode(): boolean {
    return !!this.githubUrl;
  }
}

