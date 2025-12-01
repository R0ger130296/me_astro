/**
 * Presentation Hook
 * Connects the presentation layer with use cases
 * Implements Facade Pattern for simplified API
 */
import { container } from '../../infrastructure/di/Container';
import { useAsyncData } from './useAsyncData';
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
 * Hook to get personal information (async function for server-side)
 */
export async function usePersonalInfo(): Promise<PersonalInfo> {
  const useCase = container.getGetPersonalInfoUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get personal information (for client-side components)
 */
export function usePersonalInfoHook() {
  return useAsyncData<PersonalInfo>(async () => {
    const useCase = container.getGetPersonalInfoUseCase();
    return await useCase.execute();
  });
}

/**
 * Hook to get experiences (async function for server-side)
 */
export async function useExperiences(): Promise<Experience[]> {
  const useCase = container.getGetExperiencesUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get experiences (for client-side components)
 */
export function useExperiencesHook() {
  return useAsyncData<Experience[]>(async () => {
    const useCase = container.getGetExperiencesUseCase();
    return await useCase.execute();
  });
}

/**
 * Hook to get education (async function for server-side)
 */
export async function useEducation(): Promise<Education[]> {
  const useCase = container.getGetEducationUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get education (for client-side components)
 */
export function useEducationHook() {
  return useAsyncData<Education[]>(async () => {
    const useCase = container.getGetEducationUseCase();
    return await useCase.execute();
  });
}

/**
 * Hook to get certifications (async function for server-side)
 */
export async function useCertifications(): Promise<Certification[]> {
  const useCase = container.getGetCertificationsUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get certifications (for client-side components)
 */
export function useCertificationsHook() {
  return useAsyncData<Certification[]>(async () => {
    const useCase = container.getGetCertificationsUseCase();
    return await useCase.execute();
  });
}

/**
 * Hook to get skills (async function for server-side)
 */
export async function useSkills(): Promise<Skill[]> {
  const useCase = container.getGetSkillsUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get skills (for client-side components)
 */
export function useSkillsHook() {
  return useAsyncData<Skill[]>(async () => {
    const useCase = container.getGetSkillsUseCase();
    return await useCase.execute();
  });
}

/**
 * Hook to get soft skills (async function for server-side)
 */
export async function useSoftSkills(): Promise<Skill[]> {
  const useCase = container.getGetSkillsUseCase();
  return await useCase.executeSoftSkills();
}

/**
 * React Hook to get soft skills (for client-side components)
 */
export function useSoftSkillsHook() {
  return useAsyncData<Skill[]>(async () => {
    const useCase = container.getGetSkillsUseCase();
    return await useCase.executeSoftSkills();
  });
}

/**
 * Hook to get languages (async function for server-side)
 */
export async function useLanguages(): Promise<Language[]> {
  const useCase = container.getGetLanguagesUseCase();
  return await useCase.execute();
}

/**
 * React Hook to get languages (for client-side components)
 */
export function useLanguagesHook() {
  return useAsyncData<Language[]>(async () => {
    const useCase = container.getGetLanguagesUseCase();
    return await useCase.execute();
  });
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
