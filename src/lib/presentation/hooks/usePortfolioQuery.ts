/**
 * TanStack Query Hooks for Portfolio Data
 * Better data fetching with caching, refetching, and error handling
 */
import { useQuery, UseQueryResult } from '@tanstack/react-query';
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

// Query Keys
export const portfolioKeys = {
  all: ['portfolio'] as const,
  personalInfo: () => [...portfolioKeys.all, 'personalInfo'] as const,
  experiences: () => [...portfolioKeys.all, 'experiences'] as const,
  education: () => [...portfolioKeys.all, 'education'] as const,
  certifications: () => [...portfolioKeys.all, 'certifications'] as const,
  references: () => [...portfolioKeys.all, 'references'] as const,
  skills: () => [...portfolioKeys.all, 'skills'] as const,
  softSkills: () => [...portfolioKeys.all, 'softSkills'] as const,
  languages: () => [...portfolioKeys.all, 'languages'] as const,
  projects: () => [...portfolioKeys.all, 'projects'] as const,
  featuredProjects: () => [...portfolioKeys.all, 'projects', 'featured'] as const,
};

/**
 * Hook to get personal information with TanStack Query
 */
export function usePersonalInfoQuery(initialData?: PersonalInfo): UseQueryResult<PersonalInfo, Error> {
  return useQuery({
    queryKey: portfolioKeys.personalInfo(),
    queryFn: async () => {
      const useCase = container.getGetPersonalInfoUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes - personal info rarely changes
  });
}

/**
 * Hook to get experiences with TanStack Query
 */
export function useExperiencesQuery(initialData?: Experience[]): UseQueryResult<Experience[], Error> {
  return useQuery({
    queryKey: portfolioKeys.experiences(),
    queryFn: async () => {
      const useCase = container.getGetExperiencesUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get education with TanStack Query
 */
export function useEducationQuery(initialData?: Education[]): UseQueryResult<Education[], Error> {
  return useQuery({
    queryKey: portfolioKeys.education(),
    queryFn: async () => {
      const useCase = container.getGetEducationUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes - education rarely changes
  });
}

/**
 * Hook to get certifications with TanStack Query
 */
export function useCertificationsQuery(initialData?: Certification[]): UseQueryResult<Certification[], Error> {
  return useQuery({
    queryKey: portfolioKeys.certifications(),
    queryFn: async () => {
      const useCase = container.getGetCertificationsUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get skills with TanStack Query
 */
export function useSkillsQuery(initialData?: Skill[]): UseQueryResult<Skill[], Error> {
  return useQuery({
    queryKey: portfolioKeys.skills(),
    queryFn: async () => {
      const useCase = container.getGetSkillsUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get soft skills with TanStack Query
 */
export function useSoftSkillsQuery(initialData?: Skill[]): UseQueryResult<Skill[], Error> {
  return useQuery({
    queryKey: portfolioKeys.softSkills(),
    queryFn: async () => {
      const useCase = container.getGetSkillsUseCase();
      return await useCase.executeSoftSkills();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get languages with TanStack Query
 */
export function useLanguagesQuery(initialData?: Language[]): UseQueryResult<Language[], Error> {
  return useQuery({
    queryKey: portfolioKeys.languages(),
    queryFn: async () => {
      const useCase = container.getGetLanguagesUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get references with TanStack Query
 */
export function useReferencesQuery(initialData?: Reference[]): UseQueryResult<Reference[], Error> {
  return useQuery({
    queryKey: portfolioKeys.references(),
    queryFn: async () => {
      const useCase = container.getGetReferencesUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to get projects with TanStack Query
 */
export function useProjectsQuery(initialData?: Project[]): UseQueryResult<Project[], Error> {
  return useQuery({
    queryKey: portfolioKeys.projects(),
    queryFn: async () => {
      const useCase = container.getGetProjectsUseCase();
      return await useCase.execute();
    },
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to get featured projects with TanStack Query
 */
export function useFeaturedProjectsQuery(initialData?: Project[]): UseQueryResult<Project[], Error> {
  return useQuery({
    queryKey: portfolioKeys.featuredProjects(),
    queryFn: async () => {
      const useCase = container.getGetProjectsUseCase();
      return await useCase.executeFeatured();
    },
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

