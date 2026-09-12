import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { ProjectRepository } from './project';

@Injectable()
export class ProjectsService {
  constructor(private readonly repository: ProjectRepository) {}
  list(publishedOnly: boolean) { return this.repository.list(publishedOnly); }
  async create(input: CreateProjectDto) {
    const { published, ...content } = input;
    return this.unique(() => this.repository.create(content, published));
  }
  async update(id: string, input: UpdateProjectDto) {
    const { published, version, ...content } = input;
    const result = await this.unique(() => this.repository.update(id, content, published, version));
    if (!result) throw new ConflictException('El proyecto cambió o fue eliminado. Recarga la lista.');
    return result;
  }
  async delete(id: string, version: number) {
    if (!await this.repository.delete(id, version)) throw new ConflictException('El proyecto cambió o fue eliminado. Recarga la lista.');
  }
  private async unique<T>(operation: () => Promise<T>): Promise<T> {
    try { return await operation(); }
    catch (error) {
      if ((error as { code?: string }).code === '23505') throw new ConflictException('Ya existe un proyecto con ese slug');
      throw error;
    }
  }
}
