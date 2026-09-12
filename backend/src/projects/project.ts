export interface ProjectContent {
  title: string;
  slug: string;
  status: 'En producción' | 'En desarrollo' | 'Proyecto técnico';
  description: string;
  impact: string;
  tags: string[];
  repository?: string;
  href?: string;
  featured?: boolean;
  caseStudy: { problem: string; decision: string; result: string; architecture: string[]; codeLanguage: string; code: string[] };
}
export interface ProjectRecord extends ProjectContent { id: string; published: boolean; version: number; updatedAt: string }

export abstract class ProjectRepository {
  abstract list(publishedOnly: boolean): Promise<ProjectRecord[]>;
  abstract create(content: ProjectContent, published: boolean): Promise<ProjectRecord>;
  abstract update(id: string, content: ProjectContent, published: boolean, version: number): Promise<ProjectRecord | undefined>;
  abstract delete(id: string, version: number): Promise<boolean>;
}
