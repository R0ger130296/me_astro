# 📖 Guía del Portafolio Profesional

Esta guía explica cómo está estructurado el portafolio y cómo personalizarlo.

## 🏗️ Arquitectura del Proyecto

### Separación de Datos y Presentación

**Buenas Prácticas Aplicadas:**
- ✅ Datos centralizados en `src/lib/data/portfolio.ts`
- ✅ Componentes reutilizables en `src/lib/components/portfolio/`
- ✅ Tipos TypeScript para type safety
- ✅ Estilos scoped por componente

### Estructura de Datos

Todos los datos están tipados con interfaces TypeScript:

```typescript
interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}
```

## 📝 Cómo Actualizar el Portafolio

### 1. Actualizar Información Personal

Edita `src/lib/data/portfolio.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Tu Nombre',
  title: 'Tu Título',
  email: 'tu@email.com',
  // ...
};
```

### 2. Agregar Nueva Experiencia

```typescript
export const experiences: Experience[] = [
  // ... experiencias existentes
  {
    id: 5,
    title: 'Nuevo Trabajo',
    company: 'Nueva Empresa',
    location: 'Ciudad, País',
    startDate: '01/2024',
    endDate: 'Presente',
    responsibilities: [
      'Responsabilidad 1',
      'Responsabilidad 2',
      // ...
    ]
  }
];
```

### 3. Agregar Nueva Habilidad

```typescript
export const skills = {
  frontend: [
    // ... habilidades existentes
    'Nueva Tecnología'
  ],
  // ...
};
```

### 4. Agregar Nueva Certificación

```typescript
export const certifications: Certification[] = [
  // ... certificaciones existentes
  {
    id: 14,
    name: 'Nueva Certificación'
  }
];
```

## 🎨 Personalización de Estilos

### Cambiar Colores del Tema

Modifica las variables CSS en `src/app.css`:

```css
:root {
  --color-primary: #tu-color;        /* Azul por defecto */
  --color-secondary: #tu-color;     /* Verde por defecto */
  --color-text: #tu-color;           /* Gris oscuro por defecto */
}
```

### Personalizar un Componente

Cada componente tiene sus propios estilos scoped. Por ejemplo, para cambiar el header:

Edita `src/lib/components/portfolio/Header.svelte`:

```svelte
<style>
  .header {
    background: linear-gradient(135deg, #tu-color-1, #tu-color-2);
    /* ... */
  }
</style>
```

## 🔧 Agregar Nuevas Secciones

### Paso 1: Crear el Componente

Crea un nuevo archivo en `src/lib/components/portfolio/`:

```svelte
<!-- Projects.svelte -->
<script lang="ts">
  // Tu lógica aquí
</script>

<section class="projects-section">
  <h2 class="section-title">Proyectos</h2>
  <!-- Tu contenido aquí -->
</section>

<style>
  /* Tus estilos aquí */
</style>
```

### Paso 2: Agregar Datos

En `src/lib/data/portfolio.ts`:

```typescript
export interface Project {
  id: number;
  name: string;
  description: string;
  // ...
}

export const projects: Project[] = [
  // ... tus proyectos
];
```

### Paso 3: Importar en la Página

En `src/routes/portfolio/+page.svelte`:

```svelte
<script lang="ts">
  import Projects from '$lib/components/portfolio/Projects.svelte';
  // ... otros imports
</script>

<!-- ... -->
<Projects />
<!-- ... -->
```

## 📱 Responsive Design

El portafolio está diseñado para ser responsive. Los breakpoints principales son:

- **Desktop**: > 768px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

### Ajustar para Mobile

Usa media queries en los estilos:

```css
@media (max-width: 768px) {
  .tu-clase {
    /* Estilos para móvil */
  }
}
```

## 🚀 Optimizaciones

### Imágenes

Si agregas imágenes, optimízalas:
- Usa formatos modernos (WebP, AVIF)
- Comprime las imágenes
- Usa lazy loading cuando sea posible

### Performance

- Los componentes están optimizados para Svelte
- Los datos están centralizados para evitar re-renders innecesarios
- Los estilos están scoped para mejor rendimiento

## 🔍 SEO

### Meta Tags

Edita `src/routes/portfolio/+page.svelte`:

```svelte
<svelte:head>
  <title>Tu Nombre - Portafolio Profesional</title>
  <meta name="description" content="Tu descripción profesional" />
  <meta name="keywords" content="tus, palabras, clave" />
</svelte:head>
```

## 📦 Deploy

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente SvelteKit
3. Deploy automático en cada push

### Netlify

1. Conecta tu repositorio a Netlify
2. Build command: `npm run build`
3. Publish directory: `.svelte-kit`

### GitHub Pages

Requiere configuración adicional. Consulta la documentación de SvelteKit.

## 🐛 Troubleshooting

### Errores de TypeScript

```bash
npm run check
```

### Errores de Linting

```bash
npm run lint
```

### Formatear Código

```bash
npm run format
```

## 💡 Tips

1. **Mantén los datos actualizados**: Revisa `portfolio.ts` regularmente
2. **Usa TypeScript**: Aprovecha el type safety
3. **Sigue las convenciones**: Mantén la estructura de carpetas
4. **Comenta el código**: Especialmente lógica compleja
5. **Versiona tus cambios**: Usa Git para control de versiones

---

¡Disfruta personalizando tu portafolio! 🎉

