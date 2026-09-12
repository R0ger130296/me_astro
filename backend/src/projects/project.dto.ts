import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, IsUrl, Length, Matches, MaxLength, Min, ValidateNested, IsDefined } from 'class-validator';
import { ProjectContent } from './project';

class CaseStudyDto {
  @IsString() @Length(1, 5000) problem!: string;
  @IsString() @Length(1, 5000) decision!: string;
  @IsString() @Length(1, 5000) result!: string;
  @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @Length(1, 100, { each: true }) architecture!: string[];
  @IsString() @Length(1, 50) codeLanguage!: string;
  @IsArray() @ArrayMaxSize(200) @IsString({ each: true }) @MaxLength(500, { each: true }) code!: string[];
}

export class CreateProjectDto implements ProjectContent {
  @IsString() @Length(1, 150) @Matches(/\S/) title!: string;
  @IsString() @Length(1, 100) @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug!: string;
  @IsIn(['En producción', 'En desarrollo', 'Proyecto técnico']) status!: ProjectContent['status'];
  @IsString() @Length(1, 3000) description!: string;
  @IsString() @Length(1, 3000) impact!: string;
  @IsArray() @ArrayMaxSize(30) @IsString({ each: true }) @Length(1, 100, { each: true }) tags!: string[];
  @IsOptional() @IsString() @Length(1, 100) @Matches(/^[\w.-]+$/) repository?: string;
  @IsOptional() @IsUrl({ protocols: ['https'], require_protocol: true }) @MaxLength(2000) href?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsDefined() @ValidateNested() @Type(() => CaseStudyDto) caseStudy!: CaseStudyDto;
  @IsBoolean() published!: boolean;
}

export class UpdateProjectDto extends CreateProjectDto {
  @IsInt() @Min(1) version!: number;
}
