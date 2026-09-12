import { Module } from '@nestjs/common';
import { ProjectRepository } from './project';
import { PostgresProjectRepository } from './postgres-project.repository';
import { AdminProjectsController, PublicProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [AdminProjectsController, PublicProjectsController],
  providers: [ProjectsService, { provide: ProjectRepository, useClass: PostgresProjectRepository }],
})
export class ProjectsModule {}
