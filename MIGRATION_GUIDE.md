# Guía de Migración: SvelteKit a Astro

Este proyecto ha sido migrado de SvelteKit a Astro. Esta guía documenta los cambios realizados.

## Cambios Principales

### 1. Estructura de Archivos

- **Rutas**: `src/routes/` → `src/pages/`
- **Layouts**: `src/routes/+layout.svelte` → `src/layouts/Layout.astro`
- **Página principal**: `src/routes/+page.svelte` → `src/pages/index.astro`

### 2. Configuración

- **Framework**: SvelteKit → Astro
- **Configuración**: `svelte.config.js` → `astro.config.mjs`
- **Build**: Ahora usa el sistema de build de Astro

### 3. Componentes Svelte

Los componentes Svelte se mantienen sin cambios y funcionan perfectamente en Astro usando la directiva `client:load`:

```astro
<Header client:load />
```

### 4. Reemplazos de SvelteKit

- `$app/environment` → `src/lib/utils/browser.ts`
- Los hooks y casos de uso funcionan igual (son funciones asíncronas)

### 5. Instalación

```bash
npm install
```

### 6. Scripts

- `npm run dev` - Inicia el servidor de desarrollo de Astro
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la build de producción

## Ventajas de Astro

1. **Mejor rendimiento**: Astro genera HTML estático por defecto, mejorando el rendimiento
2. **SEO mejorado**: Contenido renderizado en el servidor
3. **Islas de interactividad**: Solo los componentes que necesitan JavaScript se cargan
4. **Compatibilidad**: Los componentes Svelte funcionan sin cambios

## Notas

- Los componentes Svelte mantienen toda su funcionalidad
- La arquitectura hexagonal se mantiene intacta
- Los estilos de Tailwind CSS funcionan igual
- El adaptador de Vercel está configurado para despliegues estáticos

