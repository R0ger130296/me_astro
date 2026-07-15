/**
 * Project data
 * Single Source of Truth for portfolio projects
 */
import type { Project } from '../domain/entities';

// Type for raw data before creating entities
interface ProjectData {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  startDate?: string;
  endDate?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    name: 'Sistema de Gestión Empresarial',
    description: 'Plataforma completa para gestión de recursos empresariales',
    longDescription: 'Sistema integral desarrollado con Next.js y NestJS que permite la gestión de recursos humanos, inventario y finanzas. Implementa arquitectura de microservicios y autenticación JWT.',
    technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/enterprise-system.jpg',
    githubUrl: 'https://github.com/rogercedeno/enterprise-system',
    liveUrl: 'https://enterprise-system.demo.com',
    featured: true,
    startDate: '2024-01',
    endDate: '2024-06'
  },
  {
    id: 2,
    name: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con carrito de compras y pagos',
    longDescription: 'Aplicación de e-commerce desarrollada con React y Spring Boot. Incluye sistema de autenticación, carrito de compras, integración con pasarelas de pago y panel de administración.',
    technologies: ['React', 'Spring Boot', 'MySQL', 'Stripe API', 'Redux'],
    image: '/projects/ecommerce.jpg',
    githubUrl: 'https://github.com/rogercedeno/ecommerce',
    featured: true,
    startDate: '2023-08',
    endDate: '2024-02'
  },
  {
    id: 3,
    name: 'App Móvil de Productividad',
    description: 'Aplicación móvil para gestión de tareas y productividad personal',
    longDescription: 'App desarrollada con React Native y Expo que permite a los usuarios gestionar tareas, establecer recordatorios y trackear su productividad. Sincronización en tiempo real con backend NestJS.',
    technologies: ['React Native', 'Expo', 'NestJS', 'MongoDB', 'Firebase'],
    image: '/projects/mobile-app.jpg',
    githubUrl: 'https://github.com/rogercedeno/productivity-app',
    liveUrl: 'https://play.google.com/store/apps/details?id=com.productivity',
    featured: false,
    startDate: '2024-03',
    endDate: '2024-08'
  }
];
