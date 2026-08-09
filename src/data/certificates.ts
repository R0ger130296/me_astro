export type Certificate = {
  title: string;
  issuer: 'Udemy' | 'CertiProf' | 'Platzi';
  date: string;
  year: number;
  hours?: number;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Arquitectura' | 'Gestión' | 'Seguridad' | 'Cloud';
  skills: string[];
  credentialId?: string;
  credentialUrl?: string;
  featured?: boolean;
};

export const certificates: Certificate[] = [
  {
    title: 'Curso de Bases de Datos en Azure',
    issuer: 'Platzi',
    date: 'Agosto de 2026',
    year: 2026,
    hours: 3,
    category: 'Cloud',
    skills: ['Azure SQL', 'Cosmos DB', 'Bases de datos'],
    credentialId: 'f5a36ccc-3609-4e4e-b9e1-9e51db040afe-4430756a-649b-4b14-8e98-73f4fb008618',
    credentialUrl: 'https://platzi.com/p/grarogccee/curso/2204-azure-bases-datos/diploma/detalle/',
    featured: true,
  },
  {
    title: 'Curso de Almacenamiento en Azure',
    issuer: 'Platzi',
    date: 'Julio de 2026',
    year: 2026,
    hours: 2,
    category: 'Cloud',
    skills: ['Azure Storage', 'Blob Storage', 'Seguridad'],
    credentialId: 'd896e11d-6f9e-4fff-a975-e0b1e1b2ee52-e201ef4c-15a6-4541-9a70-76efe6c13b1f',
    credentialUrl: 'https://platzi.com/p/grarogccee/curso/1705-almacenamiento-azure/diploma/detalle/',
    featured: true,
  },
  {
    title: 'Curso de Azure IaaS',
    issuer: 'Platzi',
    date: 'Julio de 2026',
    year: 2026,
    hours: 3,
    category: 'Cloud',
    skills: ['Azure IaaS', 'Máquinas virtuales', 'Redes'],
    credentialId: 'f7424a35-c1fc-4bd3-a704-934f12e1eafe-63453c38-9443-4215-9b70-1f56705b3051',
    credentialUrl: 'https://platzi.com/p/grarogccee/curso/1704-azure-iaas/diploma/detalle/',
  },
  {
    title: 'Curso de Fundamentos de Microsoft Azure (AZ-900)',
    issuer: 'Platzi',
    date: 'Julio de 2026',
    year: 2026,
    hours: 5,
    category: 'Cloud',
    skills: ['Azure', 'Cloud Computing', 'AZ-900'],
    credentialId: '2a4c68c0-f7f3-475c-b6ac-65a6bb22bd4d-50ce46b6-aaae-4947-a149-033aa5579395',
    credentialUrl: 'https://platzi.com/p/grarogccee/curso/11884-az-900/diploma/detalle/',
  },
  {
    title: '.NET Backend: .NET Core, SQL Server y seguridad JWT',
    issuer: 'Udemy',
    date: '9 de enero de 2026',
    year: 2026,
    hours: 11,
    category: 'Backend',
    skills: ['.NET Core', 'SQL Server', 'JWT'],
    credentialUrl: 'https://ude.my/UC-5b5c7e63-cab1-4ed5-861b-43e3bef84d94',
    featured: true,
  },
  {
    title: 'Cybersecurity Awareness Professional Certification CAPC™',
    issuer: 'CertiProf',
    date: 'Vigente hasta agosto de 2027',
    year: 2026,
    category: 'Seguridad',
    skills: ['Cybersecurity', 'Awareness', 'Risk'],
    featured: true,
  },
  {
    title: 'Spring Framework 6 & Spring Boot 3: de cero a experto',
    issuer: 'Udemy',
    date: '30 de septiembre de 2025',
    year: 2025,
    hours: 40.5,
    category: 'Backend',
    skills: ['Spring Boot', 'Java', 'REST APIs'],
    credentialUrl: 'https://ude.my/UC-ade4fb41-0853-4b4d-834d-a5f13a0a86b9',
    featured: true,
  },
  {
    title: 'Next.js: El framework de React para producción',
    issuer: 'Udemy',
    date: '27 de febrero de 2025',
    year: 2025,
    hours: 36.5,
    category: 'Frontend',
    skills: ['Next.js', 'React', 'SSR'],
  },
  {
    title: 'Principios SOLID y Clean Code',
    issuer: 'Udemy',
    date: '30 de diciembre de 2024',
    year: 2024,
    hours: 6.5,
    category: 'Arquitectura',
    skills: ['SOLID', 'Clean Code', 'Diseño'],
    credentialUrl: 'https://ude.my/UC-402c1606-b34c-4e46-9624-a431e038bd00',
  },
  {
    title: 'Angular 14: La guía completa + 15 proyectos',
    issuer: 'Udemy',
    date: '8 de octubre de 2024',
    year: 2024,
    hours: 17,
    category: 'Frontend',
    skills: ['Angular', 'TypeScript', 'RxJS'],
  },
  {
    title: 'PMP: Preparación certificación PMP PMBOK 7',
    issuer: 'Udemy',
    date: '9 de septiembre de 2024',
    year: 2024,
    hours: 6.5,
    category: 'Gestión',
    skills: ['PMBOK 7', 'PMP', 'Delivery'],
    credentialUrl: 'https://ude.my/UC-6407e9f7-06f3-40c2-bbde-1f6e97762f21',
  },
  {
    title: 'Micro-Frontend: Arquitectura de aplicaciones web escalables',
    issuer: 'Udemy',
    date: '30 de julio de 2024',
    year: 2024,
    hours: 14,
    category: 'Arquitectura',
    skills: ['Micro-frontends', 'Escalabilidad', 'Web'],
    credentialUrl: 'https://ude.my/UC-ab20688e-dbaa-49ea-b531-c05165f3bbd3',
  },
  {
    title: 'Flutter: Guía completa para iOS y Android',
    issuer: 'Udemy',
    date: '23 de agosto de 2023',
    year: 2023,
    hours: 37.5,
    category: 'Mobile',
    skills: ['Flutter', 'Dart', 'Mobile'],
    credentialUrl: 'https://ude.my/UC-c1db414c-1499-45b7-9926-b901a190c9b6',
  },
  {
    title: 'React: De cero a experto — Hooks y MERN',
    issuer: 'Udemy',
    date: '7 de julio de 2022',
    year: 2022,
    hours: 54,
    category: 'Frontend',
    skills: ['React', 'Hooks', 'MERN'],
    credentialUrl: 'https://ude.my/UC-cd24730c-e4b8-41cf-9536-eaee93a85591',
  },
];

export const certificateStats = {
  count: certificates.length,
  hours: certificates.reduce((total, certificate) => total + (certificate.hours ?? 0), 0),
  areas: new Set(certificates.map((certificate) => certificate.category)).size,
  years: `${Math.min(...certificates.map((certificate) => certificate.year))}–${Math.max(...certificates.map((certificate) => certificate.year))}`,
};

export const certificateCategories = ['Todos', ...new Set(certificates.map((certificate) => certificate.category))];
