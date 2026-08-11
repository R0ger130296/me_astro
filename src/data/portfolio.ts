export type ProjectCaseStudy = {
  problem: string;
  decision: string;
  result: string;
  architecture: string[];
  codeLanguage: string;
  code: string[];
};

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
  caseStudy: ProjectCaseStudy;
};

export const profile = {
  name: 'Roger Cedeño',
  role: 'Full Stack Developer',
  location: 'Ecuador · GMT-5',
  email: 'grarogccee@gmail.com',
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
    caseStudy: {
      problem: 'Convertir movimientos financieros cotidianos en información útil sin obligar al usuario a pensar como un contador.',
      decision: 'Modelar el flujo alrededor de acciones rápidas, estados claros y una PWA instalable con experiencia consistente en móvil.',
      result: 'Una base de producto preparada para acompañar hábitos, presupuestos y decisiones financieras desde cualquier dispositivo.',
      architecture: ['PWA', 'React UI', 'Domain state', 'Persistence'],
      codeLanguage: 'TypeScript',
      code: [
        'const balance = movements.reduce(',
        '  (total, item) => total + signed(item),',
        '  0,',
        ');',
        'return formatMoney(balance);',
      ],
    },
  },
  {
    title: 'Auriga',
    slug: 'auriga',
    status: 'En desarrollo',
    description: 'Plataforma para talleres automotrices con órdenes de trabajo, citas, técnicos e indicadores operativos.',
    impact: 'Centraliza la operación y reduce la fricción entre recepción, taller y administración.',
    tags: ['React', '.NET 8', 'SQL Server', 'Azure'],
    featured: true,
    caseStudy: {
      problem: 'Unificar recepción, asignación de técnicos y seguimiento de órdenes sin perder trazabilidad operativa.',
      decision: 'Separar UI, API y dominio para que cada flujo pueda evolucionar sin convertir la aplicación en un bloque monolítico.',
      result: 'Una arquitectura preparada para crecer por módulos y convertir actividad operativa en indicadores accionables.',
      architecture: ['React', '.NET API', 'Domain', 'SQL Server', 'Azure'],
      codeLanguage: 'C#',
      code: [
        'var order = await orders.GetAsync(id);',
        'order.AssignTechnician(technicianId);',
        'await unitOfWork.SaveChangesAsync();',
        'return Results.Ok(order);',
      ],
    },
  },
  {
    title: 'App Colaboradores',
    slug: 'app-colaboradores',
    status: 'En producción',
    description: 'Aplicación móvil interna para comunicaciones, tareas, notificaciones y acceso rápido a servicios.',
    impact: 'Mejora la comunicación interna y lleva los flujos de trabajo al dispositivo móvil.',
    tags: ['React Native', 'Expo', 'Firebase'],
    featured: true,
    caseStudy: {
      problem: 'Llevar comunicaciones y tareas internas al canal que las personas realmente tienen disponible durante el día: el móvil.',
      decision: 'Priorizar navegación corta, notificaciones y componentes reutilizables con una capa de datos preparada para conectividad variable.',
      result: 'Menos pasos para acceder a información y una experiencia móvil coherente para tareas frecuentes.',
      architecture: ['Expo', 'React Native', 'Services', 'Firebase'],
      codeLanguage: 'TypeScript',
      code: [
        'const session = await getSession();',
        'const feed = await loadFeed(session.userId);',
        'setItems(feed);',
        'registerPushNotifications();',
      ],
    },
  },
  {
    title: 'Apollo GraphQL',
    slug: 'apollo-graphql',
    status: 'Proyecto técnico',
    description: 'Backend GraphQL modular con autenticación, autorización, documentación y despliegue en contenedores.',
    impact: 'Base reutilizable para APIs tipadas, seguras y fáciles de evolucionar.',
    tags: ['Node.js', 'GraphQL', 'MongoDB', 'Docker'],
    caseStudy: {
      problem: 'Evitar APIs rígidas cuando distintos clientes necesitan composiciones de datos diferentes.',
      decision: 'Usar un schema tipado con resolvers pequeños, autorización por contexto y módulos desacoplados.',
      result: 'Una base técnica reutilizable que reduce sobre-fetching y mantiene contratos explícitos.',
      architecture: ['Client', 'GraphQL', 'Resolvers', 'MongoDB', 'Docker'],
      codeLanguage: 'GraphQL',
      code: [
        'query Dashboard {',
        '  viewer {',
        '    name',
        '    projects { id status }',
        '  }',
        '}',
      ],
    },
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
    caseStudy: {
      problem: 'Presentar experiencia técnica sin caer en el patrón de un CV largo lleno de badges y texto sin jerarquía.',
      decision: 'Construir una narrativa progresiva con Astro, interacción opcional y mejoras que no comprometan rendimiento ni accesibilidad.',
      result: 'El propio portafolio funciona como evidencia del criterio aplicado a UX, frontend, PWA y entrega continua.',
      architecture: ['Astro', 'Typed data', 'Islands JS', 'Vercel'],
      codeLanguage: 'Astro',
      code: [
        '<ProjectCard project={project}>',
        '  <Decision />',
        '  <Architecture />',
        '  <Impact />',
        '</ProjectCard>',
      ],
    },
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
