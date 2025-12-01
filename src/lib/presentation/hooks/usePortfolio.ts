/**
 * Presentation Hook
 * Connects the presentation layer with use cases
 */
import { container } from '../../infrastructure/di/Container';
import type {
  PersonalInfo,
  Experience,
  Education,
  Certification,
  Reference,
  Skill,
  Language,
  Project
} from '../../domain/entities';

/**
 * Hook to get personal information
 */
export async function usePersonalInfo(): Promise<PersonalInfo> {
  const useCase = container.getGetPersonalInfoUseCase();
  return await useCase.execute();
}

/**
 * Hook to get experiences
 */
export async function useExperiences(): Promise<Experience[]> {
  const useCase = container.getGetExperiencesUseCase();
  return await useCase.execute();
}

/**
 * Hook to get education
 */
export async function useEducation(): Promise<Education[]> {
  const useCase = container.getGetEducationUseCase();
  return await useCase.execute();
}

/**
 * Hook to get certifications
 */
export async function useCertifications(): Promise<Certification[]> {
  const useCase = container.getGetCertificationsUseCase();
  return await useCase.execute();
}

/**
 * Hook to get skills
 */
export async function useSkills(): Promise<Skill[]> {
  const useCase = container.getGetSkillsUseCase();
  return await useCase.execute();
}

/**
 * Hook to get soft skills
 */
export async function useSoftSkills(): Promise<Skill[]> {
  const useCase = container.getGetSkillsUseCase();
  return await useCase.executeSoftSkills();
}

/**
 * Hook to get languages
 */
export async function useLanguages(): Promise<Language[]> {
  const useCase = container.getGetLanguagesUseCase();
  return await useCase.execute();
}

/**
 * Hook to get references
 */
export async function useReferences(): Promise<Reference[]> {
  const useCase = container.getGetReferencesUseCase();
  return await useCase.execute();
}

/**
 * Hook to get projects
 */
export async function useProjects(): Promise<Project[]> {
  const useCase = container.getGetProjectsUseCase();
  return await useCase.execute();
}

/**
 * Hook to get featured projects
 */
export async function useFeaturedProjects(): Promise<Project[]> {
  const useCase = container.getGetProjectsUseCase();
  return await useCase.executeFeatured();
}
