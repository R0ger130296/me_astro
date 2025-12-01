# Iconos de Tecnologías

Esta carpeta contiene los iconos SVG de las tecnologías utilizadas en la sección de habilidades técnicas.

## Descargar Iconos

Los iconos se pueden descargar desde [Simple Icons](https://simpleicons.org/).

### Opción 1: Descarga Manual

1. Visita https://simpleicons.org/
2. Busca la tecnología que necesitas (ej: React, NestJS, Angular)
3. Haz clic en el icono y descarga el SVG
4. Guarda el archivo en `static/icons/tech/` con el nombre correcto según el mapeo en `src/lib/utils/techIcons.ts`

### Opción 2: Usar el Script (Requiere conexión a internet)

El script `scripts/download-tech-icons.js` intenta descargar los iconos automáticamente, pero puede fallar debido a restricciones de red o certificados SSL.

### Opción 3: Usar CDN (Automático)

El componente `Skills.svelte` usa automáticamente el CDN de Simple Icons como fallback si el icono local no existe. Esto funciona sin necesidad de descargar los iconos.

## Mapeo de Tecnologías

Las tecnologías están mapeadas en `src/lib/utils/techIcons.ts`. Para agregar una nueva tecnología:

1. Agrega el mapeo en `techIconMap`
2. Descarga el icono desde Simple Icons
3. Guárdalo en `static/icons/tech/` con el nombre correcto

## Iconos Personalizados

Algunos iconos (SCRUM, PMP, SOLID, Micro-Frontend) son creados automáticamente por el script como SVG personalizados.

