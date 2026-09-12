import { Body, Controller, Delete, Get, Header, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { Public } from '../auth/auth.guard';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class PublicProjectsController {
  constructor(private readonly service: ProjectsService) {}
  @Public() @Get()
  async list() {
    return (await this.service.list(true)).map(({ id, version, updatedAt, published, ...content }) => content);
  }
}

@Controller('admin/projects')
export class AdminProjectsController {
  constructor(private readonly service: ProjectsService) {}
  @Get() @Header('Cache-Control', 'no-store') list() { return this.service.list(false); }
  @Post() create(@Body() body: CreateProjectDto) { return this.service.create(body); }
  @Put(':id') update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateProjectDto) { return this.service.update(id, body); }
  @Delete(':id') @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string, @Query('version', ParseIntPipe) version: number) { return this.service.delete(id, version); }
}
