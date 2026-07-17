export type CareerRole = {
  company: string;
  role: string;
  period: string;
  location: string;
  mode?: string;
  summary: string;
  skills: string[];
  current?: boolean;
  freelance?: boolean;
};

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  focus: string[];
};

export const careerRoles: CareerRole[] = [
  {
    company: 'EOS TECH COMPANY',
    role: 'Desarrollador Semi Senior',
    period: 'may. 2026 – actualidad',
    location: 'Quito, Ecuador',
    mode: 'Híbrido',
    summary: 'Desarrollo y soporte de aplicaciones móviles, integraciones y soluciones de software orientadas a operación.',
    skills: ['JavaScript', 'Apache Cordova', 'Mobile', 'Integraciones'],
    current: true,
  },
  {
    company: 'EOS TECH COMPANY',
    role: 'Desarrollador Semi Senior',
    period: 'nov. 2025 – abr. 2026',
    location: 'Quito, Ecuador',
    mode: 'Presencial',
    summary: 'Construcción de soluciones web con énfasis en arquitectura mantenible, patrones de diseño y trabajo colaborativo.',
    skills: ['React', 'Tailwind CSS', 'Arquitectura hexagonal', 'GitFlow'],
  },
  {
    company: 'Kruger Corp',
    role: 'Full-stack Developer',
    period: 'ago. 2023 – sept. 2025',
    location: 'Quito, Ecuador',
    summary: 'Participación en productos empresariales cubriendo frontend, backend, integración y evolución de aplicaciones.',
    skills: ['Angular', 'TypeScript', 'APIs', 'Full Stack'],
  },
  {
    company: 'Jeremy SAS',
    role: 'Ingeniero de software · Profesional independiente',
    period: 'nov. 2024 – jun. 2025',
    location: 'Remoto',
    summary: 'Desarrollo e implementación de microservicios y APIs REST para necesidades específicas de negocio.',
    skills: ['React', 'Next.js', 'Microservicios', 'REST API'],
    freelance: true,
  },
  {
    company: 'Kruger Corp',
    role: 'Technical Consultant',
    period: 'may. 2021 – jul. 2023',
    location: 'Quito, Ecuador',
    mode: 'Híbrido',
    summary: 'Consultoría técnica, desarrollo de soluciones y acompañamiento a equipos en iniciativas digitales.',
    skills: ['React', 'Git', 'Consultoría', 'Delivery'],
  },
  {
    company: 'UTIC-ESPE',
    role: 'Desarrollador Junior',
    period: 'sept. 2019 – ago. 2021',
    location: 'Sangolquí, Ecuador',
    mode: 'Prácticas',
    summary: 'Primeras experiencias profesionales construyendo soluciones web y backend dentro de un entorno institucional.',
    skills: ['Spring Boot', 'Spring MVC', 'Java', 'SQL'],
  },
];

export const education: EducationItem[] = [
  {
    institution: 'Universidad Iberoamericana del Ecuador',
    degree: 'Ingeniería de Software',
    period: 'may. 2023 – sept. 2024',
    focus: ['Ingeniería de software', 'Programación', 'Aplicaciones específicas'],
  },
  {
    institution: 'Instituto Superior Tecnológico Yavirac Quito',
    degree: 'Tecnólogo Superior en Desarrollo de Software',
    period: '2018 – 2021',
    focus: ['Desarrollo de software', 'Tecnologías de la información', 'SQL', 'Node.js'],
  },
];

export const careerStats = {
  companies: new Set(careerRoles.map((role) => role.company)).size,
  roles: careerRoles.length,
  education: education.length,
  since: 2019,
};
