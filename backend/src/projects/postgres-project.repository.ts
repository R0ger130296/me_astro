import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Database } from '../database/database.module';
import { ProjectContent, ProjectRecord, ProjectRepository } from './project';

type Row = { id: string; content: ProjectContent; published: boolean; version: number; updated_at: Date };
const map = (row: Row): ProjectRecord => ({ ...row.content, id: row.id, published: row.published, version: row.version, updatedAt: row.updated_at.toISOString() });

@Injectable()
export class PostgresProjectRepository extends ProjectRepository {
  constructor(private readonly db: Database) { super(); }
  async list(publishedOnly: boolean) {
    const result = await this.db.query<Row>('SELECT * FROM projects WHERE ($1::boolean = false OR published = true) ORDER BY updated_at DESC, id', [publishedOnly]);
    return result.rows.map(map);
  }
  async create(content: ProjectContent, published: boolean) {
    const result = await this.db.query<Row>('INSERT INTO projects(id, slug, content, published) VALUES ($1, $2, $3, $4) RETURNING *', [randomUUID(), content.slug, content, published]);
    return map(result.rows[0]);
  }
  async update(id: string, content: ProjectContent, published: boolean, version: number) {
    const result = await this.db.query<Row>('UPDATE projects SET slug=$2, content=$3, published=$4, version=version+1, updated_at=now() WHERE id=$1 AND version=$5 RETURNING *', [id, content.slug, content, published, version]);
    return result.rows[0] ? map(result.rows[0]) : undefined;
  }
  async delete(id: string, version: number) {
    const result = await this.db.query('DELETE FROM projects WHERE id=$1 AND version=$2', [id, version]);
    return result.rowCount === 1;
  }
}
