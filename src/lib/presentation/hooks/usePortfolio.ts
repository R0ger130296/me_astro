/**
 * Presentation facade for portfolio use cases.
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
  Project,
} from '../../domain/entities';

export async function usePersonalInfo(): Promise<PersonalInfo> {
  return container.getGetPersonalInfoUseCase().execute();
}

export function usePersonalInfoHook() {
  return useAsyncData<PersonalInfo>(() => container.getGetPersonalInfoUseCase().execute());
}

export async function useExperiences(): Promise<Experience[]> {
  return container.getGetExperiencesUseCase().execute();
}

export function useExperiencesHook() {
  return useAsyncData<Experience[]>(() => container.getGetExperiencesUseCase().execute());
}

export async function useEducation(): Promise<Education[]> {
  return container.getGetEducationUseCase().execute();
}

export function useEducationHook() {
  return useAsyncData<Education[]>(() => container.getGetEducationUseCase().execute());
}

export async function useCertifications(): Promise<Certification[]> {
  return container.getGetCertificationsUseCase().execute();
}

export function useCertificationsHook() {
  return useAsyncData<Certification[]>(() => container.getGetCertificationsUseCase().execute());
}

export async function useSkills(): Promise<Skill[]> {
  return container.getGetSkillsUseCase().execute();
}

export function useSkillsHook() {
  return useAsyncData<Skill[]>(() => container.getGetSkillsUseCase().execute());
}

export async function useSoftSkills(): Promise<Skill[]> {
  return container.getGetSkillsUseCase().executeSoftSkills();
}

export function useSoftSkillsHook() {
  return useAsyncData<Skill[]>(() => container.getGetSkillsUseCase().executeSoftSkills());
}

export async function useLanguages(): Promise<Language[]> {
  return container.getGetLanguagesUseCase().execute();
}

export function useLanguagesHook() {
  return useAsyncData<Language[]>(() => container.getGetLanguagesUseCase().execute());
}

export async function useReferences(): Promise<Reference[]> {
  return container.getGetReferencesUseCase().execute();
}

export async function useProjects(): Promise<Project[]> {
  return container.getGetProjectsUseCase().execute();
}

export async function useFeaturedProjects(): Promise<Project[]> {
  return container.getGetProjectsUseCase().executeFeatured();
}
