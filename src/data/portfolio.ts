export type Project = {
  title: string;
  slug: string;
  status: 'En producción' | 'En desarrollo' | 'Proyecto técnico';
  description: string;
  impact: string;
  tags: string[];
  repository?: string;
  href?: string;
  featured?: boolean;
};

export const profile = {
  name: 'Roger Cedeño',
  role: 'Full Stack Developer',
  location: 'Ecuador · GMT-5',
  email: 'rogercedeno96@gmail.com',
  github: 'https://github.com/R0ger130296',
  linkedin: 'https://www.linkedin.com/',
  summary:
    'Diseño y construyo productos web y móviles que convierten procesos complejos en experiencias claras, rápidas y mantenibles.',
};

export const projects: Project[] = [
  {
    title: 'FinanciaApp',
    slug: 'financia-app',
    status: 'En producción',
    description: 'Plataforma PWA para controlar ingresos, gastos, cuentas y presupuestos desde cualquier dispositivo.',
    impact: 'Producto orientado a decisiones financieras simples y hábitos sostenibles.',
    tags: ['React', 'TypeScript', 'PWA'],
    repository: 'financiaApp',
    href: 'https://github.com/R0ger130296/financiaApp',
    featured: true,
  },
  {
    title: 'Auriga',
    slug: 'auriga',
    status: 'En desarrollo',
    description: 'Plataforma para talleres automotrices con órdenes de trabajo, citas, técnicos e indicadores operativos.',
    impact: 'Centraliza la operación y reduce la fricción entre recepción, taller y administración.',
    tags: ['React', '.NET 8', 'SQL Server', 'Azure'],
    featured: true,
  },
  {
    title: 'App Colaboradores',
    slug: 'app-colaboradores',
    status: 'En producción',
    description: 'Aplicación móvil interna para comunicaciones, tareas, notificaciones y acceso rápido a servicios.',
    impact: 'Mejora la comunicación interna y lleva los flujos de trabajo al dispositivo móvil.',
    tags: ['React Native', 'Expo', 'Firebase'],
    featured: true,
  },
  {
    title: 'Apollo GraphQL',
    slug: 'apollo-graphql',
    status: 'Proyecto técnico',
    description: 'Backend GraphQL modular con autenticación, autorización, documentación y despliegue en contenedores.',
    impact: 'Base reutilizable para APIs tipadas, seguras y fáciles de evolucionar.',
    tags: ['Node.js', 'GraphQL', 'MongoDB', 'Docker'],
  },
  {
    title: 'Portafolio',
    slug: 'portfolio',
    status: 'En producción',
    description: 'Experiencia personal enfocada en rendimiento, accesibilidad, SEO y narrativa profesional.',
    impact: 'Una vitrina técnica que demuestra criterio de producto, no solo una lista de tecnologías.',
    tags: ['Astro', 'TypeScript', 'Vercel'],
    repository: 'me_astro',
    href: 'https://github.com/R0ger130296/me_astro',
  },
];

export const capabilities = [
  { title: 'Frontend de producto', description: 'Interfaces accesibles, responsivas y medibles con React, Astro y TypeScript.' },
  { title: 'Backend empresarial', description: 'APIs y reglas de negocio robustas con .NET, Node.js, SQL Server y GraphQL.' },
  { title: 'Mobile & PWA', description: 'Experiencias móviles con React Native, Expo, Flutter y capacidades offline.' },
  { title: 'Cloud & entrega', description: 'Azure, Docker, GitHub Actions, Vercel y despliegues reproducibles.' },
];

export const principles = [
  'Entender el problema antes de elegir la tecnología.',
  'Diseñar estados vacíos, errores y carga como parte del producto.',
  'Mantener componentes pequeños, contratos claros y datos tipados.',
  'Medir rendimiento, accesibilidad y valor entregado.',
];

export const technologies = [
  'React', 'TypeScript', '.NET', 'Node.js', 'Astro', 'Azure',
  'SQL Server', 'Firebase', 'Docker', 'Git', 'Tailwind CSS', 'GraphQL',
];
